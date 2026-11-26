<?php

namespace App\CoreD\Http\Controllers\Admin;

use App\CoreD\Models\CloudPartner;
use App\CoreD\Services\PartnerLogo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Illuminate\View\View;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Throwable;

class PartnerAdminController
{
    public function __construct(private PartnerLogo $logos) {}

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
        $data = $this->data($r);
        $logo = $r->hasFile('logo') ? $this->logos->store($r->file('logo')) : null;

        try {
            $p = CloudPartner::create($data + ['logo_path' => $logo]);
        } catch (Throwable $error) {
            $this->logos->discard($logo);

            throw $error;
        }

        return redirect()->route('admin.cored.partners.index')->with('success', "Saved {$p->name} (draft).");
    }

    public function update(Request $r, int $id): RedirectResponse
    {
        $p = CloudPartner::findOrFail($id);
        $data = $this->data($r, $p);
        $logo = $r->hasFile('logo') ? $this->logos->store($r->file('logo')) : null;

        try {
            [$p, $oldLogo] = DB::transaction(function () use ($r, $id, $data, $logo) {
                $partner = CloudPartner::lockForUpdate()->findOrFail($id);
                $changesLogo = $logo !== null || $r->boolean('remove_logo');
                $oldLogo = $changesLogo ? $partner->logo_path : null;
                $partner->update($changesLogo ? $data + ['logo_path' => $logo] : $data);

                return [$partner, $oldLogo];
            });
        } catch (Throwable $error) {
            $this->logos->discard($logo);

            throw $error;
        }

        $this->logos->discard($oldLogo);

        return redirect()->route('admin.cored.partners.index')->with('success', "Updated {$p->name}.");
    }

    public function destroy(int $id): RedirectResponse
    {
        $p = CloudPartner::findOrFail($id);
        if ($p->status === 'published') {
            return back()->withErrors(['delete' => "Unpublish {$p->name} before deleting it."]);
        }
        [$name, $logo] = [$p->name, $p->logo_path];
        $p->delete();
        $this->logos->discard($logo);

        return redirect()->route('admin.cored.partners.index')->with('success', "Deleted {$name}.");
    }

    public function logo(int $id): BinaryFileResponse
    {
        return $this->logos->respond(CloudPartner::findOrFail($id));
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
            'logo' => ['nullable', 'file', 'image', 'mimes:png,jpg,jpeg,webp', 'max:2048', Rule::dimensions()->maxWidth(2400)->maxHeight(2400)],
            'remove_logo' => 'nullable|boolean',
            'website_url' => ['nullable', 'url:https', 'max:255'],
            'affiliate_url' => ['nullable', 'url:https', 'max:500'],
            'tags' => 'nullable|string|max:300',
            'sort_order' => 'nullable|integer|min:0|max:9999',
            'details_json' => ['nullable', 'json', 'max:20000'],
            'pros' => 'nullable|string|max:3000',
            'cons' => 'nullable|string|max:3000',
            'reviews' => 'nullable',
            'reviews_submitted' => 'nullable',
            'is_demo' => 'nullable|boolean',
        ]);

        return [
            'name' => $v['name'], 'slug' => $v['slug'], 'tagline' => $v['tagline'] ?? null, 'summary' => $v['summary'] ?? null,
            'website_url' => $v['website_url'] ?? null, 'affiliate_url' => $v['affiliate_url'] ?? null,
            'tags' => array_values(array_filter(array_map('trim', explode(',', $v['tags'] ?? '')))),
            'sort_order' => $v['sort_order'] ?? 100,
            'details' => $this->details($v, $existing),
            'is_demo' => (bool) ($v['is_demo'] ?? false),
        ];
    }

    /** Advanced JSON (capabilities, steps, metrics) plus the plain-text Pros, Cons and Reviews boxes, which win over any same-named JSON keys. */
    protected function details(array $v, ?CloudPartner $existing = null): ?array
    {
        $details = ! empty($v['details_json']) ? json_decode($v['details_json'], true) : [];
        if (! is_array($details)) {
            throw ValidationException::withMessages(['details_json' => 'Details JSON must be an object like {"capabilities": []}.']);
        }
        unset($details['pros'], $details['cons'], $details['reviews']);
        foreach (['pros' => 'Pros', 'cons' => 'Cons'] as $key => $label) {
            if ($items = $this->lines($v[$key] ?? null, $key, $label)) {
                $details[$key] = $items;
            }
        }
        // The reviews editor always posts a marker. A request that carries neither the rows nor the marker (an older form, a script)
        // leaves the stored reviews alone instead of wiping them; with the marker and no rows, every review is removed on purpose.
        $touched = array_key_exists('reviews', $v) || ! empty($v['reviews_submitted']);
        $reviews = $touched ? $this->reviews($v['reviews'] ?? null) : (array) ($existing?->details['reviews'] ?? []);
        if ($reviews) {
            $details['reviews'] = $reviews;
        }

        return $details ?: null;
    }

    /** One item per line; leading bullets are ignored. At most 12 lines of 200 characters. */
    protected function lines(?string $text, string $field, string $label): array
    {
        $out = [];
        foreach (preg_split('/\R/u', (string) $text) as $line) {
            $line = ltrim(trim(preg_replace('/\s+/u', ' ', $line)), "-*\u{2022} ");
            if ($line === '') {
                continue;
            }
            if (mb_strlen($line) > 200) {
                throw ValidationException::withMessages([$field => "{$label}: keep each line under 200 characters."]);
            }
            $out[] = $line;
        }
        if (count($out) > 12) {
            throw ValidationException::withMessages([$field => "{$label}: add at most 12 lines."]);
        }

        return $out;
    }

    /**
     * Reviews arrive as separate rows from the editor (reviews[n][author|role|rating|text]). The older one-line-per-review box
     * ("Name | Role | Rating | Text") is still accepted so existing scripts and tests keep working. Rows that are completely
     * empty are ignored; at most 10 are kept, in the order submitted.
     */
    protected function reviews(mixed $input): array
    {
        $rows = is_array($input) ? array_values($input) : $this->legacyReviewRows((string) $input);
        $out = [];
        foreach ($rows as $n => $row) {
            $row = is_array($row) ? $row : [];
            [$author, $role, $rating, $text] = array_map(fn ($k) => trim(preg_replace('/[ \t]+/u', ' ', (string) ($row[$k] ?? ''))), ['author', 'role', 'rating', 'text']);
            if ($author === '' && $role === '' && $rating === '' && $text === '') {
                continue;
            }
            $bad = fn (string $why) => ValidationException::withMessages(['reviews' => 'Review '.($n + 1).': '.$why]);
            if ($author === '' || $text === '') {
                throw $bad('add a name and the review text.');
            }
            if ($rating !== '' && ! preg_match('/^[1-5]$/', $rating)) {
                throw $bad('rating must be 1 to 5, or empty.');
            }
            if (mb_strlen($author) > 80 || mb_strlen($role) > 100 || mb_strlen($text) > 600) {
                throw $bad('name max 80, role or company max 100, review max 600 characters.');
            }
            $out[] = ['author' => $author, 'role' => $role ?: null, 'rating' => $rating === '' ? null : (int) $rating, 'text' => $text];
        }
        if (count($out) > 10) {
            throw ValidationException::withMessages(['reviews' => 'Reviews: add at most 10.']);
        }

        return $out;
    }

    /** Parses the old one-per-line box into rows. Lines without three separators are reported with the format hint. */
    private function legacyReviewRows(string $text): array
    {
        $rows = [];
        foreach (preg_split('/\R/u', $text) as $n => $line) {
            if (trim($line) === '') {
                continue;
            }
            $parts = array_map('trim', explode('|', $line, 4));
            if (count($parts) < 4) {
                throw ValidationException::withMessages(['reviews' => 'Reviews, line '.($n + 1).': needs a name and the review text. Use: Name | Role or company | Rating 1-5 (optional) | Review text.']);
            }
            $rows[] = ['author' => $parts[0], 'role' => $parts[1], 'rating' => $parts[2], 'text' => $parts[3]];
        }

        return $rows;
    }
}
