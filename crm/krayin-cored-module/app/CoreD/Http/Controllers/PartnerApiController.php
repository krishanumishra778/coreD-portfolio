<?php

namespace App\CoreD\Http\Controllers;

use App\CoreD\Models\CloudPartner;
use App\CoreD\Services\PartnerLogo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

class PartnerApiController
{
    public function index(Request $r): JsonResponse
    {
        $rows = CloudPartner::visibleTo($r->headers->get('Origin'))->orderBy('sort_order')->orderBy('name')->get();

        return response()->json(['ok' => true, 'partners' => $rows->map->toPublic()->values()])
            ->header('Cache-Control', 'public, max-age=60');
    }

    public function show(Request $r, string $slug): JsonResponse
    {
        $p = CloudPartner::visibleTo($r->headers->get('Origin'))->where('slug', $slug)->first();

        return $p ? response()->json(['ok' => true, 'partner' => $p->toPublic()])->header('Cache-Control', 'public, max-age=60')
                  : response()->json(['ok' => false, 'error' => 'not_found'], 404);
    }

    /** A missing, draft or demo logo is a plain 404 with no body (never the CRM's HTML error page, never HTTP 200). */
    public function logo(Request $r, string $slug, PartnerLogo $logos): BinaryFileResponse|Response
    {
        $partner = CloudPartner::visibleTo($r->headers->get('Origin'))->where('slug', $slug)->first();
        if (! $partner) {
            return $this->noLogo();
        }

        try {
            return $logos->respond($partner);
        } catch (HttpExceptionInterface) {
            return $this->noLogo();
        }
    }

    private function noLogo(): Response
    {
        return response('', 404, ['Cache-Control' => 'no-store', 'X-Content-Type-Options' => 'nosniff']);
    }
}
