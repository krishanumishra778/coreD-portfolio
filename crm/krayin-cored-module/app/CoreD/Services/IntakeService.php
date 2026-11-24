<?php

namespace App\CoreD\Services;

use App\CoreD\Models\IntakeEvent;
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

    /** Idempotent by request_id; soft-dedupes same email+kind inside the window. */
    public function record(string $kind, array $d): array
    {
        $sourceName = config("cored.sources.$kind");
        $emailHash = hash('sha256', mb_strtolower(trim($d['email'])));

        if ($prior = IntakeEvent::where('request_id', $d['request_id'])->first()) {
            return ['status' => 'replayed', 'lead_id' => $prior->lead_id];
        }

        return DB::transaction(function () use ($kind, $d, $sourceName, $emailHash) {
            $recent = IntakeEvent::where('email_hash', $emailHash)->where('kind', $kind)
                ->where('is_duplicate', false)
                ->where('created_at', '>=', now()->subMinutes((int) config('cored.dedupe_window_minutes')))
                ->lockForUpdate()->first();

            $person = $this->findPerson($d['email']) ?? $this->createPerson($d);

            if ($recent) {
                IntakeEvent::create(['request_id' => $d['request_id'], 'kind' => $kind, 'source_name' => $sourceName,
                    'email_hash' => $emailHash, 'person_id' => $person->id, 'lead_id' => $recent->lead_id, 'is_duplicate' => true]);

                return ['status' => 'duplicate', 'lead_id' => $recent->lead_id];
            }

            $lead = $this->createLead($person, $kind, $sourceName, $d);
            IntakeEvent::create(['request_id' => $d['request_id'], 'kind' => $kind, 'source_name' => $sourceName,
                'email_hash' => $emailHash, 'person_id' => $person->id, 'lead_id' => $lead->id]);

            return ['status' => 'created', 'lead_id' => $lead->id];
        });
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

    public function createLead($person, string $kind, string $sourceName, array $d)
    {
        $pipeline = $this->pipelines->getDefaultPipeline();
        $stage = $pipeline->stages()->first();
        $note = trim(($d['company'] ?? '') !== '' ? 'Company: '.$d['company']."\n" : '');
        $note .= 'Source: '.$sourceName."\n".($d['message'] ?? '');

        return $this->leads->create([
            'entity_type' => 'leads',
            'title' => mb_substr((['faq_chatbot' => 'FAQ chatbot: ', 'booking' => 'Appointment: '][$kind] ?? 'Reach Us Out: ').$d['name'], 0, 120),
            'description' => mb_substr($note, 0, 2000),
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
