// CRM lead intake (staging/preview only). Pure module: no import.meta.env, so it is unit-testable in Node.
// Production builds never set a CRM URL, so Formspree stays the only receiver there.
const idPattern = /^[A-Za-z0-9_-]{16,64}$/;

export function crmEndpoint(url) {
  try {
    const u = new URL(url);
    return u.protocol === "https:" && u.pathname === "/cored/api/intake" && !u.search && !u.hash && !u.username ? u.href : "";
  } catch { return ""; }
}

export function crmPayload(fields, token) {
  const get = (name) => String(fields.get(name) ?? "").trim();
  const requestId = idPattern.test(get("RequestId")) ? get("RequestId") : crypto.randomUUID();
  const context = [get("ServiceSelection") && `Service: ${get("ServiceSelection")}`, get("ChooseYourPlan") && `Plan: ${get("ChooseYourPlan")}`]
    .filter(Boolean).join(" | ");
  const message = [get("ProjectDescription"), context].filter(Boolean).join("\n\n").slice(0, 3000);
  return {
    kind: get("LeadSource") === "FAQ chatbot" ? "faq_chatbot" : "contact",
    request_id: requestId, name: get("FullName"), email: get("CompanyEmail"),
    ...(get("ContactNumber") ? { phone: get("ContactNumber") } : {}),
    ...(get("CompanyName") ? { company: get("CompanyName") } : {}),
    message, website: get("Website"), turnstile_token: token ?? "",
  };
}

export async function submitCrmLead({ url, fields, token, signal, fetchRequest = fetch }) {
  const endpoint = crmEndpoint(url);
  if (!endpoint) throw new Error("The enquiry form is not connected yet. Please email CoreD.");
  if (!token) throw new Error("Complete security verification before sending your enquiry.");
  let response;
  try {
    response = await fetchRequest(endpoint, {
      method: "POST", body: JSON.stringify(crmPayload(fields, token)), credentials: "include", signal,
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
