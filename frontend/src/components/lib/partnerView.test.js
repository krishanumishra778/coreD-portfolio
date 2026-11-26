import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bestFitLabel, categoryOf, cleanReviews, currentOffer, hashtag, initials, offerExpiry, outboundLink, paragraphs, partnerHighlights, reviewSource, verifiedMetrics } from "./partnerView.js";

const offer = { title: "BFCM", body: "Sign up by December 4, 2026 and enter BFCM802.", code: "BFCM802", verified: true };

describe("partner view model", () => {
  it("takes highlights from the CRM, else short strengths, max three", () => {
    assert.deepEqual(partnerHighlights({ details: { highlights: ["a", "b", "c", "d"] } }), ["a", "b", "c"]);
    assert.deepEqual(partnerHighlights({ details: { pros: ["short one", "x".repeat(120), "short two"] } }), ["short one", "short two"]);
    assert.deepEqual(partnerHighlights({}), []);
  });
  it("builds the best-fit label and category", () => {
    assert.equal(bestFitLabel({ details: { best_for: "teams on WordPress" } }), "Best for teams on WordPress");
    assert.equal(bestFitLabel({ details: { best_for: "Best for GPUs" } }), "Best for GPUs");
    assert.equal(bestFitLabel({ details: {} }), "");
    assert.equal(categoryOf({ tags: ["demo", "Managed Hosting"] }), "Managed Hosting");
  });
  it("shows only verified metrics", () => {
    const m = [{ label: "a", value: "1", verified: true }, { label: "b", value: "2", verified: false }, { label: "c", value: "3" }, { label: "", value: "4", verified: true }];
    assert.deepEqual(verifiedMetrics({ details: { metrics: m } }), [m[0]]);
  });
  it("shows an offer only when verified and not expired", () => {
    const now = new Date(2026, 10, 26);
    assert.strictEqual(currentOffer({ details: { offer } }, now), offer);
    assert.equal(currentOffer({ details: { offer: { ...offer, verified: false } } }, now), null);
    assert.equal(currentOffer({ details: { offer: { ...offer, verified: "true" } } }, now), null);
    assert.strictEqual(currentOffer({ details: { offer } }, new Date(2026, 11, 4, 23, 0)), offer);
    assert.equal(currentOffer({ details: { offer } }, new Date(2026, 11, 5, 0, 1)), null);
    assert.notEqual(currentOffer({ details: { offer: { ...offer, expires_on: "2027-01-31" } } }, new Date(2026, 11, 20)), null);
    assert.equal(currentOffer({ details: { offer: { ...offer, expires_on: "2026-11-01" } } }, now), null);
    assert.equal(currentOffer({ details: { offer: { verified: true } } }, now), null);
    assert.equal(currentOffer({}, now), null);
    assert.equal(offerExpiry({ body: "no date here" }), null);
  });
  it("keeps the affiliate URL untouched, tracking id included", () => {
    assert.deepEqual(outboundLink({ affiliate_url: "https://www.cloudways.com/en/?id=2206406", website_url: "https://www.cloudways.com/en/" }), { href: "https://www.cloudways.com/en/?id=2206406", affiliate: true });
    assert.deepEqual(outboundLink({ website_url: "https://x.test" }), { href: "https://x.test", affiliate: false });
    assert.equal(outboundLink({}), null);
  });
  it("splits the description into paragraphs", () => {
    assert.deepEqual(paragraphs("One\r\nstill one.\r\n\r\nTwo.\n\n\nThree."), ["One still one.", "Two.", "Three."]);
    assert.deepEqual(paragraphs(null), []);
  });
  it("cleans reviews and labels G2/Trustpilot summaries", () => {
    const rs = cleanReviews({ details: { reviews: [{ author: "A", role: "G2, incentivized", rating: 5, text: "Review summary: ok" }, { author: "B", role: "", rating: 4.5, text: "t" }, { author: "", text: "no name" }, { author: "C", text: "" }] } });
    assert.deepEqual(rs.map((r) => r.author), ["A", "B"]);
    assert.equal(rs[1].rating, null);
    assert.equal(reviewSource(rs[0]), "G2 summary");
    assert.equal(reviewSource({ role: "Trustpilot, unprompted review", text: "Review summary: x" }), "Trustpilot summary");
    assert.equal(reviewSource({ role: "CTO, Acme", text: "Review summary: x" }), "");
    assert.equal(reviewSource({ role: "G2", text: "Loved it" }), "");
  });
  it("makes initials and hashtags", () => {
    assert.equal(initials("Steve V."), "SV");
    assert.equal(initials(""), "");
    assert.equal(hashtag("Managed Hosting"), "#ManagedHosting");
    assert.equal(hashtag("AI Agents"), "#AIAgents");
  });
});
