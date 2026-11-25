<?php

namespace App\CoreD\Services;

use App\CoreD\Models\CloudPartner;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class PartnerLogo
{
    private const DIRECTORY = 'cored/partner-logos';

    private const EXTENSIONS = ['image/png' => 'png', 'image/jpeg' => 'jpg', 'image/webp' => 'webp'];

    public function store(UploadedFile $image): string
    {
        $extension = self::EXTENSIONS[$image->getMimeType()] ?? null;
        if (! $extension) {
            throw ValidationException::withMessages(['logo' => 'Upload a PNG, JPG, or WebP image.']);
        }

        $path = $image->storeAs(self::DIRECTORY, bin2hex(random_bytes(16)).'.'.$extension, 'local');
        if (! $path) {
            throw ValidationException::withMessages(['logo' => 'The logo could not be saved. Please try again.']);
        }

        return $path;
    }

    public function respond(CloudPartner $partner): BinaryFileResponse
    {
        $path = $partner->logo_path;
        $disk = Storage::disk('local');
        abort_unless($this->isLogoPath($path) && $disk->exists($path), 404);

        $type = array_search(pathinfo($path, PATHINFO_EXTENSION), self::EXTENSIONS, true);

        return response()->file($disk->path($path), [
            'Content-Type' => $type,
            'X-Content-Type-Options' => 'nosniff',
            'Cache-Control' => 'private, no-cache',
        ]);
    }

    public function discard(?string $path): void
    {
        if ($this->isLogoPath($path)) {
            Storage::disk('local')->delete($path);
        }
    }

    private function isLogoPath(?string $path): bool
    {
        return $path !== null && preg_match('~^'.self::DIRECTORY.'/[a-f0-9]{32}\.(png|jpg|webp)$~D', $path) === 1;
    }
}
