import { articleImage, articles } from "./articles.js";
import { portfolioCaseStudies } from "./PortfolioData.js";
import { SERVICES } from "../components/services/servicesData.js";
import { websiteFaq } from "./KnowledgeBaseExpanded.js";

export const siteName = "CoreD";
export const homeDescription = "CoreD, a services division of CoreDhristi LLP, builds AI-powered CRM workflows, AI agents and automation, and provides scoped cybersecurity services.";
export const defaultImage = "/Images/hero/cored-robot-background.webp";
const routes = {
  "/": ["CoreDhristi: AI CRM, AI Agents & Cybersecurity", homeDescription],
  "/about": ["About CoreD & CoreDhristi LLP", "CoreD is the services division of CoreDhristi LLP. Learn about its AI CRM, agent, automation, consulting and cybersecurity work, and how to contact the team."],
  "/services": ["Services & Pricing: AI, Automation & Cybersecurity", "Compare CoreD’s USD setup prices, Basic and Standard AI agent options, CRM integrations, consulting deliverables and cybersecurity scope. Request a written quote."],
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
  ...SERVICES.map(({ id }) => `/services/${id}`),
  ...articles.map(({ slug }) => `/blog/${slug}`),
  ...portfolioCaseStudies.map(({ id }) => `/case-studies/${id}`),
];

export function resolveMetadata(pathname, search = "") {
  const normalized = normalize(pathname);
  const service = SERVICES.find(({ id }) => normalized === `/services/${id}` ||
    (normalized === "/services" && new URLSearchParams(search).get("service") === id));
  if (service) return { title: `${service.label} Pricing & Scope | CoreD`, label: service.label,
    description: service.intro, path: `/services/${service.id}`, service };
  const canonicalPath = aliases[normalized] || routeKeys.find((path) => normalize(path) === normalized);
  if (canonicalPath) {
    const [title, description] = routes[canonicalPath];
    return { title: `${title} | CoreD`, label: title, description, path: canonicalPath,
      ...(["/termsCondition", "/pricingPolicy"].includes(canonicalPath) && { noindex: true }) };
  }
  const article = articles.find(({ slug }) => normalized === `/blog/${slug}`);
  if (article) return {
    title: `${article.title} | CoreD Journal`, label: article.title, description: article.description, image: articleImage(article), imageAlt: article.imageAlt, path: `/blog/${article.slug}`,
    article: { "@type": "BlogPosting", headline: article.title, description: article.description,
      publisher: { "@type": "Organization", name: siteName },
      author: article.author ? { "@type": "Person", name: article.author } : { "@type": "Organization", name: siteName },
      ...(article.date && { datePublished: article.date }),
    },
  };
  const project = portfolioCaseStudies.find(({ id }) => normalized === `/case-studies/${id.toLowerCase()}`);
  if (project) return { title: `${project.isSample ? "Sample Case Study" : project.client}: ${project.title} | CoreD`,
    label: project.isSample ? "Sample security assessment" : project.client,
    description: project.summary, path: `/case-studies/${project.id}`, image: project.screenshots[0].src, imageAlt: project.screenshots[0].alt };
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
  if (!origin || !metadata.path || metadata.noindex) return null;
  const url = origin + metadata.path;
  const organization = { "@type": "Organization", "@id": origin + "/#organization", name: siteName,
    alternateName: "CoreD by CoreDhristi", description: homeDescription, url: origin + "/", logo: origin + "/Images/coreD.svg",
    email: "info@coredhristi.com", sameAs: ["https://www.linkedin.com/company/coredhristi/"],
    parentOrganization: { "@type": "Organization", name: "CoreDhristi LLP", identifier: "ADC-9115" },
    contactPoint: [
      { "@type": "ContactPoint", contactType: "sales", email: "info@coredhristi.com" },
      { "@type": "ContactPoint", contactType: "customer support", email: "support@coredhristi.com" },
    ],
  };
  const website = { "@type": "WebSite", "@id": origin + "/#website", url: origin + "/", name: siteName,
    publisher: { "@id": organization["@id"] }, inLanguage: "en" };
  const page = { "@type": metadata.path === "/faq" ? "FAQPage" : metadata.path === "/contact" ? "ContactPage" : metadata.path === "/about" ? "AboutPage"
    : ["/blog", "/see-our-work"].includes(metadata.path) ? "CollectionPage" : "WebPage",
    "@id": url + "#webpage", url, name: metadata.title, description: metadata.description,
    isPartOf: { "@id": website["@id"] }, about: { "@id": organization["@id"] }, inLanguage: "en" };
  const graph = [organization, website, page];
  if (metadata.path !== "/") {
    const trail = breadcrumbs(metadata);
    const breadcrumb = { "@type": "BreadcrumbList", "@id": url + "#breadcrumb",
      itemListElement: trail.map((item, index) => ({ "@type": "ListItem", position: index + 1,
        name: item.name, item: origin + item.path })) };
    page.breadcrumb = { "@id": breadcrumb["@id"] };
    graph.push(breadcrumb);
  }
  if (metadata.article) graph.push({ ...metadata.article, "@id": url + "#article", url,
    publisher: { "@id": organization["@id"] },
    author: metadata.article.author["@type"] === "Organization" ? { "@id": organization["@id"] } : metadata.article.author,
    mainEntityOfPage: { "@id": page["@id"] }, image: origin + metadata.image, inLanguage: "en" });
  if (metadata.path === "/faq") page.mainEntity = websiteFaq.map(({ question, answer }) => ({
    "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer },
  }));
  if (metadata.service) page.mainEntity = { "@type": "Service", name: metadata.service.label,
    serviceType: metadata.service.label, description: metadata.service.intro, url,
    provider: { "@id": organization["@id"] } };
  else if (metadata.path === "/services") page.mainEntity = { "@type": "ItemList", name: "CoreD services",
    itemListElement: SERVICES.map((service, index) => ({ "@type": "ListItem", position: index + 1,
      item: { "@type": "Service", name: service.label, serviceType: service.label, description: service.intro,
        url: origin + "/services/" + service.id, provider: { "@id": organization["@id"] } } })) };
  return { "@context": "https://schema.org", "@graph": graph };
}

export function breadcrumbs(metadata) {
  if (!metadata.path || metadata.path === "/") return [];
  const trail = [{ name: "Home", path: "/" }];
  if (metadata.article) trail.push({ name: "Journal", path: "/blog" });
  else if (metadata.service) trail.push({ name: "Services & Pricing", path: "/services" });
  else if (metadata.path.startsWith("/case-studies/")) trail.push({ name: "See Our Work", path: "/see-our-work" });
  trail.push({ name: metadata.label || metadata.title.replace(/ \| CoreD.*$/, ""), path: metadata.path });
  return trail;
}

// Shared by the static HTML and client navigation so crawlers and visitors agree.
export function metadataTags(metadata, origin) {
  const image = origin ? origin + (metadata.image || defaultImage) : null;
  return [
    ["name", "description", metadata.description],
    ["name", "robots", metadata.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"],
    ["property", "og:title", metadata.title], ["property", "og:description", metadata.description],
    ["property", "og:type", metadata.article ? "article" : "website"], ["property", "og:site_name", siteName],
    ["property", "og:url", origin && metadata.path ? origin + metadata.path : null],
    ["property", "og:image", image], ["property", "og:image:alt", image ? metadata.imageAlt || "CoreD — AI, CRM automation and cybersecurity services" : null],
    ["name", "twitter:card", "summary_large_image"], ["name", "twitter:title", metadata.title],
    ["name", "twitter:description", metadata.description], ["name", "twitter:image", image],
  ];
}
