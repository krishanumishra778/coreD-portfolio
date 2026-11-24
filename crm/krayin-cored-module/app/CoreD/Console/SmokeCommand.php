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

    protected function call2(string $method, string $uri, array $data, int $n): array
    {
        $req = Request::create($uri, $method, $data, [], [], ['REMOTE_ADDR' => "10.0.0.$n", 'HTTP_ACCEPT' => 'application/json']);
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
        $email = "synthetic.$tag@example.invalid";
        $tok = ['turnstile_token' => 'XXXX.DUMMY.TOKEN.XXXX'];   // valid only against Cloudflare's documented dummy secret
        $base = ['name' => "[SYNTHETIC] Tester $tag", 'email' => $email, 'phone' => '+91 90000 00000', 'message' => 'Synthetic smoke test'] + $tok;
        $n = 20;

        [$s] = $this->call2('POST', '/cored/api/intake', ['kind' => 'contact', 'request_id' => "smoke-c-$tag-0001"] + $base, $n++);
        $this->check('contact intake accepted', $s === 200, "http $s");
        $lead = Lead::query()->where('title', 'like', "%Tester $tag")->get();
        $this->check('exactly one lead created', $lead->count() === 1);
        $this->check('lead source = Reach Us Out', optional($lead->first()?->source)->name === config('cored.sources.contact'));

        [$s] = $this->call2('POST', '/cored/api/intake', ['kind' => 'contact', 'request_id' => "smoke-c-$tag-0001"] + $base, $n++);
        $this->check('replayed request_id accepted idempotently', $s === 200);
        [$s] = $this->call2('POST', '/cored/api/intake', ['kind' => 'contact', 'request_id' => "smoke-c-$tag-0002"] + $base, $n++);
        $this->check('same email within window = duplicate, no new lead', $s === 200 && Lead::query()->where('title', 'like', "%Tester $tag")->count() === 1
            && IntakeEvent::where('is_duplicate', true)->where('request_id', "smoke-c-$tag-0002")->exists());

        [$s] = $this->call2('POST', '/cored/api/intake', ['kind' => 'faq_chatbot', 'request_id' => "smoke-f-$tag-0001"] + $base, $n++);
        $faq = Lead::query()->where('title', 'like', "FAQ chatbot:%Tester $tag")->first();
        $this->check('FAQ chatbot lead created with its own source', $s === 200 && $faq && optional($faq->source)->name === config('cored.sources.faq_chatbot'));
        $this->check('one person for both submissions', \Webkul\Contact\Models\Person::query()->whereRaw('LOWER(CAST(emails AS CHAR)) LIKE ?', ['%'.$email.'%'])->count() === 1);

        [$s, $b] = $this->call2('POST', '/cored/api/intake', ['kind' => 'contact', 'request_id' => "smoke-c-$tag-0003", 'turnstile_token' => ''] + $base, $n++);
        $this->check('missing Turnstile token rejected', $s === 422, "http $s");

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
