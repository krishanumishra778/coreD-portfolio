# CoreD module for Krayin (staging)

Adds to Krayin 2.2.x, in namespace `App\CoreD` (no Composer changes):
- `POST /cored/api/intake` — Reach Us Out (`kind=contact`) and FAQ chatbot (`kind=faq_chatbot`) leads → CRM person + lead with a **source**, idempotent by `request_id`, same-email dedupe inside 15 min.
- `GET /cored/api/booking/availability?date=YYYY-MM-DD`, `POST /cored/api/booking` — slots from `cored_availability_rules`; creates person + lead + meeting activity; unique `active_slot` blocks double-booking. **No Meet link is created or promised**; response says "We’ll reach out to confirm your appointment."
- `GET /cored/api/partners[/{slug}]` — published Cloud Partners only; metrics without `verified:true` are never exposed.
- Admin: **CoreD → Cloud Partners** (draft/published, demo flag, affiliate URL optional).
- Server-side Turnstile (fails closed), validation, honeypot, per-IP and per-email rate limits.
- Versioned migrations: `app/CoreD/Database/Migrations/2026_11_24_00000{1..4}_*`.

## Staging env (add to krayin/.env)
```
CORED_TURNSTILE_MODE=required
CORED_TURNSTILE_SECRET=<real secret, or Cloudflare dummy 1x0000000000000000000000000000000AA for synthetic tests ONLY>
CORED_TURNSTILE_HOSTNAMES=            # set to the site hostname(s) once real keys are used
```
## Install
1. Take a DB dump first (`mysqldump` to a directory outside the web root).
2. `scripts/apply.sh <krayin-root>` — copies code, registers provider, prints migration preview (`--pretend`).
3. Review the preview, then `scripts/apply.sh <krayin-root> --migrate`.
4. `php artisan cored:seed-demo --force` (demo slots + 4 DEMO partners), `php artisan cored:smoke`.

## Rollback
- `scripts/rollback.sh <krayin-root>` (rolls back only CoreD migrations, unregisters, removes code), or
- restore the pre-migration DB dump.

## Tests
`KRAYIN_ROOT=<krayin> php tests/selftest.php` (module linked at `$KRAYIN_ROOT/app/CoreD`): 43 checks on sqlite (migrations up/down, slots, double-booking, Turnstile paths, validation, rate limit, public shape).
`php artisan cored:smoke` runs synthetic end-to-end checks against the real Krayin DB.

## Not done / needs owner
Calendar OAuth owner, working hours, host details, affiliate links, real Turnstile keys and hostname, public exposure of the intake route (design in `docs/INTAKE-DESIGN-REVIEW.md`; hPanel Basic Auth exemption NOT applied).
