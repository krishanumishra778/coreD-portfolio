import { SERVICES, addOns, basicAgents, formatPrice, getServicePlans, securityServices, standardAgents } from "../services/servicesData.js";
import { allowedModuleIds, crmModules } from "../services/crmModules.js";
import { budgetCurrencies } from "../../data/contactOptions.js";

// Resolve submitted selections against the same catalogue used by pricing and the form.
export function quoteSelection({ serviceId, planId, fields, scopeId = "" }) {
  const service = SERVICES.find(({ id }) => id === serviceId);
  const plan = getServicePlans(service).find(({ id }) => id === planId);
  const needsQuote = plan?.basis === "quote";
  const moduleIds = allowedModuleIds(serviceId, fields.getAll("ModuleIds"));
  const selectedModules = crmModules.filter(({ id }) => moduleIds.includes(id));
  const customScope = needsQuote || selectedModules.length > 0;
  const value = (name, limit = 300) => String(fields.get(name) ?? "").trim().slice(0, limit);
  const budget = customScope ? value("BudgetAmount", 30) : "";
  const currency = customScope ? value("BudgetCurrency", 3) : "";
  if (budget && (!Number.isFinite(Number(budget)) || Number(budget) <= 0 || !budgetCurrencies.some(({ code }) => code === currency))) {
    throw new Error("Enter a positive budget and choose its currency.");
  }
  const selectedAddOns = [...new Set(fields.getAll("AddOnIds"))].filter((id) => service?.addOns.includes(id));
  const agentChoice = (type, options) => plan?.choices?.includes(type)
    ? options.find(([id]) => id === value(type === "basic" ? "BasicAgent" : "StandardAgent"))?.[1] ?? "" : "";
  return {
    ServiceId: service?.id ?? "", ServiceSelection: service?.label ?? "Help me choose",
    PlanId: plan?.id ?? "", ChooseYourPlan: plan?.name ?? "Help me choose",
    DisplayedPrice: plan ? formatPrice(plan) : "Not selected", PriceBasis: plan?.basis ?? "",
    PriceAmount: plan?.amount == null ? "" : String(plan.amount), Currency: "USD", PricingStatus: "proposed",
    QuoteStatus: needsQuote ? "Scope review required; price to be confirmed in a written quote" : selectedModules.length ? "Listed package price only; custom module scope and additional price to be confirmed" : plan ? "Listed plan scope; extras quoted separately" : "Help me choose",
    BudgetRange: budget ? budget + " " + currency : "Not provided", BudgetAmount: budget, BudgetCurrency: currency,
    BudgetScope: needsQuote ? "Whole quoted project" : selectedModules.length ? "Additional custom modules" : "",
    AddOnIds: selectedAddOns.join(","), AddOns: selectedAddOns.map((id) => addOns[id]).join("; "),
    ModuleIds: moduleIds.join(","), RequestedModules: selectedModules.map(({ name }) => name).join("; "),
    ModulePricing: selectedModules.length ? "By quote; additional scope only; overlapping package work charged once" : "",
    BasicAgent: agentChoice("basic", basicAgents), StandardAgent: agentChoice("standard", standardAgents),
    RequestedScope: serviceId === "cybersecurity" ? securityServices.find(({ id, planId: targetPlan }) => id === scopeId && targetPlan === plan?.id)?.name ?? "" : "",
    CurrentSystems: needsQuote || selectedModules.length ? value("CurrentSystems") : "",
    RequestedIntegrations: needsQuote || selectedModules.length ? value("RequestedIntegrations") : "",
    RequestedVolume: customScope ? value("RequestedVolume") : "",
    TargetTimeline: customScope ? value("TargetTimeline", 120) : "",
  };
}
