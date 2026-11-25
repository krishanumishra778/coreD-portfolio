<?php

use App\CoreD\Http\Controllers\BrandAssetController;
use Illuminate\Support\Facades\Route;

// Static theme assets; no session, no cookies.
Route::get('cored/brand/{file}', [BrandAssetController::class, 'show'])
    ->where('file', '[a-z0-9.\-]{1,40}')
    ->middleware('throttle:240,1')
    ->name('cored.brand.asset');
