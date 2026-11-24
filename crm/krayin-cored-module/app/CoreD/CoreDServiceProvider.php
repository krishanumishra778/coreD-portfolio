<?php

namespace App\CoreD;

use App\CoreD\Console\ImportFormspreeCommand;
use App\CoreD\Console\SeedDemoCommand;
use App\CoreD\Console\SmokeCommand;
use Illuminate\Support\Facades\Event;
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

        $this->bootBranding();

        if ($this->app->runningInConsole()) {
            $this->commands([SeedDemoCommand::class, SmokeCommand::class, ImportFormspreeCommand::class]);
        }
    }

    /**
     * CoreDhristi look for the CRM admin. Uses Krayin's own extension points only (view-render events, config),
     * so no upstream file is edited and upgrades stay clean.
     */
    private function bootBranding(): void
    {
        $this->loadRoutesFrom(__DIR__.'/Routes/brand.php');

        // Name used for logo alt text, page titles and e-mail footers.
        config(['app.name' => config('cored.brand.name', 'CoreDhristi')]);

        // Theme CSS, favicon and title suffix: the admin layout fires admin.layout.head.after, the login/reset layout admin.layout.head.
        $inject = static function ($manager): void {
            $manager->addTemplate('cored::branding.head');
        };
        Event::listen('admin.layout.head.after', $inject);
        Event::listen('admin.layout.head', $inject);

        // Help & Resources page content.
        config(['support' => require __DIR__.'/Config/support.php']);

        // Default footer text (an admin can still override it in Configuration).
        $sections = config('core_config');
        if (is_array($sections)) {
            foreach ($sections as $i => $section) {
                if (($section['key'] ?? null) !== 'general.settings.footer') {
                    continue;
                }
                foreach ($section['fields'] ?? [] as $j => $field) {
                    if (($field['name'] ?? null) === 'label') {
                        $sections[$i]['fields'][$j]['default'] = config('cored.brand.footer_label');
                    }
                }
            }
            config(['core_config' => $sections]);
        }
    }
}
