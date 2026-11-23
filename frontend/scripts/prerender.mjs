import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createServer, loadEnv } from "vite";

const output = path.resolve("dist");
const template = await readFile(path.join(output, "index.html"), "utf8");
const server = await createServer({ mode: "production", logLevel: "error", server: { middlewareMode: true, hmr: false, watch: null } });
const escape = (text) => String(text).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

try {
  const { metadataTags, normalizeSiteOrigin, renderPage, resolveMetadata, searchDocuments, staticPaths, structuredData } = await server.ssrLoadModule("/src/entry-static.jsx");
  const origin = normalizeSiteOrigin(process.env.VITE_SITE_URL || loadEnv("production", process.cwd()).VITE_SITE_URL);
  const sitemap = new Set();
  const buildHtml = (url) => {
    const data = resolveMetadata(url);
    const canonical = origin && data.path ? origin + data.path : "";
    if (canonical && !data.noindex) sitemap.add(canonical);
    const schema = structuredData(data, origin);
    const head = [
      `<title>${escape(data.title)}</title>`,
      ...metadataTags(data, origin).filter(([, , value]) => value).map(([key, name, value]) => `<meta ${key}="${name}" content="${escape(value)}">`),
      canonical && `<link rel="canonical" href="${escape(canonical)}">`,
      schema && `<script id="page-schema" type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>`,
    ].filter(Boolean).join("\n    ");
    const alias = data.path && url !== data.path && url !== "/reach-us";
    const content = renderPage(alias ? data.path : url);
    return template.replace(/<!-- page-metadata:start -->[\s\S]*?<!-- page-metadata:end -->/, () => head)
      .replace('<div id="root"></div>', () => `<div id="root">${content}</div>`);
  };

  for (const url of staticPaths) {
    const directory = path.join(output, url.replace(/^\//, ""));
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, "index.html"), buildHtml(url));
  }
  await writeFile(path.join(output, "404.html"), buildHtml("/not-found"));
  // Keep the standalone confirmation page available at its clean main-domain URL.
  await mkdir(path.join(output, "thank-you"), { recursive: true });
  await writeFile(path.join(output, "thank-you", "index.html"), await readFile(path.join(output, "thank-you.html"), "utf8"));
  await writeFile(path.join(output, "robots.txt"), `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ""}`);
  for (const [file, content] of Object.entries(searchDocuments(origin))) await writeFile(path.join(output, file), content);
  if (origin) await writeFile(path.join(output, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...sitemap].map((url) => `\n  <url><loc>${escape(url)}</loc></url>`).join("")}\n</urlset>\n`);
  console.log(`Pre-rendered ${staticPaths.length} pages${origin ? " and wrote sitemap.xml" : " (set VITE_SITE_URL for canonical URLs and a sitemap)"}.`);
} finally { await server.close(); }
