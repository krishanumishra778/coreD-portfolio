@php
    $brandName = config('cored.brand.name', 'CoreDhristi');
    $brandDir = app_path('CoreD/Resources/brand').'/';
    $v = substr(md5((string) @md5_file($brandDir.'cored-crm.css').(string) @md5_file($brandDir.'mark.svg')), 0, 8);
@endphp
<link rel="stylesheet" href="{{ url('cored/brand/cored-crm.css') }}?v={{ $v }}">
<link rel="icon" type="image/svg+xml" href="{{ url('cored/brand/favicon.svg') }}?v={{ $v }}">
<link rel="icon" type="image/png" sizes="32x32" href="{{ url('cored/brand/favicon-32.png') }}?v={{ $v }}">
<link rel="shortcut icon" href="{{ url('cored/brand/favicon.ico') }}?v={{ $v }}">
<script>
    (function () {
        var name = @json($brandName);
        try {
            document.querySelectorAll('link[rel~="icon"], link[rel="shortcut icon"]').forEach(function (l) {
                if ((l.getAttribute('href') || '').indexOf('/cored/brand/') === -1) { l.parentNode.removeChild(l); }
            });
            var t = document.title || '';
            if (t.indexOf(name) === -1) { document.title = t ? t + ' | ' + name : name; }
        } catch (e) { /* branding is cosmetic; never block the page */ }
    })();
</script>
