import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("dist");
const htmlFiles = [];
async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const location = path.join(directory, entry.name);
    if (entry.isDirectory()) await collect(location);
    else if (entry.name.endsWith(".html")) htmlFiles.push(location);
  }
}
await collect(root);

const checked = new Set();
const issues = [];
async function checkExactPath(pathname, source) {
  let decoded;
  try { decoded = decodeURIComponent(pathname); } catch { issues.push(`${source}: malformed URL ${pathname}`); return; }
  if (checked.has(decoded)) return;
  checked.add(decoded);
  let location = root;
  for (const segment of decoded.split("/").filter(Boolean)) {
    if (segment === "." || segment === ".." || /[\\\0]/.test(segment)) {
      issues.push(`${source}: unsafe local path ${pathname}`);
      return;
    }
    let entries;
    try { entries = await readdir(location); } catch { issues.push(`${source}: missing parent for ${pathname}`); return; }
    if (!entries.includes(segment)) {
      const actual = entries.find((entry) => entry.toLowerCase() === segment.toLowerCase());
      issues.push(`${source}: ${actual ? `case mismatch (${segment} / ${actual})` : "missing file or route"}: ${pathname}`);
      return;
    }
    location = path.join(location, segment);
  }
  if ((await stat(location)).isDirectory()) {
    const entries = await readdir(location);
    if (!entries.includes("index.html")) issues.push(`${source}: directory without index.html: ${pathname}`);
  }
}

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const relative = path.relative(root, file).split(path.sep).join("/");
  const page = new URL(relative, "https://static-build.invalid/");
  for (const [, value] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (value.startsWith("#")) continue;
    let url;
    try { url = new URL(value.replaceAll("&amp;", "&"), page); } catch { issues.push(`${relative}: invalid URL ${value}`); continue; }
    if (url.origin === page.origin) await checkExactPath(url.pathname, relative);
  }
}
await checkExactPath("/.htaccess", "deployment");
await checkExactPath("/404.html", "deployment");
assert.equal(issues.length, 0, issues.join("\n"));
console.log(`Static hosting check passed: ${htmlFiles.length} HTML files, ${checked.size} local paths, exact filename case and deployment files.`);
