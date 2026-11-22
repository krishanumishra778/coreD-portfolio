import assert from "node:assert/strict";
import { test } from "node:test";
import { quoteSelection } from "./quoteSelection.js";
import { SERVICES, getServicePlans, quoteLink } from "../services/servicesData.js";
import { allowedModuleIds, crmAddOnGroups } from "../services/crmModules.js";

const fields = () => new URLSearchParams({
  BudgetAmount: "2000", BudgetCurrency: "INR", CurrentSystems: "Existing CRM",
  RequestedIntegrations: "Calendar and WhatsApp", RequestedVolume: "Two workflows",
  TargetTimeline: "Next month", BasicAgent: "website-chatbot", StandardAgent: "ai-chatbot",
});

test("every By quote plan accepts budget and scope without inventing a fixed amount", () => {
  for (const service of SERVICES) for (const plan of getServicePlans(service).filter(({ basis }) => basis === "quote")) {
    const result = quoteSelection({ serviceId: service.id, planId: plan.id, fields: fields() });
    assert.equal(result.DisplayedPrice, "By quote", plan.id);
    assert.equal(result.PriceBasis, "quote");
    assert.equal(result.PriceAmount, "");
    assert.equal(result.BudgetRange, "2000 INR");
    assert.equal(result.CurrentSystems, "Existing CRM");
    assert.equal(result.RequestedVolume, "Two workflows");
    assert.match(result.QuoteStatus, /Scope review required/);
  }
});

test("custom module IDs and names survive into the enquiry; unknown and duplicate choices do not", () => {
  const form = fields();
  for (const id of ["meeting-capture", "mom-creation", "employee-policy", "supplier-invoices", "operations-intake", "mom-creation", "unknown"]) form.append("ModuleIds", id);
  form.append("AddOnIds", "channel"); form.append("AddOnIds", "channel"); form.append("AddOnIds", "invalid");
  const result = quoteSelection({ serviceId: "ai-powered-crm", planId: "custom-crm", fields: form });
  assert.equal(result.ModuleIds.split(",").length, 5);
  assert.match(result.RequestedModules, /Meeting Capture Agent/);
  assert.match(result.RequestedModules, /MOM Creation Assistant/);
  assert.match(result.RequestedModules, /Employee Policy Assistant/);
  assert.match(result.RequestedModules, /Supplier Invoice Processing Assistant/);
  assert.match(result.RequestedModules, /Operations Intake Agent/);
  assert.doesNotMatch(result.RequestedModules, /unknown/);
  assert.equal(result.AddOnIds, "channel");
  assert.match(result.ModulePricing, /overlapping package work charged once/);
});

test("numeric plans retain their catalogue price and reject stale quote-only fields", () => {
  const result = quoteSelection({ serviceId: "ai-agents", planId: "connected-agent", fields: fields() });
  assert.equal(result.DisplayedPrice, "From $1,200");
  assert.equal(result.PriceAmount, "1200");
  assert.equal(result.BudgetAmount, "");
  assert.equal(result.RequestedVolume, "");
  assert.equal(result.BasicAgent, "Website chatbot");
  assert.equal(result.StandardAgent, "AI chatbot");
});

test("service changes cannot leak AI modules or unrelated security scope into another service", () => {
  const form = fields(); form.append("ModuleIds", "meeting-capture");
  const result = quoteSelection({ serviceId: "cybersecurity", planId: "basic-cybersecurity", fields: form, scopeId: "endpoint" });
  assert.equal(result.ModuleIds, ""); assert.equal(result.RequestedModules, "");
  assert.equal(result.BasicAgent, ""); assert.equal(result.StandardAgent, "");
  assert.equal(result.RequestedScope, "");
  assert.equal(quoteSelection({ serviceId: "cybersecurity", planId: "antivirus-installation", fields: form, scopeId: "endpoint" }).RequestedScope, "Antivirus Installation");
});

test("a quoted add-on budget never replaces the numeric package price", () => {
  const form = fields(); form.append("ModuleIds", "meeting-capture");
  const result = quoteSelection({ serviceId: "ai-agents", planId: "connected-agent", fields: form });
  assert.equal(result.PriceAmount, "1200");
  assert.equal(result.DisplayedPrice, "From $1,200");
  assert.equal(result.BudgetRange, "2000 INR");
  assert.equal(result.BudgetScope, "Additional custom modules");
  assert.match(result.QuoteStatus, /additional price to be confirmed/);
  assert.match(result.ModulePricing, /By quote/);
});

test("invalid budgets fail validation while optional blank budgets remain valid", () => {
  for (const amount of ["-1", "NaN", "Infinity", "0"]) {
    const form = fields(); form.set("BudgetAmount", amount);
    assert.throws(() => quoteSelection({ serviceId: "cybersecurity", planId: "basic-cybersecurity", fields: form }), /positive budget/);
  }
  const form = fields(); form.set("BudgetCurrency", "ZZZ");
  assert.throws(() => quoteSelection({ serviceId: "ai-powered-crm", planId: "custom-crm", fields: form }), /currency/);
  form.set("BudgetAmount", "");
  assert.equal(quoteSelection({ serviceId: "ai-powered-crm", planId: "custom-crm", fields: form }).BudgetRange, "Not provided");
});

test("department CTA module selections round-trip through the shared catalogue", () => {
  const crm = SERVICES.find(({ id }) => id === "ai-powered-crm");
  const plan = crm.plans.find(({ id }) => id === "custom-crm");
  const allIds = crmAddOnGroups.flatMap(({ items }) => items.map(({ id }) => id));
  assert.equal(new Set(allIds).size, allIds.length);
  for (const group of crmAddOnGroups) {
    const url = new URL(quoteLink(crm, plan, undefined, group.items.map(({ id }) => id)), "https://example.test");
    assert.equal(url.searchParams.get("plan"), "custom-crm");
    assert.deepEqual(allowedModuleIds(crm.id, url.searchParams.getAll("module")), group.items.map(({ id }) => id));
  }
  assert.deepEqual(allowedModuleIds("cybersecurity", allIds), []);
});
