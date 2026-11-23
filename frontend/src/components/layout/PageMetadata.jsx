import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { metadataTags, normalizeSiteOrigin, resolveMetadata, structuredData } from "../../data/siteMetadata.js";

export default function PageMetadata() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    const metadata = resolveMetadata(pathname, search);
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
    metadataTags(metadata, origin).forEach(([key, name, content]) => meta(key, name, content));
    const canonical = origin && metadata.path ? origin + metadata.path : null;
    setHead('link[rel="canonical"]', "link", canonical ? { rel: "canonical", href: canonical } : null);
    const data = structuredData(metadata, origin);
    const script = setHead("#page-schema", "script", data ? { id: "page-schema", type: "application/ld+json" } : null);
    if (script) script.textContent = JSON.stringify(data);
  }, [pathname, search]);
  return null;
}
