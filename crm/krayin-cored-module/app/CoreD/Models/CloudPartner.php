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
     * Public shape. Metrics without verified=true are never exposed, so unproven numbers
     * (ratings, uptime, savings, credits) cannot leak onto the public site.
     */
    public function toPublic(): array
    {
        $details = $this->details ?? [];
        $details['metrics'] = array_values(array_filter($details['metrics'] ?? [], fn ($m) => ($m['verified'] ?? false) === true));

        return [
            'slug' => $this->slug,
            'name' => $this->name,
            'tagline' => $this->tagline,
            'summary' => $this->summary,
            'website_url' => $this->website_url,
            'affiliate_url' => $this->affiliate_url,
            'tags' => $this->tags ?? [],
            'details' => $details,
            'is_demo' => $this->is_demo,
        ];
    }
}
