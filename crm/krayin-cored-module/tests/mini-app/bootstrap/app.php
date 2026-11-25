<?php
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\{Exceptions,Middleware};
return Application::configure(basePath: dirname(__DIR__))
    ->withProviders([\App\CoreD\CoreDServiceProvider::class])
    ->withMiddleware(function (Middleware $m) {})
    ->withExceptions(function (Exceptions $e) {})
    ->create();
