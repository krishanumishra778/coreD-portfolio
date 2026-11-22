// Buyer guidance only. Prices, plan limits and quote selections live in servicesData.js.
export const serviceGuides = {
  "ai-powered-crm": {
    title: "Keep your CRM. Add the help your team needs.",
    description: "We can connect a chatbot, assistant or automation to a compatible CRM you already use. If your current system cannot support the workflow, we can scope a custom CRM instead.",
    steps: [
      ["Start with the workflow", "Tell us where enquiries arrive, which CRM holds your records and what your staff do next. We check the CRM plan, permissions and API access before quoting."],
      ["Connect the right component", "A chatbot can collect a website enquiry. An AI assistant can draft a reply. An automation can create the CRM record or follow-up task. Your chosen package sets what is included."],
      ["Test and hand over", "We test the agreed workflow, duplicate checks and staff handoff, then show your team how to use it. Extra agents, channels and integrations are quoted separately."],
    ],
  },
  "ai-agents": {
    title: "Basic or Standard: which do you need?",
    description: "Basic handles a simple, defined task using approved answers or rules. Standard adds an AI or connected-tool workflow. The Standard package includes one Standard option and one Basic option; it does not include every agent listed here.",
    steps: [
      ["Chatbot", "A chat interface for your website or an agreed messaging channel. The Basic website chatbot follows approved answers; the Standard AI chatbot uses approved business documents and hands uncertain questions to staff."],
      ["Assistant or agent", "An assistant prepares information for a person to review. An agent can take agreed steps using permitted tools, such as checking a calendar. Actions and access are limited to the written scope."],
      ["Automation", "A rule-based connection between systems, such as saving an enquiry in your CRM, routing an email or stopping follow-ups after a reply. A CRM connection is included only where the plan states it."],
    ],
  },
  "ai-consulting": {
    title: "Get a decision and a practical plan before you build.",
    description: "Consulting helps you decide where AI is useful and how to introduce it. You receive written advice and agreed planning documents. Building a chatbot, CRM or agent is a separate implementation scope.",
    steps: [
      ["Discovery: understand one process", "A workshop, a map of the current process and written recommendations. You learn which tasks are worth exploring, which data is missing and what to do next."],
      ["Roadmap: plan a pilot", "A ranked use-case list, build-versus-buy comparison and phased implementation plan. The plan identifies owners, integrations, estimated costs and checks for accepting the pilot."],
      ["Custom advisory: coordinate a rollout", "Agree which teams, systems and decisions need help. Data readiness, vendor review, governance, training or pilot oversight can be included in the written scope."],
    ],
  },
  "ai-cybersecurity": {
    title: "Review the risks around your AI workflow.",
    description: "AI cybersecurity consulting reviews how an AI system handles data, uses tools and hands control to people. It is a review and advisory service. Penetration testing, code changes and ongoing monitoring require their own agreed scope.",
    steps: [
      ["Readiness: one workflow", "Receive a map of access and approval steps, a prioritized fix list and checks your team can use to verify improvements before a pilot."],
      ["Governance: several workflows", "Receive documented data flows, a risk register, named control owners and a rollout checklist. The quote states which systems and evidence are covered."],
      ["Custom: specialist advice", "Scope AI policies, vendor review, defensive alerting or remediation advice. We agree what is advice, what is testing and what will actually be implemented."],
    ],
  },
  cybersecurity: {
    title: "Choose a security review, a test or a repair project.",
    description: "A Security Assessment reviews existing controls. Vulnerability Assessment identifies weaknesses. Penetration Testing validates agreed weaknesses within an authorized scope. Fixing those issues and installing antivirus are separate deliverables unless your package includes them.",
    steps: [
      ["Agree the assets first", "Name the hostnames, applications, APIs, devices or environments and the permitted test window. The asset owner must give written approval before testing starts."],
      ["Know what you receive", "A scoped assessment or test provides written findings, priorities and recommended next steps. Testing reports include evidence and business impact. The quote identifies the exact deliverables."],
      ["Scope fixes and verification", "Agree patches, change approval and any retest before work. Antivirus installation covers setup on supported devices; software licences and extra devices cost separately."],
    ],
  },
};
