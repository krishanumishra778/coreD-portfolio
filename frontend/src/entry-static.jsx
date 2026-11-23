import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App.jsx";

export { metadataTags, normalizeSiteOrigin, resolveMetadata, staticPaths, structuredData } from "./data/siteMetadata.js";
export { searchDocuments } from "./data/searchDocuments.js";

export function renderPage(url) {
  return renderToString(<StaticRouter location={url}><App /></StaticRouter>);
}
