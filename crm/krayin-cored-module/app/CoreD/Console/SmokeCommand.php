<?php

namespace App\CoreD\Console;

use App\CoreD\Models\Appointment;
use App\CoreD\Models\IntakeEvent;
use App\CoreD\Services\AvailabilityService;
use Carbon\CarbonImmutable;
use Illuminate\Console\Command;
use Illuminate\Http\Request;
use Webkul\Lead\Models\Lead;

/** Synthetic end-to-end check through the real HTTP kernel (Basic Auth is at Apache, so it is not in this path). */
class SmokeCommand extends Command
{
    protected $signature = 'cored:smoke {--tag= : unique run tag}';

    protected $description = 'Run synthetic intake + booking checks against this installation (uses [SYNTHETIC] records).';

    protected int $fail = 0;

    protected function call2(string $method, string $uri, array $data, int $n, array $server = []): array
    {
        $req = Request::create($uri, $method, $data, [], [], ['REMOTE_ADDR' => "10.0.0.$n", 'HTTP_ACCEPT' => 'application/json'] + $server);
        $res = app(\Illuminate\Contracts\Http\Kernel::class)->handle($req);

        return [$res->getStatusCode(), json_decode($res->getContent(), true) ?? []];
    }

    protected function check(string $name, bool $ok, string $extra = ''): void
    {
        $this->line(($ok ? 'PASS ' : 'FAIL ').$name.($extra ? " ($extra)" : ''));
        $ok || $this->fail++;
    }

    public function handle(): int
    {
        $tag = $this->option('tag') ?: date('His');
        config(['cored.rate_limits.intake_per_hour_email' => 100]);   // this process only: the smoke test reuses one synthetic e-mail on purpose
        $email = "synthetic.$tag@example.invalid";
        $tok = ['turnstile_token' => 'XXXX.DUMMY.TOKEN.XXXX'];   // valid only against Cloudflare's documented dummy secret
        $details = ['service' => 'AI CRM and automation', 'plan' => 'Custom', 'price_basis' => 'quote', 'budget_amount' => '5000', 'budget_currency' => 'USD',
            'budget_range' => '5000 USD', 'add_ons' => 'Priority support', 'modules' => 'Lead scoring', 'requested_integrations' => 'ERPNext, Zoho', 'current_systems' => 'Spreadsheets',
            'requested_volume' => '10 users', 'target_timeline' => 'Q1 2027', 'quote_status' => 'Scope review required'];
        $base = ['name' => "[SYNTHETIC] Tester $tag", 'email' => $email, 'phone' => '+919000000000', 'phone_country' => 'IN', 'dial_code' => '+91', 'company' => 'Synthetic Co',
            'message' => 'Synthetic smoke test: need a CRM with ERP integration.', 'consent' => ['terms' => true, 'privacy' => true], 'details' => $details] + $tok;
        $n = 20;
        $summaryOf = fn ($l) => (string) $l?->description;

        [$s, $b] = $this->call2('POST', '/cored/api/intake', ['kind' => 'contact', 'request_id' => "smoke-c-$tag-0001"] + $base, $n++);
        $this->check('contact intake accepted', $s === 200 && ($b['status'] ?? '') === 'created', "http $s");
        $lead = Lead::query()->where('title', 'like', "%Tester $tag")->get();
        $this->check('exactly one lead created', $lead->count() === 1);
        $this->check('lead source = Reach Us Out', optional($lead->first()?->source)->name === config('cored.sources.contact'));
        $desc = $summaryOf($lead->first());
        $this->check('lead keeps service, plan, budget+currency, add-ons, modules, integrations, systems, volume, timeline', collect(['AI CRM and automation', 'Custom', '5000 USD', 'Priority support', 'Lead scoring', 'ERPNext, Zoho', 'Spreadsheets', '10 users', 'Q1 2027'])->every(fn ($x) => str_contains($desc, $x)));
        $this->check('lead keeps phone with country code, consent and request id', str_contains($desc, '+919000000000 (country IN, dial code +91)') && str_contains($desc, 'terms accepted') && str_contains($desc, "smoke-c-$tag-0001"));
        $ev = IntakeEvent::where('request_id', "smoke-c-$tag-0001")->first();
        $this->check('full payload stored for audit (no Turnstile token)', $ev && ($ev->payload['details']['budget_currency'] ?? '') === 'USD' && ($ev->payload['consent']['privacy'] ?? false) === true && ! array_key_exists('turnstile_token', $ev->payload)
            && $ev->consent_version === config('cored.consent_version') && $ev->consent_at !== null);
        $this->check('notification attempted: sent or explicitly disabled', $ev && ($ev->notified_at !== null || in_array($ev->notify_error, ['disabled', 'send_failed'], true)), $ev ? ($ev->notified_at ? 'sent to '.config('cored.notify_to') : (string) $ev->notify_error) : '');

        [$s, $b] = $this->call2('POST', '/cored/api/intake', ['kind' => 'contact', 'request_id' => "smoke-c-$tag-0001"] + $base, $n++);
        $this->check('retry with the same request_id: accepted, replayed, no second lead', $s === 200 && ($b['status'] ?? '') === 'replayed'
            && Lead::query()->where('title', 'like', "%Tester $tag")->count() === 1 && IntakeEvent::where('request_id', "smoke-c-$tag-0001")->count() === 1);
        [$s, $b] = $this->call2('POST', '/cored/api/intake', ['kind' => 'contact', 'request_id' => "smoke-c-$tag-0002", 'message' => 'Second, different request from the same person.'] + $base, $n++);
        $dup = IntakeEvent::where('request_id', "smoke-c-$tag-0002")->first();
        $this->check('different request, same e-mail inside window: no new lead, details kept as a note', $s === 200 && ($b['status'] ?? '') === 'duplicate' && $dup?->is_duplicate
            && Lead::query()->where('title', 'like', "%Tester $tag")->count() === 1
            && \DB::table('activities')->where('type', 'note')->where('title', 'like', 'Repeat submission%')->where('comment', 'like', '%Second, different request%')->exists());

        [$s, $b] = $this->call2('POST', '/cored/api/intake', ['kind' => 'quote', 'request_id' => "smoke-q-$tag-0001"] + $base, $n++);
        $q = Lead::query()->where('title', 'like', "Quote request:%Tester $tag%")->first();
        $this->check('quote request becomes its own lead with the quote source', $s === 200 && $q && optional($q->source)->name === config('cored.sources.quote'));

        [$s, $b] = $this->call2('POST', '/cored/api/intake', ['kind' => 'faq_chatbot', 'request_id' => "smoke-f-$tag-0001", 'message' => 'FAQ assistant registration', 'details' => [], 'company' => '', 'consent' => ['privacy_notice' => true]] + $base, $n++);
        $faq = Lead::query()->where('title', 'like', "FAQ chatbot:%Tester $tag")->first();
        $this->check('FAQ chatbot lead created with its own source', $s === 200 && $faq && optional($faq->source)->name === config('cored.sources.faq_chatbot') && str_contains($summaryOf($faq), 'shown at submission'));
        $this->check('three distinct source labels', count(array_unique([optional($lead->first()->source)->name, optional($q?->source)->name, optional($faq?->source)->name])) === 3);
        $personCount = \Webkul\Contact\Models\Person::query()->whereRaw('LOWER(CAST(emails AS CHAR)) LIKE ?', ['%'.$email.'%'])->count();
        $this->check('one CRM person for all submissions', $personCount === 1);

        [$s] = $this->call2('POST', '/cored/api/intake', ['kind' => 'contact', 'request_id' => "smoke-c-$tag-0003", 'turnstile_token' => ''] + $base, $n++);
        $this->check('missing Turnstile token rejected', $s === 422, "http $s");
        [$s, $b] = $this->call2('POST', '/cored/api/intake', ['kind' => 'contact', 'request_id' => "smoke-c-$tag-0004", 'consent' => ['terms' => true]] + $base, $n++);
        $this->check('missing privacy consent rejected server-side', $s === 422 && in_array('consent.privacy', $b['fields'] ?? [], true));
        [$s] = $this->call2('POST', '/cored/api/intake', ['kind' => 'contact', 'request_id' => "smoke-c-$tag-0005", 'phone' => '9000000000'] + $base, $n++);
        $this->check('phone without country code rejected', $s === 422);
        [$s] = $this->call2('POST', '/cored/api/intake', ['kind' => 'contact', 'request_id' => "smoke-c-$tag-0006"] + $base, $n++, ['HTTP_ORIGIN' => 'https://evil.example']);
        $this->check('browser request from a foreign origin refused', $s === 403, "http $s");
        $this->check('rejected requests stored nothing', ! IntakeEvent::whereIn('request_id', ["smoke-c-$tag-0003", "smoke-c-$tag-0004", "smoke-c-$tag-0005", "smoke-c-$tag-0006"])->exists());

        $svc = app(AvailabilityService::class);
        $slot = null;
        for ($i = 1; $i <= 14 && ! $slot; $i++) {
            $slot = $svc->slotsForDate(CarbonImmutable::now(config('cored.booking.timezone'))->addDays($i)->format('Y-m-d'))[0] ?? null;
        }
        if (! $slot) {
            $this->check('an availability slot exists (run cored:seed-demo --force)', false);

            return self::FAILURE;
        }
        $book = ['request_id' => "smoke-b-$tag-0001", 'service' => config('cored.booking.services')[0], 'channel' => 'email',
            'starts_at' => $slot, 'timezone' => 'Asia/Kolkata', 'is_demo' => true] + $base;
        [$s, $b] = $this->call2('POST', '/cored/api/booking', $book, $n++);
        $appt = Appointment::where('request_id', "smoke-b-$tag-0001")->first();
        $this->check('booking accepted, reach-out wording, no Meet link', $s === 200 && str_contains($b['message'] ?? '', 'reach out to confirm') && ($appt?->meet_url === null), "http $s");
        $this->check('appointment linked to CRM person, lead and activity', $appt && $appt->person_id && $appt->lead_id && $appt->activity_id);
        $this->check('appointment is linked to the EXISTING contact created by the earlier enquiry', $appt && (int) $appt->person_id === (int) $ev->person_id && \Webkul\Contact\Models\Person::query()->whereRaw('LOWER(CAST(emails AS CHAR)) LIKE ?', ['%'.$email.'%'])->count() === 1);
        $this->check('activity visible on the person (person_activities)', $appt && \DB::table('person_activities')->where('person_id', $appt->person_id)->where('activity_id', $appt->activity_id)->exists());
        [$s] = $this->call2('POST', '/cored/api/booking', ['request_id' => "smoke-b-$tag-0002"] + $book, $n++);
        $this->check('same slot cannot be double-booked (409)', $s === 409, "http $s");
        [$s] = $this->call2('POST', '/cored/api/booking', $book, $n++);
        $this->check('booking replay is idempotent', $s === 200 && Appointment::where('starts_at', $appt->starts_at)->count() === 1);
        $this->check('booked slot no longer offered', ! in_array($slot, $svc->slotsForDate(CarbonImmutable::parse($slot)->setTimezone(config('cored.booking.timezone'))->format('Y-m-d')), true));

        $this->info($this->fail ? "{$this->fail} check(s) FAILED" : 'All smoke checks passed. Synthetic records are tagged "[SYNTHETIC]" – tag '.$tag);

        return $this->fail ? self::FAILURE : self::SUCCESS;
    }
}
