<?php

namespace App\CoreD;

use App\CoreD\Console\SeedDemoCommand;
use App\CoreD\Console\SmokeCommand;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class CoreDServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__.'/Config/cored.php', 'cored');
        $this->mergeConfigFrom(__DIR__.'/Config/menu.php', 'menu.admin');
        $this->mergeConfigFrom(__DIR__.'/Config/acl.php', 'acl');
    }

    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__.'/Database/Migrations');
        $this->loadViewsFrom(__DIR__.'/Resources/views', 'cored');
        $this->loadRoutesFrom(__DIR__.'/Routes/api.php');

        Route::middleware(['web', 'admin_locale', 'user'])
            ->prefix(config('app.admin_path'))
            ->group(__DIR__.'/Routes/admin.php');

        if ($this->app->runningInConsole()) {
            $this->commands([SeedDemoCommand::class, SmokeCommand::class]);
        }
    }
}
