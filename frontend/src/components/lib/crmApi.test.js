import assert from "node:assert/strict";
import { test } from "node:test";
import { apiBaseFromIntake, fetchPartner, fetchPartners, fetchSlots, submitBooking } from "./crmApi.js";

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
test("booking: token required, 409/429/422/other mapped, success returns message", async () => {
  await assert.rejects(() => submitBooking({ base, booking: {}, token: "" }), /security verification/);
  for (const [s, re] of [[409, /just taken/], [429, /Too many/], [422, /not accepted/], [503, /couldn’t confirm/]]) await assert.rejects(() => submitBooking({ base, booking: {}, token: "t", fetchRequest: ok({ ok: false }, s) }), re, String(s));
  assert.equal((await submitBooking({ base, booking: { a: 1 }, token: "t", fetchRequest: async (u, o) => { assert.equal(JSON.parse(o.body).turnstile_token, "t"); return { ok: true, status: 200, json: async () => ({ ok: true, message: "m" }) }; } })).message, "m");
});
