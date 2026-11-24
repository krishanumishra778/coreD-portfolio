// CRM lead intake (staging/preview only). Pure module: no import.meta.env, so it is unit-testable in Node.
// Production builds never set a CRM URL, so Formspree stays the only receiver there.
const idPattern = /^[A-Za-z0-9_-]{16,64}$/;

export function crmEndpoint(url) {
  try {
    const u = new URL(url);
    return u.protocol === "https:" && u.pathname === "/cored/api/intake" && !u.search && !u.hash && !u.username ? u.href : "";
  } catch { return ""; }
}

// Public API base from an https origin (e.g. https://crm.coredhristi.com): no path, query, hash or credentials.
export function crmBaseFrom(origin) {
  try {
    const u = new URL(origin);
    return u.protocol === "https:" && (u.pathname === "/" || u.pathname === "") && !u.search && !u.hash && !u.username ? `${u.origin}/cored/api/` : "";
  } catch { return ""; }
}

// Form field name -> CRM details key (the server keeps an allow-list of the same keys and max lengths).
const DETAILS = {
  service_id: "ServiceId", service: "ServiceSelection", plan_id: "PlanId", plan: "ChooseYourPlan", displayed_price: "DisplayedPrice",
  price_basis: "PriceBasis", price_amount: "PriceAmount", currency: "Currency", pricing_status: "PricingStatus", quote_status: "QuoteStatus",
  budget_amount: "BudgetAmount", budget_currency: "BudgetCurrency", budget_range: "BudgetRange", budget_scope: "BudgetScope",
  add_on_ids: "AddOnIds", add_ons: "AddOns", module_ids: "ModuleIds", modules: "RequestedModules", module_pricing: "ModulePricing",
  basic_agent: "BasicAgent", standard_agent: "StandardAgent", requested_scope: "RequestedScope", current_systems: "CurrentSystems",
  requested_integrations: "RequestedIntegrations", requested_volume: "RequestedVolume", target_timeline: "TargetTimeline",
};
const amount = (v) => { const n = Number(v); return v !== "" && Number.isFinite(n) && n > 0 && n < 1e12 ? String(Math.round(n * 100) / 100) : v; };

export function crmPayload(fields, token) {
  const get = (name) => String(fields.get(name) ?? "").trim();
  const requestId = idPattern.test(get("RequestId")) ? get("RequestId") : crypto.randomUUID();
  const details = {};
  for (const [key, field] of Object.entries(DETAILS)) {
    let v = get(field);
    if (key === "budget_amount" || key === "price_amount") v = amount(v);
    if (v) details[key] = v;
  }
  const faq = get("LeadSource") === "FAQ chatbot";
  const quote = details.price_basis === "quote" || Boolean(details.module_ids) || /scope review/i.test(details.quote_status ?? "");
  return {
    kind: faq ? "faq_chatbot" : quote ? "quote" : "contact",
    request_id: requestId, name: get("FullName"), email: get("CompanyEmail"), phone: get("ContactNumber"),
    ...(get("CountryCode") ? { phone_country: get("CountryCode") } : {}),
    ...(get("DialCode") ? { dial_code: get("DialCode") } : {}),
    ...(get("CompanyName") ? { company: get("CompanyName") } : {}),
    message: get("ProjectDescription"),
    consent: faq ? { privacy_notice: get("PrivacyNoticeShown") === "yes" } : { terms: get("TermsAccepted") === "yes", privacy: get("PrivacyAccepted") === "yes" },
    details, website: get("Website"), turnstile_token: token ?? "",
  };
}

export async function submitCrmLead({ url, fields, token, signal, fetchRequest = fetch }) {
  const endpoint = crmEndpoint(url);
  if (!endpoint) throw new Error("The enquiry form is not connected yet. Please email CoreD.");
  if (!token) throw new Error("Complete security verification before sending your enquiry.");
  let response;
  try {
    response = await fetchRequest(endpoint, {
      method: "POST", body: JSON.stringify(crmPayload(fields, token)), credentials: "same-origin", signal,
      headers: { "Content-Type": "application/json", Accept: "application/json" },
    });
  } catch { throw new Error("We couldn’t confirm receipt. Please email CoreD before sending again."); }
  let receipt;
  try { receipt = await response.json(); } catch { /* not a receipt */ }
  if (response.ok && receipt?.ok === true) return;
  if (response.status === 429) throw new Error("The enquiry service is busy. Please try later or email CoreD.");
  if (response.status === 422) throw new Error("Your enquiry was not accepted. Check the fields and complete a fresh security verification.");
  throw new Error("We couldn’t confirm receipt. Please email CoreD before sending again.");
}
