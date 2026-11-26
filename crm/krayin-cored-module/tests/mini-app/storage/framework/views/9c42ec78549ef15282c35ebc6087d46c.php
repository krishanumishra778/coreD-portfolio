<?php
    $brandName = config('cored.brand.name', 'CoreDhristi');
    $brandDir = dirname(__DIR__, 2).'/brand/';
    $v = substr(md5((string) @md5_file($brandDir.'cored-crm.css').(string) @md5_file($brandDir.'mark.svg')), 0, 8);
?>
<link rel="stylesheet" href="<?php echo e(url('cored/brand/cored-crm.css')); ?>?v=<?php echo e($v); ?>">
<link rel="icon" type="image/svg+xml" href="<?php echo e(url('cored/brand/favicon.svg')); ?>?v=<?php echo e($v); ?>">
<link rel="icon" type="image/png" sizes="32x32" href="<?php echo e(url('cored/brand/favicon-32.png')); ?>?v=<?php echo e($v); ?>">
<link rel="shortcut icon" href="<?php echo e(url('cored/brand/favicon.ico')); ?>?v=<?php echo e($v); ?>">
<script>
    (function () {
        var name = <?php echo json_encode($brandName, 15, 512) ?>;
        try {
            document.querySelectorAll('link[rel~="icon"], link[rel="shortcut icon"]').forEach(function (l) {
                if ((l.getAttribute('href') || '').indexOf('/cored/brand/') === -1) { l.parentNode.removeChild(l); }
            });
            var t = document.title || '';
            if (t.indexOf(name) === -1) { document.title = t ? t + ' | ' + name : name; }
        } catch (e) { /* branding is cosmetic; never block the page */ }
    })();
</script>
<?php /**PATH /home/claude/cored-portfolio/crm/krayin-cored-module/app/CoreD/Resources/views/branding/head.blade.php ENDPATH**/ ?>