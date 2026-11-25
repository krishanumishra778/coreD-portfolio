import assert from "node:assert/strict";
import { test } from "node:test";
import { privacyPolicy } from "./PortfolioData.js";
import { privacyForCrm, privacyReplacementCount } from "./privacyCrm.js";

const text = (sections) => sections.flatMap((s) => s.paragraphs).join("\n");

test("base policy names Formspree; CRM wording replaces every mention and every replacement applied", () => {
  const base = text(privacyPolicy), crm = text(privacyForCrm(privacyPolicy));
  assert.ok(base.includes("Formspree"));
  assert.ok(!crm.includes("Formspree"), "no Formspree left in CRM wording");
  assert.equal(privacyForCrm(privacyPolicy).length, privacyPolicy.length);
  const applied = ["CoreD receives contact, quotation and assistant registration submissions directly in its own customer-relationship system", "are saved in CoreD’s CRM", "validates it with Cloudflare", "CoreD’s CRM host", "stored in CoreD’s CRM and email provider"].filter((x) => crm.includes(x)).length;
  assert.equal(applied, privacyReplacementCount);
  assert.ok(crm.includes("consent choices"), "mentions what is stored");
});
