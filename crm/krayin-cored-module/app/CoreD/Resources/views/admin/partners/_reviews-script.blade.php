@push('scripts')
        <script>
            (function () {
                const initialEditor = document.getElementById('partner-reviews');
                if (!initialEditor) return;

                const max = Number(initialEditor.dataset.max) || 10;
                let nextIndex = initialEditor.querySelectorAll('[data-review-row]').length;
                var cls = 'w-full rounded border px-2 py-1 dark:bg-gray-800';
                function field(label, control) { var l = document.createElement('label'); l.appendChild(document.createTextNode(label + ' ')); l.appendChild(control); return l; }
                function input(name, max) { var i = document.createElement('input'); i.className = cls; i.name = name; i.maxLength = max; i.autocomplete = 'off'; return i; }
                function build(i) {
                    var row = document.createElement('div'); row.className = 'partner-review-row flex flex-col gap-2 rounded border border-gray-200 p-3 dark:border-gray-700'; row.setAttribute('data-review-row', '');
                    var head = document.createElement('div'); head.className = 'flex items-center justify-between';
                    var t = document.createElement('strong'); t.setAttribute('data-review-title', ''); head.appendChild(t);
                    var rm = document.createElement('button'); rm.type = 'button'; rm.className = 'text-red-600'; rm.setAttribute('data-review-remove', ''); rm.textContent = 'Remove'; head.appendChild(rm); row.appendChild(head);
                    var grid = document.createElement('div'); grid.className = 'grid gap-2 md:grid-cols-3';
                    grid.appendChild(field('Name', input('reviews[' + i + '][author]', 80))); grid.appendChild(field('Role or company', input('reviews[' + i + '][role]', 100)));
                    var sel = document.createElement('select'); sel.className = cls; sel.name = 'reviews[' + i + '][rating]';
                    [['', 'No rating'], ['5', '5 / 5'], ['4', '4 / 5'], ['3', '3 / 5'], ['2', '2 / 5'], ['1', '1 / 5']].forEach(function (o) { var op = document.createElement('option'); op.value = o[0]; op.textContent = o[1]; sel.appendChild(op); });
                    grid.appendChild(field('Rating (optional)', sel)); row.appendChild(grid);
                    var ta = document.createElement('textarea'); ta.className = cls; ta.name = 'reviews[' + i + '][text]'; ta.rows = 3; ta.maxLength = 600; row.appendChild(field('Review text', ta));
                    return row;
                }
                function refresh(editor) {
                    const rows = editor.querySelectorAll('[data-review-row]');
                    rows.forEach((row, index) => {
                        row.querySelector('[data-review-title]').textContent = 'Review ' + (index + 1);
                        row.querySelector('[data-review-remove]').setAttribute('aria-label', 'Remove review ' + (index + 1));
                    });
                    const atLimit = rows.length >= max;
                    editor.querySelector('#partner-review-add').disabled = atLimit;
                    editor.querySelector('#partner-review-count').textContent =
                        rows.length + ' of ' + max + ' reviews' + (atLimit ? ' (limit reached)' : '');
                }

                // Krayin mounts Vue on window load, replacing the editor nodes rendered by Blade.
                document.addEventListener('click', (event) => {
                    if (!(event.target instanceof Element)) return;
                    const control = event.target.closest('#partner-review-add, [data-review-remove]');
                    const editor = control?.closest('#partner-reviews');
                    if (!editor) return;

                    const rows = editor.querySelector('#partner-review-rows');
                    if (control.id === 'partner-review-add') {
                        if (rows.children.length >= max) return;

                        const row = build(nextIndex++);
                        rows.appendChild(row);
                        refresh(editor);
                        row.querySelector('input').focus();
                        return;
                    }

                    const row = control.closest('[data-review-row]');
                    const neighbor = row.nextElementSibling || row.previousElementSibling;
                    row.remove();
                    refresh(editor);
                    (neighbor?.querySelector('input') ?? editor.querySelector('#partner-review-add')).focus();
                });

                refresh(initialEditor);
            })();
        </script>
    @endpush
