<x-admin::layouts>
    <x-slot:title>Cloud Partners</x-slot>

    <div class="flex flex-col gap-4">
        <div class="flex items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
            <div class="text-xl font-bold dark:text-white">Cloud Partners</div>
            <a href="{{ route('admin.cored.partners.create') }}" class="primary-button">Add partner</a>
        </div>

        @if (session('success'))<div class="rounded border border-green-300 bg-green-50 px-4 py-2 text-green-800">{{ session('success') }}</div>@endif
        @if ($errors->any())<div class="rounded border border-red-300 bg-red-50 px-4 py-2 text-red-800">{{ $errors->first() }}</div>@endif

        <div class="overflow-x-auto rounded-lg border border-gray-300 bg-white dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
            <table class="w-full text-left text-sm">
                <thead class="border-b border-gray-200 dark:border-gray-800"><tr>
                    <th class="px-4 py-2">Name</th><th class="px-4 py-2">Slug</th><th class="px-4 py-2">Status</th>
                    <th class="px-4 py-2">Data</th><th class="px-4 py-2">Actions</th></tr></thead>
                <tbody>
                @forelse ($partners as $p)
                    <tr class="border-b border-gray-100 dark:border-gray-800">
                        <td class="px-4 py-2">{{ $p->name }}</td>
                        <td class="px-4 py-2">{{ $p->slug }}</td>
                        <td class="px-4 py-2">{{ $p->status }}</td>
                        <td class="px-4 py-2">{{ $p->is_demo ? 'DEMO' : 'real' }}</td>
                        <td class="flex gap-3 px-4 py-2">
                            <a class="text-brandColor" href="{{ route('admin.cored.partners.edit', $p->id) }}">Edit</a>
                            <form method="POST" action="{{ route('admin.cored.partners.publish', $p->id) }}">@csrf
                                <button class="text-brandColor" type="submit">{{ $p->status === 'published' ? 'Unpublish' : 'Publish' }}</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="5" class="px-4 py-6 text-center">No partners yet.</td></tr>
                @endforelse
                </tbody>
            </table>
        </div>
    </div>
</x-admin::layouts>
