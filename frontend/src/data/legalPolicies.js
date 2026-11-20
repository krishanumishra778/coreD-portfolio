export const legalDraftDate = "19 November 2026";
export const legalDraftNotice = "Review copy — not yet in effect. CoreD has supplied its LLP identity and commercial terms. The registered postal address, grievance officer details and cancellation/refund handling still need confirmation before publication.";

export const contractingBusiness = { brand: "CoreD", legalName: "CoreDhristi LLP", llpin: "ADC-9115", gstRegistered: false };
export const paymentMilestones = [
  { percent: 50, stage: "Advance before work starts", detail: "After acceptance of the written quote and before project kickoff." },
  { percent: 30, stage: "At 50% project completion", detail: "When the halfway deliverables defined in the accepted quote are completed and demonstrated." },
  { percent: 20, stage: "On project completion", detail: "When the agreed deliverables meet the written completion and acceptance checks, against the final invoice." },
];
export const includedBugFixDays = 28;
export const overdueRecoveryDays = 20;
export const paymentScheduleSummary = "50% advance before work starts, 30% when the agreed halfway milestone is completed, and 20% on project completion";

export const termsSections = [
  {
    title: "Who these terms cover",
    paragraphs: [
      "These terms cover the CoreD business services website and enquiries about AI-powered CRM, AI agents and automation, AI consulting, AI cybersecurity consulting and cybersecurity. The separate CoreDhristi marketplace has its own purchase and subscription terms.",
      `CoreD is a services division of ${contractingBusiness.legalName}, a limited liability partnership registered in India with LLPIN ${contractingBusiness.llpin}. CoreD is the service brand; ${contractingBusiness.legalName} is the contracting provider. Its registered postal address must be supplied in the final policy and quote before acceptance. An LLPIN identifies the partnership and is not a postal address or a GSTIN.`,
      "A person approving work for a business must have authority to represent it and the legal capacity to enter the agreement."
    ]
  },
  {
    title: "Enquiries, quotes and electronic acceptance",
    paragraphs: [
      "The contact form, Request quote buttons and website assistant help you make an enquiry. Submitting the form, accepting the website notices or receiving an automated receipt does not place an order, reserve capacity or authorize a payment.",
      "An engagement starts when both parties accept an identified written quote or service agreement through the acceptance steps it specifies. Acceptance may be recorded electronically. Any agreed advance and prerequisites must be completed before the scheduled work begins.",
      "The written agreement must state the deliverables, exclusions, price and currency, taxes, third-party costs, payment stages, dates, review process and responsibilities. Mandatory law takes priority. A project-specific departure from these general terms must be expressly agreed by both parties, except where the law does not allow that change."
    ]
  },
  {
    title: "Scope, delivery and changes",
    paragraphs: [
      "Share the full requirements before the quotation is prepared. CoreD will record the agreed requirements, deliverables and exclusions in the quote; check that it includes what you need before accepting it. A service name, case study, demonstration or product image does not add features to that scope. LeadForge X delivery availability is confirmed during scoping.",
      "Dates depend on the agreed access, content, data, approvals and provider availability. Both parties should record a revised schedule if a dependency changes. Additional agents, channels, integrations, environments, asset counts or data volumes need a written change request with their price and effect on delivery agreed before the extra work starts.",
      "The agreement sets milestone review and acceptance checks. Report a specific mismatch with the agreed scope so it can be investigated. Silence alone does not mean acceptance unless a valid review procedure was expressly agreed."
    ]
  },
  {
    title: "Prices, payment and cancellation",
    paragraphs: [
      "The Pricing Policy explains proposed website prices, currency, taxes, provider charges and optional support. A contact form budget is a preference, not the final price or a payment authorization.",
      `The project payment schedule is ${paymentScheduleSummary}. The quote must define the halfway deliverables and completion checks so the payment stages can be verified. There is no automatic website checkout or recurring charge in this enquiry flow. Pay only using the provider details on the agreed invoice or separately verified payment instructions.`,
      `If a milestone payment is overdue, CoreD may give written notice and pause further work under the agreement, with a revised schedule recorded where necessary. If the final amount remains unpaid for ${overdueRecoveryDays} calendar days after written completion notice and delivery of the final invoice, CoreDhristi LLP may issue a formal demand and pursue lawful civil recovery or other remedies available under the agreement and Indian law. This does not impose an automatic fine, establish a criminal offence or bypass a genuine scope dispute. Recovery costs or interest are claimable only where lawfully due.`,
      "Cancellation, reconciliation of advances, refunds and service defects are handled under the Pricing Policy and accepted agreement, subject to rights that cannot be excluded by law. There is no blanket rule that every advance is non-refundable."
    ]
  },
  {
    title: "Customer access, data and approvals",
    paragraphs: [
      "Provide only accounts, data, content and assets you are entitled to use, and obtain any necessary permissions. Use secure, agreed access-sharing channels; do not put passwords, API secrets or sensitive customer records in the contact form or assistant chat.",
      "Agree roles, least-privilege access, backup responsibilities, change windows and a named project contact before work starts. Keep staff approvals and a way to pause automated activity. Changes to your systems or data after handover can affect compatibility and results.",
      "The Privacy Policy explains website enquiry processing. Client-project data access, confidentiality, retention, incident contacts, subprocessors and return or deletion arrangements must be agreed separately where relevant. Using a service does not by itself establish regulatory compliance."
    ]
  },
  {
    title: "AI agents and business messaging",
    paragraphs: [
      "AI can produce incorrect, incomplete or inappropriate output. Define the approved information sources, tools, permissions, review steps and escalation rules before launch. People must review sensitive actions and decisions. An agent is not a substitute for qualified legal, medical, financial or other regulated advice.",
      "You approve lead sources, qualification criteria, sender accounts, audiences and message copy. WhatsApp workflows require valid opt-in and approved templates where the provider requires them. Email and voice workflows must follow applicable consent, communication and platform rules.",
      "The agreed follow-up workflow must define duplicate prevention, activity logging and stop rules for a reply, booking, opt-out or staff takeover. Volume limits, model usage and provider charges depend on the approved setup. CoreD does not guarantee a number of leads, bookings, sales, savings or uninterrupted operation."
    ]
  },
  {
    title: "Cybersecurity authorization and limits",
    paragraphs: [
      "Vulnerability assessment, penetration testing and other active testing require prior written authorization from the asset owner and any other necessary provider approvals. The rules of engagement must identify the domains, subdomains, IPs, applications, devices or repositories, methods, dates, exclusions, emergency contact and stop conditions.",
      "Do not ask for access to another person's systems or for testing outside the approved scope. Potentially disruptive actions, social engineering, production changes and malware handling require explicit agreement where relevant. Findings and evidence must be handled confidentially.",
      "An assessment reflects the assets and conditions tested at that time; it cannot certify that no vulnerability exists. Patches, retests, monitoring and incident response are included only when stated. Antivirus installation is separate from software licenses. Custom firewall, antivirus or defensive AI work requires a feasibility review and its own scope."
    ]
  },
  {
    title: "Intellectual property and confidentiality",
    paragraphs: [
      "Each party retains its pre-existing materials and rights. The written agreement must identify which project deliverables are licensed or transferred, any payment conditions, source-code access and the permitted reuse of tools or components. A quote request does not transfer intellectual property.",
      "Third-party and open-source components remain subject to their own licenses and terms. Neither party should share the other's confidential information except as authorized for the work or required by law. Portfolio publication of confidential client work requires permission; a sample must not be presented as proof of a real engagement."
    ]
  },
  {
    title: "28-day error correction, support and ending work",
    paragraphs: [
      `For ${includedBugFixDays} calendar days from the recorded handover date, CoreD provides free correction of reproducible minor errors in CoreD's delivered work within the accepted scope. Report the issue within that period with enough information to reproduce it, without sending sensitive data through public channels. The free correction period is not a promise of new features, unlimited revisions or round-the-clock support.`,
      "A major issue will be assessed against the agreed scope and responsibility; any genuinely additional investigation or development must be quoted and approved before it is charged. Classifying an issue as major does not remove an existing contractual duty or a remedy required by law. Changes by the client or another developer, third-party outages and new requirements are assessed separately.",
      "Customer-approved third-party license, hosting, API, model, messaging and other provider charges remain payable by the client during the 28-day period. CoreD's free minor-error correction fee does not include those provider charges. Disclose costs and obtain approval before chargeable provider work; this allocation does not remove any remedy for a service defect that the law requires CoreD to provide.",
      "Support after the included correction period, ongoing maintenance and service-level commitments require a separate agreement with coverage, hours, response targets, fees, renewal and cancellation steps.",
      "Either party may ask to pause unsafe or unauthorized activity immediately. For a payment or other remediable contractual issue, follow the notice and correction process in the agreement before suspension or termination where practicable. A suspension must not remove rights or remedies required by law.",
      "If an event outside reasonable control materially affects delivery, notify the other party and agree next steps. This does not automatically permit retention of payment for undelivered work. On ending an engagement, reconcile invoices, approved commitments, refundable balances, deliverables and access removal under the agreement and applicable law."
    ]
  },
  {
    title: "Responsibility and non-excludable rights",
    paragraphs: [
      "Both parties are responsible for their own obligations under the agreement and applicable law. Website descriptions are not a promise of a specific commercial result or complete security. Any negotiated liability limits must be set out in the written agreement; this page does not impose an undisclosed fee cap or an unlimited customer indemnity.",
      "Nothing in these terms excludes liability or a remedy that cannot lawfully be excluded, or prevents a claim for fraud or misrepresentation. Where Indian consumer protection law applies, contractual terms cannot remove statutory rights concerning deficient services, unfair practices, refunds or access to a competent forum."
    ]
  },
  {
    title: "Governing law, complaints and disputes",
    paragraphs: [
      "These general terms are intended to be governed by the laws of India, subject to any mandatory law that applies to the customer or engagement. Disputes may be brought before a court or forum with lawful jurisdiction. No exclusive court city or compulsory arbitration is imposed by this page; a project-specific process must be expressly agreed without excluding mandatory rights.",
      "Send general or billing complaints to info@coredhristi.com and service-support issues to support@coredhristi.com. Include your quote or invoice reference, the issue and the resolution requested; do not email credentials. Ask for a complaint reference so the matter can be tracked.",
      "Where the Consumer Protection (E-Commerce) Rules apply, consumer complaints must be acknowledged within 48 hours and redressed within one month of receipt. A complaint process does not prevent access to the consumer commissions, courts or other authorities with lawful jurisdiction. CoreD must publish its confirmed grievance officer details before adopting these policies where required."
    ],
    contact: true
  },
  {
    title: "Updates to these terms",
    paragraphs: [
      "The adopted version should display its effective date. Later website changes do not retrospectively change an accepted project agreement. Material changes to an existing engagement require the agreement or notice process that applies to it. This dated review draft does not replace a previously accepted agreement."
    ]
  }
];

export const pricingPolicySections = [
  {
    title: "What the displayed prices mean",
    paragraphs: [
      "Website amounts are proposed USD prices for the listed service scope. A fixed amount covers that specific scope; From is a starting amount, not the total for every project. By quote means the price is determined after reviewing your requirements. Selecting a plan does not authorize a charge.",
      "The Services page describes the inclusions and boundaries. The plan schedule below reads from the same catalog used by the service cards and quotation form. The accepted written quote, not an illustration or an estimated budget, sets the final project price."
    ]
  },
  {
    title: "Final quote and total payable",
    paragraphs: [
      "Before approval, the quote must identify the provider and customer, service and plan, deliverables and exclusions, optional add-ons, one-time work, support or recurring fees, currency, taxes and payment milestones. Compulsory charges and selected extras must be disclosed with a clear total payable to CoreD.",
      "If a provider bills you directly, identify that provider and the expected usage basis separately. Do not describe a setup fee as an all-inclusive total if essential usage, subscriptions or licenses are excluded. The quote states its validity period; an expired or changed scope requires reconfirmation.",
      "Correct an obvious pricing or calculation error before acceptance and ask you to approve the corrected quote. A website edit does not by itself increase the price of an already accepted scope."
    ]
  },
  {
    title: "Currency and Indian billing",
    paragraphs: [
      "USD is the comparison currency on this website. If billing is agreed in INR or another currency, the quote must state the actual payable amount in that currency. Where conversion is needed, disclose the agreed rate or rate source, conversion date and any conversion or bank charges before payment. The budget currency selector is not a live exchange-rate calculator.",
      "International payment and tax treatment depend on the customer, place of supply, payment route and other legal conditions. A foreign address or a USD price alone does not make a service GST-free. Confirm the correct invoice and payment arrangement before work starts."
    ]
  },
  {
    title: "GST, invoices and tax deductions",
    paragraphs: [
      "CoreD has confirmed that CoreDhristi LLP is not currently registered for GST. GST will therefore not be collected or shown as tax charged by the LLP while it remains unregistered. LLPIN ADC-9115 is not a GSTIN. Displayed proposed fees exclude separately disclosed third-party charges and any other lawfully applicable amounts.",
      "If GST registration becomes effective, future quotes and invoices must state the valid GSTIN, applicable treatment, tax breakdown and total payable. An already accepted price is not changed by a website edit; any legally required tax adjustment must be explained under the agreement. No GST rate is assumed in this policy.",
      "Where a GST tax invoice is required, it must contain the applicable supplier and recipient particulars, GSTINs, invoice number and date, service description, taxable value, tax and place-of-supply details. Share your correct billing name, address and GSTIN if applicable. This page does not assert a GST rate or an entitlement to input tax credit.",
      "If you must deduct tax at source under applicable Indian law, notify the provider, follow the required procedure and provide the relevant certificate or evidence. The agreement should reconcile the invoice, lawful deductions and balance without treating a required deduction as a discretionary discount."
    ]
  },
  {
    title: "Setup, support, add-ons and provider charges",
    paragraphs: [
      "One-time setup, consulting or assessment covers only the listed deliverables. Project delivery includes the 28-day minor-error correction period described in the Terms & Conditions. Additional channels, sources, migration, languages, agents, device counts, asset counts, retests, custom development and on-site work require a priced scope where not already included.",
      "Optional support is a separate service. Its fee, billing period, scope, working hours, response target and cancellation or renewal arrangements must be agreed. No paid support or renewal is added merely because you submitted an enquiry.",
      "CRM seats, lead data, WhatsApp or email messages, sender services, voice minutes, AI model usage, hosting, domains, storage and software or antivirus licenses may be billed separately. Identify who purchases them, the usage limits and any overage terms. Obtain approval before buying chargeable third-party items on the customer's behalf."
    ]
  },
  {
    title: "Payment stages and changes to work",
    paragraphs: [
      `CoreD's project payment schedule is ${paymentScheduleSummary}. Percentages apply to the agreed project fee; the quote must separately state the amounts, currency, invoice terms, any applicable tax and approved provider costs. Define the 50% completion milestone through listed deliverables rather than an unexplained estimate of progress. A different schedule requires express written agreement.`,
      `The final 20% is due on completion under the agreed acceptance checks. If it remains unpaid for ${overdueRecoveryDays} calendar days after written completion notice and delivery of the final invoice, CoreDhristi LLP may issue a formal demand and take lawful recovery action. A reminder or legal-action clause does not create an automatic penalty or remove the client's right to dispute an incorrect invoice. Verify any change to payment instructions through an established contact channel.`,
      "Requirements must be supplied before the quotation is prepared and recorded in the accepted scope. After quotation, new or changed requirements are a paid change request unless CoreD expressly includes them without charge. Record the extra work, revised price, tax effect and schedule and obtain written approval before starting it. A selected add-on is a request for pricing, not permission for an undisclosed fee. An overspend on a usage-based provider must follow the agreed limit and approval process."
    ]
  },
  {
    title: "Cancellation and refund of advances",
    paragraphs: [
      "Request cancellation in writing at info@coredhristi.com with the quote or invoice reference. Under this proposed policy, if no work has started and there are no customer-approved, lawfully non-recoverable third-party commitments, the unused advance is refundable.",
      "After work starts, reconcile the advance against work actually performed within the agreed scope and customer-approved third-party commitments, using the agreed milestones or rates. Provide an itemized explanation and refund any unearned balance. Do not automatically forfeit an entire advance or impose an undisclosed cancellation fee.",
      "A change-of-mind cancellation is different from deficient, misdescribed or undelivered services. An agreed deduction cannot remove a refund or other remedy required by law. Where the E-Commerce Rules apply, cancellation charges must also comply with the reciprocal-charge requirement; provider cancellation does not automatically justify keeping payment for undelivered work.",
      "State the refund amount, reason, payment method and expected processing date in writing. Approved refunds must be paid within the period required by applicable law or, where none is prescribed, a reasonable period. Bank or payment-provider posting time may be additional; disclose it rather than promising an unconfirmed universal timeline."
    ]
  },
  {
    title: "Defects, duplicate payments and billing concerns",
    paragraphs: [
      "Report a scope mismatch or billing error with your invoice reference and relevant evidence. CoreD should investigate, explain the resolution and provide correction, re-performance, refund or another remedy as required by the agreement and applicable law. A short review window does not extinguish a non-excludable statutory claim.",
      "A duplicate or excess payment must be reconciled and any amount not owed returned, subject to lawful verification. Do not share card details, OTPs or credentials in the website form. Send billing questions to info@coredhristi.com and technical issues to support@coredhristi.com."
    ],
    contact: true
  },
  {
    title: "Changes, offers and statutory rights",
    paragraphs: [
      "Future website prices may change for new enquiries. An accepted quote changes only through an agreed change or a lawful tax adjustment handled under the agreement. Any promotion must state its scope, dates and conditions clearly, without fabricated savings, hidden compulsory charges or preselected paid extras.",
      "This Pricing Policy must be read with the Terms & Conditions and accepted quote. Mandatory Indian law takes priority over inconsistent terms. Marketplace subscription prices, buyer-protection arrangements and refunds on CoreDhristi are separate and must not be assumed to apply to CoreD projects."
    ]
  }
];
