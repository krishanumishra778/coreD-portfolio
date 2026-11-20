import { resolveMetadata } from "../../data/siteMetadata.js";

const consentKey = "cored-analytics-choice-v1";
const choiceLifetime = 180 * 24 * 60 * 60 * 1000;
let currentChoice;
let lastPage;

export function analyticsChoice() {
  if (typeof window === "undefined") return null;
  if (currentChoice !== undefined) return currentChoice;
  try {
    const saved = JSON.parse(window.localStorage.getItem(consentKey));
    if (typeof saved?.allowed === "boolean" && Number.isFinite(saved.time)
      && saved.time <= Date.now() && Date.now() - saved.time < choiceLifetime) return saved.allowed;
  } catch { /* Storage may be unavailable or the saved value invalid. */ }
  return null;
}

export function chooseAnalytics(allowed) {
  currentChoice = allowed === true;
  lastPage = undefined;
  try { window.localStorage.setItem(consentKey, JSON.stringify({ allowed: currentChoice, time: Date.now() })); } catch { /* The choice still applies to this visit. */ }
  window.gtag?.("consent", "update", {
    analytics_storage: currentChoice ? "granted" : "denied",
    ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
  });
  if (currentChoice) window.loadCoreDTagManager?.();
  else {
    // Remove this site's GA cookies when a visitor withdraws permission.
    const domains = new Set(["", window.location.hostname, "." + window.location.hostname]);
    if (window.location.hostname.endsWith(".coredhristi.com")) domains.add(".coredhristi.com");
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.split("=")[0].trim();
      if (!/^_ga(?:_|$)|^_gid$|^_gat(?:_|$)/.test(name)) continue;
      for (const domain of domains) document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${domain ? "; Domain=" + domain : ""}`;
    }
  }
}

export function startAnalytics() {
  if (analyticsChoice() === true) {
    currentChoice = true;
    window.gtag?.("consent", "update", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    window.loadCoreDTagManager?.();
  }
}

export function trackPage(pathname) {
  if (analyticsChoice() !== true || pathname === lastPage) return;
  const metadata = resolveMetadata(pathname);
  // Use known public routes; exclude query strings, hashes and unknown URL text.
  const path = metadata.path || "/not-found";
  window.dataLayer?.push({
    event: "cored_page_view", page_title: metadata.title,
    page_location: window.location.origin + path,
    page_referrer: lastPage ? window.location.origin + lastPage : "",
  });
  lastPage = path;
}

export function trackEnquiry(serviceId, planId) {
  if (analyticsChoice() !== true) return;
  const safeId = (value) => /^[a-z0-9-]{1,60}$/.test(value ?? "") ? value : "not-selected";
  window.dataLayer?.push({ event: "generate_lead", service_id: safeId(serviceId), plan_id: safeId(planId) });
}
