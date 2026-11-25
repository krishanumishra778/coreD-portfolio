<x-admin::layouts>
    <x-slot:title>{{ $partner->exists ? 'Edit' : 'Add' }} partner</x-slot>

    <div class="flex flex-col gap-4">
        <div class="rounded-lg border border-gray-300 bg-white px-4 py-3 text-xl font-bold shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-white">
            {{ $partner->exists ? 'Edit partner' : 'Add partner' }}
        </div>
        @if ($errors->any())
            <div class="rounded border border-red-300 bg-red-50 px-4 py-2 text-red-800"><ul>@foreach ($errors->all() as $e)<li>{{ $e }}</li>@endforeach</ul></div>
        @endif

        <form method="POST" enctype="multipart/form-data" class="flex flex-col gap-3 rounded-lg border border-gray-300 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
              action="{{ $partner->exists ? route('admin.cored.partners.update', $partner->id) : route('admin.cored.partners.store') }}">
            @csrf
            @if ($partner->exists) @method('PUT') @endif
            @php($f = fn ($k, $d = '') => old($k, $partner->{$k} ?? $d))
            <label>Cloud provider name <input class="w-full rounded border px-2 py-1 dark:bg-gray-800" name="name" value="{{ $f('name') }}" required maxlength="120"></label>
            <label>Page URL slug <input class="w-full rounded border px-2 py-1 dark:bg-gray-800" name="slug" value="{{ $f('slug') }}" maxlength="80" placeholder="Generated from the provider name"></label>
            <fieldset class="flex flex-col gap-2 rounded border border-gray-300 p-3 dark:border-gray-800">
                <legend class="px-1">Provider logo</legend>
                @if ($partner->logo_path)
                    <img class="h-14 w-36 rounded bg-white p-1 object-contain" src="{{ route('admin.cored.partners.logo', $partner->id) }}" alt="Current logo for {{ $partner->name }}" width="144" height="56">
                    <label class="flex items-center gap-2"><input type="checkbox" name="remove_logo" value="1" @checked(old('remove_logo'))> Remove current logo</label>
                @endif
                <label for="partner-logo">{{ $partner->logo_path ? 'Upload a replacement' : 'Upload logo' }}</label>
                <input class="w-full rounded border px-2 py-1 dark:bg-gray-800" type="file" id="partner-logo" name="logo" accept="image/png,image/jpeg,image/webp" aria-describedby="partner-logo-help">
                <p id="partner-logo-help" class="text-xs">PNG, JPG or WebP, up to 2 MB and 2400 × 2400 pixels.</p>
            </fieldset>
            <label>Tagline <input class="w-full rounded border px-2 py-1 dark:bg-gray-800" name="tagline" value="{{ $f('tagline') }}" maxlength="255"></label>
            <label>Provider description <textarea class="w-full rounded border px-2 py-1 dark:bg-gray-800" name="summary" rows="4" maxlength="4000" placeholder="Describe the provider and the workloads it suits.">{{ $f('summary') }}</textarea></label>
            <label>Website URL (https) <input class="w-full rounded border px-2 py-1 dark:bg-gray-800" name="website_url" value="{{ $f('website_url') }}"></label>
            <label>Affiliate URL (https; leave empty until confirmed) <input class="w-full rounded border px-2 py-1 dark:bg-gray-800" name="affiliate_url" value="{{ $f('affiliate_url') }}"></label>
            <label>Tags (comma separated) <input class="w-full rounded border px-2 py-1 dark:bg-gray-800" name="tags" value="{{ old('tags', implode(', ', $partner->tags ?? [])) }}"></label>
            <label>Sort order <input class="w-full rounded border px-2 py-1 dark:bg-gray-800" name="sort_order" type="number" value="{{ $f('sort_order', 100) }}"></label>
            <label>Details JSON (capabilities, pros, cons, steps, metrics[{label,value,verified}])
                <textarea class="w-full rounded border px-2 py-1 font-mono text-xs dark:bg-gray-800" name="details_json" rows="10">{{ old('details_json', $partner->details ? json_encode($partner->details, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) : '') }}</textarea></label>
            <label class="flex items-center gap-2"><input type="hidden" name="is_demo" value="0"><input type="checkbox" name="is_demo" value="1" @checked($f('is_demo'))> Demo data</label>
            <div class="flex gap-3"><button class="primary-button" type="submit">{{ $partner->exists ? 'Save changes' : 'Save draft' }}</button>
                <a href="{{ route('admin.cored.partners.index') }}">Cancel</a></div>
        </form>
    </div>
</x-admin::layouts>
