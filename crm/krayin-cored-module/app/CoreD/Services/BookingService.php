<?php

namespace App\CoreD\Services;

use App\CoreD\Models\Appointment;
use Carbon\CarbonImmutable;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Support\Facades\DB;
use Webkul\Activity\Repositories\ActivityRepository;

class BookingService
{
    public function __construct(
        protected AvailabilityService $availability,
        protected IntakeService $intake,
        protected ActivityRepository $activities,
    ) {}

    /** @return array{status:string, appointment_id?:int} status: created|replayed|slot_unavailable|slot_taken */
    public function book(array $d): array
    {
        if ($prior = Appointment::where('request_id', $d['request_id'])->first()) {
            return ['status' => 'replayed', 'appointment_id' => $prior->id];
        }
        $start = CarbonImmutable::parse($d['starts_at'])->utc();
        $local = $start->setTimezone(config('cored.booking.timezone'));
        if (! in_array($start->format('Y-m-d\TH:i:s\Z'), $this->availability->slotsForDate($local->format('Y-m-d')), true)) {
            return ['status' => 'slot_unavailable'];
        }
        $minutes = $this->availability->slotMinutes($start->format('Y-m-d\TH:i:s\Z')) ?? (int) config('cored.booking.slot_minutes');
        $end = $start->addMinutes($minutes);
        // Eloquent writes a Carbon's own wall-clock time, and Krayin reads it back in the app timezone, so store app-timezone time (not UTC).
        $appTz = config('app.timezone');
        [$startDb, $endDb] = [$start->setTimezone($appTz), $end->setTimezone($appTz)];

        try {
            return DB::transaction(function () use ($d, $start, $end, $startDb, $endDb) {
                $person = $this->intake->findOrCreatePerson($d);
                $appt = Appointment::create([
                    'request_id' => $d['request_id'], 'person_id' => $person->id, 'starts_at' => $startDb, 'ends_at' => $endDb,
                    'timezone' => $d['timezone'], 'service' => $d['service'], 'channel' => $d['channel'],
                    'message' => $d['message'] ?? null, 'status' => 'requested',
                    'active_slot' => $start->format('YmdHi'), 'is_demo' => (bool) ($d['is_demo'] ?? false),
                ]);
                $lead = $this->intake->createLead($person, 'booking', config('cored.sources.booking'), $d);
                $activity = $this->activities->create([
                    'title' => 'Appointment request: '.$d['name'], 'type' => 'meeting', 'is_done' => 0,
                    'schedule_from' => $startDb, 'schedule_to' => $endDb,
                    'user_id' => config('cored.owner_user_id') ?: \Webkul\User\Models\User::query()->orderBy('id')->value('id'),
                    'comment' => "Service: {$d['service']}\nPreferred channel: {$d['channel']}\nStatus: requested (to be confirmed by CoreD)",
                    'additional' => json_encode(['cored_appointment_id' => $appt->id]),
                ]);
                $activity->persons()->attach($person->id);
                $activity->leads()->attach($lead->id);
                $appt->update(['lead_id' => $lead->id, 'activity_id' => $activity->id]);

                return ['status' => 'created', 'appointment_id' => $appt->id];
            });
        } catch (UniqueConstraintViolationException $e) {
            $dup = Appointment::where('request_id', $d['request_id'])->first();

            return $dup ? ['status' => 'replayed', 'appointment_id' => $dup->id] : ['status' => 'slot_taken'];
        }
    }
}
