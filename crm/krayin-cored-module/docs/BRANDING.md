# CoreDhristi branding of the CRM admin

What changes (all in `app/CoreD`, applied by `scripts/apply.sh`, removed by `scripts/rollback.sh`):

| Where | How |
|---|---|
| Login, password reset, header, mobile sidebar logo | `Resources/brand/cored-crm.css` replaces every upstream `<img alt="CoreDhristi">` logo (alt text = `config('app.name')`, forced to `cored.brand.name`) with the existing CoreD logo (light, dark and mark-only variants derived from `frontend/public/Images/coreD.svg`) |
| Browser title | `branding/head.blade.php` appends ` | CoreDhristi` |
| Favicon | same template: SVG + PNG + ICO served from `/cored/brand/*`; upstream icon links are removed at load |
| Colours / buttons / links / active menu / focus | `cored-crm.css`, values copied from `frontend/tokens.css` (amber `#FFB734`, hover `#FFCC62`, accent ink `#7A4208`, ink `#2B251F`, paper `#FAF7F1`, rule `#D7D0C6`, dark `#120F0B`, focus `#CC6700`) |
| Footer bar | default label patched in `config('core_config')` at boot (an admin can still change it in Configuration) |
| "Powered by" on login / forgot / reset, Help page copy | `Resources/lang-override/en/app.php`, installed to `lang/vendor/admin/en/app.php` (Laravel merges it over the package strings) |
| Help & Resources page cards and links | `Config/support.php` replaces `config('support')` |

Hooks used: `admin.layout.head.after` (admin layout) and `admin.layout.head` (login / reset layout).

Not changed on purpose: upstream `LICENSE`, copyright headers, source files, the `Webkul\...` namespaces, e-mail template
structure (it reads `config('app.name')`, so e-mails say CoreDhristi). Other UI languages keep the upstream strings
(only `en` is enabled).

Upgrade note: after upgrading Krayin, re-run `scripts/apply.sh` and re-check login, dashboard and Help page.
