// View-model helpers for the Cloud Partners pages. Pure functions: everything shown publicly is derived from the CRM record
// and nothing is invented. Metrics, offers and evidence render only when the CRM marks them verified.

const arr = (v) => (Array.isArray(v) ? v : []);
const str = (v) => (typeof v === "string" ? v.trim() : "");
const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

/** Up to three short highlights: the CRM "highlights" list, else the first short strengths. */
export function partnerHighlights(p, limit = 3) {
  const d = p?.details ?? {};
  const own = arr(d.highlights).map(str).filter(Boolean);
  if (own.length) return own.slice(0, limit);
  return arr(d.pros).map(str).filter((x) => x && x.length <= 90).slice(0, limit);
}

/** "Best for ..." label, or "" when the CRM has none. */
export function bestFitLabel(p) {
  const b = str(p?.details?.best_for).replace(/^best (for|fit for)\s*/i, "");
  return b ? `Best for ${b}` : "";
}

/** The category pill: the first tag that is not the demo marker. */
export function categoryOf(p) {
  return arr(p?.tags).map(str).find((t) => t && t.toLowerCase() !== "demo") ?? "";
}

/** Verified metrics only, at most `limit`. The API already filters; this keeps the page safe if that ever changes. */
export function verifiedMetrics(p, limit = Infinity) {
  return arr(p?.details?.metrics).filter((m) => m && m.verified === true && str(m.label) && str(m.value)).slice(0, limit);
}

/** The expiry of an offer: an explicit expires_on (YYYY-MM-DD), else a date written in the body as "by/until <Month> <d>, <yyyy>". */
export function offerExpiry(offer) {
  const explicit = str(offer?.expires_on ?? offer?.valid_until);
  let y, m, d;
  let hit = explicit.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (hit) { [y, m, d] = [+hit[1], +hit[2] - 1, +hit[3]]; }
  else if (!explicit) {
    hit = str(offer?.body).match(/\b(?:by|until|through|before|ends?(?: on)?)\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),?\s+(\d{4})\b/i);
    if (hit) { [y, m, d] = [+hit[3], MONTHS.indexOf(hit[1].toLowerCase()), +hit[2]]; }
  }
  if (y === undefined) return null;
  const end = new Date(y, m, d, 23, 59, 59, 999);
  return Number.isNaN(end.getTime()) ? null : end;
}

/** The offer to show: verified, with a title or body, and not past its expiry. Otherwise null. */
export function currentOffer(p, now = new Date()) {
  const o = p?.details?.offer;
  if (!o || o.verified !== true || !(str(o.title) || str(o.body))) return null;
  const end = offerExpiry(o);
  return end && now > end ? null : o;
}

/** Where the external button goes: the affiliate link when there is one (kept exactly, tracking id included), else the website. */
export function outboundLink(p) {
  if (str(p?.affiliate_url)) return { href: p.affiliate_url, affiliate: true };
  if (str(p?.website_url)) return { href: p.website_url, affiliate: false };
  return null;
}

/** Description paragraphs split on blank lines. */
export function paragraphs(text) {
  return str(text).split(/\r?\n\s*\r?\n/).map((x) => x.replace(/\s*\r?\n\s*/g, " ").trim()).filter(Boolean);
}

/** Reviews with the required name and text; rating only when it is a whole number 1 to 5. */
export function cleanReviews(p) {
  return arr(p?.details?.reviews).map((r) => ({
    author: str(r?.author), role: str(r?.role), text: str(r?.text),
    rating: Number.isInteger(r?.rating) && r.rating >= 1 && r.rating <= 5 ? r.rating : null,
  })).filter((r) => r.author && r.text);
}

/** "G2" or "Trustpilot" when a review is a summary of a review on that site, so it is shown attributed as a summary. */
export function reviewSource(r) {
  const site = /trustpilot/i.test(r.role) ? "Trustpilot" : /\bG2\b/.test(r.role) ? "G2" : "";
  return site && /^review summary\b/i.test(r.text) ? `${site} summary` : "";
}

export const initials = (name) => str(name).split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
export const hashtag = (t) => `#${str(t).replace(/[^A-Za-z0-9]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))}`;
