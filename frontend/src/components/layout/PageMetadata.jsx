import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { normalizeSiteOrigin, resolveMetadata, structuredData } from "../../data/siteMetadata.js";

export default function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const metadata = resolveMetadata(pathname);
    const origin = normalizeSiteOrigin(import.meta.env.VITE_SITE_URL);
    document.title = metadata.title;
    const setHead = (selector, tag, attributes) => {
      let node = document.head.querySelector(selector);
      if (!attributes) { node?.remove(); return null; }
      if (!node) { node = document.createElement(tag); document.head.append(node); }
      Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
      return node;
    };
    const meta = (key, name, content) => setHead(`meta[${key}="${name}"]`, "meta", content ? { [key]: name, content } : null);
    meta("name", "description", metadata.description);
    meta("name", "robots", metadata.noindex ? "noindex, follow" : null);
    meta("property", "og:title", metadata.title);
    meta("property", "og:description", metadata.description);
    meta("property", "og:type", metadata.article ? "article" : "website");
    const canonical = origin && metadata.path ? origin + metadata.path : null;
    setHead('link[rel="canonical"]', "link", canonical ? { rel: "canonical", href: canonical } : null);
    meta("property", "og:url", canonical);
    meta("property", "og:image", origin && metadata.image ? origin + metadata.image : null);
    const data = structuredData(metadata, origin);
    const script = setHead("#page-schema", "script", data ? { id: "page-schema", type: "application/ld+json" } : null);
    if (script) script.textContent = JSON.stringify(data);
  }, [pathname]);
  return null;
}
