import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { test } from "node:test";

const header = readFileSync(new URL("../../../index.html", import.meta.url), "utf8");
let sequence = 0;
async function fixture(saved) {
  const store = new Map(saved === undefined ? [] : [["cored-analytics-choice-v1", saved]]);
  const scripts = [];
  globalThis.document = {
    cookie: "", getElementById: (id) => scripts.find((s) => s.id === id),
    createElement: () => ({}), head: { appendChild: (s) => scripts.push(s) },
  };
  globalThis.window = {
    localStorage: { getItem: (key) => store.get(key) ?? null, setItem: (key, value) => store.set(key, value) },
    location: { origin: "https://www.coredhristi.com", hostname: "www.coredhristi.com", search: "?email=private@example.test", hash: "#private" },
  };
  const inline = header.match(/<script>([\s\S]*?)<\/script>/)[1];
  vm.runInNewContext(inline, { window, document, Date, dataLayer: window.dataLayer ?? (window.dataLayer = []) });
  const api = await import(`./analytics.js?fixture=${++sequence}`);
  return { api, scripts, events: window.dataLayer, store };
}

test("header establishes denied consent before a single valid GTM bootstrap", async () => {
  const { scripts, events } = await fixture();
  assert.equal(events[0][0], "consent");
  assert.equal(events[0][2].analytics_storage, "denied");
  assert.equal(events[0][2].ad_user_data, "denied");
  assert.equal(scripts.length, 0);
  window.loadCoreDTagManager(); window.loadCoreDTagManager();
  assert.equal(scripts.length, 1);
  assert.equal(scripts[0].src, "https://www.googletagmanager.com/gtm.js?id=GTM-PTCKWTKT");
  assert.equal(scripts[0].async, true);
  assert.equal(events.filter((event) => event.event === "gtm.js").length, 1);
  assert.equal(typeof events.find((event) => event.event === "gtm.js")["gtm.start"], "number");
});

test("no choice and rejection load no Google script and send no measurement events", async () => {
  const { api, scripts, events } = await fixture();
  assert.equal(api.analyticsChoice(), null);
  api.startAnalytics(); api.trackPage("/"); api.trackEnquiry("ai-agents", "connected-agent");
  api.chooseAnalytics(false); api.startAnalytics(); api.trackPage("/contact");
  assert.equal(scripts.length, 0);
  assert.equal(events.filter((event) => event.event).length, 0);
  assert.equal(api.analyticsChoice(), false);
});

test("approved measurement strips URL secrets, avoids duplicate pages and keeps enquiry PII out", async () => {
  const { api, scripts, events } = await fixture();
  api.chooseAnalytics(true);
  api.trackPage("/contact"); api.trackPage("/contact"); api.trackPage("/services");
  api.trackEnquiry("ai-agents", "connected-agent");
  assert.equal(scripts.length, 1);
  const views = events.filter((event) => event.event === "cored_page_view");
  assert.equal(views.length, 2);
  assert.equal(views[0].page_location, "https://www.coredhristi.com/contact");
  assert.equal(views[1].page_referrer, "https://www.coredhristi.com/contact");
  const lead = events.find((event) => event.event === "generate_lead");
  assert.deepEqual(lead, { event: "generate_lead", service_id: "ai-agents", plan_id: "connected-agent" });
  assert.doesNotMatch(JSON.stringify(events), /private@example|#private/);
});

test("expired, future or invalid choices require a new decision", async () => {
  for (const saved of ["broken", '{"allowed":"yes"}', JSON.stringify({ allowed: true, time: 0 }), JSON.stringify({ allowed: true, time: Date.now() + 60000 })]) {
    const { api, scripts } = await fixture(saved);
    assert.equal(api.analyticsChoice(), null);
    api.startAnalytics();
    assert.equal(scripts.length, 0);
  }
});

test("remembered consent can be withdrawn and prevents subsequent events", async () => {
  const { api, scripts, events, store } = await fixture(JSON.stringify({ allowed: true, time: Date.now() }));
  api.startAnalytics(); api.trackPage("/");
  assert.equal(scripts.length, 1);
  const eventCount = events.filter((event) => event.event).length;
  api.chooseAnalytics(false); api.trackPage("/services"); api.trackEnquiry("ai-agents", "connected-agent");
  assert.equal(events.filter((event) => event.event).length, eventCount);
  assert.equal(JSON.parse(store.get("cored-analytics-choice-v1")).allowed, false);
});
