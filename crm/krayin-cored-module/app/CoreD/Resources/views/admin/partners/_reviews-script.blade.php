@push('scripts')
        <script>
            (function () {
                var box = document.getElementById('partner-reviews');
                if (!box) { return; }
                var rows = document.getElementById('partner-review-rows'), add = document.getElementById('partner-review-add'), count = document.getElementById('partner-review-count');
                var max = parseInt(box.getAttribute('data-max'), 10) || 10, next = rows.querySelectorAll('[data-review-row]').length;
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
                function refresh() {
                    var list = rows.querySelectorAll('[data-review-row]');
                    list.forEach(function (r, n) { r.querySelector('[data-review-title]').textContent = 'Review ' + (n + 1); r.querySelector('[data-review-remove]').setAttribute('aria-label', 'Remove review ' + (n + 1)); });
                    add.disabled = list.length >= max;
                    count.textContent = list.length + ' of ' + max + ' reviews' + (list.length >= max ? ' (limit reached)' : '');
                }
                add.addEventListener('click', function () {
                    if (rows.querySelectorAll('[data-review-row]').length >= max) { return; }
                    var row = build(next++); rows.appendChild(row); refresh(); row.querySelector('input').focus();
                });
                rows.addEventListener('click', function (e) {
                    var b = e.target.closest('[data-review-remove]'); if (!b) { return; }
                    var row = b.closest('[data-review-row]'), after = row.nextElementSibling || row.previousElementSibling;
                    row.remove(); refresh();
                    var target = after ? after.querySelector('input') : add; if (target) { target.focus(); }
                });
                refresh();
            })();
        </script>
    @endpush
