// Read/booking client for the CoreD CRM public API (staging/preview builds only). Pure: no import.meta.env.
import { crmEndpoint } from "./crmIntake.js";

export const apiBaseFromIntake = (intakeUrl) => { const u = crmEndpoint(intakeUrl); return u ? new URL("/cored/api/", u).href : ""; };

const slugPattern = /^[a-z0-9-]{1,80}$/;
const jsonOrNull = async (r) => { try { return await r.json(); } catch { return null; } };

export async function fetchPartners({ base, fetchRequest = fetch, signal }) {
  if (!base) throw new Error("not-configured");
  const r = await fetchRequest(base + "partners", { credentials: "same-origin", signal, headers: { Accept: "application/json" } });
  const b = await jsonOrNull(r);
  if (!r.ok || !b?.ok || !Array.isArray(b.partners)) throw new Error("load-failed");
  return b.partners;
}

export async function fetchPartner({ base, slug, fetchRequest = fetch, signal }) {
  if (!base || !slugPattern.test(slug ?? "")) throw new Error("not-found");
  const r = await fetchRequest(base + "partners/" + slug, { credentials: "same-origin", signal, headers: { Accept: "application/json" } });
  if (r.status === 404) throw new Error("not-found");
  const b = await jsonOrNull(r);
  if (!r.ok || !b?.ok || !b.partner) throw new Error("load-failed");
  return b.partner;
}

export async function fetchSlots({ base, date, fetchRequest = fetch, signal }) {
  if (!base || !/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("invalid");
  const r = await fetchRequest(base + "booking/availability?date=" + date, { credentials: "same-origin", signal, headers: { Accept: "application/json" } });
  const b = await jsonOrNull(r);
  if (!r.ok || !b?.ok || !Array.isArray(b.slots)) throw new Error("load-failed");
  return { slots: b.slots, timezone: b.timezone };
}

// The CRM requires the visitor's acceptance of the Terms and the Privacy Notice (one checkbox covers both). Only a ticked box produces a consent object.
export const bookingConsent = (accepted) => (accepted === true ? { terms: true, privacy: true } : null);

export async function submitBooking({ base, booking, token, fetchRequest = fetch, signal }) {
  if (!base) throw new Error("The booking form is not connected yet. Please email CoreD.");
  if (!token) throw new Error("Complete security verification before booking.");
  if (booking?.consent?.terms !== true || booking?.consent?.privacy !== true) throw new Error("Please accept the Terms and Privacy Notice.");
  let r;
  try {
    r = await fetchRequest(base + "booking", { method: "POST", credentials: "same-origin", signal,
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...booking, turnstile_token: token }) });
  } catch { throw new Error("We couldn’t confirm your request. Please email CoreD before trying again."); }
  const b = await jsonOrNull(r);
  if (r.ok && b?.ok === true) return { message: b.message };
  if (r.status === 409) throw new Error("That time was just taken. Please choose another slot.");
  if (r.status === 429) throw new Error("Too many requests. Please try again shortly or email CoreD.");
  if (r.status === 422) throw new Error("Your request was not accepted. Check the fields and complete a fresh security verification.");
  throw new Error("We couldn’t confirm your request. Please email CoreD before trying again.");
}
