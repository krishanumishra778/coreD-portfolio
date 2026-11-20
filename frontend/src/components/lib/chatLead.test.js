import assert from "node:assert/strict";
import { test } from "node:test";
import { submitChatLead } from "./chatLead.js";

const valid = { FullName: "CoreD QA", CompanyEmail: "qa@example.com", PhoneCountry: "IN-91", NationalNumber: "9876543210", Website: "" };
const fields = (overrides = {}) => new URLSearchParams({ ...valid, ...overrides });
const accepted = { ok: true, status: 200, json: async () => ({ ok: true }) };
const submit = (fetchRequest, overrides = {}) => submitChatLead({ formId: "qaformid", fields: fields(), token: "test-token", requestId: "chat-qa", fetchRequest, ...overrides });

test("chat registration sends the three required details and its source without chat messages", async () => {
  const result = await submit(async (_url, options) => {
    const body = options.body;
    assert.equal(body.get("name"), valid.FullName);
    assert.equal(body.get("email"), valid.CompanyEmail);
    assert.equal(body.get("ContactNumber"), "+919876543210");
    assert.equal(body.get("CountryCode"), "IN");
    assert.equal(body.get("LeadSource"), "FAQ chatbot");
    assert.equal(body.get("subject"), "CoreD · FAQ assistant enquiry");
    assert.equal(body.get("RequestId"), "chat-qa");
    assert.equal(body.get("cf-turnstile-response"), "test-token");
    assert.equal(body.has("NationalNumber"), false);
    assert.equal(body.has("messages"), false);
    return accepted;
  });
  assert.deepEqual(result, { name: valid.FullName });
});

test("registration stays pending until the receiver confirms receipt", async () => {
  let accept;
  let unlocked = false;
  const result = submit(() => new Promise((resolve) => { accept = resolve; })).then(() => { unlocked = true; });
  await Promise.resolve();
  assert.equal(unlocked, false);
  accept(accepted);
  await result;
  assert.equal(unlocked, true);
});

test("invalid or missing contact details and honeypot values never reach the receiver", async () => {
  for (const invalid of [{ FullName: "" }, { CompanyEmail: "" }, { CompanyEmail: "invalid" }, { NationalNumber: "" }, { NationalNumber: "1234abc" }, { PhoneCountry: "made-up" }, { Website: "spam" }]) {
    let calls = 0;
    await assert.rejects(submit(async () => { calls++; return accepted; }, { fields: fields(invalid) }));
    assert.equal(calls, 0);
  }
});

test("rejected and uncertain receipts never unlock the assistant", async () => {
  for (const receipt of [{ ok: false, status: 422, json: async () => ({}) }, { ok: true, status: 200, json: async () => ({ success: true }) }]) {
    await assert.rejects(submit(async () => receipt));
  }
  await assert.rejects(submit(async () => { throw new Error("offline"); }));
});
