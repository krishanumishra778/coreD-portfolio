<?php

namespace App\CoreD\Console;

use App\CoreD\Models\AvailabilityRule;
use App\CoreD\Models\CloudPartner;
use Illuminate\Console\Command;

class SeedDemoCommand extends Command
{
    protected $signature = 'cored:seed-demo {--force : run even when APP_ENV=production}';

    protected $description = 'Insert clearly-marked DEMO availability and partner rows for staging (idempotent).';

    public function handle(): int
    {
        if (app()->environment('production') && ! $this->option('force')) {
            $this->error('Refusing on production without --force (staging uses APP_ENV=production on this host, so pass --force there deliberately).');

            return self::FAILURE;
        }
        if (! AvailabilityRule::where('is_demo', true)->exists()) {
            foreach ([1, 2, 3, 4, 5] as $wd) {
                foreach ([['10:00', '13:00'], ['15:00', '18:00']] as [$s, $e]) {
                    AvailabilityRule::create(['weekday' => $wd, 'start_time' => $s, 'end_time' => $e, 'slot_minutes' => 30, 'is_demo' => true]);
                }
            }
        }
        foreach (['a' => 'Demo GPU Cloud A', 'b' => 'Demo GPU Cloud B', 'c' => 'Demo Inference Cloud C', 'd' => 'Demo Hosting D'] as $k => $name) {
            CloudPartner::firstOrCreate(['slug' => "demo-cloud-$k"], [
                'name' => $name, 'status' => 'published', 'is_demo' => true, 'published_at' => now(),
                'tagline' => 'Placeholder partner for staging only.',
                'summary' => 'Demo record. Replace with a real partner once the relationship, offer and affiliate link are confirmed.',
                'tags' => ['demo'], 'sort_order' => ord($k),
                'details' => ['capabilities' => [['title' => 'Capability (demo)', 'body' => 'Placeholder text.']],
                    'pros' => ['Placeholder pro'], 'cons' => ['Placeholder con'],
                    'steps' => ['Review requirements', 'Talk to CoreD', 'Launch'],
                    'metrics' => [['label' => 'Example metric', 'value' => 'n/a', 'verified' => false]]],
            ]);
        }
        $this->info('Demo rows ready: '.AvailabilityRule::where('is_demo', true)->count().' availability rules, '.CloudPartner::where('is_demo', true)->count().' partners.');

        return self::SUCCESS;
    }
}
