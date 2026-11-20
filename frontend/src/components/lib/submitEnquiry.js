const formIdPattern = /^[a-zA-Z0-9]{6,32}$/;

export function formspreeEndpoint(formId) {
  return formIdPattern.test(formId ?? "") ? `https://formspree.io/f/${formId}` : "";
}

export async function submitEnquiry({ formId, fields, token, protection = "turnstile", subject = "CoreD · Project enquiry", signal, fetchRequest = fetch }) {
  const endpoint = formspreeEndpoint(formId);
  if (!endpoint) throw new Error("The enquiry form is not connected yet. Please email CoreD.");
  if (!["turnstile", "formshield"].includes(protection)) throw new Error("The enquiry form is not connected yet. Please email CoreD.");
  if (protection === "turnstile" && !token) throw new Error("Complete security verification before sending your enquiry.");

  const body = new URLSearchParams(fields);
  // Formspree uses these standard fields for reply-to, previews and spam checks.
  body.set("name", body.get("FullName") ?? "");
  body.set("email", body.get("CompanyEmail") ?? "");
  body.set("message", body.get("ProjectDescription") ?? "");
  body.set("subject", subject);
  body.set("_gotcha", body.get("Website") ?? "");
  if (protection === "turnstile") body.set("cf-turnstile-response", token);
  else body.delete("cf-turnstile-response");
  body.delete("turnstileToken");

  let response;
  try {
    response = await fetchRequest(endpoint, {
      method: "POST", body, headers: { Accept: "application/json" }, credentials: "omit", signal,
    });
  } catch {
    throw new Error("We couldn’t confirm receipt. Please email CoreD before sending again.");
  }

  let receipt;
  try { receipt = await response.json(); } catch { /* An HTML or empty response is not a receipt. */ }
  if (response.ok && receipt?.ok === true) return;
  if (response.status === 429) throw new Error("The enquiry service is busy. Please try later or email CoreD.");
  if (response.status === 400 || response.status === 422) {
    throw new Error(protection === "turnstile"
      ? "Your enquiry was not accepted. Check the fields and complete a fresh security verification."
      : "Your enquiry was not accepted. Check the fields or email CoreD for help.");
  }
  throw new Error("We couldn’t confirm receipt. Please email CoreD before sending again.");
}
