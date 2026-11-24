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

## 10. Single-destination intake: delivery design, staging evidence and cutover (2026-11-24)

**Status: design for owner approval. Nothing below has been applied to production. The Basic Auth exemption has NOT been applied.**

### 10.1 Delivery path (decision needed)
The website is static hosting, so there is no server of its own to relay through. The browser must call the CRM host directly.

| | Option A (recommended): scoped public route on crm.coredhristi.com | Option B: same-origin relay |
|---|---|---|
| What | hPanel Basic-Auth exemption limited to the path `/cored/api/*` only. The admin UI, login and everything else stay behind Basic Auth. | A proxy on coredhristi.com forwarding to the CRM. |
| Feasible now | Yes, one hPanel/.htaccess rule for one path. | Not on static hosting. It would need a server function or a new host. |
| Browser rules | Cross-origin: exact-origin CORS allow-list, no credentials, no wildcard. | Same origin: no CORS. |

Controls in both options (all built and tested): exact https origins only (`CORED_ALLOWED_ORIGINS`, default = the CRM's own origin; a foreign Origin gets 403 on POST/OPTIONS); server-side Cloudflare Turnstile that fails closed (a missing/invalid token stores nothing); per-IP limit 60/min and per-e-mail limit 5/h; honeypot; server-side validation with length limits and an allow-list of detail keys; no cookies (stateless, `credentials: same-origin`); secrets (Turnstile secret, SMTP, notify address) only in the server `.env`; request_id idempotency so a retry never creates a second lead.

### 10.2 What is stored
Every enquiry keeps: source label (Reach Us Out / Quote request / FAQ chatbot, kept separate), request ID, original submission time, name, company, e-mail, phone in E.164 plus country code and dial code, service, plan, displayed price and pricing status, add-ons, modules, budget with currency and scope, requested scope, current systems, integrations, volume, timeline, the message, the consent choices with the consent-text version, and a full audit copy of the payload (without the Turnstile token or the honeypot). The lead description holds the same text in readable form. The same e-mail resolves to one contact; a booking links to that existing contact.

### 10.3 Independent switches (frontend build flags)
`VITE_CRM_API_BASE` (the CRM origin), `VITE_INTAKE_MODE=crm` (enquiries go to the CRM instead of Formspree), `VITE_BOOKING_ENABLED=on`, `VITE_PARTNERS_ENABLED=on`. They do not depend on each other (verified in the browser). The main build sets none of them, so it stays on Formspree.

### 10.4 Notification and privacy copy
`CORED_NOTIFY_TO=info@coredhristi.com` plus SMTP settings in the server `.env`. A failed e-mail never blocks the save: the outcome is recorded on the event. In CRM mode the privacy policy and the chatbot notice name CoreD's CRM, not Formspree (tested); in Formspree mode the text is unchanged.

### 10.5 Cutover steps (only after owner go-ahead)
1. Owner supplies real Turnstile keys, the allowed hostnames and the SMTP details; set them in the server `.env` (never in a file or in chat).
2. Owner approves Option A (or names another route). Only then is the `/cored/api/*` exemption applied.
3. Run the E2E checks against the real hostname with the real Turnstile.
4. Build the site with the flags from 10.3 and publish it. Formspree is no longer called by the site from that moment.
5. Watch the CRM for the first real enquiry and the e-mail to info@coredhristi.com.

### 10.6 Rollback
- Fastest (seconds to minutes): publish the previous site build, or rebuild without `VITE_INTAKE_MODE=crm`. Enquiries return to Formspree. CRM records already saved stay.
- Server side: remove the `/cored/api/*` exemption (the route is then behind Basic Auth again and refuses everyone). Set `CORED_TURNSTILE_MODE=required` to stay closed.
- Full module rollback: `scripts/rollback.sh <krayin-root>` removes the provider and the CoreD tables only (never Krayin's own); the pre-change DB dump and `providers.php.pre-cored` are in `backups/`.

### 10.7 Historical Formspree import
`php artisan cored:import-formspree <export.csv|json>` is a dry run by default: it prints totals, the original date range, importable counts per source, duplicates, spam, QA/test rows and e-mails that match existing contacts, and writes a report that contains row numbers only. A real import needs both `--confirm-import` and `CORED_IMPORT_APPROVED=yes`, keeps the original dates, creates no notifications, and never touches Formspree. No export has been provided yet; the owner has to export it from the Formspree dashboard.
