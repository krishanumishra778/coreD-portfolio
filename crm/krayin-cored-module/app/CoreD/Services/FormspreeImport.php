<?php

namespace App\CoreD\Services;

use Carbon\CarbonImmutable;

/**
 * Parses a Formspree export (CSV or JSON) and classifies every submission for the historical import.
 * Pure (no database): used by the dry run, the real import and the tests.
 */
class FormspreeImport
{
    private const MAP = [
        'service_id' => 'ServiceId', 'service' => 'ServiceSelection', 'plan_id' => 'PlanId', 'plan' => 'ChooseYourPlan',
        'displayed_price' => 'DisplayedPrice', 'price_basis' => 'PriceBasis', 'price_amount' => 'PriceAmount', 'currency' => 'Currency',
        'pricing_status' => 'PricingStatus', 'quote_status' => 'QuoteStatus', 'budget_amount' => 'BudgetAmount', 'budget_currency' => 'BudgetCurrency',
        'budget_range' => 'BudgetRange', 'budget_scope' => 'BudgetScope', 'add_on_ids' => 'AddOnIds', 'add_ons' => 'AddOns', 'module_ids' => 'ModuleIds',
        'modules' => 'RequestedModules', 'module_pricing' => 'ModulePricing', 'basic_agent' => 'BasicAgent', 'standard_agent' => 'StandardAgent',
        'requested_scope' => 'RequestedScope', 'current_systems' => 'CurrentSystems', 'requested_integrations' => 'RequestedIntegrations',
        'requested_volume' => 'RequestedVolume', 'target_timeline' => 'TargetTimeline',
    ];

    /** @return list<array<string,mixed>> raw rows (keys as exported) */
    public static function parse(string $content, string $nameHint = ''): array
    {
        $content = ltrim($content, "\xEF\xBB\xBF \t\r\n");
        if ($content === '') {
            return [];
        }
        if ($content[0] === '{' || $content[0] === '[') {
            $j = json_decode($content, true);
            if (! is_array($j)) {
                throw new \InvalidArgumentException('Not valid JSON');
            }
            $rows = array_is_list($j) ? $j : ($j['submissions'] ?? $j['data'] ?? $j['rows'] ?? []);

            return array_values(array_filter($rows, 'is_array'));
        }
        $fh = fopen('php://temp', 'r+');
        fwrite($fh, $content);
        rewind($fh);
        $header = fgetcsv($fh, 0, ',', '"', '');
        $rows = [];
        while (($r = fgetcsv($fh, 0, ',', '"', '')) !== false) {
            if ($r === [null] || count($r) < 2) {
                continue;
            }
            $rows[] = array_combine($header, array_pad(array_slice($r, 0, count($header)), count($header), ''));
        }
        fclose($fh);

        return $rows;
    }

    private static function pick(array $row, array $keys): string
    {
        $lower = array_change_key_case($row, CASE_LOWER);
        foreach ($keys as $k) {
            $v = $lower[strtolower($k)] ?? null;
            if (is_scalar($v) && trim((string) $v) !== '') {
                return trim((string) $v);
            }
        }

        return '';
    }

    /** Normalise a raw row into [payload for IntakeService, submitted_at, kind, flags]. */
    public static function normalise(array $row): array
    {
        $date = null;
        $rawDate = self::pick($row, ['_date', 'date', 'submitted_at', 'submitted at', 'created_at', 'created', 'timestamp']);
        if ($rawDate !== '') {
            try {
                $date = CarbonImmutable::parse($rawDate, 'UTC')->utc();
            } catch (\Throwable) {
            }
        }
        $d = [
            'request_id' => self::pick($row, ['RequestId', 'request_id']),
            'name' => self::pick($row, ['FullName', 'name']),
            'email' => mb_strtolower(self::pick($row, ['CompanyEmail', 'email'])),
            'phone' => preg_replace('/[\s()-]/', '', self::pick($row, ['ContactNumber', 'phone'])),
            'phone_country' => strtoupper(self::pick($row, ['CountryCode'])),
            'dial_code' => self::pick($row, ['DialCode']),
            'company' => self::pick($row, ['CompanyName', 'company']),
            'message' => self::pick($row, ['ProjectDescription', 'message']),
            'consent' => [
                'terms' => self::pick($row, ['TermsAccepted']) !== '',
                'privacy' => self::pick($row, ['PrivacyAccepted']) !== '',
                'privacy_notice' => false,
            ],
        ];
        $details = [];
        foreach (self::MAP as $key => $col) {
            if (($v = self::pick($row, [$col])) !== '') {
                $details[$key] = mb_substr($v, 0, IntakePayload::DETAILS[$key]);
            }
        }
        $d['details'] = $details;
        $isFaq = strcasecmp(self::pick($row, ['LeadSource']), 'FAQ chatbot') === 0;
        $kind = $isFaq ? 'faq_chatbot' : ((($details['price_basis'] ?? '') === 'quote' || ! empty($details['module_ids']) || stripos($details['quote_status'] ?? '', 'scope review') !== false) ? 'quote' : 'contact');
        if ($isFaq) {
            $d['consent']['privacy_notice'] = true;   // the FAQ form always showed the privacy notice
        }
        if (! preg_match('/^[A-Za-z0-9_-]{16,64}$/', $d['request_id'])) {
            $d['request_id'] = 'fs-'.substr(sha1(json_encode($row)), 0, 32);
        }
        $honeypot = self::pick($row, ['Website', '_gotcha']);
        $spamFlag = in_array(strtolower(self::pick($row, ['_spam', 'spam'])), ['1', 'true', 'yes'], true);

        return ['payload' => $d, 'submitted_at' => $date, 'kind' => $kind, 'honeypot' => $honeypot !== '', 'spam_flag' => $spamFlag];
    }

    /** Reason code if the row should not be imported, else null. Order matters: invalid > spam > qa. */
    public static function exclusion(array $n): ?string
    {
        $d = $n['payload'];
        if (! filter_var($d['email'], FILTER_VALIDATE_EMAIL) || mb_strlen($d['name']) < 2) {
            return 'invalid';
        }
        if ($n['honeypot'] || $n['spam_flag'] || preg_match_all('#https?://#i', $d['message']) >= 3) {
            return 'spam';
        }
        $domain = substr(strrchr($d['email'], '@'), 1);
        if (preg_match('/(^|\.)(example\.(com|org|net)|test|invalid|localhost)$/i', $domain)
            || preg_match('/\b(test|testing|qa|synthetic|dummy)\b/i', $d['name'].' '.$d['company'].' '.mb_substr($d['message'], 0, 200))) {
            return 'qa_test';
        }

        return null;
    }

    /**
     * @param  list<array<string,mixed>>  $rows
     * @return array{report: array<string,mixed>, importable: list<array<string,mixed>>}
     */
    public static function analyse(array $rows): array
    {
        $counts = ['total' => count($rows), 'invalid' => 0, 'spam' => 0, 'qa_test' => 0, 'duplicate' => 0, 'importable' => 0, 'no_date' => 0];
        $kinds = ['contact' => 0, 'quote' => 0, 'faq_chatbot' => 0];
        $seenIds = [];
        $seenKey = [];
        $importable = [];
        $emails = [];
        $min = $max = null;
        $notes = [];
        foreach ($rows as $i => $row) {
            $n = self::normalise($row);
            if ($n['submitted_at'] === null) {
                $counts['no_date']++;
            } else {
                $min = $min === null || $n['submitted_at'] < $min ? $n['submitted_at'] : $min;
                $max = $max === null || $n['submitted_at'] > $max ? $n['submitted_at'] : $max;
            }
            if ($why = self::exclusion($n)) {
                $counts[$why]++;
                $notes[] = ['row' => $i + 2, 'reason' => $why];

                continue;
            }
            $key = $n['kind'].'|'.$n['payload']['email'].'|'.hash('sha1', preg_replace('/\s+/', ' ', mb_strtolower($n['payload']['message'])));
            if (isset($seenIds[$n['payload']['request_id']]) || isset($seenKey[$key])) {
                $counts['duplicate']++;
                $notes[] = ['row' => $i + 2, 'reason' => 'duplicate'];

                continue;
            }
            $seenIds[$n['payload']['request_id']] = $seenKey[$key] = true;
            $counts['importable']++;
            $kinds[$n['kind']]++;
            $emails[$n['payload']['email']] = true;
            $importable[] = $n;
        }

        return ['report' => ['counts' => $counts, 'importable_by_source' => array_combine(
            array_map(fn ($k) => config("cored.sources.$k"), array_keys($kinds)), array_values($kinds)),
            'unique_emails_importable' => count($emails),
            'first_submission' => $min?->format('Y-m-d H:i:s').' UTC', 'last_submission' => $max?->format('Y-m-d H:i:s').' UTC',
            'excluded_rows' => $notes], 'importable' => $importable];
    }
}
