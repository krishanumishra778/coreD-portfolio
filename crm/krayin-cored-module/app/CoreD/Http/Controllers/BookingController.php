<?php

namespace App\CoreD\Http\Controllers;

use App\CoreD\Services\AvailabilityService;
use App\CoreD\Services\BookingService;
use App\CoreD\Services\TurnstileVerifier;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Validator;

class BookingController
{
    public function availability(Request $r, AvailabilityService $svc): JsonResponse
    {
        $k = 'cored:read:ip:'.$r->ip();
        if (RateLimiter::tooManyAttempts($k, config('cored.rate_limits.read_per_minute_ip'))) {
            return response()->json(['ok' => false, 'error' => 'rate_limited'], 429);
        }
        RateLimiter::hit($k, 60);
        $v = Validator::make($r->query(), ['date' => ['required', 'date_format:Y-m-d']]);
        if ($v->fails()) {
            return response()->json(['ok' => false, 'error' => 'invalid'], 422);
        }

        return response()->json(['ok' => true, 'timezone' => config('cored.booking.timezone'),
            'slots' => $svc->slotsForDate($v->validated()['date'])]);
    }

    public function store(Request $r, TurnstileVerifier $turnstile): JsonResponse
    {
        $ipKey = 'cored:booking:ip:'.$r->ip();
        if (RateLimiter::tooManyAttempts($ipKey, config('cored.rate_limits.booking_per_minute_ip'))) {
            return response()->json(['ok' => false, 'error' => 'rate_limited'], 429);
        }
        RateLimiter::hit($ipKey, 60);

        $v = Validator::make($r->all(), [
            'request_id' => ['required', 'regex:/^[A-Za-z0-9_-]{16,64}$/'],
            'name' => 'required|string|min:2|max:120',
            'email' => 'required|email:rfc|max:254',
            'phone' => ['nullable', 'string', 'max:24', 'regex:/^[0-9+\-\s()]{6,24}$/'],
            'company' => 'nullable|string|max:120',
            'service' => 'required|in:'.implode(',', config('cored.booking.services')),
            'channel' => 'required|in:'.implode(',', config('cored.booking.channels')),
            'message' => 'nullable|string|max:3000',
            'starts_at' => 'required|date',
            'timezone' => 'required|timezone:all',
            'website' => 'nullable|string|max:200',
            'turnstile_token' => 'nullable|string|max:2048',
        ]);
        if ($v->fails()) {
            return response()->json(['ok' => false, 'error' => 'invalid', 'fields' => array_keys($v->errors()->toArray())], 422);
        }
        $d = $v->validated();
        if (($d['website'] ?? '') !== '') {
            return response()->json(['ok' => true, 'status' => 'requested', 'message' => $this->msg()]);
        }
        $t = $turnstile->verify($d['turnstile_token'] ?? null, $r->ip(), $d['request_id']);
        if (! $t['ok']) {
            return response()->json(['ok' => false, 'error' => 'verification_failed'], $t['reason'] === 'not_configured' ? 503 : 422);
        }

        $res = app(BookingService::class)->book($d);

        return match ($res['status']) {
            'created', 'replayed' => response()->json(['ok' => true, 'status' => 'requested', 'message' => $this->msg()]),
            default => response()->json(['ok' => false, 'error' => 'slot_unavailable'], 409),
        };
    }

    // No Meet link is promised or returned until Calendar integration is verified.
    protected function msg(): string
    {
        return 'We’ll reach out to confirm your appointment.';
    }
}
