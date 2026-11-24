<?php

namespace App\CoreD\Services;

/**
 * Contract of POST /cored/api/intake: validation rules, normalisation and the human-readable summary
 * that is written to the CRM lead and the notification e-mail. Unknown keys are dropped (allow-list).
 */
class IntakePayload
{
    public const KINDS = ['contact', 'quote', 'faq_chatbot'];

    /** details.* allow-list => max length (matches the website quote form) */
    public const DETAILS = [
        'service_id' => 40, 'service' => 120, 'plan_id' => 40, 'plan' => 120, 'displayed_price' => 80, 'price_basis' => 30,
        'price_amount' => 20, 'currency' => 3, 'pricing_status' => 30, 'quote_status' => 200,
        'budget_amount' => 30, 'budget_currency' => 3, 'budget_range' => 60, 'budget_scope' => 80,
        'add_on_ids' => 300, 'add_ons' => 600, 'module_ids' => 300, 'modules' => 600, 'module_pricing' => 200,
        'basic_agent' => 120, 'standard_agent' => 120, 'requested_scope' => 200,
        'current_systems' => 300, 'requested_integrations' => 300, 'requested_volume' => 300, 'target_timeline' => 120,
    ];

    private const LABELS = [
        'service' => 'Service', 'plan' => 'Plan', 'displayed_price' => 'Displayed price', 'price_basis' => 'Price basis',
        'pricing_status' => 'Pricing status', 'quote_status' => 'Quote status', 'budget_range' => 'Budget',
        'budget_scope' => 'Budget applies to', 'add_ons' => 'Add-ons', 'modules' => 'Requested modules',
        'module_pricing' => 'Module pricing', 'basic_agent' => 'Basic agent option', 'standard_agent' => 'Standard agent option',
        'requested_scope' => 'Requested scope', 'current_systems' => 'Current systems', 'requested_integrations' => 'Integrations',
        'requested_volume' => 'Users / agents / workflows', 'target_timeline' => 'Target timeline',
    ];

    public static function rules(): array
    {
        $rules = [
            'kind' => 'required|in:'.implode(',', self::KINDS),
            'request_id' => ['required', 'regex:/^[A-Za-z0-9_-]{16,64}$/'],
            'name' => 'required|string|min:2|max:120',
            'email' => 'required|email:rfc|max:254',
            'phone' => ['required', 'string', 'regex:/^\+\d{7,15}$/'],
            'phone_country' => ['nullable', 'regex:/^[A-Z]{2}$/'],
            'dial_code' => ['nullable', 'regex:/^\+\d{1,4}$/'],
            'company' => 'nullable|string|max:140',
            'message' => 'nullable|string|max:5000',
            'website' => 'nullable|string|max:200',            // honeypot
            'turnstile_token' => 'nullable|string|max:2048',
            'consent' => 'nullable|array',
            'consent.terms' => 'nullable|boolean',
            'consent.privacy' => 'nullable|boolean',
            'consent.privacy_notice' => 'nullable|boolean',
            'details' => 'nullable|array',
        ];
        foreach (self::DETAILS as $key => $max) {
            $rules["details.$key"] = 'nullable|string|max:'.$max;
        }
        $rules['details.budget_amount'] = ['nullable', 'string', 'max:30', 'regex:/^\d+(\.\d{1,2})?$/'];
        $rules['details.price_amount'] = ['nullable', 'string', 'max:20', 'regex:/^\d+(\.\d{1,2})?$/'];
        $rules['details.currency'] = ['nullable', 'regex:/^[A-Z]{3}$/'];
        $rules['details.budget_currency'] = ['nullable', 'regex:/^[A-Z]{3}$/'];

        return $rules;
    }

    /** Kind-specific rules that need the whole payload. Returns the list of offending field names. */
    public static function crossChecks(array $d): array
    {
        $bad = [];
        if (in_array($d['kind'], ['contact', 'quote'], true)) {
            if (mb_strlen($d['message'] ?? '') < 5) {
                $bad[] = 'message';
            }
            if (empty($d['consent']['terms'])) {
                $bad[] = 'consent.terms';
            }
            if (empty($d['consent']['privacy'])) {
                $bad[] = 'consent.privacy';
            }
        } elseif (empty($d['consent']['privacy_notice'])) {
            $bad[] = 'consent.privacy_notice';
        }
        if (! empty($d['dial_code']) && ! str_starts_with($d['phone'], $d['dial_code'])) {
            $bad[] = 'dial_code';
        }
        if (! empty($d['details']['budget_amount']) && empty($d['details']['budget_currency'])) {
            $bad[] = 'details.budget_currency';
        }

        return $bad;
    }

    public static function clean(array $d): array
    {
        $strip = fn ($x) => is_string($x) ? trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/u', '', $x)) : $x;
        $d = array_map(fn ($x) => is_array($x) ? array_map($strip, $x) : $strip($x), $d);
        $d['email'] = mb_strtolower($d['email']);
        $d['details'] = array_filter(array_intersect_key((array) ($d['details'] ?? []), self::DETAILS), fn ($v) => is_string($v) && $v !== '');
        $d['consent'] = [
            'terms' => (bool) ($d['consent']['terms'] ?? false),
            'privacy' => (bool) ($d['consent']['privacy'] ?? false),
            'privacy_notice' => (bool) ($d['consent']['privacy_notice'] ?? false),
        ];

        return $d;
    }

    /** What is stored in cored_intake_events.payload: the submission without the Turnstile token and the honeypot. */
    public static function storable(array $d): array
    {
        return array_diff_key($d, ['turnstile_token' => 1, 'website' => 1]);
    }

    public static function summary(string $kind, string $sourceName, array $d, ?string $submittedAt = null): string
    {
        $l = ['Source: '.$sourceName, 'Request ID: '.$d['request_id'], 'Submitted (UTC): '.($submittedAt ?? gmdate('Y-m-d H:i:s'))];
        $l[] = 'Name: '.$d['name'];
        if (($d['company'] ?? '') !== '') {
            $l[] = 'Company: '.$d['company'];
        }
        $l[] = 'Email: '.$d['email'];
        $l[] = 'Phone: '.$d['phone'].(($d['phone_country'] ?? '') !== '' ? ' (country '.$d['phone_country'].(($d['dial_code'] ?? '') !== '' ? ', dial code '.$d['dial_code'] : '').')' : '');
        foreach (self::LABELS as $key => $label) {
            if (($v = $d['details'][$key] ?? '') !== '') {
                $l[] = $label.': '.$v;
            }
        }
        $c = $d['consent'] ?? [];
        $l[] = 'Consent: terms '.(($c['terms'] ?? false) ? 'accepted' : 'n/a').', privacy notice '.(($c['privacy'] ?? false) || ($c['privacy_notice'] ?? false) ? ($kind === 'faq_chatbot' ? 'shown at submission' : 'accepted') : 'n/a')
            .' (policy version '.config('cored.consent_version').')';
        if (($d['message'] ?? '') !== '') {
            $l[] = '';
            $l[] = 'Message:';
            $l[] = $d['message'];
        }

        return implode("\n", $l);
    }
}
