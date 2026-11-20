import assert from "node:assert/strict";
import { test } from "node:test";
import { formspreeEndpoint, submitEnquiry } from "./submitEnquiry.js";

const fields = new URLSearchParams({
  FullName: "CoreD QA", CompanyName: "QA enquiry", CompanyEmail: "qa@example.test",
  ProjectDescription: "Synthetic test", ContactNumber: "+12025550138",
  CountryCode: "US", DialCode: "+1", ServiceId: "ai-powered-crm",
  ServiceSelection: "AI-Powered CRM", PlanId: "custom-crm", ChooseYourPlan: "Custom Multi-Agent CRM",
  DisplayedPrice: "By quote", PriceBasis: "quote", PriceAmount: "", PricingStatus: "proposed",
  BudgetAmount: "2000", BudgetCurrency: "INR", AddOnIds: "channel,migration",
  AddOns: "Extra channel; Data migration", BasicAgent: "", StandardAgent: "",
  RequestedScope: "", TermsAccepted: "yes", PrivacyAccepted: "yes", RequestId: "qa-request",
});
const request = (fetchRequest, extra = {}) => submitEnquiry({ formId: "qaformid", fields, token: "test-only-token", fetchRequest, ...extra });

test("only accepts a public Formspree form ID, never an arbitrary receiver URL", () => {
  assert.equal(formspreeEndpoint("qaformid"), "https://formspree.io/f/qaformid");
  for (const id of [undefined, "", "https://other.example/form", "../other", "bad?id"]) assert.equal(formspreeEndpoint(id), "");
});

test("sends all quote context and the provider's required Turnstile field", async () => {
  await request(async (url, options) => {
    assert.equal(url, "https://formspree.io/f/qaformid");
    for (const [key, value] of fields) assert.equal(options.body.get(key), value, key);
    assert.equal(options.body.get("email"), fields.get("CompanyEmail"));
    assert.equal(options.body.get("name"), fields.get("FullName"));
    assert.equal(options.body.get("message"), fields.get("ProjectDescription"));
    assert.equal(options.body.get("subject"), "CoreD · Project enquiry");
    assert.equal(options.body.get("cf-turnstile-response"), "test-only-token");
    assert.equal(options.body.has("turnstileToken"), false);
    assert.equal(options.credentials, "omit");
    assert.equal(options.headers.Accept, "application/json");
    assert.equal(options.method, "POST");
    return { ok: true, status: 200, json: async () => ({ ok: true }) };
  });
});

test("missing endpoint or security token prevents a network request", async () => {
  let calls = 0;
  const fetchRequest = async () => { calls++; };
  await assert.rejects(request(fetchRequest, { formId: "" }), /not connected/);
  await assert.rejects(request(fetchRequest, { token: "" }), /security verification/);
  assert.equal(calls, 0);
});

test("Formshield accepts no CAPTCHA token and preserves quotation details", async () => {
  const formFields = new URLSearchParams(fields);
  formFields.set("cf-turnstile-response", "stale-token");
  formFields.set("turnstileToken", "legacy-token");
  await request(async (_url, options) => {
    for (const [key, value] of fields) assert.equal(options.body.get(key), value, key);
    assert.equal(options.body.has("cf-turnstile-response"), false);
    assert.equal(options.body.has("turnstileToken"), false);
    assert.equal(options.body.get("_gotcha"), "");
    return { ok: true, status: 200, json: async () => ({ ok: true }) };
  }, { fields: formFields, token: "", protection: "formshield" });
});

test("unknown protection mode fails closed before sending", async () => {
  let calls = 0;
  await assert.rejects(request(async () => { calls++; }, { protection: "unknown" }), /not connected/);
  assert.equal(calls, 0);
});

test("Formshield validation errors do not ask for an absent CAPTCHA", async () => {
  await assert.rejects(request(async () => ({ ok: false, status: 422, json: async () => ({}) }), {
    protection: "formshield", token: "",
  }), (error) => error.message.includes("Check the fields") && !error.message.includes("verification"));
});

test("does not claim success for an unexpected 2xx response or legacy Google receipt", async () => {
  for (const receipt of [{ success: true }, { ok: false }, {}, "Success: Data added to Google Sheet"]) {
    await assert.rejects(request(async () => ({ ok: true, status: 200, json: async () => receipt })), /confirm receipt/);
  }
  await assert.rejects(request(async () => ({ ok: true, status: 200, json: async () => { throw new Error("HTML response"); } })), /confirm receipt/);
});

test("reports provider validation and limits without exposing returned field values", async () => {
  for (const status of [400, 422]) await assert.rejects(request(async () => ({ ok: false, status, json: async () => ({ errors: [{ message: "private submitted value" }] }) })), /Check the fields/);
  await assert.rejects(request(async () => ({ ok: false, status: 429, json: async () => ({}) })), /try later/);
});

test("does not retry uncertain network failures or rejected server responses", async () => {
  let calls = 0;
  await assert.rejects(request(async () => { calls++; throw new Error("private network details"); }), /confirm receipt/);
  assert.equal(calls, 1);
  await assert.rejects(request(async () => ({ ok: false, status: 503, json: async () => ({ ok: true }) })), /confirm receipt/);
});
