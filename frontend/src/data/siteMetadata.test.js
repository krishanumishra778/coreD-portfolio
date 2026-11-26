import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
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

test("the tab icon and the Organization logo are the approved CoreD PNG", () => {
  const png = "/Images/ChatWindow.png";
  assert.ok(existsSync(new URL("../.." + "/public" + png, import.meta.url)), "the PNG ships in public/");
  for (const file of ["../../index.html", "../../public/thank-you.html"]) {
    const icons = [...readFileSync(new URL(file, import.meta.url), "utf8").matchAll(/<link\s[^>]*rel="icon"[^>]*>/g)].map((m) => m[0]);
    assert.equal(icons.length, 1, file + " has exactly one rel=icon");
    assert.match(icons[0], /type="image\/png"/);
    assert.match(icons[0], new RegExp('href="' + png + '"'));
  }
  const home = structuredData(resolveMetadata("/"), origin);
  const organization = home["@graph"].find((node) => node["@type"] === "Organization");
  assert.equal(organization.logo, origin + png);
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

test("booking and Cloud Partners routes exist only when their build switches are on", () => {
  // Plain Node has no import.meta.env, so both switches are off here: no pre-rendered pages, no sitemap entries.
  for (const path of ["/book-appointment", "/cloud-partners", "/cloud-partners/some-provider"]) {
    assert.ok(!staticPaths.includes(path), path);
    assert.equal(resolveMetadata(path).noindex, true, path);
    assert.equal(resolveMetadata(path).title, "Page not found | CoreD", path);
  }
});
