# CoreD website preview and publication

Run `npm run dev -- --port 5174` from this directory. Use `npm test` for the FAQ and pricing checks. The production build, `npm run build`, generates the React bundle and route HTML with visible content before JavaScript runs. Set `VITE_SITE_URL` to the production HTTPS origin for canonical URLs and a sitemap. Serve the generated directory indexes before any SPA fallback and return `dist/404.html` with HTTP 404 for unknown paths.

## Hostinger file hosting

Use the latest **`frontend/dist`**, not the older repository-root `dist` (dated 24 October 2026 at this check). Build from `frontend` with Node 22 or 24, then upload the **contents** of `frontend/dist` into the document root assigned to `cored.coredhristi.com`. For an independent Hostinger website this is normally its own `public_html`; confirm the exact root in hPanel. Do not replace the separate marketplace site's files.

The output includes `.htaccess`, `index.html`, all pre-rendered route directories, assets, images, sitemap/robots and `404.html`. Preserve the hidden `.htaccess` file when uploading or extracting the archive. Its rules serve existing files and generated route indexes, and keep a real 404 for unknown URLs. Every production build checks local links/assets with exact case so Windows-only filename matches do not silently break on Linux. The source `.htaccess` is for manual Web/Cloud file hosting; when using Hostinger's managed app deployment, review its generated routing rather than overwriting it blindly.

The frontend does not need PHP, a database, or a persistent Node server. Contact and quotation submissions go directly to Formspree. The FAQ assistant also runs in the browser; optional unanswered-question reporting is disabled because `VITE_CHATBOT_API_URL` is not configured. Deploying the separate `backend` would be a different task.

Before building, configure the public `VITE_SITE_URL`, `VITE_FORMSPREE_FORM_ID`, `VITE_TURNSTILE_SITE_KEY` and `VITE_CONTACT_SPAM_PROTECTION` values. Vite embeds them at build time: uploading a new `.env` to Hostinger after building does not change the bundle. Do not upload `.env`, Git files, source code, `node_modules` or the old Apps Script integration. Never put a Turnstile secret in a Vite variable.

In hPanel, point the subdomain DNS to the assigned website, activate its SSL certificate and enable HTTPS. Ensure the Cloudflare Turnstile widget allows `cored.coredhristi.com`, either directly or through the parent `coredhristi.com`. Cloudflare allows the configured hostname and all of its subdomains; `www.coredhristi.com` does not cover the sibling `cored.coredhristi.com`. Keep the matching secret saved only in Formspree. Google Analytics receipt QA remains deferred at the user's request. The ZIP is technically prepared for upload, but the policy review items below remain open and no live Hostinger deployment has been verified.

## Contact and quotation delivery

### FAQ assistant registration

The floating FAQ assistant first collects a name, email and phone number with a country code. It submits a separately labelled assistant enquiry to the same configured Formspree form, with the existing Turnstile protection. Questions unlock only after a confirmed Formspree receipt. Failed or uncertain receipts keep the registration form open; concurrent submits are blocked. Registration is remembered in React state while the site stays open, without persisting contact details or chat transcripts in browser storage. The Privacy Policy explains this flow. Registration does not subscribe visitors to marketing.

Mobile changes keep client logos in a single continuous row and Selected work in an equal-width, two-group loop without a scrollbar. Reduced motion displays a static layout. Keyboard focus pauses the work carousel and allows its links to be reached. CRM illustrations and service diagrams wrap their text; project descriptions are shown in full.

Request quote links open `/reach-us` with the selected service, plan and optional security scope. Contact and quotations use the same Formspree form. Set `VITE_FORMSPREE_FORM_ID` to the public ID shown after `/f/` on the form's Integration page. There is no Google Apps Script fallback. A missing ID disables submission and keeps the enquiry email visible.

The request includes name, company, email, full international phone, service and plan IDs/labels, displayed proposed price and basis, optional Custom budget/currency, add-ons, agent selections, requested scope, legal acknowledgements and a reference ID. Formspree's standard name/email/message fields are also populated for readable dashboard previews and reply-to. The client prevents concurrent submissions; the reference ID aids support and does not promise provider-side deduplication.

The connected form ID is `xgakkyab`. Its notification action targets the verified `info@coredhristi.com` inbox. On 18 November 2026, two approved browser submissions were received in Formspree and their notification emails were read in that inbox. Both reserved-address synthetic enquiries were initially classified as spam; the user approved moving only these QA records to Inbox, after which both emails arrived. This verifies the full delivery path with that manual classification step, not automatic inbox placement for every new enquiry. Monitor both Inbox and Spam during launch.

The current local configuration uses `VITE_CONTACT_SPAM_PROTECTION=turnstile`. Formspree CAPTCHA is enabled with Turnstile selected and a saved custom secret. The user entered the secret directly in Formspree. Formshield filtering and the hidden honeypot remain enabled. Both browser tests completed verification and were accepted with this configuration. The frontend contains only the public site key, never the secret.

To activate Turnstile, enable CAPTCHA in Formspree settings, choose Cloudflare Turnstile, and have the user enter the existing widget's secret directly in Formspree. Set `VITE_CONTACT_SPAM_PROTECTION=turnstile` only after saving the provider configuration. The matching public site key is configured as `VITE_TURNSTILE_SITE_KEY`. The secret must never be placed in a frontend environment variable, source file or client request. Keep localhost and the real production hostnames allowed in the Turnstile widget.

The browser submits to `https://formspree.io/f/<id>` using POST with `Accept: application/json`. Turnstile mode includes `cf-turnstile-response`; Formshield mode omits it. Only an HTTP success with the documented JSON receipt (`ok: true`) shows success. Provider rejection, quota, malformed receipts and network failures show an error without automatic retries. Acceptance does not prove inbox delivery: verify the matching dashboard submission and notification separately during QA.

Run `npm test` for FAQ/catalog and form transport regression tests. Form transport tests use mocked provider responses; they do not prove live delivery. Run a clearly labeled, user-approved synthetic enquiry in the browser, then match every field in the Formspree dashboard. Verify a rejected request does not show success.

The old `integrations/contact-receiver` files are retained as historical integration code only. They are no longer called by the website. The Google receiver's missing external-request authorization is no longer a dependency of this flow. Unanswered assistant reporting remains separate and is sent only when `VITE_CHATBOT_API_URL` is configured.

## Confirm before publication

### India terms and pricing policy — 19 November 2026

`/termsCondition` now covers the CoreD quote-led service process. `/pricingPolicy` contains the proposed plan schedule read from the existing service catalog, with a `/pricing-policy` alias. Footer, Services, Contact and legal pages link to it. The existing privacy URL remains unchanged.

The user supplied CoreDhristi LLP, LLPIN `ADC-9115`, as CoreD's contracting business and confirmed GST registration is not yet in place. The policies therefore identify CoreD as its services division and do not claim a GSTIN or currently charge GST. The LLP name and registration were not independently checked against MCA records in this task.

Confirmed commercial instructions: 50% before kickoff, 30% at the defined halfway milestone, and 20% on completion. The quote must define measurable halfway and completion checks. Final payment still outstanding 20 calendar days after written completion notice and the final invoice can lead to a formal demand and lawful recovery, not an automatic fine or criminal allegation. Minor reproducible in-scope errors reported within 28 calendar days of handover have no CoreD correction fee; customer-approved provider costs remain separate. New requirements after quotation need an approved priced change. A major-defect classification does not waive remedies required by contract or law.

The review document is `output/legal/CoreD_Terms_and_Pricing_Policy_India_2026-11-19.md` at the repository root. Before adoption, supply the registered postal address (the LLPIN is not an address), grievance officer details where required, and adopt or revise cancellation/refund handling. Confirm the exact registered legal name and an effective date with Indian counsel. Review the facts relevant to Consumer Protection/E-Commerce Rules applicability rather than assuming the B2B label excludes them. The two policy pages remain visibly marked review copies and `noindex`; prerendering omits them from the sitemap. Remove those draft markers deliberately once the outstanding facts and review are complete.

The 2026 E-Commerce amendment reviewed in the official notification commences on 1 January 2027; it is not treated as already effective on 19 November 2026. Reassess applicable new operational obligations before that date. No false compliance certification, grievance-officer appointment or annual audit is claimed.

### Analytics configuration

The header loads the owned CoreD container `GTM-PTCKWTKT` only after a visitor allows analytics. The footer reopens analytics preferences. The user approved creating this replacement; the inaccessible `GTM-KTH9H5KP` remains untouched and is no longer installed here. Google Analytics account `416897055`, property `565070438`, web stream `16366159299` and measurement ID `G-6BGE3Z8HWG` belong to `coredhristi@gmail.com`. The confirmed site origin is `https://cored.coredhristi.com` (configured locally through `VITE_SITE_URL`; also set it in the production build environment).

GTM version 2 was published on 18 November 2026. It contains a base tag with automatic page views disabled, a `page_view` tag listening for `cored_page_view`, and a `generate_lead` tag listening only for confirmed enquiries. Page metadata and service/plan IDs use data-layer variables. Automatic event detection and user-provided data collection are disabled in the container; Enhanced Measurement is disabled in the GA stream. `generate_lead` is registered as a GA key event, counted once per event, without an invented monetary value. No form PII is included in the site's analytics events.

Local browser checks confirmed no Google script before permission and exactly one correct container script after Allow. Tag Assistant has not connected in Brave yet, and GA receipt is not verified. See `output/local-preview/ANALYTICS-SETUP-2026-11-18.md` at the repository root for the remaining browser verification. Publication of the GTM configuration is separate from deploying this website; no Git push or website deployment was performed.

- **Pricing:** Approve the proposed USD plan prices, specialist and license costs, taxes, optional support and its terms. Confirm whether CoreD LeadForge X is available as a pilot or ready for wider delivery; the preview states delivery is proposed.
- **Legal:** Confirm the contracting entity and business address, privacy contact, retention and deletion periods, hosting and processor arrangements, any production tracking or cookies, and applicable payment, cancellation, refund, support and jurisdiction terms. Review both legal drafts against the production configuration and written agreements.
- **Case studies:** The portfolio record states MERN and 12 weeks for Crawl Digitally. Confirm underlying evidence, exact milestone dates and any measured outcomes. For Adsmark01, NextTechWaves, Indiprast Petroleum, Indiganic Foods, Creative Fields LLP and Orbit Opportunity & Media, confirm the actual technology stacks, dates or durations, delivery status and any attributable metrics. The current impact statements describe what the project materials show.
