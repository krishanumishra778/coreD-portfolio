<?php

namespace App\CoreD\Http\Controllers\Admin;

use App\CoreD\Models\CloudPartner;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\View\View;

class PartnerAdminController
{
    public function index(): View
    {
        return view('cored::admin.partners.index', ['partners' => CloudPartner::orderBy('sort_order')->orderBy('name')->get()]);
    }

    public function create(): View
    {
        return view('cored::admin.partners.form', ['partner' => new CloudPartner(['status' => 'draft', 'sort_order' => 100])]);
    }

    public function edit(int $id): View
    {
        return view('cored::admin.partners.form', ['partner' => CloudPartner::findOrFail($id)]);
    }

    public function store(Request $r): RedirectResponse
    {
        $p = CloudPartner::create($this->data($r));

        return redirect()->route('admin.cored.partners.index')->with('success', "Saved {$p->name} (draft).");
    }

    public function update(Request $r, int $id): RedirectResponse
    {
        $p = CloudPartner::findOrFail($id);
        $p->update($this->data($r, $p));

        return redirect()->route('admin.cored.partners.index')->with('success', "Updated {$p->name}.");
    }

    public function publish(int $id): RedirectResponse
    {
        $p = CloudPartner::findOrFail($id);
        if ($p->status !== 'published' && ! $p->is_demo && ! $p->affiliate_url && ! $p->website_url) {
            return back()->withErrors(['publish' => 'Add a website or affiliate URL before publishing.']);
        }
        $p->update(['status' => $p->status === 'published' ? 'draft' : 'published',
            'published_at' => $p->status === 'published' ? null : now()]);

        return redirect()->route('admin.cored.partners.index')->with('success', ($p->status === 'published' ? 'Published ' : 'Unpublished ').$p->name.'.');
    }

    protected function data(Request $r, ?CloudPartner $existing = null): array
    {
        $r->merge(['slug' => Str::slug($r->input('slug') ?: $r->input('name'))]);
        $v = $r->validate([
            'name' => 'required|string|max:120',
            'slug' => ['required', 'max:80', Rule::unique('cored_cloud_partners', 'slug')->ignore($existing?->id)],
            'tagline' => 'nullable|string|max:255',
            'summary' => 'nullable|string|max:4000',
            'website_url' => ['nullable', 'url:https', 'max:255'],
            'affiliate_url' => ['nullable', 'url:https', 'max:500'],
            'tags' => 'nullable|string|max:300',
            'sort_order' => 'nullable|integer|min:0|max:9999',
            'details_json' => ['nullable', 'json', 'max:20000'],
            'is_demo' => 'nullable|boolean',
        ]);

        return [
            'name' => $v['name'], 'slug' => $v['slug'], 'tagline' => $v['tagline'] ?? null, 'summary' => $v['summary'] ?? null,
            'website_url' => $v['website_url'] ?? null, 'affiliate_url' => $v['affiliate_url'] ?? null,
            'tags' => array_values(array_filter(array_map('trim', explode(',', $v['tags'] ?? '')))),
            'sort_order' => $v['sort_order'] ?? 100,
            'details' => ! empty($v['details_json']) ? json_decode($v['details_json'], true) : null,
            'is_demo' => (bool) ($v['is_demo'] ?? false),
        ];
    }
}
