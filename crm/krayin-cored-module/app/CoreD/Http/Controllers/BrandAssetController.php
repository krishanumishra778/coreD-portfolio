<?php

namespace App\CoreD\Http\Controllers;

use Illuminate\Routing\Controller;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

/** Serves the CoreDhristi CRM theme assets from the module (whitelist only; no user-controlled paths). */
class BrandAssetController extends Controller
{
    private const FILES = [
        'cored-crm.css' => 'text/css; charset=UTF-8',
        'logo-light.svg' => 'image/svg+xml',
        'logo-dark.svg' => 'image/svg+xml',
        'mark.svg' => 'image/svg+xml',
        'favicon.svg' => 'image/svg+xml',
        'favicon-32.png' => 'image/png',
        'favicon.ico' => 'image/x-icon',
    ];

    public function show(string $file): BinaryFileResponse
    {
        abort_unless(isset(self::FILES[$file]), 404);

        $path = dirname(__DIR__, 2).'/Resources/brand/'.$file;
        abort_unless(is_file($path), 404);

        return response()->file($path, [
            'Content-Type' => self::FILES[$file],
            'Cache-Control' => 'public, max-age=86400',
            'X-Content-Type-Options' => 'nosniff',
        ]);
    }
}
