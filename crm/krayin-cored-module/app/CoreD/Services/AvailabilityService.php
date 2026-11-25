<?php

namespace App\CoreD\Services;

use App\CoreD\Models\Appointment;
use App\CoreD\Models\AvailabilityRule;
use Carbon\CarbonImmutable;

class AvailabilityService
{
    /** @return string[] UTC ISO-8601 slot starts for one local calendar date (booking timezone). */
    public function slotsForDate(string $date, ?CarbonImmutable $now = null): array
    {
        $tz = config('cored.booking.timezone');
        $now ??= CarbonImmutable::now('UTC');
        try {
            $day = CarbonImmutable::createFromFormat('!Y-m-d', $date, $tz);
        } catch (\Throwable $e) {
            return [];
        }
        if (! $day || $day->format('Y-m-d') !== $date) {
            return [];
        }
        $earliest = $now->addHours((int) config('cored.booking.min_notice_hours'));
        $latest = $now->addDays((int) config('cored.booking.max_days_ahead'));

        $slots = [];
        foreach (AvailabilityRule::where('is_active', true)->where('weekday', $day->dayOfWeek)->get() as $rule) {
            $cursor = $day->setTimeFromTimeString($rule->start_time);
            $end = $day->setTimeFromTimeString($rule->end_time);
            while ($cursor->addMinutes($rule->slot_minutes) <= $end) {
                $utc = $cursor->utc();
                if ($utc >= $earliest && $utc <= $latest) {
                    $slots[$utc->format('Y-m-d\TH:i:s\Z')] = $rule->slot_minutes;
                }
                $cursor = $cursor->addMinutes($rule->slot_minutes);
            }
        }
        ksort($slots);
        if (! $slots) {
            return [];
        }
        $taken = Appointment::whereNotNull('active_slot')
            ->whereIn('starts_at', array_map(fn ($s) => CarbonImmutable::parse($s)->setTimezone(config('app.timezone'))->format('Y-m-d H:i:s'), array_keys($slots)))
            ->pluck('starts_at')->map(fn ($t) => $t->utc()->format('Y-m-d\TH:i:s\Z'))->all();

        return array_values(array_diff(array_keys($slots), $taken));
    }

    public function slotMinutes(string $startUtcIso): ?int
    {
        $tz = config('cored.booking.timezone');
        $local = CarbonImmutable::parse($startUtcIso)->setTimezone($tz);
        foreach (AvailabilityRule::where('is_active', true)->where('weekday', $local->dayOfWeek)->get() as $r) {
            if ($local->format('H:i:s') >= $r->start_time && $local->format('H:i:s') < $r->end_time) {
                return (int) $r->slot_minutes;
            }
        }

        return null;
    }
}
