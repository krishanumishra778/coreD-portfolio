<?php

namespace App\CoreD\Models;

use Illuminate\Database\Eloquent\Model;

class CloudPartner extends Model
{
    protected $table = 'cored_cloud_partners';

    protected $guarded = [];

    protected $casts = [
        'details' => 'array', 'tags' => 'array', 'is_demo' => 'boolean', 'published_at' => 'datetime',
    ];

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    /**
     * What a public visitor may see: approved (published) real providers only. DEMO fixtures are visible solely to the
     * protected preview origins listed in CORED_DEMO_ORIGINS (empty by default, so nothing demo is ever public).
     */
    public function scopeVisibleTo($query, ?string $origin = null)
    {
        $query->where('status', 'published');

        return self::demoVisibleTo($origin) ? $query : $query->where('is_demo', false);
    }

    public static function demoVisibleTo(?string $origin): bool
    {
        return $origin !== null && $origin !== '' && in_array($origin, (array) config('cored.partners.demo_origins', []), true);
    }

    /**
     * Public shape. Metrics without verified=true are never exposed, so unproven numbers
     * (ratings, uptime, savings, credits) cannot leak onto the public site.
     */
    public function toPublic(): array
    {
        $details = $this->details ?? [];
        $details['metrics'] = array_values(array_filter($details['metrics'] ?? [], fn ($m) => ($m['verified'] ?? false) === true));
        // An offer (credit, discount, code) or benchmark evidence is shown publicly only once an admin marks it "verified": true.
        foreach (['offer', 'evidence'] as $key) {
            if (! is_array($details[$key] ?? null) || ($details[$key]['verified'] ?? false) !== true) {
                unset($details[$key]);
            }
        }

        return [
            'slug' => $this->slug,
            'name' => $this->name,
            'tagline' => $this->tagline,
            'summary' => $this->summary,
            'logo_url' => $this->logo_path ? route('cored.partners.logo', ['slug' => $this->slug]) : null,
            'website_url' => $this->website_url,
            'affiliate_url' => $this->affiliate_url,
            'tags' => $this->tags ?? [],
            'details' => $details,
            'is_demo' => $this->is_demo,
        ];
    }
}
