<?php

namespace App\CoreD\Services;

use Illuminate\Support\Facades\Http;

/**
 * Server-side Turnstile validation (siteverify). Fails closed.
 * Tokens are single-use, expire after 300s and are max 2048 chars.
 */
class TurnstileVerifier
{
    public function verify(?string $token, ?string $ip = null, ?string $idempotencyKey = null): array
    {
        $cfg = config('cored.turnstile');

        if (($cfg['mode'] ?? 'required') === 'off') {
            if (app()->environment('production')) {
                return ['ok' => false, 'reason' => 'turnstile_off_in_production'];
            }

            return ['ok' => true, 'reason' => 'off'];
        }
        if (empty($cfg['secret'])) {
            return ['ok' => false, 'reason' => 'not_configured'];
        }
        if (! is_string($token) || $token === '' || strlen($token) > 2048) {
            return ['ok' => false, 'reason' => 'missing_or_oversized_token'];
        }

        try {
            $response = Http::asForm()->timeout(6)->post($cfg['verify_url'], array_filter([
                'secret' => $cfg['secret'], 'response' => $token, 'remoteip' => $ip, 'idempotency_key' => $idempotencyKey,
            ]));
        } catch (\Throwable $e) {
            return ['ok' => false, 'reason' => 'verify_unreachable'];
        }

        $body = $response->json();
        if (! $response->ok() || ! is_array($body) || ($body['success'] ?? false) !== true) {
            return ['ok' => false, 'reason' => 'rejected', 'codes' => $body['error-codes'] ?? []];
        }
        $hosts = $cfg['allowed_hostnames'] ?? [];
        if ($hosts && ! in_array($body['hostname'] ?? '', $hosts, true)) {
            return ['ok' => false, 'reason' => 'hostname_mismatch'];
        }

        return ['ok' => true, 'reason' => 'verified'];
    }
}
