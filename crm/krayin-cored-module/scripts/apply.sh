#!/usr/bin/env bash
# Install/refresh the CoreD module into a Krayin tree. Idempotent. Does NOT migrate unless --migrate.
# usage: scripts/apply.sh /path/to/krayin [--migrate]
set -euo pipefail
KR="${1:?path to krayin root}"; HERE="$(cd "$(dirname "$0")/.." && pwd)"
[ -f "$KR/artisan" ] || { echo "not a Krayin root: $KR"; exit 1; }
rm -rf "$KR/app/CoreD.new" && cp -a "$HERE/app/CoreD" "$KR/app/CoreD.new"
rm -rf "$KR/app/CoreD" && mv "$KR/app/CoreD.new" "$KR/app/CoreD"
if ! grep -q 'CoreDServiceProvider' "$KR/bootstrap/providers.php"; then
  cp "$KR/bootstrap/providers.php" "$KR/bootstrap/providers.php.pre-cored"
  sed -i 's#^use App\\Providers\\AppServiceProvider;#use App\\CoreD\\CoreDServiceProvider;\nuse App\\Providers\\AppServiceProvider;#' "$KR/bootstrap/providers.php"
  sed -i 's#^    WebFormServiceProvider::class,#    WebFormServiceProvider::class,\n    CoreDServiceProvider::class,#' "$KR/bootstrap/providers.php"
fi
# CoreDhristi UI strings: partial override of the package language file (Laravel merges lang/vendor/admin/en/app.php over it)
mkdir -p "$KR/lang/vendor/admin/en" && cp "$KR/app/CoreD/Resources/lang-override/en/app.php" "$KR/lang/vendor/admin/en/app.php"
grep -c 'CoreDServiceProvider' "$KR/bootstrap/providers.php" | sed 's/^/provider refs (expect 2): /'
cd "$KR" && php -l bootstrap/providers.php && php artisan optimize:clear >/dev/null
echo "--- migration preview (nothing executed) ---"
php artisan migrate --pretend --path=app/CoreD/Database/Migrations --force | grep -Ei 'create table|alter|migrat' | head -20
if [ "${2:-}" = "--migrate" ]; then php artisan migrate --path=app/CoreD/Database/Migrations --force; fi
