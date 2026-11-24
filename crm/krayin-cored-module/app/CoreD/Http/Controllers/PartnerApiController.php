<?php

namespace App\CoreD\Http\Controllers;

use App\CoreD\Models\CloudPartner;
use Illuminate\Http\JsonResponse;

class PartnerApiController
{
    public function index(): JsonResponse
    {
        $rows = CloudPartner::published()->orderBy('sort_order')->orderBy('name')->get();

        return response()->json(['ok' => true, 'partners' => $rows->map->toPublic()->values()])
            ->header('Cache-Control', 'public, max-age=60');
    }

    public function show(string $slug): JsonResponse
    {
        $p = CloudPartner::published()->where('slug', $slug)->first();

        return $p ? response()->json(['ok' => true, 'partner' => $p->toPublic()])->header('Cache-Control', 'public, max-age=60')
                  : response()->json(['ok' => false, 'error' => 'not_found'], 404);
    }
}
