<?php

use App\CoreD\Http\Controllers\BookingController;
use App\CoreD\Http\Controllers\IntakeController;
use App\CoreD\Http\Controllers\PartnerApiController;
use App\CoreD\Http\Middleware\CorsAllowlist;
use Illuminate\Support\Facades\Route;

// Stateless JSON endpoints: no session, no CSRF cookie. Abuse control = Turnstile + rate limits + validation.
Route::prefix('cored/api')->middleware(['throttle:60,1', CorsAllowlist::class])->group(function () {
    Route::options('{any}', fn () => response()->noContent())->where('any', '.*'); // answered by CorsAllowlist
    Route::post('intake', [IntakeController::class, 'store']);
    Route::get('booking/availability', [BookingController::class, 'availability']);
    Route::post('booking', [BookingController::class, 'store']);
    Route::get('partners', [PartnerApiController::class, 'index']);
    Route::get('partners/{slug}/logo', [PartnerApiController::class, 'logo'])->where('slug', '[a-z0-9-]{1,80}')->name('cored.partners.logo');
    Route::get('partners/{slug}', [PartnerApiController::class, 'show'])->where('slug', '[a-z0-9-]{1,80}');
});
