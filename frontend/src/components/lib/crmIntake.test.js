import assert from "node:assert/strict";
import { test } from "node:test";
import { crmBaseFrom, crmEndpoint, crmPayload, submitCrmLead } from "./crmIntake.js";

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
  assert.deepEqual([p.kind, p.name, p.email, p.phone, p.company, p.request_id, p.turnstile_token, p.message], ["contact", "QA User", "qa@example.test", "+12025550138", "QA Co", "req-0123456789abcdef", "tok", "Synthetic"]);
  assert.equal(p.details.service, "AI CRM");
  const f = new URLSearchParams(fields); f.set("LeadSource", "FAQ chatbot"); f.set("Website", "bot");
  assert.equal(crmPayload(f, "t").kind, "faq_chatbot"); assert.equal(crmPayload(f, "t").website, "bot");
});
test("keeps the full quote form: service, plan, price, add-ons, budget/currency, scope, timeline, integrations, phone country, consent, request id", () => {
  const f = new URLSearchParams({ RequestId: "req-0123456789abcdef", FullName: "Asha Rao", CompanyName: "Acme", CompanyEmail: "asha@acme.in", ContactNumber: "+919811111111",
    CountryCode: "IN", DialCode: "+91", ServiceId: "ai-crm", ServiceSelection: "AI CRM", PlanId: "custom", ChooseYourPlan: "Custom", DisplayedPrice: "By quote", PriceBasis: "quote",
    PriceAmount: "", Currency: "USD", PricingStatus: "proposed", QuoteStatus: "Scope review required; price to be confirmed in a written quote",
    BudgetAmount: "1e3", BudgetCurrency: "EUR", BudgetRange: "1e3 EUR", BudgetScope: "Whole quoted project", AddOnIds: "sla,training", AddOns: "SLA; Training",
    ModuleIds: "scoring", RequestedModules: "Lead scoring", ModulePricing: "By quote", BasicAgent: "", StandardAgent: "", RequestedScope: "", CurrentSystems: "Sheets",
    RequestedIntegrations: "ERPNext", RequestedVolume: "20 users", TargetTimeline: "Q1 2027", ProjectDescription: "Need CRM + ERP", TermsAccepted: "yes", PrivacyAccepted: "yes", Website: "" });
  const p = crmPayload(f, "tok");
  assert.equal(p.kind, "quote");
  assert.deepEqual([p.phone, p.phone_country, p.dial_code, p.company, p.message], ["+919811111111", "IN", "+91", "Acme", "Need CRM + ERP"]);
  assert.deepEqual(p.consent, { terms: true, privacy: true });
  assert.equal(p.details.budget_amount, "1000");           // exponent form normalised so the server accepts it
  for (const [k, v] of Object.entries({ service: "AI CRM", plan: "Custom", budget_currency: "EUR", add_ons: "SLA; Training", add_on_ids: "sla,training", modules: "Lead scoring",
    requested_integrations: "ERPNext", current_systems: "Sheets", requested_volume: "20 users", target_timeline: "Q1 2027", currency: "USD", pricing_status: "proposed" })) assert.equal(p.details[k], v, k);
  assert.ok(!("price_amount" in p.details) && !("basic_agent" in p.details), "empty fields are omitted");
  assert.equal(p.request_id, "req-0123456789abcdef");
});
test("FAQ registration records that the privacy notice was shown; plain contact stays 'contact'", () => {
  const f = new URLSearchParams(fields); f.set("LeadSource", "FAQ chatbot"); f.set("PrivacyNoticeShown", "yes");
  assert.deepEqual(crmPayload(f, "t").consent, { privacy_notice: true });
  const c = new URLSearchParams(fields); c.set("PriceBasis", "fixed"); c.set("TermsAccepted", "yes");
  assert.equal(crmPayload(c, "t").kind, "contact"); assert.deepEqual(crmPayload(c, "t").consent, { terms: true, privacy: false });
});
test("API base only from a bare https origin", () => {
  assert.equal(crmBaseFrom("https://crm.coredhristi.com"), "https://crm.coredhristi.com/cored/api/");
  for (const bad of ["", "http://crm.coredhristi.com", "https://crm.coredhristi.com/admin", "https://crm.coredhristi.com/?a=1", "https://u:p@crm.coredhristi.com", "crm.coredhristi.com", "javascript:1"]) assert.equal(crmBaseFrom(bad), "", bad);
});
test("a retry reuses the request id, sends no cookies and no extra secrets", async () => {
  const seen = [];
  const fetchRequest = async (u, o) => { seen.push(o); return { ok: true, status: 200, json: async () => ({ ok: true }) }; };
  await submitCrmLead({ url, fields, token: "t1", fetchRequest }); await submitCrmLead({ url, fields, token: "t2", fetchRequest });
  assert.equal(JSON.parse(seen[0].body).request_id, JSON.parse(seen[1].body).request_id);
  assert.ok(seen.every((o) => o.credentials === "same-origin" && Object.keys(o.headers).sort().join() === "Accept,Content-Type"));
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
