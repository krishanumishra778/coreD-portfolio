import assert from "node:assert/strict";
import { test } from "node:test";
import { breadcrumbs, metadataTags, resolveMetadata, staticPaths, structuredData } from "./siteMetadata.js";
import { searchDocuments } from "./searchDocuments.js";
import { SERVICES, formatPrice, getServicePlans } from "../components/services/servicesData.js";

const origin = "https://coredhristi.com";

test("each service has a canonical landing page; old query links resolve without leaking other fields", () => {
  for (const service of SERVICES) {
    const path = "/services/" + service.id;
    assert.ok(staticPaths.includes(path));
    assert.equal(resolveMetadata(path).service.id, service.id);
    assert.equal(resolveMetadata("/services", `?service=${service.id}&email=private@example.test`).path, path);
    assert.equal(breadcrumbs(resolveMetadata(path))[1].path, "/services");
  }
  assert.equal(resolveMetadata("/services/unlisted").noindex, true);
});

test("indexable pages carry the correct identity, sharing image and unique schema IDs", () => {
  assert.match(resolveMetadata("/").title, /CoreDhristi/);
  assert.match(resolveMetadata("/").description, /services division of CoreDhristi LLP/);
  assert.ok(staticPaths.includes("/about"));
  assert.equal(structuredData(resolveMetadata("/about"), origin)["@graph"].find(n => n["@id"] === origin + "/about#webpage")["@type"], "AboutPage");
  for (const path of staticPaths) {
    const metadata = resolveMetadata(path);
    const graph = structuredData(metadata, origin);
    if (metadata.noindex) { assert.equal(graph, null); continue; }
    const ids = graph["@graph"].map(item => item["@id"]);
    assert.equal(new Set(ids).size, ids.length, path);
    const page = graph["@graph"].find(item => item["@id"] === origin + metadata.path + "#webpage");
    assert.equal(page.url, origin + metadata.path, path);
    assert.ok(metadataTags(metadata, origin).find(([, name, value]) => name === "og:image" && value.startsWith(origin + "/Images/")), path);
    assert.equal(graph["@graph"][0].parentOrganization.identifier, "ADC-9115");
    assert.ok(!JSON.stringify(graph).includes("cored.coredhristi.com"));
  }
});

test("editorial schema does not invent a person, publication date, ratings or a fixed quote price", () => {
  const article = resolveMetadata("/blog/ai-agent-first-workflow");
  assert.equal(article.article.author["@type"], "Organization");
  assert.equal(article.article.datePublished, undefined);
  assert.equal(structuredData(resolveMetadata("/not-found"), origin), null);
  const graph = JSON.stringify(structuredData(resolveMetadata("/services/cybersecurity"), origin));
  assert.ok(!/aggregateRating|reviewRating|"price"/.test(graph));
});

test("plain-text price references stay aligned with the actual package catalogue", () => {
  const docs = searchDocuments(origin);
  for (const service of SERVICES) {
    assert.ok(docs["llms.txt"].includes(origin + "/services/" + service.id));
    for (const pkg of getServicePlans(service)) {
      assert.ok(docs["pricing.md"].includes(`### ${pkg.tier}: ${pkg.name}`));
      assert.ok(docs["pricing.md"].includes(`Price: ${formatPrice(pkg)}`));
      assert.ok(docs["pricing.md"].includes(pkg.boundary));
    }
  }
  assert.deepEqual(searchDocuments(""), {});
});
