import assert from "node:assert/strict";
import { test } from "node:test";
import { crmEndpoint, crmPayload, submitCrmLead } from "./crmIntake.js";

const url = "https://crm.example.test/cored/api/intake";
const fields = new URLSearchParams({ RequestId: "req-0123456789abcdef", FullName: "QA User", CompanyEmail: "qa@example.test",
  ContactNumber: "+12025550138", CompanyName: "QA Co", ProjectDescription: "Synthetic", ServiceSelection: "AI CRM", Website: "" });

test("only accepts the exact https intake path", () => {
  assert.equal(crmEndpoint(url), url);
  for (const bad of ["", "http://crm.example.test/cored/api/intake", "https://crm.example.test/admin", "https://crm.example.test/cored/api/intake?x=1",
    "https://user:pw@crm.example.test/cored/api/intake", "javascript:alert(1)"]) assert.equal(crmEndpoint(bad), "", bad);
});
test("maps contact and FAQ-chatbot fields and keeps the honeypot", () => {
  const p = crmPayload(fields, "tok");
  assert.deepEqual([p.kind, p.name, p.email, p.phone, p.company, p.request_id, p.turnstile_token], ["contact", "QA User", "qa@example.test", "+12025550138", "QA Co", "req-0123456789abcdef", "tok"]);
  assert.match(p.message, /Synthetic\n\nService: AI CRM/);
  const f = new URLSearchParams(fields); f.set("LeadSource", "FAQ chatbot"); f.set("Website", "bot");
  assert.equal(crmPayload(f, "t").kind, "faq_chatbot"); assert.equal(crmPayload(f, "t").website, "bot");
});
test("invalid request id is replaced by a valid one", () => {
  const f = new URLSearchParams(fields); f.set("RequestId", "short");
  assert.match(crmPayload(f, "t").request_id, /^[A-Za-z0-9_-]{16,64}$/);
});
test("posts JSON once and resolves on ok receipt", async () => {
  let call;
  await submitCrmLead({ url, fields, token: "tok", fetchRequest: async (u, o) => { call = [u, o]; return { ok: true, status: 200, json: async () => ({ ok: true }) }; } });
  assert.equal(call[0], url); assert.equal(call[1].method, "POST"); assert.equal(JSON.parse(call[1].body).turnstile_token, "tok");
});
test("requires a token and never reports success for non-receipts", async () => {
  await assert.rejects(() => submitCrmLead({ url, fields, token: "", fetchRequest: async () => { throw new Error("must not call"); } }), /security verification/);
  for (const [status, re] of [[429, /busy/], [422, /not accepted/], [503, /confirm receipt/], [200, /confirm receipt/]]) {
    await assert.rejects(() => submitCrmLead({ url, fields, token: "t", fetchRequest: async () => ({ ok: status === 200, status, json: async () => ({ ok: false }) }) }), re, String(status));
  }
  await assert.rejects(() => submitCrmLead({ url, fields, token: "t", fetchRequest: async () => { throw new Error("net"); } }), /confirm receipt/);
});
