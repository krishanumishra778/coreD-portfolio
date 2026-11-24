<?php

namespace App\CoreD\Http\Controllers;

use App\CoreD\Services\IntakeService;
use App\CoreD\Services\TurnstileVerifier;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

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

        $v = Validator::make($r->all(), [
            'kind' => 'required|in:contact,faq_chatbot',
            'request_id' => ['required', 'regex:/^[A-Za-z0-9_-]{16,64}$/'],
            'name' => 'required|string|min:2|max:120',
            'email' => 'required|email:rfc|max:254',
            'phone' => ['nullable', 'string', 'max:24', 'regex:/^[0-9+\-\s()]{6,24}$/'],
            'company' => 'nullable|string|max:120',
            'message' => 'nullable|string|max:3000',
            'website' => 'nullable|string|max:200',           // honeypot
            'turnstile_token' => 'nullable|string|max:2048',
        ]);
        if ($v->fails()) {
            return response()->json(['ok' => false, 'error' => 'invalid', 'fields' => array_keys($v->errors()->toArray())], 422);
        }
        $d = $v->validated();
        $d = array_map(fn ($x) => is_string($x) ? trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/u', '', $x)) : $x, $d);

        if (($d['website'] ?? '') !== '') {                    // bot: acknowledge silently, store nothing
            return response()->json(['ok' => true, 'receipt' => $d['request_id']]);
        }
        if ($d['kind'] === 'contact' && mb_strlen($d['message'] ?? '') < 5) {
            return response()->json(['ok' => false, 'error' => 'invalid', 'fields' => ['message']], 422);
        }
        $emailKey = 'cored:intake:email:'.hash('sha256', mb_strtolower($d['email']));
        if (RateLimiter::tooManyAttempts($emailKey, $limits['intake_per_hour_email'])) {
            return response()->json(['ok' => false, 'error' => 'rate_limited'], 429);
        }
        RateLimiter::hit($emailKey, 3600);

        $t = $turnstile->verify($d['turnstile_token'] ?? null, $r->ip(), $d['request_id']);
        if (! $t['ok']) {
            Log::warning('cored.intake.turnstile_failed', ['reason' => $t['reason']]);

            return response()->json(['ok' => false, 'error' => 'verification_failed'], $t['reason'] === 'not_configured' ? 503 : 422);
        }

        app(IntakeService::class)->record($d['kind'], $d); // resolved lazily: only after every cheap check passed

        return response()->json(['ok' => true, 'receipt' => $d['request_id']]);
    }
}
