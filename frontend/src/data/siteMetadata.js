import { articleImage, articles } from "./articles.js";
import { portfolioCaseStudies } from "./PortfolioData.js";

export const siteName = "CoreD";
export const homeDescription = "CoreD builds AI agents and CRM automation for businesses and provides cybersecurity assessments, fixes and device protection.";
const routes = {
  "/": ["AI, Automation and Cybersecurity for Businesses", homeDescription],
  "/services": ["AI, Automation & Cybersecurity Services", "Compare CoreD’s proposed USD plans for AI-powered CRM, agents, consulting, AI security and cybersecurity. Request a fixed-scope or custom quote."],
  "/see-our-work": ["CRM Case Studies & Cybersecurity Sample", "See CoreD’s CRM project work with real screenshots and documented scope, plus a clearly labeled sample cybersecurity assessment."],
  "/blog": ["CoreD Journal: AI, CRM & Cybersecurity", "Practical guides to AI agents, CRM automation, WhatsApp and email follow-ups, and security reviews."],
  "/faq": ["Frequently Asked Questions", "Learn how CoreD scopes AI, CRM and cybersecurity work, what proposed pricing includes and how to request a quote."],
  "/contact": ["Contact CoreD", "Tell CoreD what you need to automate, build or protect. Share your workflow, current systems and the scope of your enquiry."],
  "/termsCondition": ["Terms & Conditions", "How CoreD handles quote requests, scope, pricing, third-party costs, authorized testing and support."],
  "/pricingPolicy": ["Pricing Policy", "CoreD’s proposed USD plan prices, written quotes, Indian billing and GST, provider costs, payment stages, cancellations and refunds."],
  "/privacyPolicy": ["Privacy Policy", "What CoreD collects through contact, quote and assistant flows, why it is used and which providers handle it."],
};
const aliases = { "/reach-us": "/contact", "/seeourwork": "/see-our-work", "/case-studies": "/see-our-work", "/pricing-policy": "/pricingPolicy" };

const normalize = (path) => (path.replace(/\/+$/, "") || "/").toLowerCase();
const routeKeys = Object.keys(routes);
export const staticPaths = [
  ...routeKeys, "/reach-us", "/seeOurWork", "/case-studies", "/pricing-policy",
  ...articles.map(({ slug }) => `/blog/${slug}`),
  ...portfolioCaseStudies.map(({ id }) => `/case-studies/${id}`),
];

export function resolveMetadata(pathname) {
  const normalized = normalize(pathname);
  const canonicalPath = aliases[normalized] || routeKeys.find((path) => normalize(path) === normalized);
  if (canonicalPath) {
    const [title, description] = routes[canonicalPath];
    return { title: `${title} | CoreD`, description, path: canonicalPath,
      ...(["/termsCondition", "/pricingPolicy"].includes(canonicalPath) && { noindex: true }) };
  }
  const article = articles.find(({ slug }) => normalized === `/blog/${slug}`);
  if (article) return {
    title: `${article.title} | CoreD Journal`, description: article.description, image: articleImage(article), path: `/blog/${article.slug}`,
    article: { "@type": "BlogPosting", headline: article.title, description: article.description,
      publisher: { "@type": "Organization", name: siteName },
      ...(article.author && { author: { "@type": "Person", name: article.author } }),
      ...(article.date && { datePublished: article.date }),
    },
  };
  const project = portfolioCaseStudies.find(({ id }) => normalized === `/case-studies/${id.toLowerCase()}`);
  if (project) return { title: `${project.isSample ? "Sample Case Study" : project.client}: ${project.title} | CoreD`,
    description: project.summary, path: `/case-studies/${project.id}`, image: project.screenshots[0].src };
  return { title: "Page not found | CoreD", description: homeDescription, noindex: true };
}

export function normalizeSiteOrigin(value) {
  if (!value) return "";
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password ? url.origin : "";
  } catch { return ""; }
}

export function structuredData(metadata, origin) {
  if (metadata.article) return { "@context": "https://schema.org", ...metadata.article,
    ...(origin && { mainEntityOfPage: origin + metadata.path, url: origin + metadata.path,
      ...(metadata.image && { image: origin + metadata.image }) }),
  };
  if (metadata.path === "/") return { "@context": "https://schema.org", "@type": "Organization",
    name: siteName, description: homeDescription, email: "info@coredhristi.com",
    ...(origin && { url: origin, logo: origin + "/Images/coreD.svg" }),
  };
  return null;
}
