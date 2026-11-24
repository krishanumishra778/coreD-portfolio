<?php

namespace App\CoreD\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Exact-origin allow-list for the public JSON API: the CRM's own origin plus CORED_ALLOWED_ORIGINS
 * (https origins only, no wildcards, no credentials). A browser request from any other origin is refused
 * on state-changing calls; requests without an Origin header (non-browser clients) still need Turnstile.
 */
class CorsAllowlist
{
    public static function allowed(): array
    {
        $own = rtrim((string) config('app.url'), '/');
        $list = array_filter((array) config('cored.allowed_origins', []), fn ($o) => is_string($o) && preg_match('#^https://[a-z0-9.-]+(:\d{2,5})?$#', $o));

        return array_values(array_unique(array_merge($own !== '' ? [$own] : [], $list)));
    }

    public function handle(Request $request, Closure $next): Response
    {
        $origin = $request->headers->get('Origin');
        $ok = $origin !== null && in_array($origin, self::allowed(), true);

        if ($request->isMethod('OPTIONS')) {
            return $ok ? $this->decorate(response()->noContent(), $origin) : response()->json(['ok' => false, 'error' => 'origin_not_allowed'], 403);
        }
        if ($origin !== null && ! $ok && ! $request->isMethodSafe()) {
            return response()->json(['ok' => false, 'error' => 'origin_not_allowed'], 403);
        }
        $response = $next($request);

        return $ok ? $this->decorate($response, $origin) : $response;
    }

    private function decorate(Response $response, string $origin): Response
    {
        $response->headers->set('Access-Control-Allow-Origin', $origin);
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Accept');
        $response->headers->set('Access-Control-Max-Age', '600');
        $response->headers->set('Vary', 'Origin');

        return $response;
    }
}
