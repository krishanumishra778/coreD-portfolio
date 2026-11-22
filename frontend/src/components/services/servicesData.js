// Proposed setup pricing. Each written quote confirms scope and provider costs.
const plan = (id, tier, name, basis, amount, fit, includes, boundary, choices) => ({
  id, tier, name, basis, amount, fit, includes, boundary, choices,
});

export const formatPrice = ({ basis, amount }) => {
  if (basis === "quote") return "By quote";
  const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
  return basis === "from" ? `From ${usd}` : `${usd} fixed`;
};

export const addOns = {
  channel: "Extra WhatsApp or email channel",
  source: "Extra lead source",
  migration: "Data migration and reporting",
  voice: "Booking or voice workflow",
  language: "Arabic copy or additional languages",
  teams: "Additional teams or integrations",
  finance: "Finance or ERP workflow",
  support: "Ongoing support",
  retest: "Fix verification or retest",
};

export const basicAgents = [
  ["website-chatbot", "Website chatbot", "Guides visitors through approved answers and collects enquiries for your team."],
  ["whatsapp-capture", "WhatsApp lead capture", "Collects enquiry details on one approved WhatsApp number and routes them to one inbox or compatible CRM."],
  ["email-triage", "Email enquiry routing", "Routes messages from one inbox to an agreed person or queue using rules."],
];

export const standardAgents = [
  ["ai-chatbot", "AI chatbot", "Answers from approved business documents, captures context and hands uncertain questions to staff."],
  ["voice-agent", "Inbound voice agent", "Handles an agreed call flow on one number, captures details and transfers or books when configured."],
  ["crm-automation", "CRM follow-up automation", "Runs an approved email or WhatsApp follow-up in one compatible CRM with reply and opt-out stops."],
  ["booking-agent", "Booking agent", "Checks one connected calendar, records an approved booking and routes exceptions to staff."],
];

export const SERVICES = [
  {
    id: "ai-powered-crm", label: "AI-Powered CRM",
    intro: "A CRM keeps contacts, conversations and deals together. Automation handles repeatable steps. AI can qualify a lead or draft a reply using rules and information you approve.",
    prompt: "Tell us where leads arrive, which CRM you use and who should own the next step.",
    addOns: ["channel", "source", "migration", "voice", "language", "teams", "finance", "support"],
    plans: [
      plan("workflow-pilot", "Basic", "CRM Workflow Pilot", "fixed", 750, "Test one workflow before rolling it out.",
        ["One lead source, one pipeline and one workflow in a pilot environment", "Capture contact and source, apply an assignment rule and create a follow-up task", "Demo, test results and a walkthrough for your team"], "Production rollout, migration and live messaging are separate."),
      plan("existing-crm", "Standard", "AI Setup for Your CRM", "from", 1500, "Add automation and AI to the CRM your team already uses.",
        ["One compatible CRM, one lead source and one sales workflow", "Lead capture, duplicate checks, assignment and one email or WhatsApp follow-up channel", "One AI qualification or reply-drafting task, one activity report and handover"], "We confirm API access, channel setup and record volume before quoting."),
      plan("leadforge-x", "Recommended", "CoreD LeadForge X", "from", 3250, "Build a sales workflow from lead discovery to sales handoff.",
        ["One target segment, one approved lead source, one existing CRM and one messaging channel", "Find and qualify leads, remove duplicates, and send approved follow-ups", "Log replies, stop at opt-out or staff takeover, then book or hand qualified leads to sales", "CRM mapping, workflow tests and team handover"], "Additional channels, data and integrations are separate. Delivery availability is confirmed during scoping."),
      plan("custom-crm", "Custom", "Custom Multi-Agent CRM", "quote", null, "Run multiple AI agents inside one CRM.",
        ["Combine agents for lead research, qualification, follow-up, booking or reporting", "Define permissions, approvals, stop rules and handoffs for each agent", "Scope custom pipelines, migration, dashboards, teams and ERP connections"], "Price depends on the number of agents, workflows, data and systems."),
    ],
  },
  {
    id: "ai-agents", label: "AI Agents & Automation",
    intro: "Choose a website chatbot, AI chatbot, voice agent or automation. Each plan says how many you can choose and which systems it can connect to.",
    prompt: "Tell us what the agent should do, which channel you use and when it should hand off to staff.",
    addOns: ["channel", "voice", "teams", "language", "support"],
    plans: [
      plan("faq-starter", "Basic", "One Basic Agent", "fixed", 300, "Start with one simple task on one channel.",
        ["Choose one option from the Basic list", "One approved content source or rule set, one handoff destination and a walkthrough"], "No custom API build, voice minutes or bulk messaging. WhatsApp needs an approved number and compatible tools.", ["basic"]),
      plan("connected-agent", "Standard", "One Standard + One Basic Agent", "from", 1200, "Combine a connected agent with a simple automation.",
        ["Choose one option from each list: one Standard and one Basic", "One main workflow, one approved integration for the Standard agent, testing and handover", "Staff escalation and clear stop rules for actions or follow-ups"], "Provider usage, model calls, voice minutes and extra integrations are separate.", ["standard", "basic"]),
      plan("custom-agent", "Custom", "Custom Multi-Agent Build", "quote", null, "Connect several agents across teams and systems.",
        ["Scope AI reception, multilingual voice, sales qualification, order support or document processing", "Connect CRM, helpdesk, calendar or ERP where compatible", "Define access, human approvals, tests, monitoring and handover"], "Confirm agent count, systems, volumes and ownership in the quote."),
    ],
  },
  {
    id: "ai-consulting", label: "AI Consulting",
    intro: "Decide where AI is worth using, what data and tools you need, and what a first pilot should prove.",
    prompt: "Share your goals, tools, teams and the decision you need to make.",
    addOns: ["teams", "support"],
    plans: [
      plan("discovery", "Basic", "AI Discovery", "fixed", 350, "Evaluate one business process.",
        ["One workshop and a written map of how one business process works today", "A shortlist of AI use cases with data and approval gaps identified", "Written recommendations and a practical next step for your team"], "Consulting and written advice only. Building the recommended workflow is separate."),
      plan("roadmap", "Standard", "AI Implementation Roadmap", "from", 1200, "Prepare an actionable pilot plan.",
        ["A ranked use-case list based on business value, effort and risk", "A build-versus-buy comparison covering vendor costs and required integrations", "A written phased plan, named responsibilities, a cost estimate and checks for accepting the pilot"], "The quote lists teams, workflows and planning deliverables. Software, development and implementation are separate."),
      plan("custom-consulting", "Custom", "AI Transformation Advisory", "quote", null, "Plan a rollout across multiple teams.",
        ["Scope data readiness, architecture, vendor review, governance or team training", "Set decision owners, delivery phases and measures for adoption", "Add pilot oversight or ongoing advisory if needed"], "Workshops, implementation and support are agreed in writing."),
    ],
  },
  {
    id: "ai-cybersecurity", label: "AI Cybersecurity Consulting",
    intro: "Review what your AI workflow can read, where data goes and which actions need human approval before it goes live.",
    prompt: "Share the number of workflows, their integrations, data types and review goals.",
    addOns: ["retest", "teams", "support"],
    plans: [
      plan("ai-readiness", "Basic", "AI Security Readiness", "from", 900, "Review one AI workflow before a pilot.",
        ["Map data access, integrations, permissions and approval steps", "Review logs, staff takeover and the ability to pause the workflow", "Deliver a prioritized fix list with owners and verification checks"], "One workflow. Formal tests and repairs require a separate scope."),
      plan("extended-ai-review", "Standard", "AI Governance & Risk Review", "quote", null, "Review several workflows or a broader rollout.",
        ["Document data flows, ownership, vendor dependencies and approval gaps", "Deliver a risk register, control recommendations and a rollout checklist", "Agree evidence requirements and how the team will verify controls"], "Scope depends on workflows, data sensitivity and evidence needs."),
      plan("custom-ai-security", "Custom", "Custom AI Security Advisory", "quote", null, "Plan controls or improvements across teams.",
        ["Scope AI policy, vendor review, monitoring, reporting or remediation advice", "Assess defensive AI alerting and evidence workflows", "Agree what will be tested, reviewed or implemented"], "Specialist support and ongoing monitoring are scoped separately."),
    ],
  },
  {
    id: "cybersecurity", label: "Cybersecurity",
    intro: "Choose a scoped assessment, a package with fixes and endpoint protection, or a custom security project.",
    prompt: "Share asset types and counts, country, reporting needs and any test window. Leave out credentials or sensitive records.",
    addOns: ["retest", "support"],
    plans: [
      plan("basic-cybersecurity", "Basic", "Vulnerability Assessment & Penetration Test", "quote", null, "Assess one agreed website or web app.",
        ["Vulnerability assessment and scoped penetration testing for one approved hostname", "Prioritized findings, business impact and recommended fixes", "Handover call and written report"], "One website hostname, including one subdomain if it is the named target. Extra hosts, APIs and networks are separate."),
      plan("standard-cybersecurity", "Standard", "Assessment, Fixes & Device Protection", "quote", null, "Combine an assessment with selected repairs and endpoint setup.",
        ["VA/PT for one agreed web app, with up to two named hostnames", "Agreed priority patches and verification of the fixes in scope", "Install approved antivirus on up to 10 supported devices and report their status"], "Proposed scope. Licenses, downtime, change approval and extra assets are agreed before work."),
      plan("custom-cybersecurity", "Custom", "Custom Cybersecurity", "quote", null, "Scope several systems or a specialist review.",
        ["Scope cloud, network or API assessment and remediation", "Design or configure firewall controls and review rules", "Scope static application security testing (SAST), code review, or storage and malware assessment"], "Quote by assets, repositories, environments or data volume. No fixed terabyte allowance. Written authorization is required for testing."),
    ],
    standalonePlans: [
      plan("security-assessment", "Standalone", "Security Assessment", "from", 650, "Review one agreed setup.",
        ["Control review, written findings and a prioritized fix list"], "Formal testing and fixes are scoped separately."),
      plan("antivirus-installation", "Standalone", "Antivirus Installation", "from", 300, "Set up protection on supported devices.",
        ["Install an approved product on up to 10 devices, check updates and record status"], "Licenses and additional devices are separate."),
    ],
  },
];

export const getServicePlans = (service) => service?.standalonePlans ? [...service.plans, ...service.standalonePlans] : service?.plans ?? [];

export function quoteLink(service, pkg, scope) {
  const query = new URLSearchParams({ service: service.id, plan: pkg.id });
  if (scope) query.set("scope", scope);
  return "/reach-us?" + query + "#project-enquiry";
}

export const securityServices = [
  { id: "assessment", name: "Security Assessment", detail: "Review current controls and get written findings and a prioritized fix list.", planId: "security-assessment" },
  { id: "vulnerability", name: "Vulnerability Assessment", detail: "Receive an asset and issue inventory with severity, evidence and recommended fixes. Asset counts are agreed in writing.", planId: "basic-cybersecurity" },
  { id: "penetration", name: "Penetration Testing", detail: "Validate agreed weaknesses on authorized assets. Get reproducible findings, business impact and a remediation report within the approved rules of engagement.", planId: "basic-cybersecurity" },
  { id: "fixes", name: "Security Fixes & Verification", detail: "Agree patches, owners and change windows, then verify the fixes covered by your quote.", planId: "standard-cybersecurity" },
  { id: "malware", name: "Malware & Storage Assessment", detail: "Scope storage type, volume, business constraints, and reporting before work starts.", planId: "custom-cybersecurity" },
  { id: "endpoint", name: "Antivirus Installation", detail: "Set up approved protection on up to 10 supported devices. Licenses are separate.", planId: "antivirus-installation" },
];

export const leadForge = SERVICES[0].plans.find(({ id }) => id === "leadforge-x");
export const leadForgeStatus = "Proposed delivery · availability confirmed during scoping";
export const leadForgeSupport = "Optional support from $350 per month, if agreed in writing";
export const leadForgeSteps = [
  ["Find", "Use one approved source to find companies that match your target segment."],
  ["Qualify", "Check the fit, catch duplicates and save the lead and its context in the CRM."],
  ["Follow up", "Send approved messages on one agreed channel. Record the activity and stop when a reply or stop rule arrives."],
  ["Book or hand off", "Book an agreed meeting slot or pass a qualified reply and its history to a salesperson."],
];
export const servicePrices = (id) => getServicePlans(SERVICES.find((service) => service.id === id))
  .map((pkg) => `${pkg.name}: ${formatPrice(pkg)}`).join("; ");
