<?php

namespace App\CoreD\Http\Controllers;

use App\CoreD\Services\IntakePayload;
use App\CoreD\Services\IntakeService;
use App\CoreD\Services\TurnstileVerifier;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Validator;

class IntakeController
{
    public function store(Request $r, TurnstileVerifier $turnstile): JsonResponse
    {
        $limits = config('cored.rate_limits');
        $ipKey = 'cored:intake:ip:'.$r->ip();
        if (RateLimiter::tooManyAttempts($ipKey, $limits['intake_per_minute_ip'])) {
            return response()->json(['ok' => false, 'error' => 'rate_limited'], 429);
        }
        RateLimiter::hit($ipKey, 60);

        $v = Validator::make($r->all(), IntakePayload::rules());
        if ($v->fails()) {
            return response()->json(['ok' => false, 'error' => 'invalid', 'fields' => array_keys($v->errors()->toArray())], 422);
        }
        $d = IntakePayload::clean($v->validated());

        if (($d['website'] ?? '') !== '') {                    // bot: acknowledge silently, store nothing
            return response()->json(['ok' => true, 'receipt' => $d['request_id']]);
        }
        if ($bad = IntakePayload::crossChecks($d)) {
            return response()->json(['ok' => false, 'error' => 'invalid', 'fields' => $bad], 422);
        }
        $emailKey = 'cored:intake:email:'.hash('sha256', $d['email']);
        if (RateLimiter::tooManyAttempts($emailKey, $limits['intake_per_hour_email'])) {
            return response()->json(['ok' => false, 'error' => 'rate_limited'], 429);
        }
        RateLimiter::hit($emailKey, 3600);

        $t = $turnstile->verify($d['turnstile_token'] ?? null, $r->ip(), $d['request_id']);
        if (! $t['ok']) {
            Log::warning('cored.intake.turnstile_failed', ['reason' => $t['reason']]);

            return response()->json(['ok' => false, 'error' => 'verification_failed'], $t['reason'] === 'not_configured' ? 503 : 422);
        }

        $result = app(IntakeService::class)->record($d['kind'], $d); // resolved lazily: only after every cheap check passed

        return response()->json(['ok' => true, 'receipt' => $d['request_id'], 'status' => $result['status']]);
    }
}
