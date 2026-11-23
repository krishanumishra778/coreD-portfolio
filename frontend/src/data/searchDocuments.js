import { articles } from "./articles.js";
import { SERVICES, basicAgents, standardAgents, formatPrice, getServicePlans, leadForgeSupport } from "../components/services/servicesData.js";

// Optional plain-text references. The public HTML remains the primary content.
// Generate from the same catalogue as the website to prevent stale AI answers.
export function searchDocuments(origin) {
  if (!origin) return {};
  const pricing = [
    "# CoreD services and pricing", "",
    `Source: ${origin}/services`, "",
    "CoreD is the services division of CoreDhristi LLP (LLPIN ADC-9115).",
    "All listed prices are proposed one-time USD setup or consulting fees. A written quote confirms scope, availability and the final price. ‘From’ is a starting price; ‘By quote’ has no fixed listed amount.", "",
    "CRM seats, model usage, messages, lead data, voice minutes, hosting, software licences and applicable taxes are separate unless included in writing.",
    leadForgeSupport + ".", "",
  ];
  for (const service of SERVICES) {
    pricing.push(`## ${service.label}`, "", `${origin}/services/${service.id}`, "", service.intro, "");
    for (const pkg of getServicePlans(service)) {
      pricing.push(`### ${pkg.tier}: ${pkg.name}`, "", `Price: ${formatPrice(pkg)}${pkg.amount != null ? " USD" : ""}.`,
        pkg.fit, ...pkg.includes.map(line => "- " + line), `Scope boundary: ${pkg.boundary}`, "");
    }
  }
  for (const [label, list] of [["Basic agent choices", basicAgents], ["Standard agent choices", standardAgents]]) {
    pricing.push(`## ${label}`, "", ...list.map(([, name, detail]) => `- ${name}: ${detail}`), "");
  }
  pricing.push("The Basic AI Agents package includes one Basic choice. The Standard package includes one Standard and one Basic choice. Custom CRM roles are separately scoped integrations; overlapping package work is charged once.", "",
    `Pricing and payment policy: ${origin}/pricingPolicy`, `Request a quote: ${origin}/contact`, "");
  const llms = ["# CoreD", "",
    "> AI-powered CRM, AI agents, business automation, AI consulting and scoped cybersecurity services from the services division of CoreDhristi LLP (India, LLPIN ADC-9115).", "",
    "This is the CoreD services website. The related marketplace is temporarily not published on this domain. Service enquiries are not marketplace purchases.", "",
    "## Services", "",
    ...SERVICES.map(s => `- [${s.label}](${origin}/services/${s.id}): ${s.intro}`), "",
    "## Scope, pricing and contact", "",
    `- [Services and pricing](${origin}/services): Package scope, Basic and Standard choices, custom CRM roles and third-party costs.`,
    `- [Plain-text pricing reference](${origin}/pricing.md): Generated from the same current service catalogue.`,
    `- [Service FAQ](${origin}/faq): Delivery, approvals, support and quotation questions.`,
    `- [Contact CoreD](${origin}/contact): Enquiries; general email info@coredhristi.com, support email support@coredhristi.com.`,
    `- [Work and case studies](${origin}/see-our-work): Project scope and screenshots, including a labelled sample security assessment.`, "",
    "## Practical guides", "", ...articles.map(a => `- [${a.title}](${origin}/blog/${a.slug}): ${a.description}`), "",
    "## Policies", "", `- [Privacy](${origin}/privacyPolicy)`, `- [Terms](${origin}/termsCondition)`, `- [Pricing policy](${origin}/pricingPolicy)`, "",
  ];
  return { "pricing.md": pricing.join("\n"), "llms.txt": llms.join("\n") };
}
