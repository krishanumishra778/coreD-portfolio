<?php

namespace App\CoreD\Services;

use App\CoreD\Models\IntakeEvent;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Support\Facades\DB;
use Webkul\Contact\Repositories\PersonRepository;
use Webkul\Lead\Models\Source;
use Webkul\Lead\Models\Type;
use Webkul\Lead\Repositories\LeadRepository;
use Webkul\Lead\Repositories\PipelineRepository;

class IntakeService
{
    public function __construct(
        protected PersonRepository $persons,
        protected LeadRepository $leads,
        protected PipelineRepository $pipelines,
    ) {}

    /**
     * Idempotent by request_id (a retry never creates a second lead). A different request from the same e-mail and kind
     * inside the dedupe window does not open a second lead, but its full details are kept as a note on the existing lead.
     *
     * @param  array{submitted_at?: \DateTimeInterface, is_import?: bool, notify?: bool, window_dedupe?: bool}  $opts
     */
    public function record(string $kind, array $d, array $opts = []): array
    {
        $sourceName = config("cored.sources.$kind");
        $emailHash = hash('sha256', mb_strtolower(trim($d['email'])));
        $at = isset($opts['submitted_at']) ? \Illuminate\Support\Carbon::instance($opts['submitted_at']) : now();

        if ($prior = IntakeEvent::where('request_id', $d['request_id'])->first()) {
            return ['status' => 'replayed', 'lead_id' => $prior->lead_id];
        }

        try {
            $out = DB::transaction(function () use ($kind, $d, $sourceName, $emailHash, $opts, $at) {
                $recent = ($opts['window_dedupe'] ?? true)
                    ? IntakeEvent::where('email_hash', $emailHash)->where('kind', $kind)->where('is_duplicate', false)
                        ->where('created_at', '>=', now()->subMinutes((int) config('cored.dedupe_window_minutes')))->lockForUpdate()->first()
                    : null;

                $person = $this->findPerson($d['email']) ?? $this->createPerson($d);
                $summary = IntakePayload::summary($kind, $sourceName, $d, $at->copy()->utc()->format('Y-m-d H:i:s'));
                $common = ['request_id' => $d['request_id'], 'kind' => $kind, 'source_name' => $sourceName, 'email_hash' => $emailHash,
                    'person_id' => $person->id, 'payload' => IntakePayload::storable($d), 'consent_at' => $at, 'submitted_at' => $at,
                    'consent_version' => config('cored.consent_version'), 'is_import' => (bool) ($opts['is_import'] ?? false)];

                if ($recent) {
                    $this->addNote($recent->lead_id, $person->id, 'Repeat submission: '.$sourceName, $summary, $at);
                    IntakeEvent::create($common + ['lead_id' => $recent->lead_id, 'is_duplicate' => true]);

                    return ['status' => 'duplicate', 'lead_id' => $recent->lead_id, 'summary' => $summary];
                }
                $lead = $this->createLead($person, $kind, $sourceName, $d, $summary);
                if ($opts['is_import'] ?? false) {
                    $lead->forceFill(['created_at' => $at, 'updated_at' => $at])->saveQuietly();
                }
                IntakeEvent::create($common + ['lead_id' => $lead->id]);

                return ['status' => 'created', 'lead_id' => $lead->id, 'summary' => $summary];
            });
        } catch (UniqueConstraintViolationException $e) {   // concurrent retry of the same request_id
            return ['status' => 'replayed', 'lead_id' => IntakeEvent::where('request_id', $d['request_id'])->value('lead_id')];
        }

        if ($opts['notify'] ?? true) {
            $err = app(IntakeNotifier::class)->send($sourceName, $d, (int) $out['lead_id'], $out['status'], $out['summary']);
            IntakeEvent::where('request_id', $d['request_id'])->update($err === null ? ['notified_at' => now()] : ['notify_error' => $err]);
        }
        unset($out['summary']);

        return $out;
    }

    /** A CRM note (activity) on a lead and its person. */
    public function addNote(int $leadId, int $personId, string $title, string $comment, $at = null): void
    {
        $note = app(\Webkul\Activity\Repositories\ActivityRepository::class)->create([
            'title' => mb_substr($title, 0, 120), 'type' => 'note', 'is_done' => 1, 'comment' => mb_substr($comment, 0, 10000),
            'user_id' => config('cored.owner_user_id') ?: \Webkul\User\Models\User::query()->orderBy('id')->value('id'),
        ]);
        $note->persons()->attach($personId);
        $note->leads()->attach($leadId);
    }

    public function findOrCreatePerson(array $d)
    {
        return $this->findPerson($d['email']) ?? $this->createPerson($d);
    }

    public function sourceId(string $name): int
    {
        return Source::firstOrCreate(['name' => $name])->id;
    }

    protected function findPerson(string $email)
    {
        $needle = mb_strtolower(trim($email));

        return $this->persons->getModel()
            ->whereRaw('LOWER(CAST(emails AS CHAR)) LIKE ?', ['%'.addcslashes($needle, '%_\\').'%'])
            ->get()
            ->first(fn ($p) => collect($p->emails)->contains(fn ($e) => mb_strtolower(trim($e['value'] ?? '')) === $needle));
    }

    protected function createPerson(array $d)
    {
        $data = ['entity_type' => 'persons', 'name' => $d['name'],
            'emails' => [['value' => mb_strtolower(trim($d['email'])), 'label' => 'work']]];
        if (! empty($d['phone'])) {
            $data['contact_numbers'] = [['value' => $d['phone'], 'label' => 'work']];
        }

        return $this->persons->create($data);
    }

    public function createLead($person, string $kind, string $sourceName, array $d, ?string $summary = null)
    {
        $pipeline = $this->pipelines->getDefaultPipeline();
        $stage = $pipeline->stages()->first();
        if ($summary === null) {                      // booking path keeps its short description
            $summary = trim(($d['company'] ?? '') !== '' ? 'Company: '.$d['company']."\n" : '').'Source: '.$sourceName."\n".($d['message'] ?? '');
        }
        $prefix = ['faq_chatbot' => 'FAQ chatbot: ', 'booking' => 'Appointment: ', 'quote' => 'Quote request: '][$kind] ?? 'Reach Us Out: ';
        $suffix = ($kind === 'quote' && ($d['details']['plan'] ?? '') !== '') ? ' ('.$d['details']['plan'].')' : '';

        return $this->leads->create([
            'entity_type' => 'leads',
            'title' => mb_substr($prefix.$d['name'].$suffix, 0, 120),
            'description' => mb_substr($summary, 0, 10000),
            'lead_value' => 0,
            'status' => 1,
            'person' => ['id' => $person->id],
            'lead_source_id' => $this->sourceId($sourceName),
            'lead_type_id' => Type::query()->value('id'),
            'lead_pipeline_id' => $pipeline->id,
            'lead_pipeline_stage_id' => $stage->id,
        ]);
    }
}
