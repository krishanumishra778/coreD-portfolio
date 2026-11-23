/**
 * CoreD AI Agent Knowledge Base (Q1 - Q300)
 *
 * A single, separate content file for the AI Agent. It holds 300 customer
 * questions with answers. It contains no UI and no matching logic, so you can
 * add, edit or remove an answer without touching any component.
 *
 * Entry schema (same as KnowledgeBase.js / KnowledgeBaseExpanded.js)
 * -------------------------------------------------------------------
 *   id         Unique, stable, kebab-case. Every id here starts with "aiagent-".
 *   category   Group name, for maintenance only.
 *   questions  Ways a visitor might ask. Q201-Q300 have 5 phrasings each
 *              (English + Hinglish); Q1-Q200 have the original question.
 *              Add more phrasings any time to improve matching.
 *   keywords   Short topic phrases, matched like extra, lower-weight questions.
 *   answer     Plain text (no HTML, no markdown). Rendered as text.
 *   action     Optional. "contact" shows a button that jumps to Contact.
 *
 * HOW TO USE IN YOUR PROJECT (3 steps)
 * ------------------------------------
 * 1. Copy this file next to your KnowledgeBase.js, e.g. src/.../AIAgentKnowledgeBase.js
 *
 * 2. In KnowledgeBase.js, import it at the top:
 *      import { aiAgentKnowledgeBase } from "./AIAgentKnowledgeBase";
 *
 * 3. At the bottom of KnowledgeBase.js, add it to the final array:
 *      export const knowledgeBase = [
 *        ...existingKnowledgeBase,
 *        ...expandedKnowledgeBase,
 *        ...aiAgentKnowledgeBase,
 *      ];
 *
 * Do not edit KnowledgeBaseExpanded.js for this. If your chat finds the same
 * question in two files, keep the entry from only one of them.
 */

export const aiAgentKnowledgeBase = [
  {
    id: "aiagent-q001-exact-difference-between-cored-coredhristi",
    category: "cored-vs-coredhristi-and-ecosystem-identity",
    questions: [
      "What is the exact difference between CoreD and CoreDhristi?",
    ],
    keywords: ["exact difference between cored"],
    answer:
      "CoreDhristi is our global AI Workforce Marketplace where companies browse, subscribe to, and deploy pre-built, security-verified AI agents, automations, and MCP servers. CoreD is the dedicated enterprise AI & IT solutions division under CoreDhristi that builds custom AI-agent CRMs, cloud infrastructure, bespoke business automations, and cybersecurity solutions tailored around your company's internal workflows.",
  },
  {
    id: "aiagent-q002-am-chatting-right-now-help-business",
    category: "cored-vs-coredhristi-and-ecosystem-identity",
    questions: [
      "Who am I chatting with right now, and how can you help my business?",
    ],
    keywords: ["am chatting right now"],
    answer:
      "You are chatting with the CoreD website assistant. I match your questions to our FAQ about CRM, AI agents, automation and cybersecurity. I can explain options, but I cannot inspect your systems or confirm a project scope. The team reviews your requirements through Contact us.",
  },
  {
    id: "aiagent-q003-founded-cored-coredhristi-their-technical-backgrou",
    category: "cored-vs-coredhristi-and-ecosystem-identity",
    questions: [
      "Who founded CoreD and CoreDhristi, and what is their technical background?",
    ],
    keywords: ["founded cored coredhristi their"],
    answer:
      "Both CoreDhristi and CoreD were founded by Krishanu Kaundilya, an AI Agent & Automation Developer and Cybersecurity Consultant based in Indore, India. He holds an Executive Product Management credential from IIM Kozhikode, a BCA degree, and is an EC-Council Certified Ethical Hacker (Practical) with deep experience in VAPT, malware analysis, and autonomous CRM engineering.",
  },
  {
    id: "aiagent-q004-know-business-needs-pre-built-marketplace-agent",
    category: "cored-vs-coredhristi-and-ecosystem-identity",
    questions: [
      "How do I know if my business needs a pre-built marketplace agent from CoreDhristi or a custom solution from CoreD?",
    ],
    keywords: ["know business needs pre"],
    answer:
      "If you have a standard operational need—like screening CVs, replying to common support tickets, or generating invoices from orders—a ready-to-deploy listing on the CoreDhristi Marketplace is fastest. If your business requires an end-to-end custom AI CRM, multi-channel WhatsApp/voice calling pipelines, or deep integration with proprietary legacy software, CoreD's custom engineering team will architect it specifically for you.",
  },
  {
    id: "aiagent-q005-mention-stop-doing-hand-platform-ai",
    category: "cored-vs-coredhristi-and-ecosystem-identity",
    questions: [
      "You mention \"Stop Doing By Hand\" on your platform. How does your AI Agent figure out what my team should automate first?",
    ],
    keywords: ["mention stop doing hand"],
    answer:
      "Simply describe a task your team performs repeatedly—for example, \"We manually message 200 leads on WhatsApp every morning and update an Excel sheet.\" I will analyze whether the task requires human-like judgment (which calls for an AI Agent), follows strict unchanging rules (which calls for an AI Automation), or needs secure database access (which calls for an MCP Server), and give you an exact deployment roadmap.",
  },
  {
    id: "aiagent-q006-coredhristi-saas-tool-something-else",
    category: "cored-vs-coredhristi-and-ecosystem-identity",
    questions: [
      "Is CoreDhristi a SaaS tool or something else?",
    ],
    keywords: ["coredhristi saas tool something"],
    answer:
      "CoreDhristi is not a traditional SaaS tool with bloated seat licenses; it is an AI Workforce Marketplace and Economy. Companies hire verified AI agents, automations, and MCP servers just like digital employees on a per-agent subscription, while independent developers build, list, and earn revenue from their creations.",
  },
  {
    id: "aiagent-q007-cored-ai-agent-communicate-team-customers",
    category: "cored-vs-coredhristi-and-ecosystem-identity",
    questions: [
      "Can the CoreD AI Agent communicate with my team or customers in Hindi or Hinglish?",
    ],
    keywords: ["cored ai agent communicate"],
    answer:
      "Yes! Both the CoreDhristi platform assistant and the custom AI agents built by CoreD fluently understand and respond in English, Hindi, and Hinglish, making them ideal for Indian domestic businesses as well as global operations.",
  },
  {
    id: "aiagent-q008-where-cored-engineering-team-located-work",
    category: "cored-vs-coredhristi-and-ecosystem-identity",
    questions: [
      "Where is the CoreD engineering team located, and do you work with international clients?",
    ],
    keywords: ["where cored engineering team"],
    answer:
      "Our headquarters and founding engineering team are based in Indore, Madhya Pradesh, India, and we serve clients globally—including prior security and engineering engagements with firms in Dubai and across South Asia—supporting multi-currency billing in INR, USD, EUR, and GBP.",
  },
  {
    id: "aiagent-q009-marketplace-say-some-shelves-empty-until",
    category: "cored-vs-coredhristi-and-ecosystem-identity",
    questions: [
      "Why does your marketplace say some shelves are empty until verified? Do you use fake placeholder agents?",
    ],
    keywords: ["marketplace say some shelves"],
    answer:
      "Never. We strictly refuse to list fabricated or untested placeholder agents. Nothing appears on the CoreDhristi marketplace until a real developer has submitted working code and it has passed all 7 layers of our automated security and QA pipeline.",
  },
  {
    id: "aiagent-q010-hire-human-developer-directly-through-ecosystem",
    category: "cored-vs-coredhristi-and-ecosystem-identity",
    questions: [
      "Can I hire a human developer directly through your ecosystem if I don't see the exact agent I need?",
    ],
    keywords: ["hire human developer directly"],
    answer:
      "Yes. Beyond subscribing to ready-made agents, you can use the \"Hire a Vetted Developer\" option on CoreDhristi or engage CoreD directly to commission a verified AI engineer to build a custom agent or MCP server for your proprietary stack.",
  },
  {
    id: "aiagent-q011-choose-ai-agent-instead-standard-ai",
    category: "choosing-between-ai-agents-automations-and-mcp-servers",
    questions: [
      "When should I choose an AI Agent instead of a standard AI Automation?",
    ],
    keywords: ["choose ai agent instead"],
    answer:
      "Choose an AI Agent when the task requires reasoning and judgment on every single case—such as reading an angry customer's support ticket and crafting a contextual reply, screening resumes against nuanced job requirements, or qualifying a sales lead on a live conversation. Choose an AI Automation when the steps never change, only the data does.",
  },
  {
    id: "aiagent-q012-ai-automation-better-investment-than-full",
    category: "choosing-between-ai-agents-automations-and-mcp-servers",
    questions: [
      "When is an AI Automation a better investment than a full AI Agent?",
    ],
    keywords: ["ai automation better investment"],
    answer:
      "If your workflow follows strict, fixed rules—such as generating a PDF invoice every time an order hits your database, or sending a welcome email sequence upon signup—an AI Automation (built on n8n, Make.com, Zapier, or Power Automate) is significantly cheaper, faster, and more predictable than running an LLM reasoning loop.",
  },
  {
    id: "aiagent-q013-exactly-mcp-server-coredhristi-company-need",
    category: "choosing-between-ai-agents-automations-and-mcp-servers",
    questions: [
      "What exactly is an MCP Server on CoreDhristi, and why would my company need one?",
    ],
    keywords: ["exactly mcp server coredhristi"],
    answer:
      "MCP (Model Context Protocol) Servers solve the connection problem rather than the decision problem. If you already use Claude, GPT-4, Gemini, or a custom LLM, an MCP Server acts as a secure, permission-controlled bridge that lets your AI safely query your internal SQL database, CRM, or ERP without exposing raw credentials.",
  },
  {
    id: "aiagent-q014-ai-agent-frameworks-cored-coredhristi-officially",
    category: "choosing-between-ai-agents-automations-and-mcp-servers",
    questions: [
      "Which AI agent frameworks do CoreD and CoreDhristi officially support?",
    ],
    keywords: ["ai agent frameworks cored"],
    answer:
      "For autonomous AI Agents, we support industry-leading frameworks including LangChain, CrewAI, Google ADK (Agent Development Kit), and Microsoft AutoGen, alongside custom multi-agent orchestrations.",
  },
  {
    id: "aiagent-q015-workflow-automation-platforms-supported-ai-automat",
    category: "choosing-between-ai-agents-automations-and-mcp-servers",
    questions: [
      "Which workflow automation platforms are supported in your AI Automations category?",
    ],
    keywords: ["workflow automation platforms supported"],
    answer:
      "Our verified automation listings and custom CoreD builds support n8n, Make.com, Zapier, and Microsoft Power Automate, allowing seamless connection to thousands of existing business apps.",
  },
  {
    id: "aiagent-q016-large-language-models-llms-connect-mcp",
    category: "choosing-between-ai-agents-automations-and-mcp-servers",
    questions: [
      "Which Large Language Models (LLMs) can connect to your MCP Servers?",
    ],
    keywords: ["large language models llms"],
    answer:
      "Our MCP Servers are designed to work seamlessly with Anthropic Claude, OpenAI GPT-4 / GPT-4o, Google Gemini, and self-hosted or custom enterprise LLMs.",
  },
  {
    id: "aiagent-q017-skills-section-platform-cost-anything-use",
    category: "choosing-between-ai-agents-automations-and-mcp-servers",
    questions: [
      "What is the \"Skills\" section on the platform, and does it cost anything to use?",
    ],
    keywords: ["skills section platform cost"],
    answer:
      "The Skills catalog offers 100% free templates, prompt packs, system prompts, curated datasets, and lightweight tools. We recommend new buyers start there to test prompt engineering workflows before purchasing a full agent subscription.",
  },
  {
    id: "aiagent-q018-cored-combine-mcp-server-n8n-automation",
    category: "choosing-between-ai-agents-automations-and-mcp-servers",
    questions: [
      "Can CoreD combine an MCP Server, an n8n automation, and a CrewAI agent into a single unified workflow for my company?",
    ],
    keywords: ["cored combine mcp server"],
    answer:
      "Absolutely. In fact, most enterprise architectures we build at CoreD are hybrid: an MCP Server fetches real-time customer records from your database, a CrewAI or LangChain Agent analyzes the customer's intent and drafts a decision, and an n8n Automation triggers the final invoice or WhatsApp notification.",
  },
  {
    id: "aiagent-q019-prevent-ai-agent-hallucinating-prices-company",
    category: "choosing-between-ai-agents-automations-and-mcp-servers",
    questions: [
      "How do I prevent an AI Agent from hallucinating prices or company policies when talking to my buyers?",
    ],
    keywords: ["prevent ai agent hallucinating"],
    answer:
      "CoreD builds agents using strict Retrieval-Augmented Generation (RAG) and deterministic tool-calling guardrails. The agent is restricted to answering strictly from your verified knowledge base and product catalog via MCP, and if a question falls outside its scope, it escalates the chat to a human rep instead of guessing.",
  },
  {
    id: "aiagent-q020-ai-agent-handle-multi-step-tasks-across",
    category: "choosing-between-ai-agents-automations-and-mcp-servers",
    questions: [
      "Can an AI Agent handle multi-step tasks across different departments, like Sales and Finance?",
    ],
    keywords: ["ai agent handle multi"],
    answer:
      "Yes. Using multi-agent frameworks like CrewAI or AutoGen, we configure specialized sub-agents—for example, a Sales Qualification Agent that gathers client requirements and hands the structured JSON payload directly to a Finance Quoting Agent to calculate GST/tax and issue an estimate.",
  },
  {
    id: "aiagent-q021-need-own-openai-anthropic-google-gemini",
    category: "choosing-between-ai-agents-automations-and-mcp-servers",
    questions: [
      "Do I need my own OpenAI, Anthropic, or Google Gemini API keys to run a licensed agent?",
    ],
    keywords: ["need own openai anthropic"],
    answer:
      "That depends on the deployment model listed on the agent's page. For self-hosted agents running via a CoreDhristi .env license key, you typically plug in your own LLM API keys so your data stays within your private cloud account. For developer cloud-hosted agents, compute and API costs can be bundled directly into the subscription.",
  },
  {
    id: "aiagent-q022-ai-agent-read-attachments-like-pdfs",
    category: "choosing-between-ai-agents-automations-and-mcp-servers",
    questions: [
      "Can your AI Agent read attachments like PDFs, invoices, or resumes sent by customers?",
    ],
    keywords: ["ai agent read attachments"],
    answer:
      "Yes. Our agents can be equipped with document-parsing and vision pipelines to extract structured data from PDF resumes, vendor invoices, purchase orders, and product images submitted via email, web chat, or WhatsApp.",
  },
  {
    id: "aiagent-q023-cored-ai-agent-crm-different-traditional-crms",
    category: "custom-ai-agent-crm-and-business-solutions-by-cored",
    questions: [
      "How is a CoreD AI-Agent CRM different from traditional CRMs like Zoho, HubSpot, or Salesforce?",
    ],
    keywords: ["cored ai agent crm"],
    answer:
      "Traditional CRMs are passive databases where human sales reps spend hours manually logging calls and typing follow-ups. A CoreD AI-Agent CRM is an active system where autonomous agents automatically capture leads, conduct initial WhatsApp and voice follow-ups, gather project requirements, update pipeline stages, and alert human closers only when a lead is hot.",
  },
  {
    id: "aiagent-q024-have-built-ai-crm-real-product",
    category: "custom-ai-agent-crm-and-business-solutions-by-cored",
    questions: [
      "Have you built an AI CRM for a real product or manufacturing business before?",
    ],
    keywords: ["have built ai crm"],
    answer:
      "Yes. For Tohfa Bazzar (a 3D miniature business), we engineered a complete AI-based CRM featuring automated follow-up sequences, direct Gmail synchronization, autonomous AI voice calling, and automated WhatsApp requirement gathering.",
  },
  {
    id: "aiagent-q025-cored-help-digital-marketing-agency-struggling",
    category: "custom-ai-agent-crm-and-business-solutions-by-cored",
    questions: [
      "How can CoreD help a digital marketing agency struggling with slow lead response times?",
    ],
    keywords: ["cored help digital marketing"],
    answer:
      "We solved this exact problem for ADSMARK01, a digital marketing firm suffering from delayed lead handling and missed follow-ups. CoreD built an AI-agent CRM that engages incoming ad leads within seconds, qualifies their budget and timeline, and schedules follow-ups automatically so zero leads slip through the cracks.",
  },
  {
    id: "aiagent-q026-cored-build-whatsapp-ai-agent-d2c",
    category: "custom-ai-agent-crm-and-business-solutions-by-cored",
    questions: [
      "Can CoreD build a WhatsApp AI Agent for a D2C or food & beverage brand?",
    ],
    keywords: ["cored build whatsapp ai"],
    answer:
      "Yes. For Indiganic Foods (a premium ghee brand), we deployed a dedicated WhatsApp AI automation system that instantly answers customer product inquiries, explains nutritional benefits and pricing, and guides buyers through the ordering process 24/7.",
  },
  {
    id: "aiagent-q027-build-custom-non-ai-hybrid-operational-crms",
    category: "custom-ai-agent-crm-and-business-solutions-by-cored",
    questions: [
      "Can you build custom non-AI or hybrid operational CRMs for logistics, transport, or fleet businesses?",
    ],
    keywords: ["build custom non ai"],
    answer:
      "Yes. We built a custom Fuel Tracking & Loyalty CRM for commercial buses and trucks that tracks vehicle-wise refueling visits, monitors fuel quantities, detects anomalies, and calculates automated driver/fleet loyalty points.",
  },
  {
    id: "aiagent-q028-cored-have-experience-education-edtech-crm",
    category: "custom-ai-agent-crm-and-business-solutions-by-cored",
    questions: [
      "Does CoreD have experience with Education or EdTech CRM systems?",
    ],
    keywords: ["cored have experience education"],
    answer:
      "Yes. Through Next Tech Waves, our founder integrated AI agents directly into education-focused CRM workflows to automate student counseling follow-ups, course inquiry handling, and admission pipeline tracking.",
  },
  {
    id: "aiagent-q029-whatsapp-requirement-gathering-feature-work-inside",
    category: "custom-ai-agent-crm-and-business-solutions-by-cored",
    questions: [
      "How does the \"WhatsApp Requirement Gathering\" feature work inside a CoreD CRM?",
    ],
    keywords: ["whatsapp requirement gathering feature"],
    answer:
      "When a prospect expresses interest, the AI Agent initiates a natural WhatsApp conversation, asks structured qualifying questions (such as quantity, customization specs, delivery city, or reference photos), validates the inputs, and populates the exact fields inside your CRM dashboard without human intervention.",
  },
  {
    id: "aiagent-q030-ai-voice-calling-integration-work-custom",
    category: "custom-ai-agent-crm-and-business-solutions-by-cored",
    questions: [
      "How does the AI Voice Calling integration work in your custom CRMs?",
    ],
    keywords: ["ai voice calling integration"],
    answer:
      "Our AI CRM can trigger automated outbound voice calls (or handle inbound calls) using low-latency voice AI agents. The agent speaks naturally with the lead, confirms their interest or appointment time, transcribes the entire call, summarizes the sentiment, and updates the CRM lead status automatically.",
  },
  {
    id: "aiagent-q031-ai-agent-connect-directly-company-s-gmail",
    category: "custom-ai-agent-crm-and-business-solutions-by-cored",
    questions: [
      "Can your AI Agent connect directly to our company's Gmail or Microsoft Outlook inbox?",
    ],
    keywords: ["ai agent connect directly"],
    answer:
      "Yes. Just as we implemented for Tohfa Bazzar, we integrate bidirectional email sync so the AI Agent can read incoming client threads, draft or send context-aware follow-up emails, extract attachments, and log every interaction against the client's CRM profile.",
  },
  {
    id: "aiagent-q032-already-use-existing-custom-web-app",
    category: "custom-ai-agent-crm-and-business-solutions-by-cored",
    questions: [
      "We already use an existing custom web app or ERP. Can CoreD add AI agents to our current software without rebuilding it from scratch?",
    ],
    keywords: ["already use existing custom"],
    answer:
      "Yes. One of CoreD's core services is retrofitting existing business software with AI capabilities. Using custom APIs, webhooks, and MCP servers, we layer autonomous agents on top of the software your team already uses every day.",
  },
  {
    id: "aiagent-q033-long-typically-take-cored-build-deploy",
    category: "custom-ai-agent-crm-and-business-solutions-by-cored",
    questions: [
      "How long does it typically take CoreD to build and deploy a custom AI-Agent CRM?",
    ],
    keywords: ["long typically take cored"],
    answer:
      "Deployment and delivery dates depend on the workflow, integrations, access, testing and approvals. A marketplace listing has its own setup requirements; a custom CoreD project has dates agreed in the written quote. Ask the team to confirm the schedule for your scope.",
  },
  {
    id: "aiagent-q034-ai-agent-qualify-leads-based-bant",
    category: "custom-ai-agent-crm-and-business-solutions-by-cored",
    questions: [
      "Can the AI Agent qualify leads based on BANT (Budget, Authority, Need, Timeline) before notifying my sales team?",
    ],
    keywords: ["ai agent qualify leads"],
    answer:
      "Yes. You define the exact qualification rubric. The AI Agent converses with the prospect to uncover their budget range, decision-making authority, specific requirements, and purchasing timeline, scoring the lead automatically and routing only high-intent prospects to your senior sales executives.",
  },
  {
    id: "aiagent-q035-happens-customer-whatsapp-asks-complex-question",
    category: "custom-ai-agent-crm-and-business-solutions-by-cored",
    questions: [
      "What happens if a customer on WhatsApp asks a complex question or wants to negotiate a custom bulk discount with the AI Agent?",
    ],
    keywords: ["happens customer whatsapp asks"],
    answer:
      "We configure smart human-in-the-loop (HITL) handoffs. When the agent detects high-value negotiation intent, negative sentiment, or an out-of-policy request, it pauses automation on that thread and sends an instant alert (via Slack, WhatsApp, or CRM notification) to a human manager with a complete summary of the chat so far.",
  },
  {
    id: "aiagent-q036-cored-ai-agent-send-automated-payment",
    category: "custom-ai-agent-crm-and-business-solutions-by-cored",
    questions: [
      "Can the CoreD AI Agent send automated payment links (like Razorpay or Stripe) inside a WhatsApp or web chat?",
    ],
    keywords: ["cored ai agent send"],
    answer:
      "Yes. Once the AI Agent confirms the customer's order items or subscription tier, it can dynamically generate a secure Razorpay (UPI/Card/Netbanking) or Stripe payment link, send it in the chat, verify the webhook payment confirmation, and automatically issue a receipt.",
  },
  {
    id: "aiagent-q037-know-ai-agent-coredhristi-won-t-steal",
    category: "the-7-layer-security-pipeline-and-cybersecurity-services",
    questions: [
      "How do I know an AI Agent from CoreDhristi won't steal my company's API keys or database records?",
    ],
    keywords: ["know ai agent coredhristi"],
    answer:
      "Every single listing on CoreDhristi must pass our mandatory, automated 7-Layer Security & Quality Review before it is allowed to go live. Furthermore, every agent includes a transparent Scope Questionnaire and Software Bill of Materials (SBOM) so you know exactly what permissions it touches before you subscribe.",
  },
  {
    id: "aiagent-q038-happens-layer-1-secret-scanning-security",
    category: "the-7-layer-security-pipeline-and-cybersecurity-services",
    questions: [
      "What happens in Layer 1 (Secret Scanning) of your security review?",
    ],
    keywords: ["happens layer 1 secret"],
    answer:
      "In Layer 1, we use Betterleaks to scan the developer's entire Git repository commit history to ensure no hardcoded API keys, tokens, credentials, or private passwords are hidden in the codebase.",
  },
  {
    id: "aiagent-q039-tools-use-layer-2-static-code",
    category: "the-7-layer-security-pipeline-and-cybersecurity-services",
    questions: [
      "What tools do you use in Layer 2 (Static Code Analysis) to catch malicious code?",
    ],
    keywords: ["tools use layer 2"],
    answer:
      "In Layer 2, we run Semgrep and CodeQL to inspect the full source code for SQL/command injection vectors, unsafe system calls, backdoors, and insecure data handling before a single line of code is ever executed.",
  },
  {
    id: "aiagent-q040-layer-3-dependency-and-supply-chain-audit",
    category: "the-7-layer-security-pipeline-and-cybersecurity-services",
    questions: [
      "How does Layer 3 (Dependency & Supply-Chain Audit) protect my company?",
    ],
    keywords: ["layer 3 dependency supply"],
    answer:
      "Modern AI agents rely on dozens of Python or Node.js packages. In Layer 3, we run OSV-Scanner against every third-party dependency to block packages with known CVEs or supply-chain vulnerabilities.",
  },
  {
    id: "aiagent-q041-verify-agent-actually-works-advertised-before",
    category: "the-7-layer-security-pipeline-and-cybersecurity-services",
    questions: [
      "How do you verify that an agent actually works as advertised before I buy it (Layer 4)?",
    ],
    keywords: ["verify agent actually works"],
    answer:
      "In Layer 4 (Automated QA & Functionality), we spin up an isolated sandbox container, install the agent from scratch, build it, and run its automated test suite to verify that it executes its claimed tasks cleanly without crashing.",
  },
  {
    id: "aiagent-q042-layer-5-ai-red-team-and-attack",
    category: "the-7-layer-security-pipeline-and-cybersecurity-services",
    questions: [
      "What is Layer 5 (AI Red-Team & Attack Simulation), and how does it stop prompt injection?",
    ],
    keywords: ["layer 5 ai red"],
    answer:
      "In Layer 5, we use Promptfoo and Agentic Radar to fire automated adversarial attacks across dozens of vulnerability categories—testing the agent against jailbreaks, prompt injections, data exfiltration tricks, and unauthorized tool execution.",
  },
  {
    id: "aiagent-q043-verified-during-layer-6-workflow-mcp",
    category: "the-7-layer-security-pipeline-and-cybersecurity-services",
    questions: [
      "What is verified during Layer 6 (Workflow, MCP Verification & Scope Questionnaire)?",
    ],
    keywords: ["verified during layer 6"],
    answer:
      "In Layer 6, we use MCP Inspector alongside a mandatory developer Scope Questionnaire. The developer must explicitly declare every file path, network endpoint, and database scope the agent can touch, defining its exact \"blast radius\" if anything ever misbehaves.",
  },
  {
    id: "aiagent-q044-layer-7-data-claim-cross-check-sbom",
    category: "the-7-layer-security-pipeline-and-cybersecurity-services",
    questions: [
      "What is Layer 7 (Data-Claim Cross-Check and SBOM)?",
    ],
    keywords: ["layer 7 data claim"],
    answer:
      "In Layer 7, we use Microsoft Presidio (for PII/sensitive data protection verification) and Syft to generate a complete Software Bill of Materials (SBOM), cross-checking the developer's privacy claims against the actual runtime behavior of the agent.",
  },
  {
    id: "aiagent-q045-view-security-report-ai-agent-before",
    category: "the-7-layer-security-pipeline-and-cybersecurity-services",
    questions: [
      "Can I view the security report of an AI Agent before my company pays for a subscription?",
    ],
    keywords: ["view security report ai"],
    answer:
      "Yes. Every verified listing on the CoreDhristi marketplace includes a transparent Security Report and SBOM directly on its listing page so your CISO or IT team can inspect it prior to checkout.",
  },
  {
    id: "aiagent-q046-beyond-ai-agents-cored-provide-standalone",
    category: "the-7-layer-security-pipeline-and-cybersecurity-services",
    questions: [
      "Beyond AI agents, does CoreD provide standalone cybersecurity and VAPT services for companies?",
    ],
    keywords: ["beyond ai agents cored"],
    answer:
      "Yes. Led by an EC-Council Certified Ethical Hacker (Practical) who has trained law enforcement officers at CAPT Bhopal and consulted for firms like DTSS Consultants (Dubai) and Crawl Digitally, CoreD provides full Vulnerability Assessment and Penetration Testing (VAPT) for web apps, APIs, and enterprise networks.",
  },
  {
    id: "aiagent-q047-tools-methodologies-cored-use-performing-security",
    category: "the-7-layer-security-pipeline-and-cybersecurity-services",
    questions: [
      "What tools and methodologies does CoreD use when performing a security audit on our web app or API?",
    ],
    keywords: ["tools methodologies cored use"],
    answer:
      "We combine manual offensive penetration testing with enterprise tools including Burp Suite, Nuclei, Semgrep, and CodeQL. We don't just hand you an automated PDF—we review your source code, demonstrate proof-of-concept exploit paths, provide clear developer remediation steps, and verify your fixes after patching.",
  },
  {
    id: "aiagent-q048-one-company-computers-acting-suspiciously-cored",
    category: "the-7-layer-security-pipeline-and-cybersecurity-services",
    questions: [
      "One of our company computers is acting suspiciously. Does CoreD offer malware analysis and endpoint security?",
    ],
    keywords: ["one company computers acting"],
    answer:
      "Yes. As part of our ongoing cybersecurity retainer work (such as our engagement with Crawl Digitally), CoreD investigates suspicious endpoint activity, performs malware analysis, identifies data theft vectors, and hardens company workstations against ransomware and spyware.",
  },
  {
    id: "aiagent-q049-cored-protect-customer-pii-personally-identifiable",
    category: "the-7-layer-security-pipeline-and-cybersecurity-services",
    questions: [
      "How does CoreD protect our customer PII (Personally Identifiable Information) when an AI Agent processes chats?",
    ],
    keywords: ["cored protect customer pii"],
    answer:
      "We integrate PII-masking layers (such as Microsoft Presidio) and strict data minimization policies so sensitive fields like Aadhaar numbers, credit card digits, or health details can be redacted before prompts are sent to external LLM providers.",
  },
  {
    id: "aiagent-q050-happens-security-vulnerability-discovered-marketpl",
    category: "the-7-layer-security-pipeline-and-cybersecurity-services",
    questions: [
      "What happens if a security vulnerability is discovered in a marketplace agent after my company has already deployed it?",
    ],
    keywords: ["happens security vulnerability discovered"],
    answer:
      "Because all CoreDhristi agents operate via our revocable license key infrastructure or managed cloud containers, we can immediately pause or revoke a compromised version's license key platform-wide and push a mandatory security patch through the 7-layer pipeline.",
  },
  {
    id: "aiagent-q051-coredhristi-protect-intellectual-property-ip-devel",
    category: "the-7-layer-security-pipeline-and-cybersecurity-services",
    questions: [
      "How does CoreDhristi protect the intellectual property (IP) of developers who list their agents?",
    ],
    keywords: ["coredhristi protect intellectual property"],
    answer:
      "Creator code and access are strictly governed by CoreDhristi's revocable license keys or developer-hosted cloud endpoints. If a buyer cancels their subscription or attempts unauthorized redistribution, license authentication terminates immediately.",
  },
  {
    id: "aiagent-q052-cored-audit-ai-agent-internal-engineering",
    category: "the-7-layer-security-pipeline-and-cybersecurity-services",
    questions: [
      "Can CoreD audit an AI Agent that my internal engineering team built in-house before we put it into production?",
    ],
    keywords: ["cored audit ai agent"],
    answer:
      "Yes! You can engage CoreD to run our Red-Team Attack Simulation (Promptfoo / Agentic Radar) and Source Code VAPT on your internal AI agents and MCP servers to uncover prompt injection or data leak risks before public launch.",
  },
  {
    id: "aiagent-q053-fast-team-deploy-ai-agent-after",
    category: "deployment-license-keys-and-technical-integration",
    questions: [
      "How fast can my team deploy an AI Agent after subscribing on CoreDhristi?",
    ],
    keywords: ["fast team deploy ai"],
    answer:
      "You can go from checkout to a live running AI worker in under 5 minutes. Simply subscribe, copy your instant CoreDhristi license key, paste it into your .env configuration file, and start the agent.",
  },
  {
    id: "aiagent-q054-env-license-key-deployment-actually-work",
    category: "deployment-license-keys-and-technical-integration",
    questions: [
      "How does the `.env` license key deployment actually work?",
    ],
    keywords: ["env license key deployment"],
    answer:
      "When you subscribe to a downloadable/self-hosted agent or MCP server, CoreDhristi issues a unique cryptographic COREDHRISTI_LICENSE_KEY. You add this key to your project's .env file; on startup, the agent validates your active subscription against CoreDhristi's licensing server before executing tasks.",
  },
  {
    id: "aiagent-q055-happens-deployed-ai-agent-cancel-monthly",
    category: "deployment-license-keys-and-technical-integration",
    questions: [
      "What happens to our deployed AI Agent if we cancel our monthly subscription?",
    ],
    keywords: ["happens deployed ai agent"],
    answer:
      "You can cancel anytime with no lock-in. The moment your subscription period ends or is cancelled, your CoreDhristi license key is automatically revoked, cleanly disabling the agent without leaving orphaned billing charges.",
  },
  {
    id: "aiagent-q056-company-doesn-t-have-internal-devops-team",
    category: "deployment-license-keys-and-technical-integration",
    questions: [
      "What if my company doesn't have an internal DevOps team to manage `.env` files or Docker containers?",
    ],
    keywords: ["company doesn t have"],
    answer:
      "You have two easy options: either choose a Cloud-Hosted Agent on the marketplace (where the developer hosts the runtime and you connect via a simple dashboard or webhook), or have CoreD's IT & Cloud team handle the entire deployment and server maintenance for you.",
  },
  {
    id: "aiagent-q057-ai-agents-integrate-whatsapp-business-api",
    category: "deployment-license-keys-and-technical-integration",
    questions: [
      "Can your AI Agents integrate with WhatsApp Business API (Meta Cloud API) without getting our number banned?",
    ],
    keywords: ["ai agents integrate whatsapp"],
    answer:
      "Yes. For production business deployments, we strongly recommend connecting via the Official Meta WhatsApp Business Cloud API (or approved BSPs) with proper template message approvals and rate-limiting guardrails so your business number remains 100% compliant and safe from bans.",
  },
  {
    id: "aiagent-q058-cored-ai-agent-connect-postgresql-supabase",
    category: "deployment-license-keys-and-technical-integration",
    questions: [
      "Can a CoreD AI Agent connect to PostgreSQL, Supabase, MongoDB, or MySQL databases?",
    ],
    keywords: ["cored ai agent connect"],
    answer:
      "Yes. Whether you use Supabase (PostgreSQL with pgvector), Azure SQL, MongoDB Atlas, or MySQL, we connect your AI Agent via a read/write MCP Server or Prisma/EF Core data layer with strict role-based database permissions.",
  },
  {
    id: "aiagent-q059-ai-agent-embedded-directly-chat-widget",
    category: "deployment-license-keys-and-technical-integration",
    questions: [
      "Can the AI Agent be embedded directly as a chat widget on my Next.js, React, or WordPress website?",
    ],
    keywords: ["ai agent embedded directly"],
    answer:
      "Yes. CoreD provides lightweight, customizable chat widgets and API endpoints that drop right into React, Vite, Next.js, Tailwind CSS, or WordPress sites, complete with streaming responses and lead-capture forms.",
  },
  {
    id: "aiagent-q060-cored-support-monorepo-architectures-combining-bac",
    category: "deployment-license-keys-and-technical-integration",
    questions: [
      "Does CoreD support monorepo architectures combining backends like NestJS or ASP.NET Core with Next.js frontends?",
    ],
    keywords: ["cored support monorepo architectures"],
    answer:
      "Yes. Our engineering team regularly works with modern full-stack and monorepo architectures—connecting Next.js / React frontends with Node.js, NestJS, or ASP.NET Core backends, Redis/BullMQ message queues, and vector databases.",
  },
  {
    id: "aiagent-q061-ai-agent-handle-high-traffic-spikes",
    category: "deployment-license-keys-and-technical-integration",
    questions: [
      "How does an AI Agent handle high traffic spikes, like 500 customers messaging at the same time during a festival sale?",
    ],
    keywords: ["ai agent handle high"],
    answer:
      "We architect enterprise agent pipelines using asynchronous job queues (such as Redis and BullMQ) and serverless auto-scaling. Incoming messages are queued reliably, processed concurrently within LLM rate limits, and delivered without dropping a single customer webhook.",
  },
  {
    id: "aiagent-q062-ai-agent-book-meetings-directly-onto",
    category: "deployment-license-keys-and-technical-integration",
    questions: [
      "Can the AI Agent book meetings directly onto my sales team's Google Calendar or Calendly?",
    ],
    keywords: ["ai agent book meetings"],
    answer:
      "Yes. Through tool-calling or MCP calendar integrations, the agent checks your team's real-time availability, offers time slots to the prospect inside the chat, books the confirmed slot, and sends Google Meet or Zoom invites to both parties.",
  },
  {
    id: "aiagent-q063-test-ai-agent-staging-environment-before",
    category: "deployment-license-keys-and-technical-integration",
    questions: [
      "Can I test an AI Agent in a staging environment before connecting it to my live customer WhatsApp or CRM?",
    ],
    keywords: ["test ai agent staging"],
    answer:
      "Yes. Every CoreD deployment includes a staging/sandbox testing phase where your team can simulate customer queries, verify tool calls, and refine system prompts before switching the webhook to live customer traffic.",
  },
  {
    id: "aiagent-q064-update-ai-agent-s-knowledge-base-company",
    category: "deployment-license-keys-and-technical-integration",
    questions: [
      "How do we update the AI Agent's knowledge base when our company launches a new product or changes pricing?",
    ],
    keywords: ["update ai agent s"],
    answer:
      "You don't need to rewrite code. With CoreD's RAG and Markdown/CMS knowledge base setup, you simply update your pricing document, Markdown file, or CRM product table, and the AI Agent immediately reflects the updated information in its next conversation.",
  },
  {
    id: "aiagent-q065-ai-agent-log-its-conversations-managers",
    category: "deployment-license-keys-and-technical-integration",
    questions: [
      "Does the AI Agent log its conversations so our managers can audit its performance?",
    ],
    keywords: ["ai agent log its"],
    answer:
      "Yes. All conversations, tool calls, lead scores, and fallback events are logged in your dashboard so your operations team can review transcripts, monitor resolution accuracy, and export analytics.",
  },
  {
    id: "aiagent-q066-ai-agent-trigger-webhooks-notify-internal",
    category: "deployment-license-keys-and-technical-integration",
    questions: [
      "Can an AI Agent trigger webhooks to notify our internal Slack, Discord, or Microsoft Teams channels?",
    ],
    keywords: ["ai agent trigger webhooks"],
    answer:
      "Yes. Whenever a critical event occurs—such as a high-ticket enterprise lead arriving, a payment succeeding, or a security alert firing—the agent pushes a structured notification card directly into your team's Slack, Discord, or Teams channel.",
  },
  {
    id: "aiagent-q067-coredhristi-charge-companies-monthly-platform-memb",
    category: "pricing-billing-currency-and-roi",
    questions: [
      "Does CoreDhristi charge companies a monthly platform membership fee just to browse or access the marketplace?",
    ],
    keywords: ["coredhristi charge companies monthly"],
    answer:
      "No. Browsing the marketplace is 100% free and requires no login or credit card. There are zero platform tier fees—you only pay the per-agent subscription or one-time price set by the creator for the specific agent you hire.",
  },
  {
    id: "aiagent-q068-currencies-payment-methods-supported-indian-intern",
    category: "pricing-billing-currency-and-roi",
    questions: [
      "What currencies and payment methods are supported for Indian and international buyers?",
    ],
    keywords: ["currencies payment methods supported"],
    answer:
      "CoreDhristi automatically detects your region. Indian buyers pay in INR via Razorpay (supporting UPI, Credit/Debit Cards, and Netbanking). International buyers pay in USD, EUR, or GBP via Stripe.",
  },
  {
    id: "aiagent-q069-much-typical-ai-agent-subscription-cost",
    category: "pricing-billing-currency-and-roi",
    questions: [
      "How much does a typical AI Agent subscription cost on CoreDhristi?",
    ],
    keywords: ["much typical ai agent"],
    answer:
      "CoreDhristi marketplace subscriptions are separate from CoreD project setup. Check the current marketplace listing for its recurring price, usage limits and cancellation terms. For CoreD services, compare the proposed USD prices on Services; a written quote confirms the final scope, provider charges and optional support.",
  },
  {
    id: "aiagent-q070-buy-ai-agent-automation-one-time-payment",
    category: "pricing-billing-currency-and-roi",
    questions: [
      "Can I buy an AI Agent or Automation with a one-time payment instead of a monthly subscription?",
    ],
    keywords: ["buy ai agent automation"],
    answer:
      "Yes. Depending on how the creator lists the item, CoreDhristi supports both monthly/yearly license subscriptions and one-time purchases with instant access.",
  },
  {
    id: "aiagent-q071-21-day-buyer-protection-hold-protect-company",
    category: "pricing-billing-currency-and-roi",
    questions: [
      "What is the \"21-Day Buyer-Protection Hold,\" and how does it protect my company?",
    ],
    keywords: ["21 day buyer protection"],
    answer:
      "Buyer-protection, payout and refund terms for CoreDhristi marketplace purchases are separate from CoreD custom project terms. Check the terms shown for the current listing and order; do not assume a fixed hold period or a guaranteed refund. CoreD project payment and acceptance terms are confirmed in the written agreement.",
  },
  {
    id: "aiagent-q072-calculate-roi-hiring-cored-ai-agent",
    category: "pricing-billing-currency-and-roi",
    questions: [
      "How can I calculate the ROI of hiring a CoreD AI Agent versus hiring another full-time human employee?",
    ],
    keywords: ["calculate roi hiring cored"],
    answer:
      "Start with the time your team spends on the workflow and the errors or delays you want to reduce. Compare those baseline measures with results from a pilot, including setup, provider usage, maintenance and human review costs. Response time and capacity depend on the system; CoreD does not guarantee savings, sales or zero latency.",
  },
  {
    id: "aiagent-q073-custom-project-pricing-structured-hire-cored",
    category: "pricing-billing-currency-and-roi",
    questions: [
      "How is custom project pricing structured when we hire CoreD for a bespoke AI-Agent CRM or VAPT audit?",
    ],
    keywords: ["custom project pricing structured"],
    answer:
      "For custom CoreD engineering (like bespoke CRMs, WhatsApp pipelines, or VAPT security engagements), we scope the project around your exact deliverables—offering either a fixed milestone-based build fee plus optional maintenance, or a dedicated retainer model.",
  },
  {
    id: "aiagent-q074-there-hidden-cancellation-fees-decide-stop",
    category: "pricing-billing-currency-and-roi",
    questions: [
      "Are there any hidden cancellation fees if we decide to stop using a marketplace AI Agent?",
    ],
    keywords: ["there hidden cancellation fees"],
    answer:
      "Zero cancellation fees. You can cancel your subscription with one click from your billing dashboard at any time, and you will never be billed again.",
  },
  {
    id: "aiagent-q075-company-get-proper-gst-invoice-indian",
    category: "pricing-billing-currency-and-roi",
    questions: [
      "Can my company get a proper GST invoice for Indian purchases made on CoreDhristi or CoreD?",
    ],
    keywords: ["company get proper gst"],
    answer:
      "Yes. All INR transactions processed for Indian business buyers support proper billing documentation so your finance team can account for business software and IT service expenses accurately.",
  },
  {
    id: "aiagent-q076-start-one-ai-agent-scale-up",
    category: "pricing-billing-currency-and-roi",
    questions: [
      "Can we start with one AI Agent and scale up to 10 or 20 agents across different departments later?",
    ],
    keywords: ["start one ai agent"],
    answer:
      "Yes. Because CoreDhristi has no restrictive platform tiers, you can start by deploying a single ₹999/mo agent for WhatsApp lead capture today, validate the ROI in your first month, and progressively add agents for HR screening, invoicing, and support at your own pace.",
  },
  {
    id: "aiagent-q077-offer-free-demos-consultations-before-commit",
    category: "pricing-billing-currency-and-roi",
    questions: [
      "Do you offer free demos or consultations before we commit to a custom CoreD build?",
    ],
    keywords: ["offer free demos consultations"],
    answer:
      "Yes! You can watch platform demos directly on CoreDhristi, test free prompt packs in the Skills section, or book a direct discovery call with Krishanu Kaundilya and the CoreD team to map out your workflow architecture before spending a rupee.",
  },
  {
    id: "aiagent-q078-happens-payment-fails-monthly-agent-subscription",
    category: "pricing-billing-currency-and-roi",
    questions: [
      "What happens if a payment fails when our monthly agent subscription renews?",
    ],
    keywords: ["happens payment fails monthly"],
    answer:
      "Our billing system sends an automated reminder and provides a brief grace period to update your UPI mandate or card via Razorpay/Stripe so your live business workflows aren't abruptly interrupted by an expired card.",
  },
  {
    id: "aiagent-q079-much-revenue-share-keep-list-sell",
    category: "for-ai-developers-creators-and-sellers-on-coredhristi",
    questions: [
      "How much revenue share do I keep if I list and sell my AI Agent on CoreDhristi?",
    ],
    keywords: ["much revenue share keep"],
    answer:
      "Creators keep a flat 80% revenue share on every single sale and recurring subscription renewal—the highest creator payout rate in the AI marketplace industry.",
  },
  {
    id: "aiagent-q080-cost-anything-solo-developer-agency-list",
    category: "for-ai-developers-creators-and-sellers-on-coredhristi",
    questions: [
      "Does it cost anything for a solo developer or agency to list an AI Agent on CoreDhristi?",
    ],
    keywords: ["cost anything solo developer"],
    answer:
      "Listing is 100% free with unlimited listings. You can publish as many AI Agents, AI Automations, MCP Servers, and free Skills as you want without paying a single rupee in upfront listing fees.",
  },
  {
    id: "aiagent-q081-let-s-look-numbers-much-realistically-earn",
    category: "for-ai-developers-creators-and-sellers-on-coredhristi",
    questions: [
      "Let's look at the numbers: how much can I realistically earn as a developer on CoreDhristi?",
    ],
    keywords: ["let s look numbers"],
    answer:
      "Using our interactive creator projection calculator: if you list just 3 AI Agents priced at ₹999/month, and each agent grows to 15 active subscribers (45 total subscriptions), your 80% share reaches a run-rate of ₹35,964/month and approximately ₹2,91,308 in Year-1 earnings.",
  },
  {
    id: "aiagent-q082-creators-get-paid-coredhristi",
    category: "for-ai-developers-creators-and-sellers-on-coredhristi",
    questions: [
      "How and when do creators get paid on CoreDhristi?",
    ],
    keywords: ["creators get paid coredhristi"],
    answer:
      "Payouts are completely automated! Once a sale clears the 21-day buyer-protection window, your 80% share is disbursed automatically via direct bank transfer on the monthly payout cycle (subject to a minimum payout threshold of ₹1,000). You never have to submit manual withdrawal requests.",
  },
  {
    id: "aiagent-q083-account-types-sign-up-coredhristi",
    category: "for-ai-developers-creators-and-sellers-on-coredhristi",
    questions: [
      "What account types can sign up on CoreDhristi?",
    ],
    keywords: ["account types sign up"],
    answer:
      "When registering for free, you can choose between three dedicated account types: Solo AI Agent Developer, AI Agent Development Company (for agencies and studios), or Buyer Company.",
  },
  {
    id: "aiagent-q084-did-submitted-ai-agent-get-rejected",
    category: "for-ai-developers-creators-and-sellers-on-coredhristi",
    questions: [
      "Why did my submitted AI Agent get rejected by the 7-Layer Security Pipeline, and can I fix it?",
    ],
    keywords: ["did submitted ai agent"],
    answer:
      "If your submission fails any of the 7 automated checks (for example, Betterleaks detects a leftover .env key in your git commit history, or OSV-Scanner flags an outdated vulnerable npm/pip package), you receive a detailed diagnostic report. Once you patch the issue and resubmit, the pipeline re-verifies your agent automatically.",
  },
  {
    id: "aiagent-q085-publish-free-skills-prompt-packs-templates",
    category: "for-ai-developers-creators-and-sellers-on-coredhristi",
    questions: [
      "Why should I publish free \"Skills\" (prompt packs or templates) if they don't generate direct sales revenue?",
    ],
    keywords: ["publish free skills prompt"],
    answer:
      "Publishing high-value free Skills acts as a powerful lead magnet for your developer profile. Companies that download and trust your free prompt packs or system templates frequently upgrade to subscribing to your paid AI Agents or hiring you for custom builds.",
  },
  {
    id: "aiagent-q086-sets-monthly-subscription-price-ai-agent",
    category: "for-ai-developers-creators-and-sellers-on-coredhristi",
    questions: [
      "Who sets the monthly subscription price for an AI Agent I build?",
    ],
    keywords: ["sets monthly subscription price"],
    answer:
      "You do. As the creator, you have full control over your pricing strategy—whether you want to offer a low-cost, high-volume automation at ₹499/mo or a specialized enterprise MCP/Agent suite at ₹9,999/mo.",
  },
  {
    id: "aiagent-q087-coredhristi-stop-buyers-subscribing-one-month",
    category: "for-ai-developers-creators-and-sellers-on-coredhristi",
    questions: [
      "How does CoreDhristi stop buyers from subscribing for one month, copying my agent code, and cancelling?",
    ],
    keywords: ["coredhristi stop buyers subscribing"],
    answer:
      "CoreDhristi enforces access using revocable cryptographic license keys and also supports developer cloud-hosted execution (where the buyer never sees your underlying source code at all, interacting only via authenticated API endpoints).",
  },
  {
    id: "aiagent-q088-ai-development-agency-list-its-portfolio",
    category: "for-ai-developers-creators-and-sellers-on-coredhristi",
    questions: [
      "Can an AI development agency list its portfolio and get hired for custom enterprise projects through CoreDhristi?",
    ],
    keywords: ["ai development agency list"],
    answer:
      "Yes. By registering as an AI Agent Development Company and publishing verified agents on the marketplace, enterprise buyers using the \"Hire a Vetted Developer\" feature can contract your agency directly for bespoke work.",
  },
  {
    id: "aiagent-q089-documentation-need-include-submitting-agent-market",
    category: "for-ai-developers-creators-and-sellers-on-coredhristi",
    questions: [
      "What documentation do I need to include when submitting an agent to the marketplace?",
    ],
    keywords: ["documentation need include submitting"],
    answer:
      "You will need a clean README with .env setup steps, an automated test suite for Layer 4 QA verification, and a completed Layer 6 Scope Questionnaire declaring all external APIs, file paths, and permissions your agent accesses.",
  },
  {
    id: "aiagent-q090-there-developer-community-where-get-help",
    category: "for-ai-developers-creators-and-sellers-on-coredhristi",
    questions: [
      "Is there a developer community where I can get help preparing my agent for the 7-Layer review?",
    ],
    keywords: ["there developer community where"],
    answer:
      "Yes! You can join the official CoreDhristi Discord Community and access our Developer Documentation to get direct guidance on passing Semgrep, Promptfoo, and MCP Inspector checks.",
  },
  {
    id: "aiagent-q091-small-traditional-business-india-zero-technical",
    category: "troubleshooting-edge-cases-and-getting-started",
    questions: [
      "We are a small traditional business in India with zero technical staff. Can we still use CoreD's AI Agents?",
    ],
    keywords: ["small traditional business india"],
    answer:
      "Yes, that is exactly who we build for! Whether you run a retail brand, a manufacturing unit like Tohfa Bazzar, a transport fleet, or an agency, CoreD sets up the entire system for you so your staff can interact with the AI simply through WhatsApp or a clean web dashboard.",
  },
  {
    id: "aiagent-q092-happens-external-llm-provider-like-openai",
    category: "troubleshooting-edge-cases-and-getting-started",
    questions: [
      "What happens if the external LLM provider (like OpenAI or Anthropic) has a temporary outage?",
    ],
    keywords: ["happens external llm provider"],
    answer:
      "CoreD designs enterprise agents with automatic LLM fallback routing. If the primary model API times out, the agent automatically routes the request to a backup model (for example, failing over from GPT-4o to Claude 3.5 Sonnet or Gemini) so your customer chats remain uninterrupted.",
  },
  {
    id: "aiagent-q093-cored-ai-agent-generate-daily-weekly",
    category: "troubleshooting-edge-cases-and-getting-started",
    questions: [
      "Can the CoreD AI Agent generate daily or weekly executive summaries for the business owner on WhatsApp?",
    ],
    keywords: ["cored ai agent generate"],
    answer:
      "Yes! One of our most popular features for founders is the Morning Executive Briefing: every day at 9:00 AM, your AI Agent sends a concise message to your personal WhatsApp summarizing yesterday's total new leads, follow-ups completed, deals closed, and any pending escalations.",
  },
  {
    id: "aiagent-q094-ai-agent-filter-out-spam-messages",
    category: "troubleshooting-edge-cases-and-getting-started",
    questions: [
      "Can the AI Agent filter out spam messages, promotional calls, and irrelevant inquiries automatically?",
    ],
    keywords: ["ai agent filter out"],
    answer:
      "Yes. Before logging a lead into your CRM or triggering a sales notification, the AI Agent evaluates intent and filters out spam bots, vendor cold pitches, and accidental messages, keeping your CRM database clean.",
  },
  {
    id: "aiagent-q095-customer-sends-voice-note-whatsapp-instead",
    category: "troubleshooting-edge-cases-and-getting-started",
    questions: [
      "What if a customer sends a voice note on WhatsApp instead of typing text? Can the AI Agent understand it?",
    ],
    keywords: ["customer sends voice note"],
    answer:
      "Yes. Our WhatsApp AI pipelines support speech-to-text audio transcription (supporting English, Hindi, and regional accents). The agent transcribes the customer's voice note, understands the request, and replies in text or voice automatically.",
  },
  {
    id: "aiagent-q096-verify-am-dealing-official-coredhristi-cored",
    category: "troubleshooting-edge-cases-and-getting-started",
    questions: [
      "How do I verify that I am dealing with the official CoreDhristi and CoreD team?",
    ],
    keywords: ["verify am dealing official"],
    answer:
      "CoreD’s services website is coredhristi.com. The related marketplace is temporarily not published on this domain. General enquiries go to info@coredhristi.com and support to support@coredhristi.com. Use the website contact form if you need the team to confirm a message.",
  },
  {
    id: "aiagent-q097-cored-help-migrate-old-excel-sheets",
    category: "troubleshooting-edge-cases-and-getting-started",
    questions: [
      "Can CoreD help us migrate our old Excel sheets and messy contact lists into a new AI-Agent CRM?",
    ],
    keywords: ["cored help migrate old"],
    answer:
      "Yes. During onboarding, our team cleans, deduplicates, and imports your historical CSV/Excel lead sheets into your new database, and can even configure an AI Reactivation Agent to systematically reach out to your old dormant leads.",
  },
  {
    id: "aiagent-q098-ai-agent-remember-past-conversations-repeat",
    category: "troubleshooting-edge-cases-and-getting-started",
    questions: [
      "Does the AI Agent remember past conversations when a repeat customer messages back two months later?",
    ],
    keywords: ["ai agent remember past"],
    answer:
      "Yes. By storing structured conversation summaries and vector embeddings linked to the customer's phone number or email in your database, the AI Agent greets returning buyers with full context of their previous orders and preferences.",
  },
  {
    id: "aiagent-q099-fastest-way-start-right-now-just",
    category: "troubleshooting-edge-cases-and-getting-started",
    questions: [
      "What is the fastest way to start right now if I just want to explore what's available?",
    ],
    keywords: ["fastest way start right"],
    answer:
      "You can browse the CoreDhristi Marketplace and the Free Skills library right now without creating an account or entering a credit card. When you're ready to deploy or list an agent, simply sign up for free and verify your phone number.",
  },
  {
    id: "aiagent-q100-have-specific-workflow-cybersecurity-problem-mind",
    category: "troubleshooting-edge-cases-and-getting-started",
    questions: [
      "I have a specific workflow or cybersecurity problem in mind right now. How do I start a project with CoreD?",
    ],
    keywords: ["have specific workflow cybersecurity"],
    answer:
      "Describe the workflow or security problem through Contact us so the CoreD team can review your requirements. For general enquiries, email info@coredhristi.com; for support, use support@coredhristi.com. I can explain options here, but this chat does not place an order or confirm the scope.",
    action: "contact",
  },
  {
    id: "aiagent-q101-first-version-ai-agent-run-read-only",
    category: "agent-permissions-boundaries-and-action-controls",
    questions: [
      "Can the first version of the AI Agent run in read-only mode?",
    ],
    keywords: ["first version ai agent"],
    answer:
      "Yes. A safe pilot can begin with read-only access so the agent can retrieve permitted information, classify requests and prepare recommendations without changing customer records. After the team validates its answers, specific write actions can be considered separately. The exact access model must be agreed for the systems connected to the CoreD solution.",
  },
  {
    id: "aiagent-q102-limit-agent-small-approved-set-actions",
    category: "agent-permissions-boundaries-and-action-controls",
    questions: [
      "Can I limit an agent to a small, approved set of actions?",
    ],
    keywords: ["limit agent small approved"],
    answer:
      "Yes. The agent can be designed around an explicit allow-list of tools, such as looking up an approved record or preparing a draft. Anything outside that list should be unavailable to the agent or routed to a person. CoreD should confirm the required actions and permissions during solution design.",
  },
  {
    id: "aiagent-q103-agent-ask-only-missing-details-instead",
    category: "agent-permissions-boundaries-and-action-controls",
    questions: [
      "Can the agent ask only for missing details instead of restarting the whole form?",
    ],
    keywords: ["agent ask only missing"],
    answer:
      "Yes. A well-designed intake flow keeps track of which required fields have already been collected and validated. It should ask only for the missing or unclear details, show a brief recap when useful, and avoid making the customer repeat information that is already available in the current case.",
  },
  {
    id: "aiagent-q104-agent-handle-message-contains-two-different",
    category: "agent-permissions-boundaries-and-action-controls",
    questions: [
      "How does the agent handle a message that contains two different requests?",
    ],
    keywords: ["agent handle message contains"],
    answer:
      "It can identify the separate intents, handle the parts that are within its approved scope, and keep each action associated with the correct record or case. If one request needs a person or a different workflow, it should explain that clearly rather than silently dropping part of the message.",
  },
  {
    id: "aiagent-q105-agent-verify-real-system-result-before",
    category: "agent-permissions-boundaries-and-action-controls",
    questions: [
      "Can the agent verify a real system result before telling a customer an action succeeded?",
    ],
    keywords: ["agent verify real system"],
    answer:
      "It should. For actions such as updating a record or submitting a request, the agent should rely on a successful response from the connected business system. If the system reports failure, a pending state or an unknown result, the agent must communicate that status accurately and must not say the action is complete.",
  },
  {
    id: "aiagent-q106-agent-explain-needs-particular-piece-information",
    category: "agent-permissions-boundaries-and-action-controls",
    questions: [
      "Can the agent explain why it needs a particular piece of information?",
    ],
    keywords: ["agent explain needs particular"],
    answer:
      "Yes. The conversation can be designed to give a short reason when requesting information—for example, explaining that an order reference is needed to locate the correct order. The agent should request only information needed for the task and should not pressure a customer to provide unrelated personal details.",
  },
  {
    id: "aiagent-q107-agent-record-refused-deferred-requested-action",
    category: "agent-permissions-boundaries-and-action-controls",
    questions: [
      "Can the agent record why it refused or deferred a requested action?",
    ],
    keywords: ["agent record refused deferred"],
    answer:
      "Yes. The agent can give a concise, customer-safe explanation when it cannot proceed—for example, because required information is missing, the request is outside its permissions or a manager must approve it. It should identify the next valid step without exposing private internal reasoning or security-sensitive rules.",
  },
  {
    id: "aiagent-q108-place-limit-many-high-impact-actions-agent",
    category: "agent-permissions-boundaries-and-action-controls",
    questions: [
      "Can we place a limit on how many high-impact actions the agent may perform in one session?",
    ],
    keywords: ["place limit many high"],
    answer:
      "Yes. A custom implementation can apply action limits, spending or record-count thresholds, and confirmation rules. For example, the agent might be allowed to prepare several updates but require a manager to approve a bulk operation. The limits should reflect the risk of each action.",
  },
  {
    id: "aiagent-q109-agent-tell-difference-between-question-request",
    category: "agent-permissions-boundaries-and-action-controls",
    questions: [
      "How does the agent tell the difference between a question and a request to change an account?",
    ],
    keywords: ["agent tell difference between"],
    answer:
      "The agent can classify whether the customer is asking for information or requesting a state change. For a change, it should check identity, authority and the required fields before using any connected tool. If the message is ambiguous, it should ask the customer to clarify instead of changing the account.",
  },
  {
    id: "aiagent-q110-define-actions-agent-must-never-perform",
    category: "agent-permissions-boundaries-and-action-controls",
    questions: [
      "Can we define actions the agent must never perform, even when a customer requests them?",
    ],
    keywords: ["define actions agent must"],
    answer:
      "Yes. The solution can explicitly prohibit actions such as deleting important records, changing ownership, approving refunds or changing payment details unless the business has separately authorised that operation. A customer message must not override the permission rules configured by the business.",
  },
  {
    id: "aiagent-q111-customer-gives-two-conflicting-answers-during",
    category: "ambiguous-incomplete-and-changing-conversations",
    questions: [
      "What if a customer gives two conflicting answers during the same conversation?",
    ],
    keywords: ["customer gives two conflicting"],
    answer:
      "The agent should not silently choose one value. It can show the conflicting details, ask which one is correct, and keep the affected action on hold until the customer confirms. The final confirmed value and the earlier correction can remain visible in the case history where that history is configured.",
  },
  {
    id: "aiagent-q112-happens-customer-changes-important-requirement-aft",
    category: "ambiguous-incomplete-and-changing-conversations",
    questions: [
      "What happens if a customer changes an important requirement after the agent has started processing it?",
    ],
    keywords: ["happens customer changes important"],
    answer:
      "The agent should identify which earlier details are affected, update the working summary and re-check any dependent decisions. If an external action has already been submitted, it should not assume that the change was applied; it should check the system status or route the request to a person.",
  },
  {
    id: "aiagent-q113-agent-guide-someone-not-know-technical",
    category: "ambiguous-incomplete-and-changing-conversations",
    questions: [
      "Can the agent guide someone who does not know the technical name of what they need?",
    ],
    keywords: ["agent guide someone not"],
    answer:
      "Yes. The conversation can use plain-language questions and examples to discover the underlying need before asking for technical specifications. If several interpretations remain possible, the agent should offer a small number of clear options and ask the customer to choose.",
  },
  {
    id: "aiagent-q114-keep-track-discussion-customer-switches-between",
    category: "ambiguous-incomplete-and-changing-conversations",
    questions: [
      "Can it keep track of the discussion when a customer switches between several topics?",
    ],
    keywords: ["keep track discussion customer"],
    answer:
      "A custom conversation flow can maintain separate topic notes within the same interaction. The agent should make clear which topic it is answering, avoid applying a detail from one request to another, and return to an unfinished topic only when the customer wants to continue it.",
  },
  {
    id: "aiagent-q115-agent-respond-customer-s-answer-too-vague",
    category: "ambiguous-incomplete-and-changing-conversations",
    questions: [
      "How should the agent respond when a customer's answer is too vague to act on?",
    ],
    keywords: ["agent respond customer s"],
    answer:
      "It should ask one focused clarification question rather than guessing. For example, instead of treating 'soon' as a confirmed deadline, it can ask for a date or an acceptable time range. If the customer cannot provide the detail, the agent should record the uncertainty and explain what can happen next.",
  },
  {
    id: "aiagent-q116-agent-understand-references-such-second-option",
    category: "ambiguous-incomplete-and-changing-conversations",
    questions: [
      "Can the agent understand references such as 'the second option' or 'the item I mentioned earlier'?",
    ],
    keywords: ["agent understand references such"],
    answer:
      "It can use the current conversation context to resolve references when there is only one reasonable match. If two items could fit, it should repeat the possible choices and ask which one the customer means before taking an action.",
  },
  {
    id: "aiagent-q117-agent-understand-customers-product-nicknames-inter",
    category: "ambiguous-incomplete-and-changing-conversations",
    questions: [
      "Can the agent understand our customers' product nicknames and internal abbreviations?",
    ],
    keywords: ["agent understand customers product"],
    answer:
      "Yes. A project can include an approved glossary that maps common nicknames, abbreviations and alternate spellings to the correct product or process terms. The glossary should be maintained by the business, and uncertain matches should be clarified instead of treated as confirmed.",
  },
  {
    id: "aiagent-q118-agent-resume-interrupted-conversation-without-losi",
    category: "ambiguous-incomplete-and-changing-conversations",
    questions: [
      "Can the agent resume an interrupted conversation without losing confirmed details?",
    ],
    keywords: ["agent resume interrupted conversation"],
    answer:
      "A custom workflow can save the relevant case state and the details already confirmed, then continue from the unfinished step when the conversation resumes. Before a sensitive change, the agent should still re-check any information that may have expired or requires fresh verification.",
  },
  {
    id: "aiagent-q119-agent-show-customer-checklist-still-needed",
    category: "ambiguous-incomplete-and-changing-conversations",
    questions: [
      "Can the agent show the customer a checklist of what is still needed?",
    ],
    keywords: ["agent show customer checklist"],
    answer:
      "Yes. It can present a concise checklist of completed, missing and pending items for a specific request. The checklist should use customer-friendly wording and distinguish information the customer must provide from steps that are waiting on CoreD's client team or another connected system.",
  },
  {
    id: "aiagent-q120-agent-give-short-answer-first-provide",
    category: "ambiguous-incomplete-and-changing-conversations",
    questions: [
      "Can the agent give a short answer first and provide more detail when asked?",
    ],
    keywords: ["agent give short answer"],
    answer:
      "Yes. The response style can be configured to provide a direct answer first, followed by optional explanation, steps or supporting references. This keeps routine interactions efficient while allowing customers to request more detail when they need it.",
  },
  {
    id: "aiagent-q121-agent-convert-technical-complaint-into-structured",
    category: "support-triage-case-handling-and-service-recovery",
    questions: [
      "Can an agent convert a technical complaint into a structured support case?",
    ],
    keywords: ["agent convert technical complaint"],
    answer:
      "This can be scoped into a custom workflow. The agent can collect the issue summary, affected product or service, observed symptoms, start time and business impact, then create or prepare a structured case if the required support system is connected and permission is granted.",
  },
  {
    id: "aiagent-q122-distinguish-major-service-interruption-problem-aff",
    category: "support-triage-case-handling-and-service-recovery",
    questions: [
      "Can it distinguish a major service interruption from a problem affecting one user?",
    ],
    keywords: ["distinguish major service interruption"],
    answer:
      "Yes, if the business defines suitable impact and urgency rules. The agent can ask how many users or locations are affected, whether work is blocked and when the issue began, then assign a proposed severity. Critical classifications should follow the client's escalation policy and may require human confirmation.",
  },
  {
    id: "aiagent-q123-support-requests-routed-according-product-region",
    category: "support-triage-case-handling-and-service-recovery",
    questions: [
      "Can support requests be routed according to product, region or responsible department?",
    ],
    keywords: ["support requests routed according"],
    answer:
      "Yes. Routing rules can map the issue type and relevant business attributes to the appropriate team or queue. The exact rules, team directory and fallback owner need to be supplied by the business so the agent does not invent responsibility when a route is missing.",
  },
  {
    id: "aiagent-q124-agent-remember-troubleshooting-steps-have-already",
    category: "support-triage-case-handling-and-service-recovery",
    questions: [
      "Can the agent remember which troubleshooting steps have already been tried?",
    ],
    keywords: ["agent remember troubleshooting steps"],
    answer:
      "Yes. A structured troubleshooting flow can record each suggested check and its reported outcome. The agent can then continue from the next relevant step rather than repeating completed checks. It should not claim that a technical fix worked unless the customer or connected system confirms the result.",
  },
  {
    id: "aiagent-q125-agent-tell-customer-their-case-still",
    category: "support-triage-case-handling-and-service-recovery",
    questions: [
      "What should the agent tell a customer when their case is still waiting for a support team?",
    ],
    keywords: ["agent tell customer their"],
    answer:
      "It should state that the case is pending, identify the next known step and share only a status or expected update time that the business has actually confirmed. It must not present an open case as resolved just to make the conversation appear complete.",
  },
  {
    id: "aiagent-q126-recognise-customer-reports-same-unresolved-issue",
    category: "support-triage-case-handling-and-service-recovery",
    questions: [
      "Can it recognise when a customer reports the same unresolved issue again?",
    ],
    keywords: ["recognise customer reports same"],
    answer:
      "If the customer can be matched to the relevant open case, the agent can flag the new message as a possible repeat report and attach it to that case for review. Matching should use approved identifiers and should ask for clarification when it cannot safely distinguish two similar issues.",
  },
  {
    id: "aiagent-q127-agent-distinguish-reported-symptom-customer-s-susp",
    category: "support-triage-case-handling-and-service-recovery",
    questions: [
      "Can the agent distinguish a reported symptom from the customer's suspected cause?",
    ],
    keywords: ["agent distinguish reported symptom"],
    answer:
      "Yes. The case structure can keep the customer's observed symptom separate from their theory about why it happened. For example, 'the page does not load' should be recorded as the symptom, while 'the server is down' remains an unverified suspected cause until the technical team confirms it.",
  },
  {
    id: "aiagent-q128-agent-ask-log-screenshot-serial-number",
    category: "support-triage-case-handling-and-service-recovery",
    questions: [
      "Can the agent ask for a log, screenshot or serial number only when it is relevant?",
    ],
    keywords: ["agent ask log screenshot"],
    answer:
      "Yes. The troubleshooting flow can request evidence based on the issue type and the approved diagnostic checklist. It should explain why the item is needed, avoid collecting unrelated files, and offer a human route when the customer cannot safely provide the requested information.",
  },
  {
    id: "aiagent-q129-identify-patterns-across-several-similar-support",
    category: "support-triage-case-handling-and-service-recovery",
    questions: [
      "Can it identify patterns across several similar support incidents?",
    ],
    keywords: ["identify patterns across several"],
    answer:
      "If case records are available for analysis, an agent can group incidents by symptom, product, time period or affected workflow and prepare a list of recurring patterns for staff review. Any suggested root cause should be labelled as a hypothesis until an engineer verifies it.",
  },
  {
    id: "aiagent-q130-different-complaint-types-follow-different-handlin",
    category: "support-triage-case-handling-and-service-recovery",
    questions: [
      "Can different complaint types follow different handling rules?",
    ],
    keywords: ["different complaint types follow"],
    answer:
      "Yes. A business can define separate paths for a service fault, delivery concern, billing dispute, product complaint or general feedback. Each path can have its own required details, priority rules, team owner and escalation conditions; the approved policy must come from the client.",
  },
  {
    id: "aiagent-q131-agent-check-whether-enquiry-has-enough",
    category: "sales-conversations-and-commercial-guardrails",
    questions: [
      "Can the agent check whether an enquiry has enough information before passing it to sales?",
    ],
    keywords: ["agent check whether enquiry"],
    answer:
      "Yes. The client can define a sales-readiness checklist, such as the product of interest, intended use, quantity range and decision stage. The agent can identify missing items and mark the enquiry as ready or incomplete according to that checklist, without inventing a lead score or rejecting the prospect.",
  },
  {
    id: "aiagent-q132-compare-customer-s-requested-specifications-produc",
    category: "sales-conversations-and-commercial-guardrails",
    questions: [
      "Can it compare a customer's requested specifications with our product or service catalogue?",
    ],
    keywords: ["compare customer s requested"],
    answer:
      "This can be built when the business provides a reliable catalogue and clear matching rules. The agent can map the request to matching options, point out missing specifications and highlight where no confirmed match exists. Final suitability should be checked against the client's actual product rules.",
  },
  {
    id: "aiagent-q133-prevent-agent-promising-unapproved-discount-delive",
    category: "sales-conversations-and-commercial-guardrails",
    questions: [
      "How do you prevent the agent from promising an unapproved discount or delivery deadline?",
    ],
    keywords: ["prevent agent promising unapproved"],
    answer:
      "The agent should use only approved commercial rules and current values returned by the authorised source system. Discounts, special delivery commitments and exceptions can be restricted to staff approval. If the requested term is not covered by policy, the agent should say that confirmation is needed.",
  },
  {
    id: "aiagent-q134-recognise-request-change-existing-agreement-rather",
    category: "sales-conversations-and-commercial-guardrails",
    questions: [
      "Can it recognise a request to change an existing agreement rather than treat it as a new sale?",
    ],
    keywords: ["recognise request change existing"],
    answer:
      "Yes. The intent flow can distinguish a new purchase enquiry from a request to amend an existing order, subscription or agreement. Before suggesting a change, the agent should identify the relevant record and check which changes are allowed under the client's process.",
  },
  {
    id: "aiagent-q135-agent-identify-possible-duplicate-enquiries-before",
    category: "sales-conversations-and-commercial-guardrails",
    questions: [
      "Can the agent identify possible duplicate enquiries before creating another lead?",
    ],
    keywords: ["agent identify possible duplicate"],
    answer:
      "If an authorised CRM lookup is available, the agent can compare permitted identifiers such as email address, phone number or reference number and flag likely matches. It should avoid merging records automatically when the match is uncertain, because two different people may share contact details.",
  },
  {
    id: "aiagent-q136-recognise-buyer-still-comparing-options-rather",
    category: "sales-conversations-and-commercial-guardrails",
    questions: [
      "Can it recognise when a buyer is still comparing options rather than ready to purchase?",
    ],
    keywords: ["recognise buyer still comparing"],
    answer:
      "The agent can classify the conversation using the customer's stated needs and buying stage, then offer useful comparison information or ask what would help with the decision. It should not pressure the customer or label an enquiry as ready to close without evidence.",
  },
  {
    id: "aiagent-q137-capture-customer-s-preferred-contact-time-channel",
    category: "sales-conversations-and-commercial-guardrails",
    questions: [
      "Can it capture a customer's preferred contact time and channel?",
    ],
    keywords: ["capture customer s preferred"],
    answer:
      "Yes. The agent can ask for a preferred channel and suitable contact window, store the preference where the customer has agreed, and make it available to the relevant team. Whether a particular channel can be used depends on the business's connected services and consent rules.",
  },
  {
    id: "aiagent-q138-stop-sales-follow-ups-customer-opts-out",
    category: "sales-conversations-and-commercial-guardrails",
    questions: [
      "Can it stop sales follow-ups when a customer opts out?",
    ],
    keywords: ["stop sales follow ups"],
    answer:
      "A custom follow-up workflow can record an opt-out and suppress the relevant promotional or sales messages across the channels included in that workflow. The business should define how opt-outs are applied, how staff are notified and what legally required service messages, if any, remain permitted.",
  },
  {
    id: "aiagent-q139-agent-check-product-eligibility-rules-before",
    category: "sales-conversations-and-commercial-guardrails",
    questions: [
      "Can the agent check product eligibility rules before recommending an option?",
    ],
    keywords: ["agent check product eligibility"],
    answer:
      "Yes. If the client provides clear eligibility criteria, the agent can check the customer's stated requirements against them and explain which conditions appear to be met or missing. It should flag borderline cases for staff review instead of making an unsupported eligibility decision.",
  },
  {
    id: "aiagent-q140-distinguish-enquiry-estimate-draft-order-confirmed",
    category: "sales-conversations-and-commercial-guardrails",
    questions: [
      "Can it distinguish an enquiry, an estimate, a draft order and a confirmed order?",
    ],
    keywords: ["distinguish enquiry estimate draft"],
    answer:
      "Yes. Those should be represented as separate states in the workflow. The agent must not describe an estimate or draft as a confirmed order; confirmation should occur only after the required approval or successful status update from the authorised business system.",
  },
  {
    id: "aiagent-q141-agent-use-different-approved-sources-product",
    category: "knowledge-quality-source-control-and-answer-governance",
    questions: [
      "Can the agent use different approved sources for product details, company policies and customer-specific terms?",
    ],
    keywords: ["agent use different approved"],
    answer:
      "Yes. A knowledge design can label sources by purpose and access level, then retrieve the appropriate source for the question. Customer-specific terms should be retrieved only after the customer and relevant account have been identified and the agent is authorised to view them.",
  },
  {
    id: "aiagent-q142-answer-include-link-approved-document-came",
    category: "knowledge-quality-source-control-and-answer-governance",
    questions: [
      "Can an answer include a link to the approved document it came from?",
    ],
    keywords: ["answer include link approved"],
    answer:
      "Yes, when the knowledge source has a stable and shareable reference. The agent can cite or link to the relevant policy or knowledge article so a customer or employee can check the source. Internal-only documents must not be exposed through a public answer.",
  },
  {
    id: "aiagent-q143-agent-respond-two-approved-documents-disagree",
    category: "knowledge-quality-source-control-and-answer-governance",
    questions: [
      "How should the agent respond when two approved documents disagree?",
    ],
    keywords: ["agent respond two approved"],
    answer:
      "It should not choose whichever answer sounds more plausible. The knowledge system should apply a documented source-priority rule, such as an approved current policy taking precedence over an archived draft. If the conflict cannot be resolved from metadata, the agent should flag it for the knowledge owner and avoid giving a definitive answer.",
  },
  {
    id: "aiagent-q144-agent-show-policy-product-information-used",
    category: "knowledge-quality-source-control-and-answer-governance",
    questions: [
      "Can the agent show when the policy or product information it used became effective?",
    ],
    keywords: ["agent show policy product"],
    answer:
      "Yes, if the source documents carry effective dates or version metadata. The answer can include the relevant date where it helps the customer understand the information. If the source has no reliable date, the agent should not invent one.",
  },
  {
    id: "aiagent-q145-manager-approve-new-knowledge-article-before",
    category: "knowledge-quality-source-control-and-answer-governance",
    questions: [
      "Can a manager approve a new knowledge article before the agent starts using it?",
    ],
    keywords: ["manager approve new knowledge"],
    answer:
      "Yes. A review-and-publish workflow can keep draft material out of retrieval until an authorised person approves it. The agent should use the currently published version and should not treat an employee's unreviewed note as official policy.",
  },
  {
    id: "aiagent-q146-find-questions-customers-repeatedly-ask-but",
    category: "knowledge-quality-source-control-and-answer-governance",
    questions: [
      "Can we find questions that customers repeatedly ask but the knowledge base does not answer?",
    ],
    keywords: ["find questions customers repeatedly"],
    answer:
      "Yes. Conversation analytics can group unanswered or unresolved questions into themes and give the knowledge owner examples to review. The agent should not automatically publish a new policy answer from those conversations; a responsible employee should verify the answer first.",
  },
  {
    id: "aiagent-q147-employee-flag-ai-answer-incorrect-reviewed",
    category: "knowledge-quality-source-control-and-answer-governance",
    questions: [
      "Can an employee flag an AI answer as incorrect so it can be reviewed?",
    ],
    keywords: ["employee flag ai answer"],
    answer:
      "Yes. A feedback control can capture the conversation reference, the answer, the reason it was flagged and the employee's correction. The knowledge owner can then update the source or workflow and test the change before publishing it.",
  },
  {
    id: "aiagent-q148-agent-understand-comparison-tables-decision-matric",
    category: "knowledge-quality-source-control-and-answer-governance",
    questions: [
      "Can the agent understand comparison tables and decision matrices in its knowledge base?",
    ],
    keywords: ["agent understand comparison tables"],
    answer:
      "This depends on the format and quality of the source data. Structured tables can be prepared for retrieval so the agent compares the right columns and conditions. Important calculations or eligibility decisions should be validated against deterministic rules rather than relying only on free-form text generation.",
  },
  {
    id: "aiagent-q149-different-customers-receive-different-answers-base",
    category: "knowledge-quality-source-control-and-answer-governance",
    questions: [
      "Can different customers receive different answers based on their signed agreement or service tier?",
    ],
    keywords: ["different customers receive different"],
    answer:
      "Yes, if the relevant account terms are stored in an authorised source and the identity of the customer is verified. The agent can retrieve the applicable terms for that account, while preventing one customer's contract information from appearing in another customer's conversation.",
  },
  {
    id: "aiagent-q150-stop-old-policy-being-retrieved-after",
    category: "knowledge-quality-source-control-and-answer-governance",
    questions: [
      "How can we stop an old policy from being retrieved after a replacement policy is published?",
    ],
    keywords: ["stop old policy being"],
    answer:
      "The knowledge base should use version status and effective dates, mark the replaced item as archived, and exclude archived material from normal retrieval. The update should also be tested with questions that previously returned the old policy to confirm that the new version is used.",
  },
  {
    id: "aiagent-q151-ai-agent-restricted-only-data-needed",
    category: "data-permissions-privacy-and-administrative-safeguards",
    questions: [
      "Can the AI Agent be restricted to only the data needed for one task?",
    ],
    keywords: ["ai agent restricted only"],
    answer:
      "Yes. The recommended design is least-privilege access: each agent tool receives only the fields and operations required for its defined job. Database and API permissions should enforce these limits on the server side, not rely only on instructions written in the prompt.",
  },
  {
    id: "aiagent-q152-prevent-one-company-s-records-appearing-another",
    category: "data-permissions-privacy-and-administrative-safeguards",
    questions: [
      "How do we prevent one company's records from appearing in another company's conversation?",
    ],
    keywords: ["prevent one company s"],
    answer:
      "A multi-company deployment should enforce tenant isolation in the data layer and in every tool request. The company or tenant identifier must be derived from the authenticated session, checked on the server and applied to every query. The agent should never be trusted to choose its own access boundary.",
  },
  {
    id: "aiagent-q153-different-staff-roles-have-different-visibility",
    category: "data-permissions-privacy-and-administrative-safeguards",
    questions: [
      "Can different staff roles have different visibility into customer information?",
    ],
    keywords: ["different staff roles have"],
    answer:
      "Yes. Role-based permissions can determine which records and fields a salesperson, support employee, manager or finance user may access. The AI Agent should inherit the same approved boundaries and should not reveal information simply because someone asks for it in chat.",
  },
  {
    id: "aiagent-q154-agent-show-preview-before-applying-bulk",
    category: "data-permissions-privacy-and-administrative-safeguards",
    questions: [
      "Can the agent show a preview before applying a bulk update?",
    ],
    keywords: ["agent show preview before"],
    answer:
      "Yes. A safe bulk-action flow can show the affected records, proposed changes and any records that could not be matched. The user can review the preview before execution. The final result should report the number of successful, skipped and failed updates.",
  },
  {
    id: "aiagent-q155-set-maximum-number-records-agent-may",
    category: "data-permissions-privacy-and-administrative-safeguards",
    questions: [
      "Can we set a maximum number of records the agent may process in one run?",
    ],
    keywords: ["set maximum number records"],
    answer:
      "Yes. A custom workflow can apply batch-size limits, rate limits and per-session action quotas. Larger operations can be split into reviewed batches or sent to an administrator so an unexpected request does not trigger an uncontrolled change.",
  },
  {
    id: "aiagent-q156-completely-disable-record-deletion-agent",
    category: "data-permissions-privacy-and-administrative-safeguards",
    questions: [
      "Can we completely disable record deletion for the agent?",
    ],
    keywords: ["completely disable record deletion"],
    answer:
      "Yes. The deletion tool can be omitted from the agent's available actions and the connected account can be denied delete permission. This is stronger than merely telling the agent not to delete records because the underlying system also blocks the operation.",
  },
  {
    id: "aiagent-q157-administrator-review-exactly-fields-agent-read",
    category: "data-permissions-privacy-and-administrative-safeguards",
    questions: [
      "Can an administrator review exactly which fields the agent read or changed?",
    ],
    keywords: ["administrator review exactly fields"],
    answer:
      "A project can be designed to record authorised tool calls, record references, fields changed, timestamps and the result returned by the connected system. The exact audit detail depends on the source system and logging configuration; sensitive values should not be copied unnecessarily into logs.",
  },
  {
    id: "aiagent-q158-define-long-chat-records-agent-action",
    category: "data-permissions-privacy-and-administrative-safeguards",
    questions: [
      "Can we define how long chat records and agent action logs should be retained?",
    ],
    keywords: ["define long chat records"],
    answer:
      "Retention periods can be specified as part of the solution's data-governance design, subject to the client's legal and operational requirements. The implementation should identify which data is stored, who can access it, when it is archived or deleted, and what evidence must be retained.",
  },
  {
    id: "aiagent-q159-test-agent-denied-access-user-lacks",
    category: "data-permissions-privacy-and-administrative-safeguards",
    questions: [
      "Can we test that the agent is denied access when a user lacks permission?",
    ],
    keywords: ["test agent denied access"],
    answer:
      "Yes. A permission test suite can include users, roles and records that should be inaccessible, then verify that the agent's tools reject those requests at the API or database layer. These negative tests should be repeated after permission changes so a prompt or interface update cannot accidentally widen access.",
  },
  {
    id: "aiagent-q160-agent-customer-asks-their-personal-information",
    category: "data-permissions-privacy-and-administrative-safeguards",
    questions: [
      "What should the agent do when a customer asks for their personal information to be corrected or erased?",
    ],
    keywords: ["agent customer asks their"],
    answer:
      "The agent can recognise the request, collect the minimum details needed to identify the relevant account and route it through the business's approved privacy process. It should not promise deletion or make a legal determination; completion must be confirmed by the authorised privacy or operations team.",
  },
  {
    id: "aiagent-q161-metrics-show-whether-agent-resolving-requests",
    category: "testing-performance-measurement-and-continuous-improvement",
    questions: [
      "Which metrics show whether the agent is resolving requests rather than merely sending replies?",
    ],
    keywords: ["metrics show whether agent"],
    answer:
      "Useful measures include confirmed resolution rate, repeat contact rate, escalation rate, incomplete-case rate, customer feedback and the proportion of actions verified by the source system. The team should define each metric clearly and review it alongside examples, because a high reply count alone does not prove that customers were helped.",
  },
  {
    id: "aiagent-q162-build-test-cases-anonymised-examples-real",
    category: "testing-performance-measurement-and-continuous-improvement",
    questions: [
      "Can we build test cases from anonymised examples of real customer conversations?",
    ],
    keywords: ["build test cases anonymised"],
    answer:
      "Yes. A review team can remove personal and confidential details, then convert representative conversations into test cases with expected outcomes. The test set should include routine requests, unusual wording, ambiguous cases, policy exceptions and attempts to trigger unauthorised actions.",
  },
  {
    id: "aiagent-q163-check-prompt-knowledge-update-has-not",
    category: "testing-performance-measurement-and-continuous-improvement",
    questions: [
      "How do we check that a prompt or knowledge update has not broken previously correct answers?",
    ],
    keywords: ["check prompt knowledge update"],
    answer:
      "Keep a versioned regression set of questions and expected behaviours. Run the set after changes to prompts, models, tools or knowledge sources, compare the results with the previous approved version, and investigate any new failure before releasing the update to customers.",
  },
  {
    id: "aiagent-q164-agent-flag-case-not-sufficiently-sure",
    category: "testing-performance-measurement-and-continuous-improvement",
    questions: [
      "Can the agent flag a case when it is not sufficiently sure of the answer?",
    ],
    keywords: ["agent flag case not"],
    answer:
      "Yes. The workflow can use observable signals such as missing source material, conflicting records, failed retrieval or an ambiguous intent to trigger a clarification or human review. A generated confidence percentage should not be shown unless it has been properly calibrated and validated for that use.",
  },
  {
    id: "aiagent-q165-compare-new-agent-version-current-version",
    category: "testing-performance-measurement-and-continuous-improvement",
    questions: [
      "Can we compare a new agent version with the current version before switching over?",
    ],
    keywords: ["compare new agent version"],
    answer:
      "Yes. The team can run both versions against the same approved test cases and compare correctness, policy adherence, tool use and response quality. A controlled pilot can then establish whether the new version is suitable for release.",
  },
  {
    id: "aiagent-q166-managers-review-selected-sample-conversations-ever",
    category: "testing-performance-measurement-and-continuous-improvement",
    questions: [
      "Can managers review a selected sample of conversations every week?",
    ],
    keywords: ["managers review selected sample"],
    answer:
      "Yes. A review queue can select conversations by sample rate, risk category, escalation or customer feedback. Managers can assess accuracy, tone, completeness and whether the agent respected its permissions, then record corrective actions for the team.",
  },
  {
    id: "aiagent-q167-see-step-customers-abandon-agent-led-process",
    category: "testing-performance-measurement-and-continuous-improvement",
    questions: [
      "Can we see at which step customers abandon an agent-led process?",
    ],
    keywords: ["see step customers abandon"],
    answer:
      "If the workflow records step events, analytics can show where customers stop, how often they return and which questions are associated with drop-off. This helps identify confusing instructions or unnecessary information requests; it does not by itself prove why a customer left.",
  },
  {
    id: "aiagent-q168-technical-tool-failures-separated-incorrect-ai",
    category: "testing-performance-measurement-and-continuous-improvement",
    questions: [
      "Can technical tool failures be separated from incorrect AI answers in the reports?",
    ],
    keywords: ["technical tool failures separated"],
    answer:
      "Yes. The monitoring design should use separate event types for model errors, retrieval misses, permission denials, external API failures, timeouts and answer-quality flags. Separating them helps the right team investigate the actual cause rather than treating every problem as an AI response issue.",
  },
  {
    id: "aiagent-q169-approval-rules-differ-low-risk-high-risk-actions",
    category: "testing-performance-measurement-and-continuous-improvement",
    questions: [
      "Can approval rules differ for low-risk and high-risk actions?",
    ],
    keywords: ["approval rules differ low"],
    answer:
      "Yes. A risk-based policy can allow low-impact tasks within defined limits while requiring stronger verification or human approval for financial, account, contractual or irreversible actions. The client should define the risk categories and who has authority to approve each one.",
  },
  {
    id: "aiagent-q170-happen-several-customers-say-same-answer",
    category: "testing-performance-measurement-and-continuous-improvement",
    questions: [
      "What should happen when several customers say the same answer is unhelpful?",
    ],
    keywords: ["happen several customers say"],
    answer:
      "The system can group similar feedback and flag the associated answer, source article or workflow for review. The team should check whether the issue comes from outdated information, unclear wording, a missing condition or a system integration problem before changing the answer.",
  },
  {
    id: "aiagent-q171-launch-ai-agent-one-department-before",
    category: "rollout-reliability-and-change-management",
    questions: [
      "Can we launch an AI Agent with one department before expanding it to the whole company?",
    ],
    keywords: ["launch ai agent one"],
    answer:
      "Yes. A phased rollout is a sensible approach: begin with one team and a narrow, measurable workflow, review real outcomes, then expand only after the process and controls are working as intended. The rollout plan should define ownership, success measures and a way to pause the pilot.",
  },
  {
    id: "aiagent-q172-agent-observe-conversations-shadow-mode-without",
    category: "rollout-reliability-and-change-management",
    questions: [
      "Can the agent observe conversations in shadow mode without replying to customers?",
    ],
    keywords: ["agent observe conversations shadow"],
    answer:
      "A shadow-mode design can analyse eligible interactions and record what it would have answered or done, while leaving the actual response to employees. This lets the business compare the agent's suggestions with human decisions before granting it permission to interact directly.",
  },
  {
    id: "aiagent-q173-restore-previous-agent-configuration-new-update",
    category: "rollout-reliability-and-change-management",
    questions: [
      "Can we restore the previous agent configuration if a new update performs worse?",
    ],
    keywords: ["restore previous agent configuration"],
    answer:
      "The project can use versioned prompts, workflow definitions and knowledge releases so the team can return to a previously approved configuration. The rollback process should also consider any data changes already made by the newer version; reverting instructions does not automatically undo external transactions.",
  },
  {
    id: "aiagent-q174-improve-agent-s-decision-logic-without-redesigning",
    category: "rollout-reliability-and-change-management",
    questions: [
      "Can we improve the agent's decision logic without redesigning the customer-facing website?",
    ],
    keywords: ["improve agent s decision"],
    answer:
      "Often, yes. The user interface and the agent's underlying rules can be separated so prompts, retrieval settings and workflow logic can be updated independently. Whether this is possible in an existing application depends on its architecture and how tightly the current interface is coupled to the agent.",
  },
  {
    id: "aiagent-q175-scenarios-included-pre-launch-acceptance-test",
    category: "rollout-reliability-and-change-management",
    questions: [
      "What scenarios should be included in a pre-launch acceptance test?",
    ],
    keywords: ["scenarios included pre launch"],
    answer:
      "Tests should cover common requests, missing information, contradictory answers, out-of-scope questions, permission limits, source-system errors, duplicate events, human handoff and recovery from interruption. The client should also approve the expected response and success condition for each important scenario.",
  },
  {
    id: "aiagent-q176-happen-enquiry-ai-service-connected-business",
    category: "rollout-reliability-and-change-management",
    questions: [
      "What should happen to an enquiry if an AI service or connected business system becomes unavailable?",
    ],
    keywords: ["happen enquiry ai service"],
    answer:
      "The workflow should have a defined fallback, such as saving the enquiry for later processing, showing a truthful temporary-status message or routing it to a human queue. The agent must not fabricate a result or discard the request because a dependency is unavailable.",
  },
  {
    id: "aiagent-q177-prevent-same-incoming-event-triggering-action",
    category: "rollout-reliability-and-change-management",
    questions: [
      "How can we prevent the same incoming event from triggering an action twice?",
    ],
    keywords: ["prevent same incoming event"],
    answer:
      "The integration can use event identifiers and idempotency controls so a repeated webhook or retry is recognised as the same event. Before creating a record or submitting an action again, the workflow should check whether the original operation has already been processed.",
  },
  {
    id: "aiagent-q178-connected-system-times-out-after-requested",
    category: "rollout-reliability-and-change-management",
    questions: [
      "What if a connected system times out after the requested action may already have succeeded?",
    ],
    keywords: ["connected system times out"],
    answer:
      "The agent should treat the outcome as unknown, not automatically repeat the action. The workflow should check the transaction or record status using a reference or idempotency key, then either confirm the result or route the unresolved case for human investigation.",
  },
  {
    id: "aiagent-q179-agent-handle-delayed-out-of-order-events-without",
    category: "rollout-reliability-and-change-management",
    questions: [
      "Can the agent handle delayed or out-of-order events without updating the wrong record?",
    ],
    keywords: ["agent handle delayed out"],
    answer:
      "A reliable design should use event timestamps, conversation or record identifiers and state checks before applying updates. If an event is stale or cannot be matched safely, the agent should defer the change and request review rather than overwriting a newer value.",
  },
  {
    id: "aiagent-q180-switch-off-one-agent-capability-without",
    category: "rollout-reliability-and-change-management",
    questions: [
      "Can we switch off one agent capability without disabling the entire CRM workflow?",
    ],
    keywords: ["switch off one agent"],
    answer:
      "Yes, if capabilities are separated into independently controlled tools or workflow modules. An administrator can disable the affected function while leaving unrelated approved functions available. The user interface should make the disabled capability clear and provide the correct manual route.",
  },
  {
    id: "aiagent-q181-ai-agent-support-supplier-onboarding-checking",
    category: "additional-business-workflows-for-custom-ai-agents",
    questions: [
      "Could an AI Agent support supplier onboarding by checking whether required information has been submitted?",
    ],
    keywords: ["ai agent support supplier"],
    answer:
      "This is a potential custom workflow. The agent can guide a supplier through a defined checklist, identify missing fields or documents and prepare the submission for an employee to review. Required documents, validation rules and any approval authority must be provided by the client.",
  },
  {
    id: "aiagent-q182-compare-supplier-quotations-against-specifications",
    category: "additional-business-workflows-for-custom-ai-agents",
    questions: [
      "Can it compare supplier quotations against our specifications and highlight differences?",
    ],
    keywords: ["compare supplier quotations against"],
    answer:
      "Yes, this can be scoped when the business supplies a consistent specification and quotation format. The agent can extract comparable items, highlight differences and list unanswered questions. Procurement staff should make the final supplier selection and verify calculations or commercial terms.",
  },
  {
    id: "aiagent-q183-flag-mismatch-between-purchase-order-invoice",
    category: "additional-business-workflows-for-custom-ai-agents",
    questions: [
      "Can it flag a mismatch between a purchase order, invoice and delivery record for finance review?",
    ],
    keywords: ["flag mismatch between purchase"],
    answer:
      "A document or data-matching workflow can compare the relevant references, quantities, prices and dates, then flag discrepancies for a finance employee. The agent should not approve or pay an invoice merely because the documents appear to match.",
  },
  {
    id: "aiagent-q184-build-internal-assistant-employee-process-question",
    category: "additional-business-workflows-for-custom-ai-agents",
    questions: [
      "Can we build an internal assistant for employee process questions without exposing private HR records?",
    ],
    keywords: ["build internal assistant employee"],
    answer:
      "Yes. An internal assistant can answer from approved process and policy material while being denied access to individual employee records unless a separately authorised workflow requires them. Access should be enforced through the company's identity and permission system.",
  },
  {
    id: "aiagent-q185-ai-agent-guide-new-customer-through",
    category: "additional-business-workflows-for-custom-ai-agents",
    questions: [
      "Can an AI Agent guide a new customer through a multi-step onboarding process?",
    ],
    keywords: ["ai agent guide new"],
    answer:
      "Yes. A custom onboarding flow can explain each step, collect the required information, mark completed items and identify what is still pending. Any account activation or contractual confirmation should depend on the authorised business system and the client's approval rules.",
  },
  {
    id: "aiagent-q186-agent-classify-field-service-requests-equipment-ty",
    category: "additional-business-workflows-for-custom-ai-agents",
    questions: [
      "Can an agent classify field-service requests by equipment type, urgency and location?",
    ],
    keywords: ["agent classify field service"],
    answer:
      "This can be designed around the client's service catalogue and dispatch rules. The agent can gather the relevant details and suggest a priority or queue. Actual technician assignment may require live scheduling, location data and availability integrations that must be confirmed during scoping.",
  },
  {
    id: "aiagent-q187-agent-turn-maintenance-reports-into-prioritised",
    category: "additional-business-workflows-for-custom-ai-agents",
    questions: [
      "Could an agent turn maintenance reports into a prioritised work queue?",
    ],
    keywords: ["agent turn maintenance reports"],
    answer:
      "If maintenance reports and asset records are available, an agent can organise reported symptoms, asset references and urgency indicators into a proposed work queue. A qualified operations or maintenance person should confirm safety-critical priorities and any required work instructions.",
  },
  {
    id: "aiagent-q188-agent-review-contract-against-internal-checklist",
    category: "additional-business-workflows-for-custom-ai-agents",
    questions: [
      "Can an agent review a contract against our internal checklist and flag clauses for a person to inspect?",
    ],
    keywords: ["agent review contract against"],
    answer:
      "A document-review workflow can compare supplied contract text with a checklist and highlight clauses or missing information for human review. It should be presented as administrative assistance, not legal advice, and a qualified reviewer must make legal and commercial decisions.",
  },
  {
    id: "aiagent-q189-agent-prepare-account-renewal-brief-customer-succe",
    category: "additional-business-workflows-for-custom-ai-agents",
    questions: [
      "Can an agent prepare an account-renewal brief for our customer success team?",
    ],
    keywords: ["agent prepare account renewal"],
    answer:
      "A custom workflow can assemble permitted account details, open issues, important dates and unresolved requests into a renewal-preparation brief. The team should verify the source records and decide the renewal approach; the agent should not invent account health or make an unauthorised commitment.",
  },
  {
    id: "aiagent-q190-group-customer-feedback-into-themes-while",
    category: "additional-business-workflows-for-custom-ai-agents",
    questions: [
      "Can it group customer feedback into themes while keeping the original examples available?",
    ],
    keywords: ["group customer feedback into"],
    answer:
      "Yes. Feedback can be grouped into themes such as usability, product quality or service experience, with links to the original messages for verification. Reports should distinguish direct customer statements from the agent's interpretation and should avoid exposing unnecessary personal information.",
  },
  {
    id: "aiagent-q191-agent-identify-workflow-step-where-requests",
    category: "cross-system-insights-accountability-and-pilot-planning",
    questions: [
      "Can the agent identify a workflow step where requests repeatedly get stuck?",
    ],
    keywords: ["agent identify workflow step"],
    answer:
      "If the relevant workflow events are recorded, the agent can analyse delays, repeated returns and incomplete steps to highlight possible bottlenecks. It should show the records or metrics supporting each finding and describe the result as an operational signal, not a proven root cause.",
  },
  {
    id: "aiagent-q192-compare-records-two-systems-list-mismatches",
    category: "cross-system-insights-accountability-and-pilot-planning",
    questions: [
      "Can it compare records from two systems and list mismatches without changing either one?",
    ],
    keywords: ["compare records two systems"],
    answer:
      "Yes. A read-only reconciliation workflow can match records using approved identifiers, display fields that differ and prepare an exception list for staff. It should not overwrite either source automatically unless a separate, explicitly approved reconciliation process is designed.",
  },
  {
    id: "aiagent-q193-same-information-explained-differently-technical-e",
    category: "cross-system-insights-accountability-and-pilot-planning",
    questions: [
      "Can the same information be explained differently to a technical employee and a non-technical customer?",
    ],
    keywords: ["same information explained differently"],
    answer:
      "Yes. The agent can use audience-specific response styles while preserving the same approved facts. Technical explanations can include relevant terminology or diagnostic context, while customer-facing versions can use simpler wording without changing the underlying meaning or making unsupported promises.",
  },
  {
    id: "aiagent-q194-agent-ask-permission-before-moving-conversation",
    category: "cross-system-insights-accountability-and-pilot-planning",
    questions: [
      "Can the agent ask for permission before moving a conversation to another communication channel?",
    ],
    keywords: ["agent ask permission before"],
    answer:
      "Yes. The workflow can request and record the customer's consent before switching channels, then use only channels enabled by the business and supported by the relevant provider setup. The agent should not assume that a phone number or email address is permission to contact the person through every channel.",
  },
  {
    id: "aiagent-q195-verify-person-s-authority-before-changing-company",
    category: "cross-system-insights-accountability-and-pilot-planning",
    questions: [
      "Can it verify a person's authority before changing company billing or account ownership details?",
    ],
    keywords: ["verify person s authority"],
    answer:
      "A high-impact account change should require an approved identity and authority check. The agent can collect the required verification details and route the request through the client's process, but it should not treat possession of a company email address or phone number alone as proof of authority.",
  },
  {
    id: "aiagent-q196-agent-check-all-agreed-acceptance-criteria",
    category: "cross-system-insights-accountability-and-pilot-planning",
    questions: [
      "Can the agent check that all agreed acceptance criteria are complete before a project milestone is submitted for review?",
    ],
    keywords: ["agent check all agreed"],
    answer:
      "Yes. If the project requirements and acceptance checklist are available, the agent can compare the recorded deliverables with each agreed criterion and identify missing evidence before the milestone is submitted. A responsible client or project owner should make the final acceptance decision.",
  },
  {
    id: "aiagent-q197-one-agent-framework-support-several-brands",
    category: "cross-system-insights-accountability-and-pilot-planning",
    questions: [
      "Can one agent framework support several brands without mixing their content or response styles?",
    ],
    keywords: ["one agent framework support"],
    answer:
      "This can be designed using separate brand configurations, approved knowledge sources and tenant-level data boundaries. Each conversation must be tied to the correct brand before retrieval or response generation, and tests should specifically check for cross-brand information leakage.",
  },
  {
    id: "aiagent-q198-managers-see-ai-agent-suggestions-employees-accept",
    category: "cross-system-insights-accountability-and-pilot-planning",
    questions: [
      "Can managers see which AI-agent suggestions employees accept, edit or reject?",
    ],
    keywords: ["managers see ai agent"],
    answer:
      "A workflow can record whether a staff member accepted, changed or rejected a suggestion, along with a reason where appropriate. These signals can help identify useful recommendations and recurring mistakes, but employee review data should be used under a clear internal policy.",
  },
  {
    id: "aiagent-q199-agent-recognise-new-request-falls-outside",
    category: "cross-system-insights-accountability-and-pilot-planning",
    questions: [
      "Can the agent recognise when a new request falls outside the agreed scope of an ongoing project?",
    ],
    keywords: ["agent recognise new request"],
    answer:
      "Yes. If the agreed project scope or statement of work is available, the agent can compare a new request with the documented deliverables and flag items that appear to be additional work. It should prepare a change-request note for the project owner, not promise a new price or delivery date.",
  },
  {
    id: "aiagent-q200-decide-whether-expand-change-stop-ai-agent",
    category: "cross-system-insights-accountability-and-pilot-planning",
    questions: [
      "How should we decide whether to expand, change or stop an AI-Agent pilot?",
    ],
    keywords: ["decide whether expand change"],
    answer:
      "Set measurable success and safety criteria before the pilot begins, such as verified task completion, repeat-contact rate, escalation rate, employee time saved and the number of permission or accuracy incidents. Expand only when the results meet the agreed thresholds; revise the workflow when failures are fixable; pause it when risks or unresolved errors exceed the limits set by the business.",
  },
  {
    id: "aiagent-q201-ai-agent-handle-property-enquiries-real",
    category: "industry-specific-use-cases",
    questions: [
      "Can an AI Agent handle property enquiries for a real estate business?",
      "Can you build an AI agent for a real estate agency?",
      "Can the agent qualify property buyers and book site visits?",
      "How can an AI agent help a property dealer with leads?",
      "Real estate leads ko AI agent se kaise handle kar sakte hain?",
    ],
    keywords: ["real estate agent","property enquiries","site visit booking"],
    answer:
      "Yes, this can be scoped as a custom workflow. The agent can collect a buyer's preferred location, budget range, property type and timeline, check them against the property list you approve, and propose a site-visit slot for your sales team to confirm. It should only quote availability and prices that exist in your approved inventory data, and pass negotiation or booking-amount discussions to a person.",
  },
  {
    id: "aiagent-q202-ai-agent-manage-appointment-enquiries-clinic",
    category: "industry-specific-use-cases",
    questions: [
      "Can an AI Agent manage appointment enquiries for a clinic or healthcare practice?",
      "Can the agent book patient appointments for a clinic?",
      "Can an AI agent answer questions for a dental or diagnostic centre?",
      "Is an AI agent suitable for a doctor's clinic?",
      "Clinic ke appointment enquiries AI agent handle kar sakta hai?",
    ],
    keywords: ["clinic appointments","healthcare enquiries","patient booking"],
    answer:
      "It can be designed for administrative tasks such as sharing clinic timings, collecting the patient's preferred time slot, sending appointment reminders and routing requests to the reception team. It should not diagnose, advise on treatment or interpret medical reports. Any health data handling needs a clear privacy design and written approval from the clinic before it is scoped.",
  },
  {
    id: "aiagent-q203-ai-agent-take-orders-answer-menu",
    category: "industry-specific-use-cases",
    questions: [
      "Can an AI Agent take orders and answer menu questions for a restaurant or cloud kitchen?",
      "Can a restaurant use an AI agent on WhatsApp for orders?",
      "Can the agent answer menu, timing and delivery-area questions?",
      "Can an AI agent help a cloud kitchen with repeat customers?",
      "Restaurant ke liye WhatsApp order agent ban sakta hai?",
    ],
    keywords: ["restaurant orders","cloud kitchen","menu questions"],
    answer:
      "A custom agent can answer from your current menu, show item options, record the order details and delivery area, and hand a clean order summary to your kitchen or billing system. Item availability, prices and delivery rules must come from your approved data. Payment, refunds and complaint handling can be routed to staff according to rules you define.",
  },
  {
    id: "aiagent-q204-ai-agent-answer-order-status-delivery-questions",
    category: "industry-specific-use-cases",
    questions: [
      "Can an AI Agent answer order-status and delivery questions for an online store?",
      "Can the agent tell customers where their order is?",
      "Can an AI agent handle 'where is my order' messages?",
      "Can the agent connect with Shopify or WooCommerce for order data?",
      "Online store ke order status questions agent se handle ho sakte hain?",
    ],
    keywords: ["order status","where is my order","ecommerce support"],
    answer:
      "Yes, if the order and courier data can be accessed through an approved integration. The agent can look up the order using details the customer provides, report the recorded status and tracking reference, and escalate delayed or damaged shipments to your team. Which store platforms and courier systems can be connected is confirmed during scoping, not assumed.",
  },
  {
    id: "aiagent-q205-ai-agent-collect-trip-requirements-travel",
    category: "industry-specific-use-cases",
    questions: [
      "Can an AI Agent collect trip requirements for a travel agency?",
      "Can a travel company use an AI agent to qualify enquiries?",
      "Can the agent gather destination, dates and budget from travellers?",
      "Can it prepare an enquiry summary for our travel consultant?",
      "Travel agency ke enquiries ke liye AI agent useful hoga?",
    ],
    keywords: ["travel agency","trip enquiries","itinerary requirements"],
    answer:
      "A custom agent can ask structured questions about destination, travel dates, number of travellers, budget and special needs, then give your consultant a tidy enquiry summary. It should not confirm fares, seat availability or visa outcomes unless that information comes from a verified live source. Final quotations and bookings remain with your team.",
  },
  {
    id: "aiagent-q206-ai-agent-help-coaching-institute-training",
    category: "industry-specific-use-cases",
    questions: [
      "Can an AI Agent help a coaching institute or training centre manage admissions enquiries?",
      "Can the agent answer course and batch questions for students?",
      "Can a coaching centre use an AI agent for fee and demo-class enquiries?",
      "Can the agent follow up with parents after an enquiry?",
      "Coaching institute ke admission enquiries agent se kaise handle honge?",
    ],
    keywords: ["coaching institute","admission enquiries","demo class"],
    answer:
      "Yes, as a custom workflow. The agent can answer from your approved course, batch and fee documents, collect the student's class level and goals, offer demo-class slots and notify the counsellor. Scholarship decisions, fee concessions and admission confirmation should stay with your staff unless you define exact approved rules.",
  },
  {
    id: "aiagent-q207-ai-agent-support-ca-firm-law",
    category: "industry-specific-use-cases",
    questions: [
      "Can an AI Agent support a CA firm, law firm or consultancy with client intake?",
      "Can a professional services firm use an AI agent for client intake?",
      "Can the agent collect documents and basic details from new clients?",
      "Can it remind clients about pending documents?",
      "CA ya consultancy firm ke client intake mein agent kaam aayega?",
    ],
    keywords: ["client intake","professional services","document reminders"],
    answer:
      "An agent can handle administrative intake: collect contact details, the nature of the request, and a checklist of documents, then remind the client about missing items. It should not give legal, tax or financial advice. Client confidentiality needs a clear access design, so the scope should define who can see which documents.",
  },
  {
    id: "aiagent-q208-ai-agent-assist-insurance-financial-advisory",
    category: "industry-specific-use-cases",
    questions: [
      "Can an AI Agent assist an insurance or financial advisory business with lead follow-up and renewals?",
      "Can the agent remind policyholders about renewals?",
      "Can an insurance agent use an AI assistant for lead qualification?",
      "Can the agent share policy renewal dates with customers?",
      "Insurance renewal reminders ke liye AI agent bana sakte hain?",
    ],
    keywords: ["insurance renewals","financial advisor leads","policy reminders"],
    answer:
      "It can be scoped for reminders, basic needs collection and follow-up scheduling using data you supply. It should not recommend a specific financial product, promise returns or explain regulated terms beyond your approved documents. Regulatory requirements for your sector should be reviewed by your compliance adviser before launch.",
  },
  {
    id: "aiagent-q209-ai-agent-help-recruitment-agency-shortlist",
    category: "industry-specific-use-cases",
    questions: [
      "Can an AI Agent help a recruitment agency shortlist candidates and schedule interviews?",
      "Can the agent screen CVs for a staffing company?",
      "Can an AI agent collect candidate details through WhatsApp?",
      "Can the agent schedule interviews with candidates?",
      "Recruitment agency ke liye CV screening agent ban sakta hai?",
    ],
    keywords: ["recruitment agency","cv screening","interview scheduling"],
    answer:
      "Yes. The agent can read submitted CVs, extract details such as skills and experience, compare them against the job requirements you define, and prepare a shortlist with the reasons shown. Recruiters should make the final hiring decision. Selection criteria should be reviewed so the agent does not apply unfair or discriminatory filters.",
  },
  {
    id: "aiagent-q210-ai-agent-manage-guest-enquiries-hotel",
    category: "industry-specific-use-cases",
    questions: [
      "Can an AI Agent manage guest enquiries for a hotel, resort or homestay?",
      "Can the agent answer room, amenities and check-in questions?",
      "Can a hotel use an AI agent for booking enquiries?",
      "Can the agent handle guest requests during a stay?",
      "Hotel ya homestay ke guest queries ke liye AI agent chalega?",
    ],
    keywords: ["hotel enquiries","guest support","homestay booking"],
    answer:
      "A custom agent can answer from approved information such as room types, amenities, policies and nearby details, collect stay dates and guest counts, and pass booking requests to staff. Live room availability and rates should only be shown if the agent is connected to your booking system; otherwise it should say the team will confirm.",
  },
  {
    id: "aiagent-q211-ai-agent-respond-instagram-facebook-messages",
    category: "channels-languages-and-brand-voice",
    questions: [
      "Can the AI Agent respond to Instagram or Facebook messages from potential customers?",
      "Can the agent handle Instagram DMs?",
      "Can it reply to Facebook Messenger enquiries?",
      "Can social media messages be turned into CRM leads?",
      "Instagram DM ko AI agent se handle kar sakte hain?",
    ],
    keywords: ["instagram dm","facebook messenger","social media leads"],
    answer:
      "This can be scoped if the channel is supported through the platform's official business messaging interface and your account is eligible. The agent can answer approved FAQs, capture lead details and create a CRM record. Platform rules, account approvals and message-window restrictions apply, so channel availability is confirmed during project scoping.",
  },
  {
    id: "aiagent-q212-agent-work-telegram-sms-well-whatsapp",
    category: "channels-languages-and-brand-voice",
    questions: [
      "Can the agent work on Telegram or SMS as well as WhatsApp?",
      "Do you support Telegram bots?",
      "Can the agent send SMS to customers?",
      "Can one agent serve WhatsApp, Telegram and web chat together?",
      "WhatsApp ke alawa Telegram ya SMS par bhi agent chalega?",
    ],
    keywords: ["telegram bot","sms agent","multi channel"],
    answer:
      "A custom agent can often be designed for more than one channel, such as web chat, WhatsApp, Telegram or SMS, using a shared set of approved knowledge and business rules. Each channel has its own provider requirements, costs and message limits, so we confirm channel choices and any provider charges before the build is scoped.",
  },
  {
    id: "aiagent-q213-agent-chat-regional-indian-languages-such",
    category: "channels-languages-and-brand-voice",
    questions: [
      "Can the agent chat in regional Indian languages such as Marathi, Tamil, Bengali or Gujarati?",
      "Does the agent support South Indian languages?",
      "Can it reply in Gujarati or Marathi to customers?",
      "Which regional languages can the AI agent understand?",
      "Kya agent Tamil ya Bengali mein baat kar sakta hai?",
    ],
    keywords: ["regional languages","marathi tamil bengali","multilingual agent"],
    answer:
      "English, Hindi and Hinglish are established. Regional languages can be tested for your use case, since quality depends on the underlying language model and on how well your approved content is written in that language. Before launch, native speakers should review sample conversations for accuracy, tone and local terms.",
  },
  {
    id: "aiagent-q214-control-tone-personality-ai-agent-sounds",
    category: "channels-languages-and-brand-voice",
    questions: [
      "Can we control the tone and personality of the AI Agent so it sounds like our brand?",
      "Can the agent speak formally or casually as we prefer?",
      "Can we set a brand voice for the AI assistant?",
      "Can the agent avoid slang or emojis?",
      "Agent ka tone hamare brand jaisa kaise set hoga?",
    ],
    keywords: ["brand voice","agent tone","response style"],
    answer:
      "Yes. Tone, formality, length, greeting style, emoji use and words to avoid can be written into the agent's instructions and tested with sample conversations. Approved example replies help keep the style consistent. Tone settings should never override factual accuracy or the rules about what the agent may promise.",
  },
  {
    id: "aiagent-q215-agent-outside-business-hours",
    category: "channels-languages-and-brand-voice",
    questions: [
      "What should the agent do outside our business hours?",
      "Can the agent behave differently at night or on holidays?",
      "Can it tell customers when a human will reply?",
      "Can after-hours enquiries be saved for the morning?",
      "Raat ko ya holiday par agent kya karega?",
    ],
    keywords: ["after hours","business hours","holiday handling"],
    answer:
      "Business hours and holiday calendars can be defined in the workflow. After hours, the agent can answer approved questions, collect details, set clear expectations about when a team member will respond, and queue urgent matters for the next available person. It should not promise a response time that your team cannot actually meet.",
  },
  {
    id: "aiagent-q216-agent-share-product-catalogues-brochures-images",
    category: "channels-languages-and-brand-voice",
    questions: [
      "Can the agent share product catalogues, brochures or images inside the chat?",
      "Can the agent send a PDF brochure on WhatsApp?",
      "Can it show product photos to a customer?",
      "Can it send the right catalogue based on what the customer asks?",
      "Chat mein catalogue ya brochure bhej sakta hai?",
    ],
    keywords: ["product catalogue","send brochure","share images"],
    answer:
      "Yes, where the channel supports media messages. The agent can choose from approved files such as catalogues, brochures, price lists and product images, and send the one that matches the customer's request. Files should be kept current by your team so the agent does not send outdated material.",
  },
  {
    id: "aiagent-q217-agent-respect-whatsapp-opt-in-template-message",
    category: "channels-languages-and-brand-voice",
    questions: [
      "How does the agent respect WhatsApp opt-in and template message rules?",
      "Can the agent message customers who never contacted us first?",
      "How are WhatsApp template messages approved?",
      "Will the agent send promotional messages without permission?",
      "WhatsApp opt-in aur template rules ka agent kaise dhyan rakhta hai?",
    ],
    keywords: ["whatsapp opt-in","template messages","messaging compliance"],
    answer:
      "A properly designed workflow records the customer's opt-in, uses only approved message templates for business-initiated messages, and stays within the provider's rules for conversation windows. It should not message people without a valid permission basis. Current WhatsApp policy should be checked at the time of setup because the rules change.",
  },
  {
    id: "aiagent-q218-several-whatsapp-numbers-branches-brands-managed",
    category: "channels-languages-and-brand-voice",
    questions: [
      "Can several WhatsApp numbers, branches or brands be managed by the same agent system?",
      "Can each branch have its own number but share one CRM?",
      "Can the system route chats by branch or city?",
      "Can two brands use separate numbers and knowledge?",
      "Alag-alag branch ke numbers ek hi system se handle ho sakte hain?",
    ],
    keywords: ["multiple numbers","branch routing","multi brand"],
    answer:
      "It can be designed that way. Each number or brand can have its own configuration and knowledge source while records are routed to the correct branch or team in a shared CRM. The design should define clearly which data is shared and which stays separate between branches or brands.",
  },
  {
    id: "aiagent-q219-web-chat-widget-turn-visitors-into",
    category: "channels-languages-and-brand-voice",
    questions: [
      "How does the web chat widget turn visitors into leads?",
      "Can the website chat ask for name and phone number naturally?",
      "Can the widget know which page the visitor was on?",
      "Can we customise the chat window colours and greeting?",
      "Website chat se visitor ko lead kaise banate hain?",
    ],
    keywords: ["chat widget","website lead capture","visitor details"],
    answer:
      "The widget can greet visitors, answer approved questions and ask for contact details at a suitable moment instead of showing a long form at the start. It can record the page or campaign the visitor came from if tracking is set up, and create a CRM lead. The look and greeting can be customised to match your website.",
  },
  {
    id: "aiagent-q220-accurate-ai-voice-agent-different-accents",
    category: "channels-languages-and-brand-voice",
    questions: [
      "How accurate is an AI voice agent with different accents and noisy phone lines?",
      "Will the voice agent understand fast or mixed Hindi-English speech?",
      "What happens if the voice call quality is poor?",
      "Can the voice agent hand over to a person during a call?",
      "Phone par accent ya noise hone par voice agent kitna sahi samjhega?",
    ],
    keywords: ["voice accuracy","accents noise","voice handoff"],
    answer:
      "Accuracy depends on audio quality, the speech provider and the language mix, so it should be measured with real sample calls before launch rather than assumed. The agent can be set to confirm important details by repeating them back, and to transfer or arrange a callback when it is unsure.",
  },
  {
    id: "aiagent-q221-leads-facebook-instagram-google-ad-forms",
    category: "lead-generation-marketing-and-follow-up",
    questions: [
      "Can leads from Facebook, Instagram or Google ad forms go straight to the AI Agent?",
      "Can ad leads be contacted automatically within minutes?",
      "Can the CRM receive leads from Meta lead forms?",
      "Can the agent contact a lead as soon as a form is submitted?",
      "Facebook ad ke leads direct agent ke paas aa sakte hain?",
    ],
    keywords: ["meta lead forms","google ads leads","instant lead response"],
    answer:
      "This can be scoped. Lead-form submissions can be sent to the CRM through the ad platform's integration or a webhook, and the agent can start a first-touch conversation using the details provided. The exact setup depends on your ad account and consent wording, which should allow the follow-up you plan.",
  },
  {
    id: "aiagent-q222-enquiries-indiamart-justdial-similar-portals-handl",
    category: "lead-generation-marketing-and-follow-up",
    questions: [
      "Can enquiries from IndiaMART, JustDial or similar portals be handled by the agent?",
      "Can portal leads be added to the CRM automatically?",
      "Can the agent respond to marketplace enquiries?",
      "Can leads from several portals be collected in one place?",
      "IndiaMART ya JustDial ke leads CRM mein aa sakte hain?",
    ],
    keywords: ["indiamart leads","justdial enquiries","portal lead import"],
    answer:
      "Possibly, depending on how the portal delivers leads, for example by email, API, CSV export or a supported connector. Once received, the agent can classify the enquiry, remove duplicates and start follow-up. Portal terms and technical access vary, so each source is verified during scoping.",
  },
  {
    id: "aiagent-q223-crm-show-campaign-source-each-lead",
    category: "lead-generation-marketing-and-follow-up",
    questions: [
      "Can the CRM show which campaign or source each lead came from?",
      "Can we track leads by UTM source?",
      "Can we see which ad brought the most enquiries?",
      "Can lead source be saved automatically?",
      "Kaun si campaign se lead aayi, ye CRM mein dikh sakta hai?",
    ],
    keywords: ["lead source","utm tracking","campaign attribution"],
    answer:
      "Yes, if source information is captured at the point of entry, for example through UTM parameters, form fields, or a source label added by the agent. Reports can then group leads by channel or campaign. Attribution is only as reliable as the data captured, so offline or untracked enquiries may show as unknown.",
  },
  {
    id: "aiagent-q224-define-own-lead-scoring-rules-hot-warm",
    category: "lead-generation-marketing-and-follow-up",
    questions: [
      "Can we define our own lead-scoring rules for hot, warm and cold leads?",
      "Can the agent grade leads by budget and urgency?",
      "Can we change what counts as a hot lead?",
      "Can lead scores explain why they were given?",
      "Hot, warm aur cold lead ke rules hum khud set kar sakte hain?",
    ],
    keywords: ["lead scoring","hot warm cold","qualification rules"],
    answer:
      "Yes. Scoring rules based on budget, timeline, location, product interest, response behaviour or other fields can be agreed with your sales team. The CRM should store the reasons behind a score so that a salesperson can review and override it. The rules should be revisited as you learn which leads actually convert.",
  },
  {
    id: "aiagent-q225-agent-run-follow-up-sequence-over-several",
    category: "lead-generation-marketing-and-follow-up",
    questions: [
      "Can the agent run a follow-up sequence over several days or weeks for undecided leads?",
      "Can it send reminders to leads who did not reply?",
      "Can the follow-up change based on what the lead said?",
      "Can follow-up stop when the lead replies or buys?",
      "Jo lead reply nahi karta uske liye follow-up sequence chal sakta hai?",
    ],
    keywords: ["follow up sequence","nurture leads","drip messages"],
    answer:
      "Yes. A sequence can be defined with timing, channel and content rules, and it can pause or stop when the lead replies, buys, asks to stop, or is assigned to a person. Messages should stay within the consent you hold and the channel's rules, and the number of reminders should be limited so the contact does not feel like spam.",
  },
  {
    id: "aiagent-q226-agent-follow-up-customers-left-items",
    category: "lead-generation-marketing-and-follow-up",
    questions: [
      "Can the agent follow up with customers who left items in their cart or did not finish an order?",
      "Can it recover abandoned carts on WhatsApp?",
      "Can the agent remind customers about incomplete orders?",
      "Can it answer doubts that stopped the customer from buying?",
      "Cart chhod kar gaye customers ko agent follow-up kar sakta hai?",
    ],
    keywords: ["abandoned cart","incomplete orders","cart recovery"],
    answer:
      "This can be scoped if the store or order system can send an event when an order is left incomplete and if you hold the customer's permission to be contacted. The agent can send a reminder, answer questions from approved information and share the payment or checkout link. Results vary and should be measured rather than promised.",
  },
  {
    id: "aiagent-q227-agent-ask-customers-feedback-review-after",
    category: "lead-generation-marketing-and-follow-up",
    questions: [
      "Can the agent ask customers for feedback or a review after a purchase or service visit?",
      "Can it send a satisfaction survey after delivery?",
      "Can the agent request a Google review?",
      "Can unhappy customers be routed to our team before they post a review?",
      "Delivery ke baad feedback ya review mangna agent se ho sakta hai?",
    ],
    keywords: ["customer feedback","review request","satisfaction survey"],
    answer:
      "Yes. After a defined event such as delivery or a completed service, the agent can ask for a rating and comments. Low ratings can alert a manager to follow up. Review requests should be made fairly to every customer; routing only happy customers to public review sites can break platform rules.",
  },
  {
    id: "aiagent-q228-agent-run-referral-programme-track-referred",
    category: "lead-generation-marketing-and-follow-up",
    questions: [
      "Can the agent run a referral programme and track who referred whom?",
      "Can customers refer friends through the chat?",
      "Can the CRM record referral codes?",
      "Can referral rewards be tracked automatically?",
      "Referral program ka tracking agent se ho sakta hai?",
    ],
    keywords: ["referral programme","referral tracking","refer a friend"],
    answer:
      "A referral flow can be designed: the agent explains the programme, records the referrer and the new contact, links them in the CRM, and flags the reward once your qualifying condition is met. Reward amounts and rules must come from you, and payout or discount approval can remain with your team.",
  },
  {
    id: "aiagent-q229-agent-prepare-draft-quotation-customer-s-requireme",
    category: "lead-generation-marketing-and-follow-up",
    questions: [
      "Can the agent prepare a draft quotation from the customer's requirements?",
      "Can the agent create a quote PDF?",
      "Can it pull prices from our price list to draft an estimate?",
      "Can quotations be approved by a manager before sending?",
      "Customer ki requirement se draft quotation ban sakti hai?",
    ],
    keywords: ["draft quotation","quote generation","estimate pdf"],
    answer:
      "Yes, as a custom workflow. The agent can map the collected requirements to your price list and rules, produce a draft quotation, and send it to a manager for approval before it reaches the customer. Special pricing, discounts and custom items should require human approval according to the rules you set.",
  },
  {
    id: "aiagent-q230-agent-handle-registrations-follow-ups-webinar-work",
    category: "lead-generation-marketing-and-follow-up",
    questions: [
      "Can the agent handle registrations and follow-ups for a webinar, workshop or event?",
      "Can it send joining details and reminders to registrants?",
      "Can it follow up with people who attended or missed the event?",
      "Can attendees ask event questions in the chat?",
      "Webinar ya workshop ke registration aur follow-up agent se ho sakte hain?",
    ],
    keywords: ["webinar registration","event follow-up","attendee reminders"],
    answer:
      "Yes. The agent can confirm registration, send joining details and reminders, answer event questions from approved information, and afterwards separate attendees from no-shows so each group receives a suitable follow-up. Attendance data must come from your event or meeting tool, and follow-up should respect the consent given at registration.",
  },
  {
    id: "aiagent-q231-agent-send-polite-payment-reminders-pending",
    category: "finance-hr-and-operations-workflows",
    questions: [
      "Can the agent send polite payment reminders for pending invoices?",
      "Can it follow up on overdue payments?",
      "Can the reminder tone get firmer over time?",
      "Can the agent stop reminders once payment is received?",
      "Pending payment ke liye reminder agent bhej sakta hai?",
    ],
    keywords: ["payment reminders","overdue invoices","collections follow-up"],
    answer:
      "Yes. Using invoice and payment status from your accounting or CRM data, the agent can send reminders on a schedule you approve and stop once payment is recorded. Tone and escalation steps are your choice. Disputed invoices and legal or recovery action should be handled by your finance team.",
  },
  {
    id: "aiagent-q232-agent-create-invoice-bill-order-confirmed",
    category: "finance-hr-and-operations-workflows",
    questions: [
      "Can the agent create an invoice or bill from an order confirmed in chat?",
      "Can a confirmed order become an invoice automatically?",
      "Can the agent connect to our billing software?",
      "Can GST details be collected before invoicing?",
      "Chat mein confirm hue order ka invoice agent bana sakta hai?",
    ],
    keywords: ["invoice from chat","billing integration","order to invoice"],
    answer:
      "It can be scoped when your billing system provides a way to create invoices through an approved integration. The agent collects and validates the required details, including GST information if applicable, then creates or prepares the invoice. Tax treatment and final invoice rules should be confirmed by your accountant.",
  },
  {
    id: "aiagent-q233-agent-read-expense-receipts-bills-submitted",
    category: "finance-hr-and-operations-workflows",
    questions: [
      "Can the agent read expense receipts and bills submitted by employees?",
      "Can it extract amount and date from a receipt photo?",
      "Can employees submit expenses through WhatsApp?",
      "Can it flag duplicate or missing receipts?",
      "Employee ke bill photo se expense details nikal sakta hai?",
    ],
    keywords: ["expense receipts","bill extraction","expense claims"],
    answer:
      "Yes. Document-reading tools can extract fields such as vendor, date and amount from receipts, compare them with the claim, and flag missing or duplicate items for review. Extraction is not perfect, so a person should verify flagged and high-value claims before approval.",
  },
  {
    id: "aiagent-q234-internal-agent-handle-leave-requests-attendance",
    category: "finance-hr-and-operations-workflows",
    questions: [
      "Can an internal agent handle leave requests and attendance questions from employees?",
      "Can employees apply for leave through chat?",
      "Can the agent tell an employee their leave balance?",
      "Can leave requests go to the manager for approval?",
      "Employees chat se leave apply kar sakte hain?",
    ],
    keywords: ["leave requests","attendance bot","employee self service"],
    answer:
      "A custom internal agent can collect leave requests, check them against your policy and balance data, and send them to the right manager for approval. Each employee should see only their own information, and the agent should not approve exceptions that the policy does not cover.",
  },
  {
    id: "aiagent-q235-agent-coordinate-interview-schedules-between-candi",
    category: "finance-hr-and-operations-workflows",
    questions: [
      "Can the agent coordinate interview schedules between candidates and interviewers?",
      "Can it offer candidates available interview slots?",
      "Can it reschedule an interview if someone cancels?",
      "Can interviewers get automatic reminders?",
      "Interview schedule karna aur reschedule karna agent kar sakta hai?",
    ],
    keywords: ["interview scheduling","reschedule interviews","candidate coordination"],
    answer:
      "Yes. With access to interviewer calendars, the agent can offer open slots, confirm one, send reminders and handle rescheduling within the rules you set. It should record every change so that the HR team can see what was agreed.",
  },
  {
    id: "aiagent-q236-agent-guide-new-employee-through-joining",
    category: "finance-hr-and-operations-workflows",
    questions: [
      "Can the agent guide a new employee through joining formalities and document submission?",
      "Can it collect joining documents from new hires?",
      "Can it send a first-week checklist?",
      "Can it answer new employees' common questions?",
      "Naye employee ke joining documents agent collect kar sakta hai?",
    ],
    keywords: ["employee onboarding","joining documents","new hire checklist"],
    answer:
      "Yes. The agent can share a joining checklist, collect the documents on it, remind the employee about pending items and answer questions from approved HR material. Sensitive personal documents need restricted access and a defined retention period, which the HR team should approve.",
  },
  {
    id: "aiagent-q237-agent-alert-stock-low-item-needs",
    category: "finance-hr-and-operations-workflows",
    questions: [
      "Can the agent alert us when stock is low or an item needs reordering?",
      "Can the agent monitor inventory levels?",
      "Can it notify the purchase team about low stock?",
      "Can it draft a reorder request for approval?",
      "Stock kam hone par agent alert bhej sakta hai?",
    ],
    keywords: ["low stock alert","inventory monitoring","reorder"],
    answer:
      "If inventory data can be read from your system, a rule or agent can watch stock levels against thresholds you set, notify the right person and prepare a draft reorder request. Placing the purchase order automatically is a separate decision and should require your approval unless you explicitly define limits.",
  },
  {
    id: "aiagent-q238-agent-give-customers-shipment-tracking-updates",
    category: "finance-hr-and-operations-workflows",
    questions: [
      "Can the agent give customers shipment tracking updates from courier partners?",
      "Can it share a tracking link automatically?",
      "Can it notify customers when delivery status changes?",
      "Can it handle delivery delay complaints?",
      "Courier tracking updates customers ko agent bhej sakta hai?",
    ],
    keywords: ["shipment tracking","courier updates","delivery status"],
    answer:
      "This can be scoped if your courier or logistics partner provides tracking data through an API or webhook. The agent can then share the status, notify customers of changes and open a case when a shipment is delayed or marked undeliverable. Supported couriers are confirmed during the project scope.",
  },
  {
    id: "aiagent-q239-agent-manage-return-refund-requests-according",
    category: "finance-hr-and-operations-workflows",
    questions: [
      "Can the agent manage return and refund requests according to our policy?",
      "Can it check whether an item is eligible for return?",
      "Can it collect photos and order details for a return?",
      "Can refunds be approved only by our team?",
      "Return aur refund request policy ke hisab se agent handle kar sakta hai?",
    ],
    keywords: ["return requests","refund workflow","return policy"],
    answer:
      "Yes. The agent can check the order date and item against your written return policy, collect reasons and photos, and create a return case. Actual refund approval and payment should stay with your team unless you define a limited, auditable approval rule.",
  },
  {
    id: "aiagent-q240-agent-reduce-missed-appointments-reminders-easy",
    category: "finance-hr-and-operations-workflows",
    questions: [
      "Can the agent reduce missed appointments with reminders and easy rescheduling?",
      "Can it send reminders before an appointment?",
      "Can customers reschedule by replying to the message?",
      "Can the agent fill a slot that was cancelled?",
      "Appointment miss na ho isliye reminder aur reschedule agent se ho sakta hai?",
    ],
    keywords: ["appointment reminders","no-show reduction","rescheduling"],
    answer:
      "Yes. The agent can send reminders at times you choose, offer a simple reply to confirm or reschedule, and update the calendar. Whether this reduces no-shows for your business should be tracked with before-and-after data, not assumed.",
  },
  {
    id: "aiagent-q241-other-software-send-data-receive-data",
    category: "technical-architecture-models-and-integrations",
    questions: [
      "Can our other software send data to or receive data from the CoreD CRM through an API or webhook?",
      "Does the CRM have an API?",
      "Can our website form push leads into the CRM automatically?",
      "Can the CRM notify our other systems when a lead changes status?",
      "Hamare dusre software CRM se API ya webhook se connect ho sakte hain?",
    ],
    keywords: ["crm api","webhook integration","data sync"],
    answer:
      "For custom builds, an API or webhook layer can be included in the scope so your systems can send leads or receive status updates. The available endpoints, authentication method and limits are defined per project, and I can't state a standard public API specification unless it is confirmed by the CoreD team.",
  },
  {
    id: "aiagent-q242-ai-agent-work-existing-zoho-hubspot",
    category: "technical-architecture-models-and-integrations",
    questions: [
      "Can the AI Agent work with our existing Zoho, HubSpot or Salesforce account instead of replacing it?",
      "Can you add AI agents on top of our current CRM?",
      "Can the agent update records in Zoho CRM?",
      "Do we have to move away from HubSpot to use your agents?",
      "Hum Zoho ya HubSpot use kar rahe hain, kya agent usi ke saath chalega?",
    ],
    keywords: ["zoho integration","hubspot integration","existing crm"],
    answer:
      "It can be scoped as an add-on layer if the existing CRM has a usable API and you give the agent suitable permissions. The agent can read and update agreed fields and trigger actions. The depth of the integration depends on the CRM's plan, API limits and your data structure, so each system is assessed individually.",
  },
  {
    id: "aiagent-q243-agent-read-write-google-sheets-airtable",
    category: "technical-architecture-models-and-integrations",
    questions: [
      "Can the agent read from and write to Google Sheets or Airtable if we are not ready for a full database?",
      "Can we start with a spreadsheet as the data source?",
      "Can the agent update an Excel or Google Sheet?",
      "Is a spreadsheet enough for a small pilot?",
      "Abhi database nahi hai, Google Sheet se start kar sakte hain?",
    ],
    keywords: ["google sheets","airtable","spreadsheet data source"],
    answer:
      "Yes, a spreadsheet can serve as a lightweight data source for a small pilot. It has limits: weaker access control, risk of manual edits breaking the structure, and slower performance with large data. If the pilot succeeds, moving to a proper database is usually advisable.",
  },
  {
    id: "aiagent-q244-agent-connect-accounting-software-such-tally",
    category: "technical-architecture-models-and-integrations",
    questions: [
      "Can the agent connect to accounting software such as Tally or Zoho Books?",
      "Can invoice data flow from the agent into Tally?",
      "Can the agent read payment status from our accounting tool?",
      "Is accounting software integration available?",
      "Tally ya Zoho Books ke saath integration ho sakta hai?",
    ],
    keywords: ["tally integration","zoho books","accounting software"],
    answer:
      "It can be scoped, depending on what the accounting software exposes: an API, import files or a connector. Some desktop tools need an intermediate service or file-based exchange. The integration method, effort and limits are confirmed after reviewing your setup.",
  },
  {
    id: "aiagent-q245-system-deployed-own-server-private-cloud",
    category: "technical-architecture-models-and-integrations",
    questions: [
      "Can the system be deployed on our own server or private cloud instead of a shared environment?",
      "Do you support on-premise deployment?",
      "Can the agent run inside our own AWS or Azure account?",
      "Can data stay inside our company network?",
      "Kya system hamare apne server ya private cloud par chal sakta hai?",
    ],
    keywords: ["on-premise deployment","private cloud","self hosted"],
    answer:
      "A custom project can be scoped for deployment in your own cloud account or server where your requirements demand it. This affects the design, maintenance and cost, and any external AI model calls still need to be considered separately. The hosting choice is decided at the architecture stage.",
  },
  {
    id: "aiagent-q246-use-open-source-self-hosted-language-model-instead",
    category: "technical-architecture-models-and-integrations",
    questions: [
      "Can we use an open-source or self-hosted language model instead of OpenAI or Claude?",
      "Can the agent run on Llama or Mistral?",
      "Can we avoid sending data to external AI providers?",
      "Is a private language model possible?",
      "Kya OpenAI ki jagah open-source model use ho sakta hai?",
    ],
    keywords: ["open source llm","self-hosted model","private language model"],
    answer:
      "It can be evaluated. Self-hosted models give more control over data location but need suitable infrastructure and may differ in answer quality, language skill and tool-use reliability. A comparison with sample tasks from your business helps decide whether the trade-off is acceptable.",
  },
  {
    id: "aiagent-q247-ai-model-usage-costs-controlled-bill",
    category: "technical-architecture-models-and-integrations",
    questions: [
      "How are AI model usage costs controlled so the bill does not grow unexpectedly?",
      "Who pays for the AI model tokens?",
      "Can we set a monthly usage limit for the agent?",
      "Which conversations cost the most?",
      "AI usage ka kharcha control mein kaise rakhte hain?",
    ],
    keywords: ["token cost","usage limits","ai running cost"],
    answer:
      "Costs can be managed by choosing a model that fits each task, keeping prompts short, caching repeated information, setting usage limits and alerts, and monitoring cost per conversation. Who pays the model provider, you or the project, should be stated clearly in the agreement.",
  },
  {
    id: "aiagent-q248-many-documents-upload-agent-s-knowledge-base",
    category: "technical-architecture-models-and-integrations",
    questions: [
      "How many documents can we upload to the agent's knowledge base, and in which formats?",
      "Can we upload PDFs, Word files and spreadsheets?",
      "Is there a limit on the knowledge base size?",
      "Can the agent read web pages or Notion content?",
      "Knowledge base mein kaun si files aur kitni files daal sakte hain?",
    ],
    keywords: ["knowledge base size","upload documents","supported file formats"],
    answer:
      "Common formats such as PDF, Word, text, Markdown and spreadsheets can usually be processed, but file size, count and format limits depend on the design of your project. Clean, well-structured documents give better answers than scanned or cluttered ones, and the supported formats are confirmed during scoping.",
  },
  {
    id: "aiagent-q249-where-conversation-history-stored-live-own",
    category: "technical-architecture-models-and-integrations",
    questions: [
      "Where is the conversation history stored, and can it live in our own database?",
      "Can chat transcripts be stored in our own system?",
      "Who owns the conversation logs?",
      "Can logs be exported in a standard format?",
      "Chat history kahan store hoti hai aur kya hamare database mein rakh sakte hain?",
    ],
    keywords: ["chat history storage","conversation logs","data location"],
    answer:
      "Storage location is part of the design. Conversation history can be kept in a database that you own or control when the project is scoped that way. Retention, access and export rules should be written into the agreement so that you know where your records are and how to retrieve them.",
  },
  {
    id: "aiagent-q250-know-agent-stops-working-starts-giving",
    category: "technical-architecture-models-and-integrations",
    questions: [
      "How will we know if the agent stops working or starts giving errors?",
      "Is there monitoring for agent downtime?",
      "Will we get an alert if the WhatsApp connection breaks?",
      "Can we see error rates in a dashboard?",
      "Agent band ho jaye ya error aaye to humein kaise pata chalega?",
    ],
    keywords: ["agent monitoring","downtime alerts","error tracking"],
    answer:
      "A production setup can include health checks, error logging and alerts to a person or channel you choose, for example when a message fails to send or a connected system stops responding. The monitoring scope and any response-time commitment should be written into the support agreement.",
  },
  {
    id: "aiagent-q251-ai-agent-workflow-designed-support-india-s",
    category: "privacy-compliance-and-conversation-security",
    questions: [
      "Can an AI Agent workflow be designed to support India's Digital Personal Data Protection (DPDP) Act?",
      "Is the agent DPDP compliant?",
      "How does the agent handle consent for personal data in India?",
      "Can the system record consent and purpose of data collection?",
      "DPDP Act ke hisab se agent ka data handling kaise hoga?",
    ],
    keywords: ["dpdp act","personal data india","consent management"],
    answer:
      "The workflow can be designed with features that support privacy obligations, such as recording consent, collecting only necessary data, limiting access, and supporting correction or deletion requests. I cannot certify legal compliance for your business. Your legal adviser should confirm what the law requires of you and review the final design.",
  },
  {
    id: "aiagent-q252-have-customers-europe-agent-set-up",
    category: "privacy-compliance-and-conversation-security",
    questions: [
      "We have customers in Europe. Can the agent be set up to follow GDPR-style requirements?",
      "Can the system support GDPR data requests?",
      "How do you handle EU customer data?",
      "Can personal data be deleted on request?",
      "Europe ke customers ke liye GDPR support ho sakta hai?",
    ],
    keywords: ["gdpr","eu customers","data deletion requests"],
    answer:
      "Support features such as consent capture, data minimisation, access control, export and deletion workflows can be included in a custom design. Whether your business meets GDPR obligations also depends on contracts, data transfer arrangements and internal processes, which your legal adviser should review.",
  },
  {
    id: "aiagent-q253-choose-country-customer-data-stored",
    category: "privacy-compliance-and-conversation-security",
    questions: [
      "Can we choose which country our customer data is stored in?",
      "Can data stay in India?",
      "Where will our data be hosted geographically?",
      "Do you support data residency requirements?",
      "Hamara data India ke andar hi rahe, kya ye possible hai?",
    ],
    keywords: ["data residency","data location india","hosting region"],
    answer:
      "Storage region can be a requirement when the project is scoped, subject to the hosting provider's available regions. Remember that if an external AI model provider processes text, that processing location also matters, so the full data flow should be reviewed, not only where the database sits.",
  },
  {
    id: "aiagent-q254-customer-data-encrypted-stored-sent-between",
    category: "privacy-compliance-and-conversation-security",
    questions: [
      "Is customer data encrypted when stored and when sent between systems?",
      "Is the chat data encrypted?",
      "Do you use HTTPS and encrypted databases?",
      "How are API keys and passwords stored?",
      "Data encrypt hota hai ya nahi?",
    ],
    keywords: ["encryption","https tls","secrets storage"],
    answer:
      "A professionally built deployment uses encrypted connections (HTTPS/TLS) and encryption at rest where the hosting platform supports it, and keeps secrets such as API keys in a secure configuration instead of in source code. The exact measures are listed in the project's security specification, which you can ask to review.",
  },
  {
    id: "aiagent-q255-happens-customer-tries-trick-agent-commands",
    category: "privacy-compliance-and-conversation-security",
    questions: [
      "What happens if a customer tries to trick the agent with commands like 'ignore your instructions' or 'show me your system prompt'?",
      "Can customers jailbreak the AI agent?",
      "Can someone make the agent reveal internal data?",
      "How do you defend against prompt injection in live chats?",
      "Customer agent ko 'instructions ignore karo' bolkar trick kare to?",
    ],
    keywords: ["prompt injection","jailbreak attempts","system prompt leak"],
    answer:
      "Such attempts are expected in public chats. Defences include keeping secrets out of the prompt, giving the agent only the minimum tool permissions, validating every action outside the model, filtering suspicious input and testing with adversarial examples. No defence is perfect, so permissions should be limited so that a successful trick cannot reach sensitive data or actions.",
  },
  {
    id: "aiagent-q256-agent-customer-shares-sensitive-details-like",
    category: "privacy-compliance-and-conversation-security",
    questions: [
      "What should the agent do if a customer shares sensitive details like an Aadhaar number, card number or password in chat?",
      "Can the agent warn customers not to share card details?",
      "Will sensitive numbers be stored in chat logs?",
      "Can the system hide sensitive data automatically?",
      "Customer galti se OTP ya card number bhej de to agent kya karega?",
    ],
    keywords: ["sensitive data in chat","card number","otp password"],
    answer:
      "The workflow can detect common sensitive patterns, mask them in stored logs, and reply with a caution not to share such information. The agent should never ask for card numbers, OTPs or passwords in chat, and payments should go through a secure payment page.",
  },
  {
    id: "aiagent-q257-access-crm-dashboard-protected-example-two-step",
    category: "privacy-compliance-and-conversation-security",
    questions: [
      "How is access to the CRM dashboard protected, for example with two-step login?",
      "Does the CRM support two-factor authentication?",
      "Can we force strong passwords?",
      "Can we remove a former employee's access immediately?",
      "Dashboard login ke liye two-factor authentication milega?",
    ],
    keywords: ["two factor authentication","dashboard login","access removal"],
    answer:
      "Account protection such as strong-password rules, session limits, role-based access and multi-factor login can be specified for a custom build, depending on the authentication approach chosen. A removal procedure for departing staff should also be defined so access can be revoked quickly.",
  },
  {
    id: "aiagent-q258-crm-data-agent-settings-backed-up",
    category: "privacy-compliance-and-conversation-security",
    questions: [
      "Are our CRM data and agent settings backed up, and how quickly can they be restored?",
      "What happens if the server crashes?",
      "Do you take regular backups?",
      "Can we recover data if someone deletes records by mistake?",
      "Server crash ho jaye to data wapas aa sakta hai?",
    ],
    keywords: ["data backup","disaster recovery","restore data"],
    answer:
      "Backup frequency, retention and restore procedure are decisions made during project design and support planning. They should be written down with the recovery time and acceptable data loss you expect, and restoring should be tested at least once, because a backup that has never been restored is only an assumption.",
  },
  {
    id: "aiagent-q259-agent-tell-customers-they-talking-ai",
    category: "privacy-compliance-and-conversation-security",
    questions: [
      "Should the agent tell customers that they are talking to an AI?",
      "Does the agent pretend to be a human?",
      "Can the chat say it is an AI assistant?",
      "Is it okay for the agent to use a human name?",
      "Kya customer ko batana chahiye ki wo AI se baat kar raha hai?",
    ],
    keywords: ["ai disclosure","bot transparency","pretend human"],
    answer:
      "We recommend clear disclosure, for example in the greeting, and an easy way to reach a person. A friendly assistant name is fine, but the agent should not claim to be human or hide that automation is involved, as this erodes trust and may conflict with local rules or platform policies.",
  },
  {
    id: "aiagent-q260-customers-need-told-ai-voice-agent",
    category: "privacy-compliance-and-conversation-security",
    questions: [
      "Do customers need to be told when an AI voice agent records or transcribes a call?",
      "Can calls be recorded for quality?",
      "How is call consent handled?",
      "Do outbound calls need to follow Do Not Disturb rules?",
      "Call record ya transcribe hone se pehle customer ko batana padega?",
    ],
    keywords: ["call recording consent","voice call compliance","dnd rules"],
    answer:
      "A responsible voice workflow announces recording or transcription at the start and records the customer's consent where required. Outbound calling may also be subject to telecom and do-not-disturb regulations. These rules differ by country and change, so they should be reviewed with a qualified adviser before voice campaigns begin.",
  },
  {
    id: "aiagent-q261-owns-source-code-workflows-custom-crm",
    category: "project-delivery-ownership-and-ongoing-support",
    questions: [
      "Who owns the source code and workflows of a custom CRM that CoreD builds for us?",
      "Do we get the source code after the project?",
      "Can we move to another developer later?",
      "Who owns the IP of a custom build?",
      "Custom CRM ka source code aur ownership kiske paas hoga?",
    ],
    keywords: ["source code ownership","intellectual property","vendor lock-in"],
    answer:
      "Ownership terms should be stated in the written agreement before work starts. I don't have a standard ownership term to state here, so please ask the CoreD team to confirm what you receive, such as code, documentation and credentials, and whether any third-party components carry their own licences.",
  },
  {
    id: "aiagent-q262-documentation-handover-get-end-custom-project",
    category: "project-delivery-ownership-and-ongoing-support",
    questions: [
      "What documentation and handover do we get at the end of a custom project?",
      "Will you provide user guides and admin documents?",
      "Can our staff learn how to maintain the system?",
      "Is there a handover session?",
      "Project ke end mein documentation aur handover kya milega?",
    ],
    keywords: ["project handover","user documentation","admin guide"],
    answer:
      "A good handover includes a description of how the system works, configuration details, user guides, a list of connected accounts and a walkthrough with your team. The specific deliverables should be listed in the scope so that both sides agree on what is included.",
  },
  {
    id: "aiagent-q263-kind-support-expect-after-agent-goes",
    category: "project-delivery-ownership-and-ongoing-support",
    questions: [
      "What kind of support can we expect after the agent goes live?",
      "Is there a warranty or bug-fix period after launch?",
      "How do we report a problem?",
      "Is monthly maintenance available?",
      "Launch ke baad support kaisa milega?",
    ],
    keywords: ["post launch support","bug fixes","maintenance retainer"],
    answer:
      "Post-launch support can be agreed as part of the project or as a maintenance arrangement. It typically covers fixing defects, monitoring, small improvements and updates when connected platforms change. The support period, channels and response times are not fixed here and should be confirmed in your agreement.",
  },
  {
    id: "aiagent-q264-want-change-add-features-while-project",
    category: "project-delivery-ownership-and-ongoing-support",
    questions: [
      "What if we want to change or add features while the project is in progress?",
      "How are scope changes handled?",
      "Will new requests change the cost and timeline?",
      "Can we add a new channel midway?",
      "Project ke beech mein naya feature jodna ho to kya hoga?",
    ],
    keywords: ["change request","scope change","additional features"],
    answer:
      "New requests should be written down, reviewed for effort and impact, and approved before work begins. Small adjustments may be absorbed, while larger additions may affect timeline and cost. This keeps the project controlled and avoids disagreement later.",
  },
  {
    id: "aiagent-q265-need-provide-get-custom-ai-agent",
    category: "project-delivery-ownership-and-ongoing-support",
    questions: [
      "What do we need to provide to get a custom AI Agent project started?",
      "What inputs does CoreD need from us?",
      "Which accounts and access do we need to arrange?",
      "Who from our team should be involved?",
      "Project shuru karne ke liye hume kya dena hoga?",
    ],
    keywords: ["project requirements","client inputs","access needed"],
    answer:
      "Typically you provide a description of the workflow, sample conversations or records, approved business documents, access to relevant systems and accounts, and a named person who can answer questions and approve decisions. A short discovery discussion will define the exact list.",
  },
  {
    id: "aiagent-q266-agree-successful-first-version-looks-like",
    category: "project-delivery-ownership-and-ongoing-support",
    questions: [
      "How do we agree on what a successful first version looks like before work starts?",
      "How do we define acceptance criteria?",
      "Can we set measurable goals for the first release?",
      "How will we know the project is complete?",
      "Pehle version ki success kaise define karenge?",
    ],
    keywords: ["acceptance criteria","success metrics","first release"],
    answer:
      "Agree a short list of measurable outcomes and test scenarios up front, for example which questions the agent must answer correctly, which actions it may take and what must be handed to a person. Acceptance then means the agreed tests pass, which is clearer than a general impression of quality.",
  },
  {
    id: "aiagent-q267-agent-gives-wrong-answer-customer-responsible",
    category: "project-delivery-ownership-and-ongoing-support",
    questions: [
      "If the agent gives a wrong answer to a customer, who is responsible?",
      "Who is liable if the AI makes a mistake?",
      "What safeguards reduce the risk of wrong answers?",
      "Is there a contract clause about AI errors?",
      "Agent galat jawab de de to zimmedari kiski hogi?",
    ],
    keywords: ["ai errors liability","responsibility","safeguards"],
    answer:
      "Responsibility should be stated in the contract; I can't state it here. In practice, risk is reduced by limiting what the agent may say, using approved sources, escalating uncertain cases and reviewing conversations. Your business remains accountable to its customers, so regular monitoring is important.",
  },
  {
    id: "aiagent-q268-sign-nda-before-sharing-business-data",
    category: "project-delivery-ownership-and-ongoing-support",
    questions: [
      "Can we sign an NDA before sharing our business data and processes?",
      "Will you keep our information confidential?",
      "Can we share sample data under a confidentiality agreement?",
      "Do your engineers have access to our customer data?",
      "Data share karne se pehle NDA sign kar sakte hain?",
    ],
    keywords: ["nda","confidentiality","data sharing"],
    answer:
      "Asking for an NDA before sharing sensitive information is reasonable, and the CoreD team can be asked to confirm it before discovery begins. You can also start with anonymised or sample data, and limit who on the project team can see real customer records.",
  },
  {
    id: "aiagent-q269-agency-resell-white-label-cored-s-ai-agent-crm",
    category: "project-delivery-ownership-and-ongoing-support",
    questions: [
      "Can an agency resell or white-label CoreD's AI-Agent CRM for its own clients?",
      "Do you have a partner or reseller programme?",
      "Can we offer your solution under our brand?",
      "Can an agency collaborate with CoreD on client projects?",
      "Kya agency CoreD ka solution apne naam se client ko de sakti hai?",
    ],
    keywords: ["white label","reseller partner","agency collaboration"],
    answer:
      "I don't have a verified reseller or white-label programme to describe. Agencies interested in partnership can contact the CoreD team with details of their clients and needs so that a suitable arrangement, if any, can be discussed.",
  },
  {
    id: "aiagent-q270-staff-trained-work-ai-agent-review",
    category: "project-delivery-ownership-and-ongoing-support",
    questions: [
      "How are our staff trained to work with the AI Agent and review its output?",
      "Will you train our sales team to use the CRM?",
      "How do employees learn when to take over from the agent?",
      "Can training be given in Hindi?",
      "Hamare staff ko agent ke saath kaam karna kaun sikhayega?",
    ],
    keywords: ["staff training","team adoption","handoff training"],
    answer:
      "Training can be planned as part of onboarding: a walkthrough of the dashboard, examples of when and how to take over a conversation, how to correct the agent, and a short guide for new joiners. Adoption improves when a named owner in your team reviews results during the first weeks.",
  },
  {
    id: "aiagent-q271-compare-two-similar-agents-coredhristi-marketplace",
    category: "coredhristi-marketplace-buyer-and-hosting-questions",
    questions: [
      "How should I compare two similar agents on the CoreDhristi marketplace before subscribing?",
      "What should I check on an agent's listing page?",
      "How do I pick between two agents that do the same job?",
      "What information is shown about each listed agent?",
      "Do agents mein se sahi agent kaise chunu?",
    ],
    keywords: ["compare agents","listing page","choose marketplace agent"],
    answer:
      "Compare what each listing states: the task it handles, deployment type (self-hosted or developer-hosted), required integrations, security report and SBOM, price, and any demo. Then test against one real workflow of yours. Confirm in the current listing details, as I should not assume features not shown there.",
  },
  {
    id: "aiagent-q272-bid-requirements-option-coredhristi",
    category: "coredhristi-marketplace-buyer-and-hosting-questions",
    questions: [
      "What is the 'Bid for Requirements' option on CoreDhristi?",
      "Can I post my requirement and let developers respond?",
      "How can I get quotes for a custom agent?",
      "Is there a way to invite developers to bid on my project?",
      "Bid for Requirements kaise kaam karta hai?",
    ],
    keywords: ["bid for requirements","post requirement","developer quotes"],
    answer:
      "The platform lists a Bid for Requirements section for buyers who want to describe a need and receive proposals. I don't have the detailed rules, fees or process, so please check that section on the website, or ask the CoreD team, before relying on a particular workflow.",
  },
  {
    id: "aiagent-q273-host-agent-mean-coredhristi",
    category: "coredhristi-marketplace-buyer-and-hosting-questions",
    questions: [
      "What does 'Host Your Agent' mean on CoreDhristi?",
      "Can a developer host the agent for buyers?",
      "What is the difference between self-hosted and hosted agents?",
      "Who manages the server when the agent is cloud-hosted?",
      "Host Your Agent ka matlab kya hai?",
    ],
    keywords: ["host your agent","developer hosted","cloud hosted agent"],
    answer:
      "CoreDhristi describes two delivery styles: agents you run yourself with a license key, and agents the developer hosts so you connect through an interface or webhook. With hosted agents the developer runs the server, so you should check the listing for support and availability details.",
  },
  {
    id: "aiagent-q274-several-people-company-manage-subscriptions-under",
    category: "coredhristi-marketplace-buyer-and-hosting-questions",
    questions: [
      "Can several people in my company manage subscriptions under one buyer account?",
      "Can my finance team access invoices while my tech team gets the keys?",
      "Is there a multi-user buyer account?",
      "Can I add colleagues to our company account?",
      "Ek company account mein kai log kaam kar sakte hain?",
    ],
    keywords: ["buyer company account","team access","shared account"],
    answer:
      "The platform offers a Buyer Company account type. I don't have verified details about adding several users or setting roles under it. Please check the account settings or ask the support team, and until then avoid sharing a single login among staff.",
  },
  {
    id: "aiagent-q275-one-license-key-used-testing-production",
    category: "coredhristi-marketplace-buyer-and-hosting-questions",
    questions: [
      "Can one license key be used for testing and production, or do I need separate keys?",
      "Can I run the agent on two servers with one key?",
      "Is there a staging licence for testing?",
      "How do I keep the license key safe?",
      "Testing aur production ke liye alag license key chahiye?",
    ],
    keywords: ["license key use","staging environment","key security"],
    answer:
      "Check the listing's licence terms for how many installations or environments one key covers. Treat the key like a password: keep it in the environment file or secret manager, never in public code, and rotate it if it may have been exposed.",
  },
  {
    id: "aiagent-q276-receive-updates-developer-improves-subscribed-agen",
    category: "coredhristi-marketplace-buyer-and-hosting-questions",
    questions: [
      "How do I receive updates when the developer improves a subscribed agent?",
      "Will I be notified of a new version?",
      "Are updates included in the subscription?",
      "What if an update breaks my workflow?",
      "Agent ka naya version aaye to humein update kaise milega?",
    ],
    keywords: ["agent updates","new version","subscription updates"],
    answer:
      "Update handling depends on how the developer delivers the agent. Review the listing for update and change-log information, and test a new version in staging before using it for live customers.",
  },
  {
    id: "aiagent-q277-developer-marketplace-agent-stops-responding-stops",
    category: "coredhristi-marketplace-buyer-and-hosting-questions",
    questions: [
      "What can I do if the developer of a marketplace agent stops responding or stops maintaining it?",
      "Who helps me if the creator disappears?",
      "Can CoreDhristi support step in?",
      "Can I switch to a different agent without losing data?",
      "Developer reply na kare ya agent maintain na kare to kya karein?",
    ],
    keywords: ["developer unresponsive","abandoned agent","switch agent"],
    answer:
      "Contact CoreDhristi support with the details. The buyer-protection hold applies within its window, and you can cancel a subscription at any time. For long-term safety, keep your own data exports and avoid building a critical process around a single unsupported agent.",
  },
  {
    id: "aiagent-q278-raise-problem-purchased-agent-not-work",
    category: "coredhristi-marketplace-buyer-and-hosting-questions",
    questions: [
      "How do I raise a problem if a purchased agent does not work as described?",
      "How do I ask for a refund on CoreDhristi?",
      "Where do I report a misleading listing?",
      "What information should I send to support?",
      "Agent description jaisa kaam na kare to complaint kaise karun?",
    ],
    keywords: ["agent not working","refund request","report listing"],
    answer:
      "Contact the support team with the agent name, your purchase details, what the listing promised, what happened and any logs or screenshots. Payments are held for 21 days as buyer protection, so reporting early helps. Refund outcomes are decided by the platform's terms, and I can't promise a specific result.",
  },
  {
    id: "aiagent-q279-where-read-about-coredhristi-s-trust-security",
    category: "coredhristi-marketplace-buyer-and-hosting-questions",
    questions: [
      "Where can I read about CoreDhristi's trust, security and IP protection policies in full?",
      "Is there a document explaining the security pipeline?",
      "Where are the terms and privacy policy?",
      "Where can my legal team review the policies?",
      "Trust aur security policies kahan padh sakte hain?",
    ],
    keywords: ["trust page","terms and privacy","security policy"],
    answer:
      "The website has Trust and IP Protection, Privacy Policy and Terms & Conditions pages, plus documentation. Your legal or IT team should read the current versions there, as they take priority over any summary I give here.",
  },
  {
    id: "aiagent-q280-coredhristi-ask-me-verify-phone-number",
    category: "coredhristi-marketplace-buyer-and-hosting-questions",
    questions: [
      "Why does CoreDhristi ask me to verify my phone number when I sign up?",
      "Is phone verification mandatory to buy an agent?",
      "Is my number shared with developers?",
      "Do I need verification just to browse?",
      "Sign up ke time phone verify kyun karna padta hai?",
    ],
    keywords: ["phone verification","sign up","account security"],
    answer:
      "Browsing needs no login, but the sign-up flow includes phone verification before you subscribe or list. I don't have a stated reason beyond account verification. For how your number is used or shared, please read the Privacy Policy rather than relying on assumptions.",
  },
  {
    id: "aiagent-q281-practical-difference-between-chatbot-ai-agent",
    category: "understanding-ai-agents-in-plain-language",
    questions: [
      "What is the practical difference between a chatbot and an AI agent?",
      "Is an AI agent just a smarter chatbot?",
      "Why is an agent more useful than a simple FAQ bot?",
      "Can a chatbot take actions in our systems?",
      "Chatbot aur AI agent mein asli fark kya hai?",
    ],
    keywords: ["chatbot vs ai agent","faq bot","agent actions"],
    answer:
      "A basic chatbot mostly answers from scripts or a fixed set of replies. An AI agent can understand free-form messages, decide which step to take, use connected tools such as a CRM or calendar, and complete part of a task, within permissions you define. More capability means testing and limits matter more.",
  },
  {
    id: "aiagent-q282-rag-simple-words-matter-business-agent",
    category: "understanding-ai-agents-in-plain-language",
    questions: [
      "What is RAG in simple words, and why does it matter for my business agent?",
      "What does retrieval-augmented generation mean?",
      "How does the agent find answers from our documents?",
      "Is RAG the same as training the AI on our data?",
      "RAG simple bhasha mein kya hota hai?",
    ],
    keywords: ["what is rag","retrieval augmented generation","answers from documents"],
    answer:
      "RAG means the agent first looks up relevant passages in your approved documents and then writes an answer based on them, rather than relying on memory. It is not the same as retraining a model. It matters because you can update the documents, and the agent can show or cite its sources.",
  },
  {
    id: "aiagent-q283-business-data-used-train-ai-models",
    category: "understanding-ai-agents-in-plain-language",
    questions: [
      "Will our business data be used to train AI models for other companies?",
      "Do AI providers learn from our customer chats?",
      "Can we opt out of model training?",
      "Is our private data shared with other customers?",
      "Kya hamara data dusre companies ke AI ko train karne mein use hoga?",
    ],
    keywords: ["model training on data","data privacy ai provider","data sharing"],
    answer:
      "That depends on the AI provider and the account terms used. Many business and API plans state that data is not used for training by default, but this must be checked in the current provider terms for the exact service chosen. The data-use settings should be confirmed in writing for your project.",
  },
  {
    id: "aiagent-q284-mcp-server-different-normal-api",
    category: "understanding-ai-agents-in-plain-language",
    questions: [
      "How is an MCP server different from a normal API?",
      "Why use MCP instead of connecting directly to an API?",
      "Is MCP a replacement for REST APIs?",
      "What does MCP add for AI tools?",
      "MCP aur normal API mein kya difference hai?",
    ],
    keywords: ["mcp vs api","model context protocol","tool connection"],
    answer:
      "An API is how software exposes functions to other software. MCP is a standard way to present those functions and data to an AI model so it can discover and call them with clear permissions. An MCP server often wraps an existing API, so it adds a consistent layer rather than replacing it.",
  },
  {
    id: "aiagent-q285-multi-agent-mean-need-more-than-one",
    category: "understanding-ai-agents-in-plain-language",
    questions: [
      "What does 'multi-agent' mean, and when do I need more than one agent?",
      "Why would a CRM use three agents instead of one?",
      "Can agents specialise in different tasks?",
      "How do agents hand work to each other?",
      "Multi-agent ka matlab kya hai aur kab zaroorat padti hai?",
    ],
    keywords: ["multi agent","specialised agents","agent handoff"],
    answer:
      "Multi-agent means separate agents handle different jobs, such as qualifying leads, scheduling and reporting, and pass structured information to each other. More than one agent can help when tasks need different rules or tools. A single agent is often simpler and easier to test, so start from the workflow, not the number.",
  },
  {
    id: "aiagent-q286-ai-agent-still-make-mistakes-they",
    category: "understanding-ai-agents-in-plain-language",
    questions: [
      "Can an AI Agent still make mistakes, and how are they caught?",
      "Is the AI always accurate?",
      "What kinds of errors do AI agents make?",
      "How do you reduce the chance of wrong replies?",
      "Kya AI agent galti kar sakta hai aur kaise pakadi jaati hai?",
    ],
    keywords: ["ai mistakes","accuracy limits","error detection"],
    answer:
      "Yes. Agents can misunderstand a message, use outdated information, or take a wrong step. Mistakes are reduced by limiting the agent to approved sources, restricting actions, escalating uncertain cases, logging conversations and reviewing samples regularly. Nobody should treat any AI system as error-free.",
  },
  {
    id: "aiagent-q287-need-train-ai-data-knowledge-base",
    category: "understanding-ai-agents-in-plain-language",
    questions: [
      "Do we need to 'train' the AI on our data, or is a knowledge base enough?",
      "Is fine-tuning required for a business agent?",
      "What is the difference between training and giving documents?",
      "Which is cheaper, fine-tuning or a knowledge base?",
      "Kya AI ko train karna padega ya knowledge base kaafi hai?",
    ],
    keywords: ["fine tuning","train ai on data","knowledge base vs training"],
    answer:
      "For most business agents, a well-organised knowledge base, clear instructions and tool access are enough, and are easier to update. Fine-tuning can help with a consistent style or a specialised task, but it takes data, effort and re-testing, so it is considered only when simpler approaches fall short.",
  },
  {
    id: "aiagent-q288-much-agent-remember-inside-one-conversation",
    category: "understanding-ai-agents-in-plain-language",
    questions: [
      "How much can the agent remember inside one conversation, and what if the chat becomes very long?",
      "Does the agent forget details in long chats?",
      "Can it summarise earlier messages automatically?",
      "Will it repeat questions that were already answered?",
      "Lambi chat mein agent purani baatein bhool jata hai kya?",
    ],
    keywords: ["conversation memory","long chats","context window"],
    answer:
      "Models have a limit on how much text they can consider at once. Good designs store confirmed details in structured fields and keep summaries of earlier discussion so the agent does not need the whole transcript. Testing long conversations before launch shows where details start being lost.",
  },
  {
    id: "aiagent-q289-give-real-example-showing-one-task",
    category: "understanding-ai-agents-in-plain-language",
    questions: [
      "Can you give a real example showing why one task needs an AI agent while another only needs a rule?",
      "Which of my tasks are simple enough for plain automation?",
      "How do I decide between AI and fixed rules for a task?",
      "Is AI needed to send reminders?",
      "Kaun sa kaam rule se ho jata hai aur kaun sa AI se?",
    ],
    keywords: ["agent vs rule","automation example","when to use ai"],
    answer:
      "Sending a reminder two days before an appointment is a rule: the steps never change. Understanding a customer's messy message about a delayed delivery and deciding the right reply needs an agent. Use rules where possible, since they are cheaper and more predictable, and add AI only where judgment is required.",
  },
  {
    id: "aiagent-q290-agent-get-better-its-own-over",
    category: "understanding-ai-agents-in-plain-language",
    questions: [
      "Does the agent get better on its own over time, or do we have to improve it?",
      "Does the AI learn from every conversation automatically?",
      "How do we improve the agent after launch?",
      "Can mistakes be corrected so they don't repeat?",
      "Kya agent apne aap seekhta rehta hai?",
    ],
    keywords: ["agent improvement","continuous learning","correcting mistakes"],
    answer:
      "Usually the agent does not change itself. Improvements come from people reviewing conversations, updating the knowledge base, refining instructions and tests, and releasing a new version in a controlled way. This is safer than uncontrolled self-learning, because you can check each change.",
  },
  {
    id: "aiagent-q291-customer-insists-speaking-human-immediately",
    category: "customer-trust-handoff-and-everyday-edge-cases",
    questions: [
      "What if a customer insists on speaking to a human immediately?",
      "Can customers always reach a person?",
      "Will the agent keep arguing instead of transferring?",
      "How does the handoff to a human work?",
      "Customer insaan se baat karna chahe to agent kya karega?",
    ],
    keywords: ["talk to human","human handoff request","escalate to person"],
    answer:
      "The agent should respect the request quickly: acknowledge it, summarise the chat for staff and transfer or schedule a callback. If nobody is available, it should say so honestly and give the expected response time rather than looping back to automated answers.",
  },
  {
    id: "aiagent-q292-agent-respond-angry-rude-abusive-customer",
    category: "customer-trust-handoff-and-everyday-edge-cases",
    questions: [
      "How does the agent respond to an angry, rude or abusive customer?",
      "Will the agent stay polite if the customer shouts?",
      "Can abusive messages be flagged for staff?",
      "Can the agent end a conversation that becomes abusive?",
      "Gussa ya gaali dene wale customer ko agent kaise handle karega?",
    ],
    keywords: ["angry customer","abusive messages","de-escalation"],
    answer:
      "The agent can acknowledge frustration, stay calm, avoid arguing and offer a human follow-up. For abusive language, you can set rules to warn once, then end or pause the chat and flag it for staff. These boundaries should be defined with your team in advance.",
  },
  {
    id: "aiagent-q293-agent-say-customer-asks-compare-competitor",
    category: "customer-trust-handoff-and-everyday-edge-cases",
    questions: [
      "What will the agent say if a customer asks it to compare us with a competitor?",
      "Will the agent criticise other brands?",
      "Can the agent talk about competitors' prices?",
      "How do you prevent unfair or false comparisons?",
      "Competitor se compare karne par agent kya jawab dega?",
    ],
    keywords: ["competitor comparison","brand comparison","claims control"],
    answer:
      "By default, it should focus on your confirmed strengths and avoid claims about other companies that it cannot verify. You can supply approved comparison points, and anything outside them should be handled neutrally or passed to a person.",
  },
  {
    id: "aiagent-q294-happens-someone-asks-agent-unrelated-questions",
    category: "customer-trust-handoff-and-everyday-edge-cases",
    questions: [
      "What happens if someone asks the agent unrelated questions, such as general knowledge, jokes or personal advice?",
      "Will the agent answer anything, even outside our business?",
      "Can we limit the agent to our topics?",
      "How does it politely refuse unrelated requests?",
      "Business se alag sawal pooche to agent kya karega?",
    ],
    keywords: ["off topic questions","scope limits","unrelated requests"],
    answer:
      "A business agent should stay within its scope. A short polite reply explaining what it can help with, then redirecting to relevant topics, keeps usage costs and risks down. How strict this is can be adjusted to match your brand.",
  },
  {
    id: "aiagent-q295-agent-deal-fake-enquiries-wrong-numbers",
    category: "customer-trust-handoff-and-everyday-edge-cases",
    questions: [
      "How does the agent deal with fake enquiries, wrong numbers or people testing the system?",
      "Can the CRM filter out junk leads?",
      "What if someone sends the same message repeatedly?",
      "Can the agent block repeated abuse?",
      "Fake enquiry ya wrong number aaye to kya hoga?",
    ],
    keywords: ["fake enquiries","junk leads","repeated messages"],
    answer:
      "The workflow can check for incomplete or implausible details, detect repeated messages, mark low-quality enquiries and apply rate limits. Anything borderline should be marked for review and not deleted automatically, so that genuine customers are not lost.",
  },
  {
    id: "aiagent-q296-customer-says-agent-misunderstood-them-gave",
    category: "customer-trust-handoff-and-everyday-edge-cases",
    questions: [
      "What if a customer says the agent misunderstood them or gave a wrong answer?",
      "Can the agent apologise and fix its mistake?",
      "Can customers report a wrong answer?",
      "Will the correction be recorded for our team?",
      "Customer bole 'aapne galat samjha' to agent kya karega?",
    ],
    keywords: ["customer correction","wrong answer reported","agent apology"],
    answer:
      "The agent can acknowledge the problem, re-confirm the facts, correct itself where it has reliable information and escalate when it doesn't. The report should be logged so your team can review the cause, such as a missing document or an unclear instruction.",
  },
  {
    id: "aiagent-q297-change-agent-s-offers-messages-rules-quickly",
    category: "customer-trust-handoff-and-everyday-edge-cases",
    questions: [
      "Can we change the agent's offers, messages and rules quickly for festivals or seasonal campaigns?",
      "How fast can we update a campaign offer?",
      "Can offers be scheduled to start and end automatically?",
      "Can the agent stop quoting an old offer?",
      "Diwali ya season offers agent mein jaldi kaise badlein?",
    ],
    keywords: ["seasonal offers","festival campaign","offer expiry"],
    answer:
      "Yes. If offers live in the knowledge base or a table with start and end dates, the agent can use the current one and stop mentioning expired ones. A review step before publishing helps prevent mistakes with prices and terms.",
  },
  {
    id: "aiagent-q298-agent-hands-lead-salesperson-information-salespers",
    category: "customer-trust-handoff-and-everyday-edge-cases",
    questions: [
      "When the agent hands a lead to a salesperson, what information does the salesperson see?",
      "Does the salesperson get a summary or the whole chat?",
      "Can the handoff include the lead's score and next step?",
      "Will my team have to ask the customer the same questions again?",
      "Handoff ke time salesperson ko kya details milti hain?",
    ],
    keywords: ["handoff summary","lead handover","sales notes"],
    answer:
      "A well-designed handoff includes contact details, a short conversation summary, the customer's stated needs, lead score with reasons, documents shared, and the suggested next step, with the full transcript available. This avoids asking the customer to repeat themselves.",
  },
  {
    id: "aiagent-q299-staff-member-take-over-live-chat",
    category: "customer-trust-handoff-and-everyday-edge-cases",
    questions: [
      "Can a staff member take over a live chat and later give it back to the agent?",
      "Can we pause the agent for one customer?",
      "Will the agent stay silent while our team replies?",
      "Can the agent resume after the human finishes?",
      "Staff chat sambhal le aur baad mein agent ko wapas de sakta hai?",
    ],
    keywords: ["take over chat","pause agent","resume automation"],
    answer:
      "Yes. A takeover control can switch off the agent for that conversation so only the human replies, and a clear switch can return control later. Without this, customers may receive overlapping answers from the person and the agent.",
  },
  {
    id: "aiagent-q300-nervous-about-using-ai-real-customers",
    category: "customer-trust-handoff-and-everyday-edge-cases",
    questions: [
      "We are nervous about using AI with real customers. What is the safest way to begin?",
      "How do we start without risking our reputation?",
      "What is a low-risk first project for an AI agent?",
      "Can we start with internal use before customers see it?",
      "AI customers par use karne se dar lag raha hai, safe start kaise karein?",
    ],
    keywords: ["safe start","low risk pilot","first ai project"],
    answer:
      "Start small: pick one repeatable workflow, begin with internal or read-only use, test with sample conversations, then run a limited pilot with human review before widening access. Define clear stop conditions and measure results, so that you build confidence from evidence and not hope.",
  },
];
