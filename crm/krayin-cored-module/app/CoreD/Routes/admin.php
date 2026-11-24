<?php

use App\CoreD\Http\Controllers\Admin\PartnerAdminController;
use Illuminate\Support\Facades\Route;

Route::prefix('cored/partners')->controller(PartnerAdminController::class)->group(function () {
    Route::get('', 'index')->name('admin.cored.partners.index');
    Route::get('create', 'create')->name('admin.cored.partners.create');
    Route::post('', 'store')->name('admin.cored.partners.store');
    Route::get('{id}/edit', 'edit')->name('admin.cored.partners.edit')->whereNumber('id');
    Route::put('{id}', 'update')->name('admin.cored.partners.update')->whereNumber('id');
    Route::post('{id}/publish', 'publish')->name('admin.cored.partners.publish')->whereNumber('id');
});
