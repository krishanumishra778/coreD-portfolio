# Public lead-intake route — design for review (nothing applied)

Status: **proposal only.** The CRM Basic Auth stays on. No hPanel exemption is applied until this is approved.
Live Reach Us Out / FAQ-chatbot enquiries stay on Formspree.

## 1. Why a public route is needed (and when it is not)
Staging today: whole `crm.coredhristi.com` host sits behind Basic Auth (observed: 401 without credentials).
- **Protected preview (now):** synthetic tests run through the real HTTP kernel (`php artisan cored:smoke`) and from a browser that already holds the Basic-Auth login. No exemption needed.
- **Public route (later, only after approval):** needed only when the production website (`coredhristi.com`) must post to the CRM from visitors' browsers.

## 2. Exact route to expose (one only)
| Item | Value |
|---|---|
| Method + path | `POST https://crm.coredhristi.com/cored/api/intake` |
| Basic-Auth exemption scope | that single path **only**, `POST` + `OPTIONS` only. `/admin`, `/cored/api/booking`, `/cored/api/partners*`, `/install`, everything else stays behind Basic Auth. Booking/partners get their own review. |
| Content-Type | `application/json` (CORS preflight needed → see §6) |
| Auth model | none (public form). Abuse control = Turnstile + validation + rate limits + dedupe. No secrets in the browser. |

## 3. Server-side Turnstile (implemented in `TurnstileVerifier`)
Per Cloudflare docs: `POST https://challenges.cloudflare.com/turnstile/v0/siteverify` with `secret`, `response`, optional `remoteip`, optional `idempotency_key`.
- Token max 2048 chars, valid 300 s, single-use (reuse → `timeout-or-duplicate`).
- We reject: missing/oversized token, `success != true`, upstream error/timeout (**fail closed**, 6 s timeout), hostname not in `CORED_TURNSTILE_HOSTNAMES`.
- No secret configured → HTTP 503 (never silently skipped). `mode=off` is refused when `APP_ENV=production`.
- `request_id` is passed as `idempotency_key` so a safe client retry doesn't burn the token.
- Real secret lives only in `krayin/.env` (owner enters it; never in git/chat). Staging tests use Cloudflare's published dummy secret/token only.
- Open item: site key + secret must be issued for the hostname(s) that will render the widget (`coredhristi.com`, `www`), and the form must send the token as `turnstile_token`. Optional hardening: check `action` = `intake`.

## 4. Validation (server-side, authoritative)
`kind` ∈ {contact, faq_chatbot}; `request_id` 16–64 `[A-Za-z0-9_-]`; `name` 2–120; `email` RFC ≤254; `phone` optional ≤24 chars `[0-9+-() ]`; `company` ≤120; `message` ≤3000 (≥5 for contact); control characters stripped; unknown fields dropped (cannot set owner/status/stage/source); honeypot `website` filled → HTTP 200, nothing stored. Source is derived from `kind` on the server, never from the client.
Body size: web server limit to ≤ 16 KB for this path (to apply with the exemption).

## 5. Rate limits & duplicates
- Per IP: 5/min on this route (`cored.rate_limits.intake_per_minute_ip`), plus global `throttle:60,1`.
- Per email (sha256): 5/hour.
- Idempotency: same `request_id` → success, no second lead.
- Soft dedupe: same email + same kind within 15 min → recorded as duplicate event, **no new lead**, person reused.
- Responses are generic (`{ok:true,receipt}`); lead/person ids and "email exists" are never revealed.
- Caveat: limiter uses the app cache (currently file/database). Behind a proxy `REMOTE_ADDR` must be the real client IP — to be verified on host before exposure. Cloudflare in front would add a second layer (WAF rate rule).

## 6. CORS / browser access
Browser on `coredhristi.com` → `crm.coredhristi.com` is cross-origin. Proposal: a CORS middleware with an **exact-origin allow-list** (`https://coredhristi.com`, `https://www.coredhristi.com`), methods POST/OPTIONS, headers Content-Type, no credentials. Not implemented yet (would be added on approval). Alternative with no CORS and no public CRM host: a same-origin proxy path on the main site — not possible on Hostinger static Vite hosting, so CORS is the proposed route.

## 7. Failure & rollback
- Frontend keeps Formspree as the source of truth in production. CRM write is behind env flag `VITE_CRM_INTAKE_URL`; unset = Formspree only. If CRM intake errors, the visitor flow must not break (fail to Formspree path).
- Server rollback: remove the Basic-Auth exemption in hPanel (immediate), or `scripts/rollback.sh`.

## 8. Decisions needed from owner
1. Approve the single-path exemption design above (or choose a different front, e.g. Cloudflare in front of the CRM host).
2. Provide Turnstile widget (site key) + secret for `coredhristi.com`.
3. Confirm exact allowed origins.
4. Confirm Formspree stays as dual-write/fallback until CRM is verified in production.

## 9. Finding: Formspree + CRM dual-write cannot share one Turnstile token
A Turnstile token is single-use (Cloudflare: reuse returns `timeout-or-duplicate`). Formspree's CAPTCHA and the CRM would both validate the same token, so the second would fail. Therefore:
- Staging/preview builds (`VITE_INTAKE_MODE=crm`) send to the CRM **only** (implemented; Formspree untouched).
- Production dual-write needs a second widget execution (a fresh token per receiver) or a server-side forward. Decision needed before go-live; until then production stays Formspree-only.
