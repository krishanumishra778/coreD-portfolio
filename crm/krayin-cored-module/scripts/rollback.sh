#!/usr/bin/env bash
# Remove the CoreD module: roll back ONLY its migrations, unregister the provider, delete its code.
# Full fallback: restore the DB dump taken before the first migration (see README).
set -euo pipefail
KR="${1:?path to krayin root}"
cd "$KR"
php artisan migrate:rollback --path=app/CoreD/Database/Migrations --force
if [ -f bootstrap/providers.php.pre-cored ]; then cp bootstrap/providers.php.pre-cored bootstrap/providers.php; else
  sed -i '/CoreDServiceProvider/d' bootstrap/providers.php; fi
rm -f lang/vendor/admin/en/app.php; rmdir lang/vendor/admin/en lang/vendor/admin lang/vendor 2>/dev/null || true
rm -rf app/CoreD && php artisan optimize:clear >/dev/null && echo "CoreD module removed"
