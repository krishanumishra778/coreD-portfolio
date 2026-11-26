import assert from "node:assert/strict";
import { test } from "node:test";
import { apiBaseFromIntake, bookingConsent, fetchPartner, fetchPartners, fetchSlots, submitBooking } from "./crmApi.js";

const base = "https://crm.example.test/cored/api/";
const ok = (body, status = 200) => async () => ({ ok: status < 400, status, json: async () => body });
test("derives the API base only from a valid intake URL", () => {
  assert.equal(apiBaseFromIntake("https://crm.example.test/cored/api/intake"), base);
  assert.equal(apiBaseFromIntake("https://evil.test/other"), ""); assert.equal(apiBaseFromIntake(""), "");
});
test("partners: ok, malformed and not-configured", async () => {
  assert.deepEqual(await fetchPartners({ base, fetchRequest: ok({ ok: true, partners: [{ slug: "a" }] }) }), [{ slug: "a" }]);
  await assert.rejects(() => fetchPartners({ base, fetchRequest: ok({ ok: true }) }), /load-failed/);
  await assert.rejects(() => fetchPartners({ base: "" }), /not-configured/);
});
test("partner detail validates the slug before any request and maps 404", async () => {
  for (const s of ["../x", "A", "a b", "", undefined]) await assert.rejects(() => fetchPartner({ base, slug: s, fetchRequest: async () => { throw new Error("no call"); } }), /not-found/);
  await assert.rejects(() => fetchPartner({ base, slug: "x", fetchRequest: ok({ ok: false }, 404) }), /not-found/);
  assert.deepEqual(await fetchPartner({ base, slug: "x", fetchRequest: ok({ ok: true, partner: { slug: "x" } }) }), { slug: "x" });
});
test("slots require a YYYY-MM-DD date", async () => {
  await assert.rejects(() => fetchSlots({ base, date: "bad" }), /invalid/);
  assert.deepEqual((await fetchSlots({ base, date: "2026-12-08", fetchRequest: ok({ ok: true, slots: ["2026-12-08T04:30:00Z"], timezone: "Asia/Kolkata" }) })).slots, ["2026-12-08T04:30:00Z"]);
});
const yes = { terms: true, privacy: true };
test("booking consent: only a ticked box produces consent, and a booking without it is never sent", async () => {
  assert.deepEqual(bookingConsent(true), yes);
  for (const v of [false, undefined, null, "yes", "on", 1]) assert.equal(bookingConsent(v), null, String(v));
  let calls = 0;
  const spy = async () => { calls++; return { ok: true, status: 200, json: async () => ({ ok: true }) }; };
  for (const consent of [undefined, null, {}, { terms: true }, { privacy: true }, { terms: true, privacy: false }, { terms: "yes", privacy: "yes" }]) await assert.rejects(() => submitBooking({ base, booking: { consent }, token: "t", fetchRequest: spy }), /Terms and Privacy Notice/);
  assert.equal(calls, 0);
});
test("booking: token required, 409/429/422/other mapped, success returns message", async () => {
  await assert.rejects(() => submitBooking({ base, booking: {}, token: "" }), /security verification/);
  for (const [s, re] of [[409, /just taken/], [429, /Too many/], [422, /not accepted/], [503, /couldn’t confirm/]]) await assert.rejects(() => submitBooking({ base, booking: { consent: yes }, token: "t", fetchRequest: ok({ ok: false }, s) }), re, String(s));
  assert.equal((await submitBooking({ base, booking: { a: 1, consent: yes }, token: "t", fetchRequest: async (u, o) => { const sent = JSON.parse(o.body); assert.equal(sent.turnstile_token, "t"); assert.deepEqual(sent.consent, { terms: true, privacy: true }); return { ok: true, status: 200, json: async () => ({ ok: true, message: "m" }) }; } })).message, "m");
});
