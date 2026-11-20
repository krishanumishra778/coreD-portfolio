/**
 * CoreD Cyber Security Knowledge Base for the AI Agent (CYSEC-Q1 to Q300)
 *
 * Content only: no UI and no matching logic. Same entry schema as
 * KnowledgeBase.js / KnowledgeBaseExpanded.js / AIAgentKnowledgeBase.js.
 *
 *   id         Unique, kebab-case. Every id here starts with "cysec-".
 *   category   Group name, for maintenance only.
 *   questions  Ways a visitor might ask (English + Hinglish where added).
 *   keywords   Short topic phrases, matched like extra, lower-weight questions.
 *   answer     Plain text. Rendered as text, never HTML.
 *   action     Optional. "contact" shows a button that jumps to Contact.
 *
 * USAGE RULES (important)
 * - Confirm the client's hosting, integrations, data types and requirements
 *   before promising any control.
 * - Do not claim certifications (ISO 27001, SOC 2, PCI DSS, etc.), uptime
 *   numbers, pricing or "100% secure" unless CoreD has formally approved it.
 *   "CoreD can configure / recommends" means a scoped option, not a blanket promise.
 * - Legal and compliance answers are general awareness only; clients should
 *   confirm with their legal counsel.
 * - For active incidents: contain, rotate credentials, preserve evidence,
 *   escalate to the authorised security contact.
 *
 * HOW TO ADD THIS TO YOUR PROJECT (3 steps)
 * 1. Copy this file next to KnowledgeBase.js (e.g. CyberSecurityKnowledgeBase.js).
 * 2. At the top of KnowledgeBase.js add:
 *      import { cyberSecurityKnowledgeBase } from "./CyberSecurityKnowledgeBase";
 * 3. At the bottom of KnowledgeBase.js, add it to the final array:
 *      export const knowledgeBase = [
 *        ...existingKnowledgeBase,
 *        ...expandedKnowledgeBase,
 *        ...cyberSecurityKnowledgeBase,
 *      ];
 *    (The optional replyTemplates export at the end can be used for fallback replies.)
 */

export const cyberSecurityKnowledgeBase = [
  {
    id: "cysec-q001-cyber-security-important-business-crm",
    category: "security-foundations-and-threat-modelling",
    questions: [
      "What is cyber security and why is it important for a business CRM?",
    ],
    keywords: ["cyber security important business"],
    answer:
      "Cyber security is the practice of protecting systems, networks, applications, and business data from unauthorised access, misuse, disruption, or theft. For a CRM, it protects customer leads, contact details, sales conversations, invoices, API credentials, and business reputation from hackers, malware, insider misuse, and accidental data leaks.",
  },
  {
    id: "cysec-q002-crm-website-become-target-cyber-attacks",
    category: "security-foundations-and-threat-modelling",
    questions: [
      "How can a CRM website become a target for cyber attacks?",
    ],
    keywords: ["crm website become target"],
    answer:
      "A CRM website can be targeted through login pages, customer forms, APIs, admin dashboards, WhatsApp integrations, payment webhooks, file uploads, and third-party plugins. Attackers look for weak passwords, missing access controls, outdated software, exposed API keys, and unvalidated user input.",
  },
  {
    id: "cysec-q003-first-step-cored-recommends-before-building",
    category: "security-foundations-and-threat-modelling",
    questions: [
      "What is the first step CoreD recommends before building a secure CRM?",
    ],
    keywords: ["first step cored recommends"],
    answer:
      "The first step is a security requirements and threat-modelling workshop. CoreD identifies the data you will store, user roles, integrations, payment flows, compliance needs, likely attack paths, and recovery requirements before development begins.",
  },
  {
    id: "cysec-q004-threat-modelling-simple-words",
    category: "security-foundations-and-threat-modelling",
    questions: [
      "What is threat modelling in simple words?",
    ],
    keywords: ["threat modelling simple words"],
    answer:
      "Threat modelling means thinking like an attacker before an attack happens. It identifies what valuable data the system holds, who could attack it, how they might get in, what damage they could cause, and which security controls will reduce that risk.",
  },
  {
    id: "cysec-q005-principle-least-privilege-crm",
    category: "access-control-and-tenant-isolation",
    questions: [
      "What is the principle of least privilege in a CRM?",
    ],
    keywords: ["principle least privilege crm"],
    answer:
      "Least privilege means every user, API integration, and AI agent receives only the minimum access required to perform its task. For example, a sales executive may view and update assigned leads but should not access payroll, system settings, or all customers’ records.",
  },
  {
    id: "cysec-q006-crm-separate-admin-manager-sales-support",
    category: "access-control-and-tenant-isolation",
    questions: [
      "Why should a CRM separate admin, manager, sales, and support roles?",
    ],
    keywords: ["crm separate admin manager"],
    answer:
      "Role separation reduces the damage if one account is compromised. A support agent may need customer communication access, while only an administrator should be able to change permissions, export the full database, configure integrations, or delete records.",
  },
  {
    id: "cysec-q007-role-based-access-control-rbac",
    category: "access-control-and-tenant-isolation",
    questions: [
      "What is Role-Based Access Control (RBAC)?",
      "Explain Role-Based Access Control (RBAC)",
      "What does Role-Based Access Control (RBAC) mean?",
      "Role-Based Access Control (RBAC) kya hota hai?",
    ],
    keywords: ["role based access control"],
    answer:
      "RBAC assigns permissions based on a user’s role rather than giving every person broad access. A role such as Sales Executive, Team Leader, Finance User, or Super Admin has a defined set of allowed screens, records, and actions inside the CRM.",
  },
  {
    id: "cysec-q008-attribute-based-access-control-abac",
    category: "access-control-and-tenant-isolation",
    questions: [
      "What is Attribute-Based Access Control (ABAC)?",
      "Explain Attribute-Based Access Control (ABAC)",
      "What does Attribute-Based Access Control (ABAC) mean?",
      "Attribute-Based Access Control (ABAC) kya hota hai?",
    ],
    keywords: ["attribute based access control"],
    answer:
      "ABAC grants access using contextual rules such as lead owner, department, location, time of access, device status, or customer type. It adds finer control than roles alone, for example allowing a salesperson to open only leads assigned to them during working hours.",
  },
  {
    id: "cysec-q009-cored-prevent-one-customer-viewing-another",
    category: "access-control-and-tenant-isolation",
    questions: [
      "How does CoreD prevent one customer from viewing another customer’s CRM data?",
    ],
    keywords: ["cored prevent one customer"],
    answer:
      "CoreD uses tenant isolation, ownership checks, and database-level Row-Level Security. Even if an API request is manipulated, the system validates that the logged-in user is authorised to access that specific record before returning any data.",
  },
  {
    id: "cysec-q010-multi-tenancy-crm-security",
    category: "access-control-and-tenant-isolation",
    questions: [
      "What is multi-tenancy in CRM security?",
      "Explain multi-tenancy in CRM security",
      "What does multi-tenancy in CRM security mean?",
      "multi-tenancy in CRM security kya hota hai?",
    ],
    keywords: ["multi tenancy crm security"],
    answer:
      "Multi-tenancy means one CRM platform serves multiple businesses while keeping each business’s data logically separated. Strong tenant isolation ensures that Company A’s leads, invoices, files, and settings cannot be accessed by Company B.",
  },
  {
    id: "cysec-q011-authentication-crm",
    category: "authentication-passwords-and-sessions",
    questions: [
      "What is authentication in a CRM?",
    ],
    keywords: ["authentication crm"],
    answer:
      "Authentication verifies that a person or system is who it claims to be. In a CRM, this is usually done through email and password, OTP, Google or Microsoft sign-in, passkeys, or an API token.",
  },
  {
    id: "cysec-q012-authorisation-crm",
    category: "authentication-passwords-and-sessions",
    questions: [
      "What is authorisation in a CRM?",
    ],
    keywords: ["authorisation crm"],
    answer:
      "Authorisation decides what an authenticated user is allowed to do. A user may successfully log in but still be restricted from viewing another salesperson’s leads, changing billing details, or accessing admin settings.",
  },
  {
    id: "cysec-q013-strong-password-policy-important-crm-users",
    category: "authentication-passwords-and-sessions",
    questions: [
      "Why is a strong password policy important for CRM users?",
    ],
    keywords: ["strong password policy important"],
    answer:
      "Weak or reused passwords are one of the easiest ways for attackers to enter business systems. A strong password policy, breach-password screening, rate limiting, and multi-factor authentication significantly reduce account-takeover risk.",
  },
  {
    id: "cysec-q014-multi-factor-authentication-mfa",
    category: "authentication-passwords-and-sessions",
    questions: [
      "What is multi-factor authentication (MFA)?",
      "Explain multi-factor authentication (MFA)",
      "What does multi-factor authentication (MFA) mean?",
      "multi-factor authentication (MFA) kya hota hai?",
    ],
    keywords: ["multi factor authentication mfa"],
    answer:
      "MFA requires a second proof of identity beyond a password, such as an authenticator-app code, passkey, or hardware security key. Even if a password is stolen, the attacker cannot easily access the account without the second factor.",
  },
  {
    id: "cysec-q015-authenticator-apps-better-than-sms-otps",
    category: "authentication-passwords-and-sessions",
    questions: [
      "Why are authenticator apps better than SMS OTPs?",
    ],
    keywords: ["authenticator apps better than"],
    answer:
      "Authenticator apps generate codes locally and are less exposed to SIM-swap fraud, network interception, and delayed SMS delivery. For high-risk admin accounts, passkeys or hardware security keys provide even stronger protection.",
  },
  {
    id: "cysec-q016-passkey",
    category: "authentication-passwords-and-sessions",
    questions: [
      "What is a passkey?",
      "Explain passkey",
      "What does passkey mean?",
      "passkey kya hota hai?",
    ],
    keywords: ["passkey"],
    answer:
      "A passkey is a phishing-resistant login credential based on public-key cryptography. It is tied to the legitimate website domain, so a fake lookalike login page cannot trick the user into approving access.",
  },
  {
    id: "cysec-q017-session-management-crm",
    category: "authentication-passwords-and-sessions",
    questions: [
      "What is session management in a CRM?",
    ],
    keywords: ["session management crm"],
    answer:
      "Session management controls how long a user remains logged in and how sessions are secured. It includes secure cookies, short session lifetimes, refresh-token handling, device binding, logout everywhere, and immediate revocation after suspicious activity.",
  },
  {
    id: "cysec-q018-crm-session-cookies-httponly-secure-samesite",
    category: "authentication-passwords-and-sessions",
    questions: [
      "Why should CRM session cookies be HttpOnly, Secure, and SameSite?",
    ],
    keywords: ["crm session cookies httponly"],
    answer:
      "HttpOnly prevents JavaScript from reading the cookie, Secure ensures it is sent only over HTTPS, and SameSite reduces cross-site request risks. Together, these settings make session theft and CSRF attacks much harder.",
  },
  {
    id: "cysec-q019-happen-employee-leaves-company",
    category: "authentication-passwords-and-sessions",
    questions: [
      "What should happen when an employee leaves the company?",
    ],
    keywords: ["happen employee leaves company"],
    answer:
      "The organisation should immediately disable the employee’s CRM account, revoke API tokens and active sessions, change shared credentials, review recent activity, and transfer lead ownership to another authorised user.",
  },
  {
    id: "cysec-q020-credential-stuffing",
    category: "authentication-passwords-and-sessions",
    questions: [
      "What is credential stuffing?",
      "Explain credential stuffing",
      "What does credential stuffing mean?",
      "credential stuffing kya hota hai?",
    ],
    keywords: ["credential stuffing"],
    answer:
      "Credential stuffing is when attackers test username-password pairs stolen from other websites against your CRM login page. Defences include unique passwords, breached-password checks, MFA, login rate limits, and bot detection.",
  },
  {
    id: "cysec-q021-brute-force-attack-protection",
    category: "authentication-passwords-and-sessions",
    questions: [
      "What is brute-force attack protection?",
      "Explain brute-force attack protection",
      "What does brute-force attack protection mean?",
      "brute-force attack protection kya hota hai?",
    ],
    keywords: ["brute force attack protection"],
    answer:
      "Brute-force protection limits repeated login attempts from the same user, IP address, or device. Progressive delays, CAPTCHA or bot checks, temporary lockouts, and alerts on repeated failures make automated password guessing impractical.",
  },
  {
    id: "cysec-q022-api-key-protected",
    category: "api-keys-secrets-and-webhooks",
    questions: [
      "What is an API key and how should it be protected?",
    ],
    keywords: ["api key protected"],
    answer:
      "An API key identifies an application or integration to another service. It should be stored in a server-side secret manager, restricted by IP address and permissions where possible, rotated regularly, and never placed in browser-visible frontend code.",
  },
  {
    id: "cysec-q023-api-keys-never-placed-react-next-js",
    category: "api-keys-secrets-and-webhooks",
    questions: [
      "Why should API keys never be placed in React or Next.js frontend code?",
    ],
    keywords: ["api keys never placed"],
    answer:
      "Frontend JavaScript is visible to anyone using the browser. Variables prefixed with public framework prefixes can be extracted from the downloaded bundle, so secrets must remain only in backend server environments or a secret manager.",
  },
  {
    id: "cysec-q024-secret-manager",
    category: "api-keys-secrets-and-webhooks",
    questions: [
      "What is a secret manager?",
      "Explain secret manager",
      "What does secret manager mean?",
      "secret manager kya hota hai?",
    ],
    keywords: ["secret manager"],
    answer:
      "A secret manager securely stores passwords, API keys, database credentials, and tokens with access controls, versioning, audit logs, and rotation support. It prevents secrets from being hardcoded in source code or shared in chat messages.",
  },
  {
    id: "cysec-q025-secret-rotation",
    category: "api-keys-secrets-and-webhooks",
    questions: [
      "What is secret rotation?",
      "Explain secret rotation",
      "What does secret rotation mean?",
      "secret rotation kya hota hai?",
    ],
    keywords: ["secret rotation"],
    answer:
      "Secret rotation means replacing an API key, password, or token with a new one on a schedule or immediately after suspected exposure. Regular rotation limits how long a stolen credential remains useful to an attacker.",
  },
  {
    id: "cysec-q026-webhook-crm",
    category: "api-keys-secrets-and-webhooks",
    questions: [
      "What is a webhook in a CRM?",
    ],
    keywords: ["webhook crm"],
    answer:
      "A webhook is a URL that receives automatic notifications from another service, such as a new lead from an ad platform or a successful payment from Razorpay or Stripe. Because it is publicly reachable, it must be authenticated and validated.",
  },
  {
    id: "cysec-q027-cored-secure-payment-webhooks",
    category: "api-keys-secrets-and-webhooks",
    questions: [
      "How does CoreD secure payment webhooks?",
    ],
    keywords: ["cored secure payment webhooks"],
    answer:
      "CoreD verifies the provider’s cryptographic signature before trusting a payment event, checks timestamps to prevent replay, validates the payload schema, and processes events idempotently so a duplicate notification cannot create a duplicate invoice or order.",
  },
  {
    id: "cysec-q028-hmac-signature",
    category: "api-keys-secrets-and-webhooks",
    questions: [
      "What is an HMAC signature?",
      "Explain HMAC signature",
      "What does HMAC signature mean?",
      "HMAC signature kya hota hai?",
    ],
    keywords: ["hmac signature"],
    answer:
      "An HMAC is a cryptographic signature created using a shared secret and the request payload. Verifying it proves that the webhook message came from the expected provider and was not modified in transit.",
  },
  {
    id: "cysec-q029-input-validation",
    category: "input-validation-and-browser-security",
    questions: [
      "What is input validation?",
      "Explain input validation",
      "What does input validation mean?",
      "input validation kya hota hai?",
    ],
    keywords: ["input validation"],
    answer:
      "Input validation checks that data submitted by users, APIs, webhooks, or file uploads matches the expected type, length, format, and business rules before the application processes it. It prevents many injection and logic-abuse attacks.",
  },
  {
    id: "cysec-q030-output-encoding",
    category: "input-validation-and-browser-security",
    questions: [
      "What is output encoding?",
      "Explain output encoding",
      "What does output encoding mean?",
      "output encoding kya hota hai?",
    ],
    keywords: ["output encoding"],
    answer:
      "Output encoding converts potentially dangerous characters into safe representations before displaying user-supplied data in a browser. It helps prevent cross-site scripting when CRM notes, names, or messages are rendered on a page.",
  },
  {
    id: "cysec-q031-sanitisation-different-validation",
    category: "input-validation-and-browser-security",
    questions: [
      "What is sanitisation and how is it different from validation?",
    ],
    keywords: ["sanitisation different validation"],
    answer:
      "Validation accepts or rejects input based on rules; sanitisation cleans or transforms input before storage or display. For security, applications should validate strictly on input and use context-specific encoding or sanitisation on output.",
  },
  {
    id: "cysec-q032-content-security-policy-csp",
    category: "input-validation-and-browser-security",
    questions: [
      "What is a Content Security Policy (CSP)?",
      "Explain Content Security Policy (CSP)",
      "What does Content Security Policy (CSP) mean?",
      "Content Security Policy (CSP) kya hota hai?",
    ],
    keywords: ["content security policy csp"],
    answer:
      "CSP is a browser security header that restricts which scripts, styles, frames, and external resources a web page may load. A strict CSP reduces the impact of injected malicious scripts.",
  },
  {
    id: "cysec-q033-security-headers-crm-website-use",
    category: "input-validation-and-browser-security",
    questions: [
      "What security headers should a CRM website use?",
    ],
    keywords: ["security headers crm website"],
    answer:
      "Important headers include Content-Security-Policy, Strict-Transport-Security, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, and appropriate Cross-Origin-Opener-Policy settings. They reduce clickjacking, MIME-sniffing, and script-injection risks.",
  },
  {
    id: "cysec-q034-https-mandatory-crm",
    category: "https-dns-and-email-security",
    questions: [
      "What is HTTPS and why is it mandatory for a CRM?",
    ],
    keywords: ["https mandatory crm"],
    answer:
      "HTTPS encrypts data between a user’s browser and the CRM server, protecting login credentials, customer details, and session cookies from interception. Every CRM page, API endpoint, and file download should use HTTPS.",
  },
  {
    id: "cysec-q035-tls-certificate-expiry-monitoring",
    category: "https-dns-and-email-security",
    questions: [
      "What is TLS certificate expiry monitoring?",
      "Explain TLS certificate expiry monitoring",
      "What does TLS certificate expiry monitoring mean?",
      "TLS certificate expiry monitoring kya hota hai?",
    ],
    keywords: ["tls certificate expiry monitoring"],
    answer:
      "TLS certificates expire periodically. Automated monitoring and renewal prevent sudden browser warnings, broken integrations, and downtime caused by an expired certificate.",
  },
  {
    id: "cysec-q036-hsts",
    category: "https-dns-and-email-security",
    questions: [
      "What is HSTS?",
      "Explain HSTS",
      "What does HSTS mean?",
      "HSTS kya hota hai?",
    ],
    keywords: ["hsts"],
    answer:
      "HTTP Strict Transport Security tells browsers to use HTTPS only for a domain. It prevents downgrade attacks where an attacker tries to force a user onto an unencrypted connection.",
  },
  {
    id: "cysec-q037-man-in-the-middle-attack",
    category: "https-dns-and-email-security",
    questions: [
      "What is a Man-in-the-Middle attack?",
      "Explain Man-in-the-Middle attack",
      "What does Man-in-the-Middle attack mean?",
      "Man-in-the-Middle attack kya hota hai?",
    ],
    keywords: ["man middle attack"],
    answer:
      "A Man-in-the-Middle attack occurs when an attacker secretly intercepts or alters communication between a user and a service. HTTPS, certificate validation, secure Wi-Fi, and VPN use reduce this risk.",
  },
  {
    id: "cysec-q038-dns-security-matter-crm-domain",
    category: "https-dns-and-email-security",
    questions: [
      "What is DNS security and why does it matter for a CRM domain?",
    ],
    keywords: ["dns security matter crm"],
    answer:
      "DNS controls how visitors and email systems find your domain. If DNS is hijacked, attackers can redirect website traffic, intercept email, or impersonate your business, so registrar security, DNSSEC, and change alerts are important.",
  },
  {
    id: "cysec-q039-spf-dkim-dmarc-simple-language",
    category: "https-dns-and-email-security",
    questions: [
      "What is SPF, DKIM, and DMARC in simple language?",
    ],
    keywords: ["spf dkim dmarc simple"],
    answer:
      "SPF says which servers may send email for your domain, DKIM cryptographically signs outgoing email, and DMARC tells receiving servers what to do when spoofed email fails verification. Together, they reduce email spoofing and phishing.",
  },
  {
    id: "cysec-q040-phishing",
    category: "social-engineering-and-insider-risk",
    questions: [
      "What is phishing?",
      "Explain phishing",
      "What does phishing mean?",
      "phishing kya hota hai?",
    ],
    keywords: ["phishing"],
    answer:
      "Phishing is a social-engineering attack where attackers impersonate a trusted person, brand, or service to steal credentials, payment details, or sensitive data. Employee awareness, email authentication, and report-button workflows reduce its impact.",
  },
  {
    id: "cysec-q041-spear-phishing",
    category: "social-engineering-and-insider-risk",
    questions: [
      "What is spear phishing?",
      "Explain spear phishing",
      "What does spear phishing mean?",
      "spear phishing kya hota hai?",
    ],
    keywords: ["spear phishing"],
    answer:
      "Spear phishing is a targeted phishing attack tailored to a specific employee or business using real names, projects, or internal details. It is more convincing than generic phishing and requires verification procedures for sensitive requests.",
  },
  {
    id: "cysec-q042-business-email-compromise-bec",
    category: "social-engineering-and-insider-risk",
    questions: [
      "What is Business Email Compromise (BEC)?",
      "Explain Business Email Compromise (BEC)",
      "What does Business Email Compromise (BEC) mean?",
      "Business Email Compromise (BEC) kya hota hai?",
    ],
    keywords: ["business email compromise bec"],
    answer:
      "BEC is fraud where an attacker uses a compromised or lookalike email account to trick staff into changing bank details, approving payments, or sharing confidential data. Out-of-band verification is essential before changing payment instructions.",
  },
  {
    id: "cysec-q043-vishing",
    category: "social-engineering-and-insider-risk",
    questions: [
      "What is vishing?",
      "Explain vishing",
      "What does vishing mean?",
      "vishing kya hota hai?",
    ],
    keywords: ["vishing"],
    answer:
      "Vishing is voice phishing: an attacker calls an employee pretending to be IT support, a bank, a vendor, or a manager to obtain credentials or authorise a fraudulent action. Staff should verify unexpected requests through a known contact channel.",
  },
  {
    id: "cysec-q044-smishing",
    category: "social-engineering-and-insider-risk",
    questions: [
      "What is smishing?",
      "Explain smishing",
      "What does smishing mean?",
      "smishing kya hota hai?",
    ],
    keywords: ["smishing"],
    answer:
      "Smishing is phishing through SMS or WhatsApp messages, often containing malicious links or fake payment requests. Employees should avoid clicking unexpected links and verify requests through official channels.",
  },
  {
    id: "cysec-q045-social-engineering",
    category: "social-engineering-and-insider-risk",
    questions: [
      "What is social engineering?",
      "Explain social engineering",
      "What does social engineering mean?",
      "social engineering kya hota hai?",
    ],
    keywords: ["social engineering"],
    answer:
      "Social engineering manipulates people rather than exploiting software. Attackers use urgency, authority, fear, or helpfulness to persuade employees to share credentials, approve payments, or bypass security procedures.",
  },
  {
    id: "cysec-q046-security-awareness-programme",
    category: "social-engineering-and-insider-risk",
    questions: [
      "What is a security awareness programme?",
      "Explain security awareness programme",
      "What does security awareness programme mean?",
      "security awareness programme kya hota hai?",
    ],
    keywords: ["security awareness programme"],
    answer:
      "It is ongoing employee training that teaches staff to recognise phishing, use MFA, handle customer data safely, report suspicious activity, and follow secure device practices. Regular short simulations are more effective than a one-time training session.",
  },
  {
    id: "cysec-q047-insider-threat",
    category: "social-engineering-and-insider-risk",
    questions: [
      "What is an insider threat?",
      "Explain insider threat",
      "What does insider threat mean?",
      "insider threat kya hota hai?",
    ],
    keywords: ["insider threat"],
    answer:
      "An insider threat is a risk from a current or former employee, contractor, or partner who misuses legitimate access. Controls include least privilege, activity logging, offboarding procedures, and separation of duties.",
  },
  {
    id: "cysec-q048-separation-duties",
    category: "social-engineering-and-insider-risk",
    questions: [
      "What is separation of duties?",
      "Explain separation of duties",
      "What does separation of duties mean?",
      "separation of duties kya hota hai?",
    ],
    keywords: ["separation duties"],
    answer:
      "Separation of duties ensures that no single person can control every stage of a sensitive process. For example, one person may create an invoice while another approves a refund or changes bank details.",
  },
  {
    id: "cysec-q049-privileged-access-account",
    category: "social-engineering-and-insider-risk",
    questions: [
      "What is a privileged access account?",
      "Explain privileged access account",
      "What does privileged access account mean?",
      "privileged access account kya hota hai?",
    ],
    keywords: ["privileged access account"],
    answer:
      "A privileged account has elevated permissions, such as database admin, cloud root access, or CRM super-admin rights. These accounts need MFA, separate credentials, session recording where appropriate, and tighter monitoring.",
  },
  {
    id: "cysec-q050-break-glass-account",
    category: "social-engineering-and-insider-risk",
    questions: [
      "What is a break-glass account?",
      "Explain break-glass account",
      "What does break-glass account mean?",
      "break-glass account kya hota hai?",
    ],
    keywords: ["break glass account"],
    answer:
      "A break-glass account is a highly restricted emergency administrator account used only when normal access methods fail. It should have strong MFA, sealed credentials, alerting on use, and regular access review.",
  },
  {
    id: "cysec-q051-firewall",
    category: "perimeter-defence-and-attack-protection",
    questions: [
      "What is a firewall?",
      "Explain firewall",
      "What does firewall mean?",
      "firewall kya hota hai?",
    ],
    keywords: ["firewall"],
    answer:
      "A firewall controls network traffic based on rules such as source IP, destination IP, port, and protocol. It helps block unauthorised access to CRM servers, databases, and internal systems.",
  },
  {
    id: "cysec-q052-web-application-firewall-waf",
    category: "perimeter-defence-and-attack-protection",
    questions: [
      "What is a Web Application Firewall (WAF)?",
      "Explain Web Application Firewall (WAF)",
      "What does Web Application Firewall (WAF) mean?",
      "Web Application Firewall (WAF) kya hota hai?",
    ],
    keywords: ["web application firewall waf"],
    answer:
      "A WAF inspects HTTP/HTTPS traffic and blocks common web attacks such as SQL injection, cross-site scripting, malicious bots, and credential-stuffing patterns before they reach the application.",
  },
  {
    id: "cysec-q053-rate-limiting",
    category: "perimeter-defence-and-attack-protection",
    questions: [
      "What is rate limiting?",
      "Explain rate limiting",
      "What does rate limiting mean?",
      "rate limiting kya hota hai?",
    ],
    keywords: ["rate limiting"],
    answer:
      "Rate limiting restricts how many requests a user, IP address, or API client can make in a given period. It protects login pages, OTP endpoints, search functions, and AI features from abuse and denial-of-service attacks.",
  },
  {
    id: "cysec-q054-captcha-used",
    category: "perimeter-defence-and-attack-protection",
    questions: [
      "What is a CAPTCHA and when should it be used?",
    ],
    keywords: ["captcha used"],
    answer:
      "A CAPTCHA or bot-detection challenge helps distinguish humans from automated scripts. It is useful on repeated failed logins, form submissions, password resets, and suspicious traffic, but should not be the only security control.",
  },
  {
    id: "cysec-q055-ddos-attack",
    category: "perimeter-defence-and-attack-protection",
    questions: [
      "What is a DDoS attack?",
      "Explain DDoS attack",
      "What does DDoS attack mean?",
      "DDoS attack kya hota hai?",
    ],
    keywords: ["ddos attack"],
    answer:
      "A Distributed Denial-of-Service attack floods a service with traffic to make it slow or unavailable. CDN edge protection, traffic filtering, autoscaling, and rate limits help keep a CRM available during an attack.",
  },
  {
    id: "cysec-q056-bot-attack",
    category: "perimeter-defence-and-attack-protection",
    questions: [
      "What is a bot attack?",
      "Explain bot attack",
      "What does bot attack mean?",
      "bot attack kya hota hai?",
    ],
    keywords: ["bot attack"],
    answer:
      "A bot attack uses automated software to scrape data, create fake accounts, spam forms, guess passwords, or abuse APIs. Bot management uses behavioural signals, device fingerprinting, rate limits, and allowlists.",
  },
  {
    id: "cysec-q057-data-encryption-rest",
    category: "encryption-and-data-protection",
    questions: [
      "What is data encryption at rest?",
      "Explain data encryption at rest",
      "What does data encryption at rest mean?",
      "data encryption at rest kya hota hai?",
    ],
    keywords: ["data encryption rest"],
    answer:
      "Encryption at rest protects stored data, such as customer records, files, and backups, by converting it into unreadable ciphertext. Even if storage media or a database dump is stolen, the data remains protected without the keys.",
  },
  {
    id: "cysec-q058-encryption-transit",
    category: "encryption-and-data-protection",
    questions: [
      "What is encryption in transit?",
      "Explain encryption in transit",
      "What does encryption in transit mean?",
      "encryption in transit kya hota hai?",
    ],
    keywords: ["encryption transit"],
    answer:
      "Encryption in transit protects data while it moves between browsers, mobile apps, servers, APIs, and third-party services. TLS/HTTPS is the standard control for CRM traffic.",
  },
  {
    id: "cysec-q059-field-level-encryption",
    category: "encryption-and-data-protection",
    questions: [
      "What is field-level encryption?",
      "Explain field-level encryption",
      "What does field-level encryption mean?",
      "field-level encryption kya hota hai?",
    ],
    keywords: ["field level encryption"],
    answer:
      "Field-level encryption protects specific sensitive fields, such as Aadhaar numbers, bank details, or OAuth tokens, independently from the rest of the database. It provides protection even if an attacker obtains a database export.",
  },
  {
    id: "cysec-q060-key-management-service-kms",
    category: "encryption-and-data-protection",
    questions: [
      "What is a key management service (KMS)?",
      "Explain key management service (KMS)",
      "What does key management service (KMS) mean?",
      "key management service (KMS) kya hota hai?",
    ],
    keywords: ["key management service kms"],
    answer:
      "A KMS securely creates, stores, rotates, and controls access to encryption keys. Application code should never hardcode master encryption keys; it should request controlled key operations from the KMS.",
  },
  {
    id: "cysec-q061-key-rotation",
    category: "encryption-and-data-protection",
    questions: [
      "What is key rotation?",
      "Explain key rotation",
      "What does key rotation mean?",
      "key rotation kya hota hai?",
    ],
    keywords: ["key rotation"],
    answer:
      "Key rotation replaces encryption keys periodically or after a suspected compromise. Proper key versioning allows old encrypted data to remain readable while new data uses the new key.",
  },
  {
    id: "cysec-q062-tokenisation",
    category: "encryption-and-data-protection",
    questions: [
      "What is tokenisation?",
      "Explain tokenisation",
      "What does tokenisation mean?",
      "tokenisation kya hota hai?",
    ],
    keywords: ["tokenisation"],
    answer:
      "Tokenisation replaces sensitive data with a meaningless token while keeping the original value securely stored elsewhere. It is commonly used for card details and other high-risk identifiers.",
  },
  {
    id: "cysec-q063-data-masking",
    category: "encryption-and-data-protection",
    questions: [
      "What is data masking?",
      "Explain data masking",
      "What does data masking mean?",
      "data masking kya hota hai?",
    ],
    keywords: ["data masking"],
    answer:
      "Data masking hides part of sensitive information in the user interface or logs, such as showing only the last four digits of a phone number or card. It reduces unnecessary exposure while preserving usability.",
  },
  {
    id: "cysec-q064-data-minimisation",
    category: "encryption-and-data-protection",
    questions: [
      "What is data minimisation?",
      "Explain data minimisation",
      "What does data minimisation mean?",
      "data minimisation kya hota hai?",
    ],
    keywords: ["data minimisation"],
    answer:
      "Data minimisation means collecting only the customer information genuinely required for a business purpose. Less stored personal data means lower breach impact and simpler compliance.",
  },
  {
    id: "cysec-q065-data-retention-policy",
    category: "encryption-and-data-protection",
    questions: [
      "What is a data retention policy?",
      "Explain data retention policy",
      "What does data retention policy mean?",
      "data retention policy kya hota hai?",
    ],
    keywords: ["data retention policy"],
    answer:
      "A data retention policy defines how long each type of CRM data is kept, when it must be deleted or anonymised, and what legal or business reason justifies retention. It prevents indefinite accumulation of sensitive customer data.",
  },
  {
    id: "cysec-q066-data-deletion-versus-anonymisation",
    category: "encryption-and-data-protection",
    questions: [
      "What is data deletion versus anonymisation?",
      "Explain data deletion versus anonymisation",
      "What does data deletion versus anonymisation mean?",
      "data deletion versus anonymisation kya hota hai?",
    ],
    keywords: ["data deletion versus anonymisation"],
    answer:
      "Deletion permanently removes identifiable data, while anonymisation alters data so it can no longer reasonably identify a person. The correct method depends on legal, operational, and backup requirements.",
  },
  {
    id: "cysec-q067-data-backup",
    category: "backup-and-disaster-recovery",
    questions: [
      "What is a data backup?",
      "Explain data backup",
      "What does data backup mean?",
      "data backup kya hota hai?",
    ],
    keywords: ["data backup"],
    answer:
      "A backup is a recoverable copy of CRM data, configurations, and critical files. Backups must be encrypted, access-controlled, regularly tested, and protected from deletion by compromised admin accounts.",
  },
  {
    id: "cysec-q068-3-2-1-backup-rule",
    category: "backup-and-disaster-recovery",
    questions: [
      "What is the 3-2-1 backup rule?",
    ],
    keywords: ["3 2 1 backup"],
    answer:
      "Keep at least three copies of important data, on two different types of storage or platforms, with one copy kept off-site or in a separate cloud account. Add immutability and restore testing for stronger ransomware resilience.",
  },
  {
    id: "cysec-q069-immutable-backup",
    category: "backup-and-disaster-recovery",
    questions: [
      "What is an immutable backup?",
      "Explain immutable backup",
      "What does immutable backup mean?",
      "immutable backup kya hota hai?",
    ],
    keywords: ["immutable backup"],
    answer:
      "An immutable backup cannot be altered or deleted for a defined retention period, even by an administrator. This helps protect recovery data from ransomware and malicious insider deletion.",
  },
  {
    id: "cysec-q070-restore-test",
    category: "backup-and-disaster-recovery",
    questions: [
      "What is a restore test?",
      "Explain restore test",
      "What does restore test mean?",
      "restore test kya hota hai?",
    ],
    keywords: ["restore test"],
    answer:
      "A restore test verifies that a backup can actually be recovered into a working system. A backup that has never been tested may be incomplete, corrupted, or unusable during an incident.",
  },
  {
    id: "cysec-q071-disaster-recovery-plan",
    category: "backup-and-disaster-recovery",
    questions: [
      "What is a disaster recovery plan?",
      "Explain disaster recovery plan",
      "What does disaster recovery plan mean?",
      "disaster recovery plan kya hota hai?",
    ],
    keywords: ["disaster recovery plan"],
    answer:
      "A disaster recovery plan documents how a business restores its CRM, website, data, integrations, and communications after an outage, ransomware event, cloud failure, or accidental deletion.",
  },
  {
    id: "cysec-q072-rpo-disaster-recovery",
    category: "backup-and-disaster-recovery",
    questions: [
      "What is RPO in disaster recovery?",
      "Explain RPO in disaster recovery",
      "What does RPO in disaster recovery mean?",
      "RPO in disaster recovery kya hota hai?",
    ],
    keywords: ["rpo disaster recovery"],
    answer:
      "Recovery Point Objective is the maximum amount of data a business can afford to lose, measured in time. An RPO of 15 minutes means the business aims to lose no more than 15 minutes of data.",
  },
  {
    id: "cysec-q073-rto-disaster-recovery",
    category: "backup-and-disaster-recovery",
    questions: [
      "What is RTO in disaster recovery?",
      "Explain RTO in disaster recovery",
      "What does RTO in disaster recovery mean?",
      "RTO in disaster recovery kya hota hai?",
    ],
    keywords: ["rto disaster recovery"],
    answer:
      "Recovery Time Objective is the maximum acceptable time to restore a service after an incident. It determines how quickly the CRM, website, and customer communication channels must return to operation.",
  },
  {
    id: "cysec-q074-vulnerability",
    category: "vulnerabilities-and-secure-development",
    questions: [
      "What is a vulnerability?",
      "Explain vulnerability",
      "What does vulnerability mean?",
      "vulnerability kya hota hai?",
    ],
    keywords: ["vulnerability"],
    answer:
      "A vulnerability is a weakness in software, configuration, process, or human behaviour that an attacker could exploit. Examples include an outdated library, weak password rule, exposed admin panel, or missing access check.",
  },
  {
    id: "cysec-q075-exploit",
    category: "vulnerabilities-and-secure-development",
    questions: [
      "What is an exploit?",
      "Explain exploit",
      "What does exploit mean?",
      "exploit kya hota hai?",
    ],
    keywords: ["exploit"],
    answer:
      "An exploit is a technique, script, or request that takes advantage of a vulnerability to gain unauthorised access or cause harm. A vulnerability becomes a real risk when an exploit path exists.",
  },
  {
    id: "cysec-q076-cve",
    category: "vulnerabilities-and-secure-development",
    questions: [
      "What is a CVE?",
      "Explain CVE",
      "What does CVE mean?",
      "CVE kya hota hai?",
    ],
    keywords: ["cve"],
    answer:
      "CVE stands for Common Vulnerabilities and Exposures. It is a public identifier for a known security vulnerability, helping teams track, prioritise, and patch affected software.",
  },
  {
    id: "cysec-q077-patch-management",
    category: "vulnerabilities-and-secure-development",
    questions: [
      "What is patch management?",
      "Explain patch management",
      "What does patch management mean?",
      "patch management kya hota hai?",
    ],
    keywords: ["patch management"],
    answer:
      "Patch management is the process of identifying, testing, approving, deploying, and verifying security updates for operating systems, applications, libraries, and cloud services.",
  },
  {
    id: "cysec-q078-dependency-scanning",
    category: "vulnerabilities-and-secure-development",
    questions: [
      "What is dependency scanning?",
      "Explain dependency scanning",
      "What does dependency scanning mean?",
      "dependency scanning kya hota hai?",
    ],
    keywords: ["dependency scanning"],
    answer:
      "Dependency scanning checks third-party packages and libraries for known vulnerabilities. It should cover direct dependencies and transitive dependencies listed in lockfiles.",
  },
  {
    id: "cysec-q079-software-supply-chain-attack",
    category: "vulnerabilities-and-secure-development",
    questions: [
      "What is a software supply-chain attack?",
      "Explain software supply-chain attack",
      "What does software supply-chain attack mean?",
      "software supply-chain attack kya hota hai?",
    ],
    keywords: ["software supply chain attack"],
    answer:
      "A supply-chain attack compromises a trusted component, package, build tool, or vendor to attack downstream customers. Controls include dependency pinning, integrity checks, signed releases, and vendor security review.",
  },
  {
    id: "cysec-q080-software-bill-materials-sbom",
    category: "vulnerabilities-and-secure-development",
    questions: [
      "What is a Software Bill of Materials (SBOM)?",
      "Explain Software Bill of Materials (SBOM)",
      "What does Software Bill of Materials (SBOM) mean?",
      "Software Bill of Materials (SBOM) kya hota hai?",
    ],
    keywords: ["software bill materials sbom"],
    answer:
      "An SBOM is a machine-readable inventory of the components inside software or a container image. It helps a business quickly determine whether a newly disclosed vulnerability affects its systems.",
  },
  {
    id: "cysec-q081-secure-coding",
    category: "vulnerabilities-and-secure-development",
    questions: [
      "What is secure coding?",
      "Explain secure coding",
      "What does secure coding mean?",
      "secure coding kya hota hai?",
    ],
    keywords: ["secure coding"],
    answer:
      "Secure coding is the practice of writing software that resists common attacks. It includes input validation, safe database queries, proper authentication, least privilege, secure error handling, and dependency management.",
  },
  {
    id: "cysec-q082-code-review-security-perspective",
    category: "vulnerabilities-and-secure-development",
    questions: [
      "What is a code review from a security perspective?",
    ],
    keywords: ["code review security perspective"],
    answer:
      "Security-focused code review examines new changes for injection risks, broken authorisation, exposed secrets, insecure cryptography, unsafe file handling, and business-logic mistakes before deployment.",
  },
  {
    id: "cysec-q083-static-application-security-testing-sast",
    category: "vulnerabilities-and-secure-development",
    questions: [
      "What is static application security testing (SAST)?",
      "Explain static application security testing (SAST)",
      "What does static application security testing (SAST) mean?",
      "static application security testing (SAST) kya hota hai?",
    ],
    keywords: ["static application security testing"],
    answer:
      "SAST analyses source code without running it to find insecure patterns and data-flow issues. It can identify problems such as unsafe SQL construction, hardcoded credentials, and dangerous function use.",
  },
  {
    id: "cysec-q084-dynamic-application-security-testing-dast",
    category: "vulnerabilities-and-secure-development",
    questions: [
      "What is dynamic application security testing (DAST)?",
      "Explain dynamic application security testing (DAST)",
      "What does dynamic application security testing (DAST) mean?",
      "dynamic application security testing (DAST) kya hota hai?",
    ],
    keywords: ["dynamic application security testing"],
    answer:
      "DAST tests a running application by sending requests and observing responses. It helps discover authentication, configuration, injection, and API issues that may not be visible in source code alone.",
  },
  {
    id: "cysec-q085-continuous-security-testing",
    category: "vulnerabilities-and-secure-development",
    questions: [
      "What is continuous security testing?",
      "Explain continuous security testing",
      "What does continuous security testing mean?",
      "continuous security testing kya hota hai?",
    ],
    keywords: ["continuous security testing"],
    answer:
      "Continuous security testing integrates automated scans, dependency checks, secret detection, and security tests into the development pipeline so risks are found early rather than only before launch.",
  },
  {
    id: "cysec-q086-security-regression",
    category: "vulnerabilities-and-secure-development",
    questions: [
      "What is a security regression?",
      "Explain security regression",
      "What does security regression mean?",
      "security regression kya hota hai?",
    ],
    keywords: ["security regression"],
    answer:
      "A security regression is when a new update, feature, or configuration change reintroduces a previously fixed vulnerability. Automated security tests and release checks help prevent this.",
  },
  {
    id: "cysec-q087-audit-log",
    category: "logging-and-monitoring",
    questions: [
      "What is an audit log?",
      "Explain audit log",
      "What does audit log mean?",
      "audit log kya hota hai?",
    ],
    keywords: ["audit log"],
    answer:
      "An audit log records important events such as logins, permission changes, record exports, data edits, payment actions, and integration failures. It supports investigations, accountability, and anomaly detection.",
  },
  {
    id: "cysec-q088-never-stored-application-logs",
    category: "logging-and-monitoring",
    questions: [
      "What should never be stored in application logs?",
    ],
    keywords: ["never stored application logs"],
    answer:
      "Passwords, full payment-card numbers, OTPs, API keys, session tokens, and unnecessary personal data should never be stored in logs. Logs should be masked, access-controlled, and retained only as long as required.",
  },
  {
    id: "cysec-q089-log-integrity",
    category: "logging-and-monitoring",
    questions: [
      "What is log integrity?",
      "Explain log integrity",
      "What does log integrity mean?",
      "log integrity kya hota hai?",
    ],
    keywords: ["log integrity"],
    answer:
      "Log integrity ensures that logs cannot be silently modified or deleted by an attacker. Centralised storage, restricted write access, time synchronisation, hashing, and alerting help preserve trustworthy evidence.",
  },
  {
    id: "cysec-q090-siem",
    category: "logging-and-monitoring",
    questions: [
      "What is a SIEM?",
      "Explain SIEM",
      "What does SIEM mean?",
      "SIEM kya hota hai?",
    ],
    keywords: ["siem"],
    answer:
      "A Security Information and Event Management system collects logs and alerts from applications, cloud services, endpoints, and firewalls. It helps security teams correlate events and detect suspicious activity faster.",
  },
  {
    id: "cysec-q091-indicator-compromise-ioc",
    category: "logging-and-monitoring",
    questions: [
      "What is an Indicator of Compromise (IOC)?",
      "Explain Indicator of Compromise (IOC)",
      "What does Indicator of Compromise (IOC) mean?",
      "Indicator of Compromise (IOC) kya hota hai?",
    ],
    keywords: ["indicator compromise ioc"],
    answer:
      "An IOC is evidence that a system may have been compromised, such as a malicious IP address, suspicious file hash, unusual domain, or abnormal login pattern. IOCs support detection and incident response.",
  },
  {
    id: "cysec-q092-incident-response-plan",
    category: "incident-response-and-malware",
    questions: [
      "What is an incident response plan?",
      "Explain incident response plan",
      "What does incident response plan mean?",
      "incident response plan kya hota hai?",
    ],
    keywords: ["incident response plan"],
    answer:
      "An incident response plan defines who does what during a cyber incident: how to detect, contain, investigate, eradicate, recover, communicate, and learn from the event. It should include contact lists, escalation paths, and backup procedures.",
  },
  {
    id: "cysec-q093-business-immediately-after-discovering-crm-breach",
    category: "incident-response-and-malware",
    questions: [
      "What should a business do immediately after discovering a CRM breach?",
    ],
    keywords: ["business immediately after discovering"],
    answer:
      "It should contain the incident by isolating affected systems, revoking exposed credentials and sessions, preserving logs and evidence, assessing affected customer data, notifying the appropriate stakeholders, and beginning recovery from verified clean backups.",
  },
  {
    id: "cysec-q094-ransomware",
    category: "incident-response-and-malware",
    questions: [
      "What is ransomware?",
      "Explain ransomware",
      "What does ransomware mean?",
      "ransomware kya hota hai?",
    ],
    keywords: ["ransomware"],
    answer:
      "Ransomware is malicious software that encrypts or locks business data and demands payment. Strong endpoint protection, restricted admin access, network segmentation, and tested immutable backups are key defences.",
  },
  {
    id: "cysec-q095-malware",
    category: "incident-response-and-malware",
    questions: [
      "What is malware?",
      "Explain malware",
      "What does malware mean?",
      "malware kya hota hai?",
    ],
    keywords: ["malware"],
    answer:
      "Malware is malicious software designed to damage, spy on, disrupt, or gain unauthorised access to systems. It includes viruses, worms, trojans, ransomware, spyware, and info-stealers.",
  },
  {
    id: "cysec-q096-endpoint-security",
    category: "incident-response-and-malware",
    questions: [
      "What is endpoint security?",
      "Explain endpoint security",
      "What does endpoint security mean?",
      "endpoint security kya hota hai?",
    ],
    keywords: ["endpoint security"],
    answer:
      "Endpoint security protects laptops, desktops, phones, and servers from malware, unauthorised access, data theft, and risky configurations. It includes EDR, patching, disk encryption, device policies, and user access controls.",
  },
  {
    id: "cysec-q097-edr",
    category: "incident-response-and-malware",
    questions: [
      "What is EDR?",
      "Explain EDR",
      "What does EDR mean?",
      "EDR kya hota hai?",
    ],
    keywords: ["edr"],
    answer:
      "Endpoint Detection and Response monitors endpoint behaviour to detect suspicious activity, investigate alerts, and contain threats. It can isolate an infected device and help responders understand the attack path.",
  },
  {
    id: "cysec-q098-zero-day-vulnerability",
    category: "incident-response-and-malware",
    questions: [
      "What is a zero-day vulnerability?",
      "Explain zero-day vulnerability",
      "What does zero-day vulnerability mean?",
      "zero-day vulnerability kya hota hai?",
    ],
    keywords: ["zero day vulnerability"],
    answer:
      "A zero-day is a vulnerability that is being exploited or disclosed before an official vendor patch is available. Layered controls, rapid monitoring, WAF virtual patching, and incident readiness reduce its impact.",
  },
  {
    id: "cysec-q099-security-patch",
    category: "incident-response-and-malware",
    questions: [
      "What is a security patch?",
      "Explain security patch",
      "What does security patch mean?",
      "security patch kya hota hai?",
    ],
    keywords: ["security patch"],
    answer:
      "A security patch is a software update that fixes a known vulnerability. Critical patches should be prioritised based on exploitability, exposure, data sensitivity, and business impact.",
  },
  {
    id: "cysec-q100-vulnerability-prioritisation",
    category: "incident-response-and-malware",
    questions: [
      "What is vulnerability prioritisation?",
      "Explain vulnerability prioritisation",
      "What does vulnerability prioritisation mean?",
      "vulnerability prioritisation kya hota hai?",
    ],
    keywords: ["vulnerability prioritisation"],
    answer:
      "Vulnerability prioritisation decides which issues to fix first using exploitability, public exploit availability, business criticality, data exposure, and compensating controls. Not every finding requires the same urgency.",
  },
  {
    id: "cysec-q101-business-data-safe-cored-crm",
    category: "customer-trust-and-data-protection",
    questions: [
      "Is my business data safe in the CoreD CRM?",
    ],
    keywords: ["business data safe cored"],
    answer:
      "CoreD designs the CRM with layered security: access control, encryption, logging, backups, and monitoring. No system is ever 100% risk-free, so the exact protection depends on your hosting setup, integrations, and user practices. CoreD can walk you through the controls that apply to your deployment.",
  },
  {
    id: "cysec-q102-owns-data-store-crm",
    category: "customer-trust-and-data-protection",
    questions: [
      "Who owns the data I store in the CRM?",
    ],
    keywords: ["owns data store crm"],
    answer:
      "Your customer and lead data belongs to your business. CoreD acts as the technology provider that processes it on your behalf. Ownership, usage rights, and deletion terms should be written clearly in your service agreement.",
  },
  {
    id: "cysec-q103-cored-staff-see-customer-data",
    category: "customer-trust-and-data-protection",
    questions: [
      "Can CoreD staff see my customer data?",
    ],
    keywords: ["cored staff see customer"],
    answer:
      "Access by CoreD personnel should be limited to what is needed for support or maintenance, approved by you, and logged. Ask for the support-access policy during onboarding so you know exactly when and why anyone from the vendor side may view your data.",
  },
  {
    id: "cysec-q104-sell-share-customer-data-others",
    category: "customer-trust-and-data-protection",
    questions: [
      "Will you sell or share my customer data with others?",
    ],
    keywords: ["sell share customer data"],
    answer:
      "A trustworthy CRM provider should never sell client data or use it for unrelated purposes. Any sharing with sub-processors (for example hosting or messaging providers) should be disclosed and limited to delivering the service. Confirm this in your contract and privacy terms.",
  },
  {
    id: "cysec-q105-types-data-considered-sensitive-crm",
    category: "customer-trust-and-data-protection",
    questions: [
      "What types of data are considered sensitive in a CRM?",
    ],
    keywords: ["types data considered sensitive"],
    answer:
      "Sensitive data includes phone numbers, email addresses, home addresses, ID numbers, bank or payment details, health or financial information, call recordings, chat history, and authentication secrets. The more sensitive the field, the stronger the access and encryption controls it needs.",
  },
  {
    id: "cysec-q106-tell-crm-fields-need-extra-protection",
    category: "customer-trust-and-data-protection",
    questions: [
      "How can I tell which of my CRM fields need extra protection?",
    ],
    keywords: ["tell crm fields need"],
    answer:
      "Run a simple data classification exercise: label fields as public, internal, confidential, or restricted. Restricted fields such as ID numbers or bank details get tighter permissions, masking, encryption, and audit logging.",
  },
  {
    id: "cysec-q107-data-classification-small-business",
    category: "customer-trust-and-data-protection",
    questions: [
      "What is data classification and why should a small business do it?",
    ],
    keywords: ["data classification small business"],
    answer:
      "Data classification sorts information by sensitivity so each type gets the right protection. Even a small business benefits because it avoids over-protecting trivial data and under-protecting critical data, and it makes access decisions much simpler.",
  },
  {
    id: "cysec-q108-see-accessed-changed-customer-record",
    category: "customer-trust-and-data-protection",
    questions: [
      "Can I see who accessed or changed a customer record?",
    ],
    keywords: ["see accessed changed customer"],
    answer:
      "Yes, if audit logging is enabled for that module. A good CRM records who viewed, edited, exported, or deleted a record and when. Review these logs periodically, especially for high-value customers and exports.",
  },
  {
    id: "cysec-q109-happens-data-stop-using-crm",
    category: "customer-trust-and-data-protection",
    questions: [
      "What happens to my data if I stop using the CRM?",
    ],
    keywords: ["happens data stop using"],
    answer:
      "You should be able to export your data in a standard format and request deletion afterwards. Agree on the export format, timeline, and deletion confirmation upfront, including what happens to backups.",
  },
  {
    id: "cysec-q110-protect-data-developer-vendor-works-crm",
    category: "customer-trust-and-data-protection",
    questions: [
      "How do you protect data when a developer or vendor works on my CRM?",
    ],
    keywords: ["protect data developer vendor"],
    answer:
      "Use non-production test data, separate credentials per person, time-limited access, NDAs, and activity logging. Developers should never be given permanent admin access to live customer data without a documented need.",
  },
  {
    id: "cysec-q111-crm-comply-india-s-dpdp-act",
    category: "compliance-and-legal-india-focus",
    questions: [
      "Does the CRM comply with India's DPDP Act?",
    ],
    keywords: ["crm comply india s"],
    answer:
      "India's Digital Personal Data Protection Act, 2023 places duties on organisations that handle personal data, such as having a lawful purpose, consent where required, security safeguards, and respecting individual rights. A CRM can support these duties, but compliance depends on how your business uses it. Please confirm your obligations with legal counsel; CoreD can help configure supporting controls.",
  },
  {
    id: "cysec-q112-data-fiduciary-data-processor",
    category: "compliance-and-legal-india-focus",
    questions: [
      "What is a Data Fiduciary and a Data Processor?",
    ],
    keywords: ["data fiduciary data processor"],
    answer:
      "In the DPDP framework, the business deciding why and how personal data is used is the Data Fiduciary, while a vendor handling data on its behalf is the Data Processor. In most CRM setups, your company is the fiduciary and the CRM provider is a processor, so a clear data-processing agreement is important.",
  },
  {
    id: "cysec-q113-need-customer-consent-store-their-data",
    category: "compliance-and-legal-india-focus",
    questions: [
      "Do I need customer consent to store their data in a CRM?",
    ],
    keywords: ["need customer consent store"],
    answer:
      "In many cases, yes, or another lawful basis must exist. Capture consent clearly at the point of collection (forms, WhatsApp opt-in, call recordings) and store proof of when and how it was given. Ask your legal advisor which basis applies to your use case.",
  },
  {
    id: "cysec-q114-crm-help-consent-management",
    category: "compliance-and-legal-india-focus",
    questions: [
      "How can a CRM help with consent management?",
    ],
    keywords: ["crm help consent management"],
    answer:
      "A CRM can store consent status, timestamp, source, and purpose for each contact, and can block marketing messages to people who withdrew consent. This creates a defensible record if a customer or regulator asks.",
  },
  {
    id: "cysec-q115-customer-asks-me-delete-their-data",
    category: "compliance-and-legal-india-focus",
    questions: [
      "What should I do if a customer asks me to delete their data?",
    ],
    keywords: ["customer asks me delete"],
    answer:
      "Verify the request, search the CRM and connected systems, delete or anonymise the data unless law requires you to retain it, and record the action. Also check backups, email tools, and exports where the data may exist.",
  },
  {
    id: "cysec-q116-gdpr-relevant-indian-business",
    category: "compliance-and-legal-india-focus",
    questions: [
      "Is GDPR relevant to an Indian business?",
    ],
    keywords: ["gdpr relevant indian business"],
    answer:
      "GDPR can apply if you offer goods or services to, or monitor the behaviour of, people in the EU or UK, even from India. If you have such customers, review GDPR requirements such as lawful basis, data-subject rights, and breach notification with qualified counsel.",
  },
  {
    id: "cysec-q117-cert-in-reporting-rules-cyber-incidents",
    category: "compliance-and-legal-india-focus",
    questions: [
      "What are CERT-In reporting rules for cyber incidents?",
    ],
    keywords: ["cert reporting rules cyber"],
    answer:
      "India's CERT-In directions (2022) require covered entities to report specified types of cyber incidents within a short timeline, which is commonly cited as 6 hours. Because applicability and exact obligations vary, confirm with your legal or compliance advisor and keep logs ready, as the directions also expect log retention.",
  },
  {
    id: "cysec-q118-crm-have-iso-27001-soc-2",
    category: "compliance-and-legal-india-focus",
    questions: [
      "Does the CRM have ISO 27001 or SOC 2 certification?",
    ],
    keywords: ["crm have iso 27001"],
    answer:
      "Only answer yes if CoreD holds a current, verifiable certificate. If not, say plainly that certification is not claimed, and explain which security practices are followed and which framework CoreD is aligned to or working towards, as approved by management.",
  },
  {
    id: "cysec-q119-difference-between-compliant-aligned-certified",
    category: "compliance-and-legal-india-focus",
    questions: [
      "What is the difference between \"compliant,\" \"aligned,\" and \"certified\"?",
    ],
    keywords: ["difference between compliant aligned"],
    answer:
      "Certified means an independent auditor has verified the controls and issued a certificate. Compliant means meeting a legal or regulatory requirement. Aligned means following the framework's practices without formal certification. Never use these words interchangeably in marketing or sales replies.",
  },
  {
    id: "cysec-q120-need-data-processing-agreement-dpa-crm",
    category: "compliance-and-legal-india-focus",
    questions: [
      "Do I need a Data Processing Agreement (DPA) with my CRM vendor?",
    ],
    keywords: ["need data processing agreement"],
    answer:
      "Yes, it is strongly recommended. A DPA defines what data is processed, for what purpose, security measures, sub-processors, breach notification duties, and data return or deletion at contract end.",
  },
  {
    id: "cysec-q121-where-crm-data-physically-stored",
    category: "hosting-cloud-and-availability",
    questions: [
      "Where is my CRM data physically stored?",
    ],
    keywords: ["where crm data physically"],
    answer:
      "It depends on the hosting provider and region chosen for your deployment. During scoping, confirm the cloud provider, country, and region so you can meet any data-residency expectations and understand legal jurisdiction.",
  },
  {
    id: "cysec-q122-data-residency-matter-me",
    category: "hosting-cloud-and-availability",
    questions: [
      "What is data residency and does it matter to me?",
    ],
    keywords: ["data residency matter me"],
    answer:
      "Data residency is the geographic location where data is stored and processed. It matters when laws, contracts, or customers require data to stay in a specific country, for example certain financial or government-related data.",
  },
  {
    id: "cysec-q123-choose-cloud-hosted-on-premise-crm",
    category: "hosting-cloud-and-availability",
    questions: [
      "Should I choose cloud-hosted or on-premise CRM?",
    ],
    keywords: ["choose cloud hosted premise"],
    answer:
      "Cloud offers faster setup, managed infrastructure, and easier scaling; on-premise gives more direct control but needs your team to patch, monitor, and secure the servers. The right choice depends on budget, compliance needs, and in-house IT skill.",
  },
  {
    id: "cysec-q124-shared-responsibility-model-cloud",
    category: "hosting-cloud-and-availability",
    questions: [
      "What is the shared responsibility model in cloud?",
    ],
    keywords: ["shared responsibility model cloud"],
    answer:
      "The cloud provider secures the underlying infrastructure, while the customer secures their own configuration, identities, data, and applications. A misconfigured storage bucket or exposed database is the customer's side of responsibility, not the provider's.",
  },
  {
    id: "cysec-q125-cloud-misconfiguration-dangerous",
    category: "hosting-cloud-and-availability",
    questions: [
      "What is cloud misconfiguration and why is it dangerous?",
    ],
    keywords: ["cloud misconfiguration dangerous"],
    answer:
      "Cloud misconfiguration means insecure settings such as public storage buckets, open database ports, or over-permissive roles. It is one of the most common causes of data leaks and is prevented by secure baselines, reviews, and automated configuration scanning.",
  },
  {
    id: "cysec-q126-infrastructure-code-iac-security",
    category: "hosting-cloud-and-availability",
    questions: [
      "What is Infrastructure as Code (IaC) security?",
      "Explain Infrastructure as Code (IaC) security",
      "What does Infrastructure as Code (IaC) security mean?",
      "Infrastructure as Code (IaC) security kya hota hai?",
    ],
    keywords: ["infrastructure code iac security"],
    answer:
      "IaC defines servers and networks in code files. Scanning those files before deployment catches insecure settings early and ensures every environment is built the same, repeatable way.",
  },
  {
    id: "cysec-q127-network-segmentation",
    category: "hosting-cloud-and-availability",
    questions: [
      "What is network segmentation?",
      "Explain network segmentation",
      "What does network segmentation mean?",
      "network segmentation kya hota hai?",
    ],
    keywords: ["network segmentation"],
    answer:
      "Network segmentation splits a network into separate zones so that a breach in one area cannot freely spread to others. For example, the public web server, application layer, and database sit in separate zones with strict rules between them.",
  },
  {
    id: "cysec-q128-zero-trust-approach",
    category: "hosting-cloud-and-availability",
    questions: [
      "What is a Zero Trust approach?",
      "Explain Zero Trust approach",
      "What does Zero Trust approach mean?",
      "Zero Trust approach kya hota hai?",
    ],
    keywords: ["zero trust approach"],
    answer:
      "Zero Trust means never automatically trusting a user, device, or network location; every request is verified based on identity, device health, and context. It reduces the damage from stolen credentials or compromised internal systems.",
  },
  {
    id: "cysec-q129-high-availability-relate-security",
    category: "hosting-cloud-and-availability",
    questions: [
      "What is high availability and how does it relate to security?",
    ],
    keywords: ["high availability relate security"],
    answer:
      "High availability uses redundant servers and failover so the CRM stays reachable if one component fails. Availability is part of security because attacks such as DDoS and ransomware aim to make systems unusable.",
  },
  {
    id: "cysec-q130-guarantee-100-uptime",
    category: "hosting-cloud-and-availability",
    questions: [
      "Can you guarantee 100% uptime?",
    ],
    keywords: ["guarantee 100 uptime"],
    answer:
      "No provider can honestly guarantee 100% uptime. CoreD can describe the availability target, monitoring, failover design, and support response in your service agreement, and uptime commitments should be taken only from approved SLA documents.",
  },
  {
    id: "cysec-q131-sql-injection",
    category: "web-and-application-attack-types",
    questions: [
      "What is SQL injection?",
      "Explain SQL injection",
      "What does SQL injection mean?",
      "SQL injection kya hota hai?",
    ],
    keywords: ["sql injection"],
    answer:
      "SQL injection is an attack where malicious database commands are inserted through a form field or URL to read, change, or delete data. It is prevented using parameterised queries, input validation, least-privilege database accounts, and a WAF as an additional layer.",
  },
  {
    id: "cysec-q132-cross-site-scripting-xss",
    category: "web-and-application-attack-types",
    questions: [
      "What is cross-site scripting (XSS)?",
      "Explain cross-site scripting (XSS)",
      "What does cross-site scripting (XSS) mean?",
      "cross-site scripting (XSS) kya hota hai?",
    ],
    keywords: ["cross site scripting xss"],
    answer:
      "XSS happens when an attacker gets malicious script to run in another user's browser, for example through a CRM note or comment field. Defences include output encoding, input handling rules, and a strict Content Security Policy.",
  },
  {
    id: "cysec-q133-csrf",
    category: "web-and-application-attack-types",
    questions: [
      "What is CSRF?",
      "Explain CSRF",
      "What does CSRF mean?",
      "CSRF kya hota hai?",
    ],
    keywords: ["csrf"],
    answer:
      "Cross-Site Request Forgery tricks a logged-in user's browser into sending an unwanted request, such as changing an email or deleting a lead. Anti-CSRF tokens, SameSite cookies, and re-authentication for sensitive actions prevent it.",
  },
  {
    id: "cysec-q134-idor-insecure-direct-object-reference",
    category: "web-and-application-attack-types",
    questions: [
      "What is IDOR (Insecure Direct Object Reference)?",
      "Explain IDOR (Insecure Direct Object Reference)",
      "What does IDOR (Insecure Direct Object Reference) mean?",
      "IDOR (Insecure Direct Object Reference) kya hota hai?",
    ],
    keywords: ["idor insecure direct object"],
    answer:
      "IDOR occurs when changing an ID in a URL or request, such as lead/1001 to lead/1002, exposes someone else's record. The fix is to verify record ownership and permission on the server for every request, not just hide IDs.",
  },
  {
    id: "cysec-q135-ssrf",
    category: "web-and-application-attack-types",
    questions: [
      "What is SSRF?",
      "Explain SSRF",
      "What does SSRF mean?",
      "SSRF kya hota hai?",
    ],
    keywords: ["ssrf"],
    answer:
      "Server-Side Request Forgery tricks the server into making requests to internal or restricted resources, such as cloud metadata services. Controls include URL allowlists, blocking internal address ranges, and network egress restrictions.",
  },
  {
    id: "cysec-q136-broken-access-control",
    category: "web-and-application-attack-types",
    questions: [
      "What is broken access control?",
      "Explain broken access control",
      "What does broken access control mean?",
      "broken access control kya hota hai?",
    ],
    keywords: ["broken access control"],
    answer:
      "Broken access control means users can perform actions or view data beyond their permissions. It is consistently among the most serious web risks and is tested by trying forbidden actions with different roles and accounts.",
  },
  {
    id: "cysec-q137-clickjacking",
    category: "web-and-application-attack-types",
    questions: [
      "What is clickjacking?",
      "Explain clickjacking",
      "What does clickjacking mean?",
      "clickjacking kya hota hai?",
    ],
    keywords: ["clickjacking"],
    answer:
      "Clickjacking hides a legitimate page inside an invisible frame so users unknowingly click a button they cannot see. Frame restrictions through CSP frame-ancestors or X-Frame-Options help prevent it.",
  },
  {
    id: "cysec-q138-open-redirect-vulnerability",
    category: "web-and-application-attack-types",
    questions: [
      "What is an open redirect vulnerability?",
      "Explain open redirect vulnerability",
      "What does open redirect vulnerability mean?",
      "open redirect vulnerability kya hota hai?",
    ],
    keywords: ["open redirect vulnerability"],
    answer:
      "An open redirect lets attackers use your real domain's link to send victims to a malicious site, making phishing look trustworthy. Applications should redirect only to approved, pre-defined destinations.",
  },
  {
    id: "cysec-q139-mass-assignment",
    category: "web-and-application-attack-types",
    questions: [
      "What is mass assignment?",
      "Explain mass assignment",
      "What does mass assignment mean?",
      "mass assignment kya hota hai?",
    ],
    keywords: ["mass assignment"],
    answer:
      "Mass assignment occurs when an API accepts extra fields from a request and blindly saves them, letting an attacker set fields like role=admin. The solution is to allow only an explicit list of editable fields.",
  },
  {
    id: "cysec-q140-business-logic-vulnerability",
    category: "web-and-application-attack-types",
    questions: [
      "What is a business logic vulnerability?",
      "Explain business logic vulnerability",
      "What does business logic vulnerability mean?",
      "business logic vulnerability kya hota hai?",
    ],
    keywords: ["business logic vulnerability"],
    answer:
      "It is a flaw in how a workflow is designed rather than a coding bug, such as applying a discount twice, skipping an approval step, or refunding more than paid. It is found through threat modelling and test cases written around abuse scenarios.",
  },
  {
    id: "cysec-q141-whatsapp-business-integration-secure",
    category: "api-integrations-whatsapp-and-payments",
    questions: [
      "Is my WhatsApp Business integration secure?",
    ],
    keywords: ["whatsapp business integration secure"],
    answer:
      "Security depends on how tokens are stored, how webhooks are verified, and who can send messages from the CRM. Keep access tokens in a secret manager, verify webhook signatures, restrict who can send templates, and log outbound messages.",
  },
  {
    id: "cysec-q142-someone-misuse-whatsapp-api-token",
    category: "api-integrations-whatsapp-and-payments",
    questions: [
      "Can someone misuse my WhatsApp API token?",
    ],
    keywords: ["someone misuse whatsapp api"],
    answer:
      "If a token is leaked, an attacker could send messages or read conversations through your account. Limit token permissions, rotate it if exposure is suspected, and monitor for unusual message volume.",
  },
  {
    id: "cysec-q143-payment-gateway-integrations-kept-safe",
    category: "api-integrations-whatsapp-and-payments",
    questions: [
      "How are payment gateway integrations kept safe?",
    ],
    keywords: ["payment gateway integrations kept"],
    answer:
      "Card data should be handled by the payment provider's hosted checkout, not typed into or stored by the CRM. The CRM should only keep order references and status, with provider callbacks verified before any invoice or order is updated.",
  },
  {
    id: "cysec-q144-crm-store-credit-debit-card-numbers",
    category: "api-integrations-whatsapp-and-payments",
    questions: [
      "Does the CRM store credit or debit card numbers?",
    ],
    keywords: ["crm store credit debit"],
    answer:
      "Best practice is that it does not. Using a gateway's hosted payment page or tokenisation keeps full card data out of your systems and greatly reduces compliance scope.",
  },
  {
    id: "cysec-q145-pci-dss-apply-me",
    category: "api-integrations-whatsapp-and-payments",
    questions: [
      "What is PCI DSS and does it apply to me?",
    ],
    keywords: ["pci dss apply me"],
    answer:
      "PCI DSS is the payment card industry security standard for organisations that store, process, or transmit card data. Using a compliant gateway with hosted checkout reduces your burden, but you should confirm your exact obligations with your payment provider.",
  },
  {
    id: "cysec-q146-secure-connecting-facebook-instagram-google-ads",
    category: "api-integrations-whatsapp-and-payments",
    questions: [
      "How secure is connecting Facebook, Instagram, or Google Ads leads to the CRM?",
    ],
    keywords: ["secure connecting facebook instagram"],
    answer:
      "Use official OAuth connections with minimum permissions, store tokens securely, and review which users can authorise connections. Disconnect integrations that are no longer needed.",
  },
  {
    id: "cysec-q147-oauth-safer-than-sharing-passwords",
    category: "api-integrations-whatsapp-and-payments",
    questions: [
      "What is OAuth and why is it safer than sharing passwords?",
    ],
    keywords: ["oauth safer than sharing"],
    answer:
      "OAuth lets one app access another with limited, revocable permission without ever seeing your password. You can remove the access at any time without changing your main credentials.",
  },
  {
    id: "cysec-q148-jwt-its-security-risks",
    category: "api-integrations-whatsapp-and-payments",
    questions: [
      "What is a JWT and what are its security risks?",
    ],
    keywords: ["jwt its security risks"],
    answer:
      "A JSON Web Token is a signed token used to prove identity to an API. Risks include long lifetimes, weak signing secrets, storing tokens insecurely, and not validating signature, expiry, and audience on every request.",
  },
  {
    id: "cysec-q149-api-gateway",
    category: "api-integrations-whatsapp-and-payments",
    questions: [
      "What is an API gateway?",
      "Explain API gateway",
      "What does API gateway mean?",
      "API gateway kya hota hai?",
    ],
    keywords: ["api gateway"],
    answer:
      "An API gateway is a single controlled entry point for API traffic that can enforce authentication, rate limits, logging, and request validation before requests reach backend services.",
  },
  {
    id: "cysec-q150-cors-security-risk",
    category: "api-integrations-whatsapp-and-payments",
    questions: [
      "What is CORS and why can it be a security risk?",
    ],
    keywords: ["cors security risk"],
    answer:
      "CORS controls which websites' scripts may call your API from a browser. A wildcard or overly broad setting can let untrusted sites interact with your API on behalf of logged-in users, so only specific trusted origins should be allowed.",
  },
  {
    id: "cysec-q151-team-log-using-google-microsoft-accounts",
    category: "identity-sso-and-access-control",
    questions: [
      "Can my team log in using Google or Microsoft accounts?",
    ],
    keywords: ["team log using google"],
    answer:
      "Social or workplace sign-in can be supported where the integration is scoped. It reduces password sprawl and lets you apply your organisation's MFA and offboarding rules centrally. Confirm supported providers during scoping.",
  },
  {
    id: "cysec-q152-single-sign-on-sso",
    category: "identity-sso-and-access-control",
    questions: [
      "What is Single Sign-On (SSO)?",
      "Explain Single Sign-On (SSO)",
      "What does Single Sign-On (SSO) mean?",
      "Single Sign-On (SSO) kya hota hai?",
    ],
    keywords: ["single sign sso"],
    answer:
      "SSO lets users log in once with a central identity provider and access multiple applications. It simplifies access management and makes it faster to disable all access when someone leaves.",
  },
  {
    id: "cysec-q153-saml",
    category: "identity-sso-and-access-control",
    questions: [
      "What is SAML?",
      "Explain SAML",
      "What does SAML mean?",
      "SAML kya hota hai?",
    ],
    keywords: ["saml"],
    answer:
      "SAML is an enterprise standard that lets an identity provider confirm a user's identity to an application. It is commonly used for SSO in larger organisations.",
  },
  {
    id: "cysec-q154-scim",
    category: "identity-sso-and-access-control",
    questions: [
      "What is SCIM?",
      "Explain SCIM",
      "What does SCIM mean?",
      "SCIM kya hota hai?",
    ],
    keywords: ["scim"],
    answer:
      "SCIM automates creating, updating, and removing user accounts across applications from a central directory. It prevents forgotten accounts after staff changes.",
  },
  {
    id: "cysec-q155-restrict-crm-login-office-ip-addresses",
    category: "identity-sso-and-access-control",
    questions: [
      "Can I restrict CRM login to my office IP addresses?",
    ],
    keywords: ["restrict crm login office"],
    answer:
      "IP allowlisting can limit access to approved networks and is useful for admin panels. It must be planned carefully for remote staff, mobile users, and changing IP addresses, usually combined with a VPN.",
  },
  {
    id: "cysec-q156-geo-blocking-useful",
    category: "identity-sso-and-access-control",
    questions: [
      "What is geo-blocking and when is it useful?",
    ],
    keywords: ["geo blocking useful"],
    answer:
      "Geo-blocking denies access from countries where you have no users or business. It reduces automated attack noise but should not be the only control, since attackers can use VPNs.",
  },
  {
    id: "cysec-q157-impossible-travel-detection",
    category: "identity-sso-and-access-control",
    questions: [
      "What is impossible travel detection?",
      "Explain impossible travel detection",
      "What does impossible travel detection mean?",
      "impossible travel detection kya hota hai?",
    ],
    keywords: ["impossible travel detection"],
    answer:
      "It flags a login pattern that cannot be physically real, such as one login from Indore and another from another continent within minutes. It helps detect stolen credentials and can trigger MFA or session blocking.",
  },
  {
    id: "cysec-q158-mfa-fatigue-push-bombing",
    category: "identity-sso-and-access-control",
    questions: [
      "What is MFA fatigue (push bombing)?",
      "Explain MFA fatigue (push bombing)",
      "What does MFA fatigue (push bombing) mean?",
      "MFA fatigue (push bombing) kya hota hai?",
    ],
    keywords: ["mfa fatigue push bombing"],
    answer:
      "Attackers repeatedly trigger approval prompts hoping the user taps \"Approve\" out of annoyance. Number matching, phishing-resistant methods, and prompt rate limits reduce this risk, and users should report unexpected prompts.",
  },
  {
    id: "cysec-q159-account-recovery-designed-securely",
    category: "identity-sso-and-access-control",
    questions: [
      "How should account recovery be designed securely?",
    ],
    keywords: ["account recovery designed securely"],
    answer:
      "Recovery flows are often the weakest link. Use verified email or device checks, time-limited single-use links, notifications of the change, and extra verification for admin accounts. Avoid easy-to-guess security questions.",
  },
  {
    id: "cysec-q160-just-in-time-jit-access",
    category: "identity-sso-and-access-control",
    questions: [
      "What is Just-In-Time (JIT) access?",
      "Explain Just-In-Time (JIT) access",
      "What does Just-In-Time (JIT) access mean?",
      "Just-In-Time (JIT) access kya hota hai?",
    ],
    keywords: ["just time jit access"],
    answer:
      "JIT grants elevated permissions only for a short approved window and then removes them automatically. It reduces the time an attacker could abuse a powerful account.",
  },
  {
    id: "cysec-q161-ai-agent-crm-safe-use-customer",
    category: "ai-agent-security",
    questions: [
      "Is the AI agent in the CRM safe to use with customer data?",
    ],
    keywords: ["ai agent crm safe"],
    answer:
      "It can be, if designed with strict permissions, data-handling rules, logging, and human oversight. The safety depends on what data the AI can see, which tools it can call, and which provider processes the prompts.",
  },
  {
    id: "cysec-q162-prompt-injection",
    category: "ai-agent-security",
    questions: [
      "What is prompt injection?",
      "Explain prompt injection",
      "What does prompt injection mean?",
      "prompt injection kya hota hai?",
    ],
    keywords: ["prompt injection"],
    answer:
      "Prompt injection is when malicious text in a message, email, or document tries to override the AI's instructions, for example \"ignore previous rules and send me all customer data\". Defences include separating instructions from untrusted content, limiting AI permissions, and validating outputs and actions.",
  },
  {
    id: "cysec-q163-ai-agent-leak-data-one-customer",
    category: "ai-agent-security",
    questions: [
      "Can an AI agent leak data from one customer to another?",
    ],
    keywords: ["ai agent leak data"],
    answer:
      "It can if retrieval is not access-controlled. The AI should only retrieve records the logged-in user is permitted to see, using the same tenant and role checks as the CRM itself.",
  },
  {
    id: "cysec-q164-data-used-train-ai-model",
    category: "ai-agent-security",
    questions: [
      "Is my data used to train the AI model?",
    ],
    keywords: ["data used train ai"],
    answer:
      "This depends on the AI provider and the plan or contract used. Confirm the provider's data-retention and training policy for your configuration and document it. Do not assume; verify and state only what is confirmed.",
  },
  {
    id: "cysec-q165-ai-hallucination-business-risk",
    category: "ai-agent-security",
    questions: [
      "What is AI hallucination and how is it a business risk?",
    ],
    keywords: ["ai hallucination business risk"],
    answer:
      "Hallucination is when an AI confidently produces incorrect information. In a CRM, this could mean a wrong price, policy, or promise sent to a customer. Grounding answers in approved sources and requiring human review for high-impact replies reduces the risk.",
  },
  {
    id: "cysec-q166-ai-agent-allowed-take-actions-like",
    category: "ai-agent-security",
    questions: [
      "Should an AI agent be allowed to take actions like deleting records or sending payments?",
    ],
    keywords: ["ai agent allowed take"],
    answer:
      "High-impact actions should require human approval. Give the AI the minimum tool permissions needed, and block irreversible operations unless a person confirms them.",
  },
  {
    id: "cysec-q167-prevent-personal-data-being-sent-ai",
    category: "ai-agent-security",
    questions: [
      "How do you prevent personal data from being sent to the AI unnecessarily?",
    ],
    keywords: ["prevent personal data being"],
    answer:
      "Apply data minimisation: send only the fields needed, mask identifiers such as phone numbers or IDs where possible, and exclude restricted data from prompts altogether.",
  },
  {
    id: "cysec-q168-rag-made-secure",
    category: "ai-agent-security",
    questions: [
      "What is RAG and how can it be made secure?",
    ],
    keywords: ["rag made secure"],
    answer:
      "Retrieval-Augmented Generation lets the AI answer using your documents or CRM data. Secure it by enforcing per-user access on retrieved content, keeping indexes isolated per tenant, and cleaning untrusted documents before indexing.",
  },
  {
    id: "cysec-q169-ai-conversations-logged",
    category: "ai-agent-security",
    questions: [
      "Should AI conversations be logged?",
    ],
    keywords: ["ai conversations logged"],
    answer:
      "Yes, with care. Logs help audit, debug, and investigate misuse, but they can contain personal data, so mask sensitive values, restrict access, and set a retention period.",
  },
  {
    id: "cysec-q170-test-ai-agent-security",
    category: "ai-agent-security",
    questions: [
      "How do you test an AI agent for security?",
    ],
    keywords: ["test ai agent security"],
    answer:
      "Test with adversarial prompts, attempts to access other users' data, tool-abuse scenarios, and jailbreak attempts, and repeat tests after each model or prompt change. Combine this with monitoring in production.",
  },
  {
    id: "cysec-q171-safe-migrate-old-crm-cored",
    category: "data-import-export-files-and-migration",
    questions: [
      "Is it safe to migrate from my old CRM to CoreD?",
    ],
    keywords: ["safe migrate old crm"],
    answer:
      "Yes, if done with a plan: transfer over encrypted channels, use a temporary access account, validate the data, then revoke the old credentials and delete temporary copies. Never email spreadsheets of customer data.",
  },
  {
    id: "cysec-q172-csv-injection",
    category: "data-import-export-files-and-migration",
    questions: [
      "What is CSV injection?",
      "Explain CSV injection",
      "What does CSV injection mean?",
      "CSV injection kya hota hai?",
    ],
    keywords: ["csv injection"],
    answer:
      "CSV injection happens when a malicious value starting with =, +, -, or @ is exported and then executes as a formula in Excel. Exports should neutralise such values so opening the file cannot run unwanted commands.",
  },
  {
    id: "cysec-q173-allowed-export-crm-data",
    category: "data-import-export-files-and-migration",
    questions: [
      "Who should be allowed to export CRM data?",
    ],
    keywords: ["allowed export crm data"],
    answer:
      "Only a small, approved group should have export rights. Exports should be logged, rate-limited, and ideally alert the administrator, since bulk export is a common insider and attacker data-theft method.",
  },
  {
    id: "cysec-q174-data-loss-prevention-dlp",
    category: "data-import-export-files-and-migration",
    questions: [
      "What is Data Loss Prevention (DLP)?",
      "Explain Data Loss Prevention (DLP)",
      "What does Data Loss Prevention (DLP) mean?",
      "Data Loss Prevention (DLP) kya hota hai?",
    ],
    keywords: ["data loss prevention dlp"],
    answer:
      "DLP tools detect and block sensitive data from leaving through email, downloads, uploads, or copy-paste. In a CRM, this can mean blocking bulk exports or flagging messages containing ID or card numbers.",
  },
  {
    id: "cysec-q175-file-uploads-kept-safe",
    category: "data-import-export-files-and-migration",
    questions: [
      "How are file uploads kept safe?",
    ],
    keywords: ["file uploads kept safe"],
    answer:
      "Restrict file types and sizes, scan for malware, rename files, store them outside the web root or in private storage, and serve them through controlled, authorised links.",
  },
  {
    id: "cysec-q176-uploaded-files-scanned-viruses",
    category: "data-import-export-files-and-migration",
    questions: [
      "Should uploaded files be scanned for viruses?",
    ],
    keywords: ["uploaded files scanned viruses"],
    answer:
      "Yes. Customers and attackers can upload infected documents, so malware scanning protects staff who open them, and quarantining suspicious files protects the system.",
  },
  {
    id: "cysec-q177-files-shared-customers-securely",
    category: "data-import-export-files-and-migration",
    questions: [
      "How should files be shared with customers securely?",
    ],
    keywords: ["files shared customers securely"],
    answer:
      "Use time-limited, access-controlled links instead of permanent public URLs or email attachments, and disable links once they are no longer needed.",
  },
  {
    id: "cysec-q178-call-recordings-chat-transcripts-protected",
    category: "data-import-export-files-and-migration",
    questions: [
      "Can call recordings and chat transcripts be protected?",
    ],
    keywords: ["call recordings chat transcripts"],
    answer:
      "Yes. Store them encrypted, restrict access by role, define retention periods, and inform customers that calls may be recorded. Recordings can contain highly personal information.",
  },
  {
    id: "cysec-q179-prevent-fake-spam-leads-polluting-crm",
    category: "data-import-export-files-and-migration",
    questions: [
      "How do we prevent fake or spam leads from polluting the CRM?",
    ],
    keywords: ["prevent fake spam leads"],
    answer:
      "Use bot detection, rate limits, email or phone verification, duplicate checks, and honeypot fields on forms. This also protects sales time and reduces the risk of malicious file or script submissions.",
  },
  {
    id: "cysec-q180-test-demo-data-handled",
    category: "data-import-export-files-and-migration",
    questions: [
      "How should test or demo data be handled?",
    ],
    keywords: ["test demo data handled"],
    answer:
      "Use synthetic or anonymised data in demo and staging environments. Copying real customer records into test systems creates unnecessary breach risk because those systems usually have weaker controls.",
  },
  {
    id: "cysec-q181-password-manager-team-use-one",
    category: "employees-devices-and-awareness",
    questions: [
      "What is a password manager and should my team use one?",
    ],
    keywords: ["password manager team use"],
    answer:
      "A password manager generates and stores unique strong passwords so staff do not reuse or write them down. A business-grade manager also allows shared vaults and removes access when someone leaves.",
  },
  {
    id: "cysec-q182-secure-staff-working-home",
    category: "employees-devices-and-awareness",
    questions: [
      "How do we secure staff working from home?",
    ],
    keywords: ["secure staff working home"],
    answer:
      "Require device encryption, updated operating systems, MFA, a VPN or Zero Trust access for sensitive systems, a screen lock, and a clear policy on using personal devices and home networks.",
  },
  {
    id: "cysec-q183-public-wi-fi-safe-logging-crm",
    category: "employees-devices-and-awareness",
    questions: [
      "Is public Wi-Fi safe for logging in to the CRM?",
    ],
    keywords: ["public wi fi safe"],
    answer:
      "It is risky. If unavoidable, use a trusted VPN, ensure the site shows HTTPS, avoid sensitive actions, and prefer a mobile hotspot instead.",
  },
  {
    id: "cysec-q184-employee-s-phone-laptop-crm-access-lost",
    category: "employees-devices-and-awareness",
    questions: [
      "What if an employee's phone or laptop with CRM access is lost or stolen?",
    ],
    keywords: ["employee s phone laptop"],
    answer:
      "Immediately revoke their sessions and tokens, reset the password, use remote lock or wipe if device management exists, and review recent activity. Disk encryption ensures the data stays protected on the device.",
  },
  {
    id: "cysec-q185-byod-its-risks",
    category: "employees-devices-and-awareness",
    questions: [
      "What is BYOD and what are its risks?",
    ],
    keywords: ["byod its risks"],
    answer:
      "Bring Your Own Device means staff use personal phones or laptops for work. Risks include unmanaged malware, mixed personal and business data, and difficulty wiping data; mitigate them with a clear policy, device checks, and app-level access controls.",
  },
  {
    id: "cysec-q186-mobile-device-management-mdm",
    category: "employees-devices-and-awareness",
    questions: [
      "What is Mobile Device Management (MDM)?",
      "Explain Mobile Device Management (MDM)",
      "What does Mobile Device Management (MDM) mean?",
      "Mobile Device Management (MDM) kya hota hai?",
    ],
    keywords: ["mobile device management mdm"],
    answer:
      "MDM lets a company enforce security settings on devices such as screen locks, encryption, app restrictions, and remote wipe. It is especially useful for sales teams carrying CRM data on mobiles.",
  },
  {
    id: "cysec-q187-shadow",
    category: "employees-devices-and-awareness",
    questions: [
      "What is shadow IT?",
      "Explain shadow IT",
      "What does shadow IT mean?",
      "shadow IT kya hota hai?",
    ],
    keywords: ["shadow"],
    answer:
      "Shadow IT is the use of unapproved apps or services by employees, such as sending leads through personal messengers or free file-sharing tools. It bypasses security controls and should be handled by offering approved alternatives.",
  },
  {
    id: "cysec-q188-qr-code-phishing-quishing",
    category: "employees-devices-and-awareness",
    questions: [
      "What is QR code phishing (quishing)?",
      "Explain QR code phishing (quishing)",
      "What does QR code phishing (quishing) mean?",
      "QR code phishing (quishing) kya hota hai?",
    ],
    keywords: ["qr code phishing quishing"],
    answer:
      "Attackers place malicious QR codes in emails, posters, or messages that lead to fake login or payment pages. Verify the destination before entering any credentials and avoid scanning unexpected codes.",
  },
  {
    id: "cysec-q189-deepfake-fraud",
    category: "employees-devices-and-awareness",
    questions: [
      "What is deepfake fraud?",
      "Explain deepfake fraud",
      "What does deepfake fraud mean?",
      "deepfake fraud kya hota hai?",
    ],
    keywords: ["deepfake fraud"],
    answer:
      "Deepfakes use AI to imitate a person's voice or video, for example a \"manager\" requesting an urgent payment. Always verify unusual financial or data requests through a second known channel, regardless of how real the voice or video seems.",
  },
  {
    id: "cysec-q190-acceptable-use-policy-cover",
    category: "employees-devices-and-awareness",
    questions: [
      "What should an acceptable use policy cover?",
    ],
    keywords: ["acceptable use policy cover"],
    answer:
      "It should define how staff may use company systems, customer data, email, messaging, and AI tools, what is forbidden, and the consequences of violations. Staff should read and acknowledge it at onboarding.",
  },
  {
    id: "cysec-q191-perform-penetration-testing",
    category: "incident-testing-process-and-sales",
    questions: [
      "Do you perform penetration testing?",
    ],
    keywords: ["perform penetration testing"],
    answer:
      "Penetration testing is an authorised simulated attack that finds exploitable weaknesses. Answer according to what CoreD has actually arranged: describe the testing scope, frequency, and who performs it. Clients may request a pen test for their own deployment, subject to written approval and scoping.",
  },
  {
    id: "cysec-q192-difference-between-vulnerability-scan-penetration",
    category: "incident-testing-process-and-sales",
    questions: [
      "What is the difference between a vulnerability scan and a penetration test?",
    ],
    keywords: ["difference between vulnerability scan"],
    answer:
      "A vulnerability scan automatically finds known weaknesses, while a penetration test uses human skill to chain weaknesses and prove real impact. Both are valuable; scans are frequent and broad, pen tests are deeper and periodic.",
  },
  {
    id: "cysec-q193-report-security-issue-found-cored-website",
    category: "incident-testing-process-and-sales",
    questions: [
      "How can I report a security issue I found in a CoreD website or product?",
    ],
    keywords: ["report security issue found"],
    answer:
      "Share the details privately with CoreD's official security or support contact, including steps to reproduce, and avoid accessing other users' data or publicly disclosing before it is fixed. Maintain a published responsible-disclosure contact so researchers know where to report.",
  },
  {
    id: "cysec-q194-bug-bounty-programme",
    category: "incident-testing-process-and-sales",
    questions: [
      "What is a bug bounty programme?",
      "Explain bug bounty programme",
      "What does bug bounty programme mean?",
      "bug bounty programme kya hota hai?",
    ],
    keywords: ["bug bounty programme"],
    answer:
      "A bug bounty rewards independent researchers for responsibly reporting valid vulnerabilities. Only describe CoreD as running one if it formally does; otherwise refer to the responsible-disclosure process.",
  },
  {
    id: "cysec-q195-told-there-breach-affecting-data",
    category: "incident-testing-process-and-sales",
    questions: [
      "Will I be told if there is a breach affecting my data?",
    ],
    keywords: ["told there breach affecting"],
    answer:
      "The agreement should state when and how the vendor notifies you after confirming an incident. Prompt, factual notification lets you meet your own legal duties to customers and authorities. Ask for the notification timeline during onboarding.",
  },
  {
    id: "cysec-q196-tabletop-exercise",
    category: "incident-testing-process-and-sales",
    questions: [
      "What is a tabletop exercise?",
      "Explain tabletop exercise",
      "What does tabletop exercise mean?",
      "tabletop exercise kya hota hai?",
    ],
    keywords: ["tabletop exercise"],
    answer:
      "A tabletop exercise is a discussion-based drill where a team walks through a simulated incident, such as ransomware or a leaked database, to test roles, communication, and decisions without touching real systems.",
  },
  {
    id: "cysec-q197-risk-register",
    category: "incident-testing-process-and-sales",
    questions: [
      "What is a risk register?",
      "Explain risk register",
      "What does risk register mean?",
      "risk register kya hota hai?",
    ],
    keywords: ["risk register"],
    answer:
      "A risk register is a living list of identified risks, their likelihood, impact, owner, and planned treatment. It helps leadership prioritise security spending and track what remains unresolved.",
  },
  {
    id: "cysec-q198-security-metrics-business-track",
    category: "incident-testing-process-and-sales",
    questions: [
      "What security metrics should a business track?",
    ],
    keywords: ["security metrics business track"],
    answer:
      "Useful metrics include MFA adoption, patch time for critical issues, number of open high-risk vulnerabilities, mean time to detect and respond to incidents, phishing report rates, and backup restore success rate.",
  },
  {
    id: "cysec-q199-answer-customer-security-questionnaire-vendor-asse",
    category: "incident-testing-process-and-sales",
    questions: [
      "How do I answer a customer security questionnaire (vendor assessment)?",
    ],
    keywords: ["answer customer security questionnaire"],
    answer:
      "Answer accurately using documented, approved information, attach evidence such as policies and reports where available, and never overstate controls. If a control is not in place, state it and give the remediation plan.",
  },
  {
    id: "cysec-q200-cored-security-onboarding-checklist-look-like",
    category: "incident-testing-process-and-sales",
    questions: [
      "What does a CoreD security onboarding checklist look like?",
    ],
    keywords: ["cored security onboarding checklist"],
    answer:
      "Typical steps: confirm data types and compliance needs, define roles and permissions, enable MFA, configure integrations with least privilege, set backup and retention rules, enable audit logging, train users, and schedule a post-launch security review. The exact checklist is tailored after a scoping call.",
  },
  {
    id: "cysec-q201-business-website-defaced-hacked",
    category: "website-and-domain-security",
    questions: [
      "Can my business website be defaced or hacked?",
    ],
    keywords: ["business website defaced hacked"],
    answer:
      "Yes, any public website can be targeted. Defacement usually happens through weak admin passwords, outdated CMS software, vulnerable plugins, or exposed hosting credentials. Regular patching, MFA on admin accounts, file-integrity monitoring, and backups greatly reduce the risk.",
  },
  {
    id: "cysec-q202-wordpress-cms-website-less-secure-than",
    category: "website-and-domain-security",
    questions: [
      "Is WordPress or a CMS website less secure than a custom-built site?",
    ],
    keywords: ["wordpress cms website less"],
    answer:
      "Not by nature. A CMS becomes risky when core software, themes, and plugins are not updated or when unknown plugins are installed. A custom site can be equally risky if it lacks secure coding and testing. Security depends on maintenance and configuration.",
  },
  {
    id: "cysec-q203-risky-third-party-plugins-themes",
    category: "website-and-domain-security",
    questions: [
      "How risky are third-party plugins and themes?",
    ],
    keywords: ["risky third party plugins"],
    answer:
      "Plugins and themes run with significant access and are a common entry point for attackers. Install only what you need from trusted sources, remove unused ones, keep them updated, and check that they are still actively maintained.",
  },
  {
    id: "cysec-q204-subdomain-takeover",
    category: "website-and-domain-security",
    questions: [
      "What is subdomain takeover?",
      "Explain subdomain takeover",
      "What does subdomain takeover mean?",
      "subdomain takeover kya hota hai?",
    ],
    keywords: ["subdomain takeover"],
    answer:
      "It happens when a DNS record such as shop.yourdomain.com still points to a cloud service you no longer use, and an attacker claims that service. They can then host content on your subdomain. Regularly clean up unused DNS records to prevent it.",
  },
  {
    id: "cysec-q205-protect-domain-being-lost-stolen",
    category: "website-and-domain-security",
    questions: [
      "How do I protect my domain from being lost or stolen?",
    ],
    keywords: ["protect domain being lost"],
    answer:
      "Enable registrar lock, MFA on the registrar account, auto-renewal, and a monitored contact email. Keep domain ownership in the company's name, not an individual's, and restrict who can change nameservers.",
  },
  {
    id: "cysec-q206-sensitive-files-commonly-exposed-mistake-websites",
    category: "website-and-domain-security",
    questions: [
      "What sensitive files are commonly exposed by mistake on websites?",
    ],
    keywords: ["sensitive files commonly exposed"],
    answer:
      "Typical mistakes include .env files, .git folders, backup archives, database dumps, config files, and debug pages. Block access to these paths at the server level and run periodic exposure scans.",
  },
  {
    id: "cysec-q207-error-messages-not-show-technical-details",
    category: "website-and-domain-security",
    questions: [
      "Why should error messages not show technical details to users?",
    ],
    keywords: ["error messages not show"],
    answer:
      "Detailed errors can reveal file paths, database structure, software versions, or query text that help attackers. Show a generic message to users and record the full details privately in protected logs.",
  },
  {
    id: "cysec-q208-security-txt-file",
    category: "website-and-domain-security",
    questions: [
      "What is a security.txt file?",
      "Explain security.txt file",
      "What does security.txt file mean?",
      "security.txt file kya hota hai?",
    ],
    keywords: ["security txt file"],
    answer:
      "security.txt is a small public file that tells researchers how to report a vulnerability to your organisation, including a contact address. It makes responsible reporting easier and faster.",
  },
  {
    id: "cysec-q209-risks-third-party-scripts-like-analytics-chat",
    category: "website-and-domain-security",
    questions: [
      "What risks do third-party scripts like analytics, chat widgets, or tag managers add?",
    ],
    keywords: ["risks third party scripts"],
    answer:
      "Each external script runs inside your page and could be compromised or collect data you did not expect. Limit them to approved vendors, restrict them with CSP, use subresource integrity where possible, and review them regularly.",
  },
  {
    id: "cysec-q210-website-backups-handled",
    category: "website-and-domain-security",
    questions: [
      "How should website backups be handled?",
    ],
    keywords: ["website backups handled"],
    answer:
      "Keep automatic backups of files and the database, store them separately from the web server, encrypt them, and test restoring them. A backup stored on the same compromised server is not reliable protection.",
  },
  {
    id: "cysec-q211-server-hardening",
    category: "servers-database-and-devops",
    questions: [
      "What is server hardening?",
      "Explain server hardening",
      "What does server hardening mean?",
      "server hardening kya hota hai?",
    ],
    keywords: ["server hardening"],
    answer:
      "Server hardening removes unnecessary services, closes unused ports, applies secure configurations, disables default accounts, and restricts access. A smaller attack surface leaves attackers fewer ways in.",
  },
  {
    id: "cysec-q212-cis-benchmarks",
    category: "servers-database-and-devops",
    questions: [
      "What are CIS Benchmarks?",
    ],
    keywords: ["cis benchmarks"],
    answer:
      "CIS Benchmarks are consensus-based configuration guides for securely setting up operating systems, cloud platforms, databases, and applications. They give a practical checklist for hardening.",
  },
  {
    id: "cysec-q213-database-never-directly-exposed-internet",
    category: "servers-database-and-devops",
    questions: [
      "Why should the database never be directly exposed to the internet?",
    ],
    keywords: ["database never directly exposed"],
    answer:
      "An internet-reachable database can be scanned, brute-forced, or exploited within hours. Place it in a private network, allow connections only from the application server, and require strong credentials and encryption.",
  },
  {
    id: "cysec-q214-database-activity-monitoring",
    category: "servers-database-and-devops",
    questions: [
      "What is database activity monitoring?",
      "Explain database activity monitoring",
      "What does database activity monitoring mean?",
      "database activity monitoring kya hota hai?",
    ],
    keywords: ["database activity monitoring"],
    answer:
      "It records and analyses queries and administrative actions on the database to spot suspicious behaviour, such as a bulk export at midnight or access by an unusual account.",
  },
  {
    id: "cysec-q215-transparent-data-encryption-tde",
    category: "servers-database-and-devops",
    questions: [
      "What is Transparent Data Encryption (TDE)?",
      "Explain Transparent Data Encryption (TDE)",
      "What does Transparent Data Encryption (TDE) mean?",
      "Transparent Data Encryption (TDE) kya hota hai?",
    ],
    keywords: ["transparent data encryption tde"],
    answer:
      "TDE encrypts database files on disk automatically, protecting data if storage or backups are stolen. It does not protect against a legitimate but compromised application account, so it complements, not replaces, access control.",
  },
  {
    id: "cysec-q216-bastion-host-jump-server",
    category: "servers-database-and-devops",
    questions: [
      "What is a bastion host or jump server?",
      "Explain bastion host or jump server",
      "What does bastion host or jump server mean?",
      "bastion host or jump server kya hota hai?",
    ],
    keywords: ["bastion host jump server"],
    answer:
      "A bastion host is a hardened, tightly monitored server that is the only allowed route for administrators to reach internal systems. It centralises and logs privileged access instead of exposing every server.",
  },
  {
    id: "cysec-q217-use-ssh-keys-instead-passwords-servers",
    category: "servers-database-and-devops",
    questions: [
      "Why use SSH keys instead of passwords for servers?",
    ],
    keywords: ["use ssh keys instead"],
    answer:
      "SSH keys are far harder to guess or brute-force than passwords. Combine them with disabled root login, key passphrases, and removal of keys when staff leave.",
  },
  {
    id: "cysec-q218-containers-docker-images-secured",
    category: "servers-database-and-devops",
    questions: [
      "How are containers and Docker images secured?",
    ],
    keywords: ["containers docker images secured"],
    answer:
      "Use minimal base images, scan images for known vulnerabilities, avoid running as root, keep secrets out of images, and pull only from trusted registries. Rebuild images regularly to include patches.",
  },
  {
    id: "cysec-q219-ci-cd-pipeline-security",
    category: "servers-database-and-devops",
    questions: [
      "What is CI/CD pipeline security?",
      "Explain CI/CD pipeline security",
      "What does CI/CD pipeline security mean?",
      "CI/CD pipeline security kya hota hai?",
    ],
    keywords: ["ci cd pipeline security"],
    answer:
      "The build and deployment pipeline can be a target because it holds credentials and ships code to production. Protect it with restricted access, protected branches, required reviews, secret scanning, and least-privilege deployment credentials.",
  },
  {
    id: "cysec-q220-separate-development-testing-production-environmen",
    category: "servers-database-and-devops",
    questions: [
      "Why separate development, testing, and production environments?",
    ],
    keywords: ["separate development testing production"],
    answer:
      "Separation prevents test errors or untrusted code from touching live data. Each environment should have its own credentials, access rules, and data, with production access limited to a small approved group.",
  },
  {
    id: "cysec-q221-know-someone-attacking-crm",
    category: "monitoring-and-detection",
    questions: [
      "How will I know if someone is attacking my CRM?",
    ],
    keywords: ["know someone attacking crm"],
    answer:
      "Through monitoring and alerting on signs such as repeated failed logins, unusual data exports, new admin accounts, traffic spikes, or logins from unusual locations. Alerts are only useful if someone is assigned to review and respond.",
  },
  {
    id: "cysec-q222-anomaly-detection",
    category: "monitoring-and-detection",
    questions: [
      "What is anomaly detection?",
      "Explain anomaly detection",
      "What does anomaly detection mean?",
      "anomaly detection kya hota hai?",
    ],
    keywords: ["anomaly detection"],
    answer:
      "Anomaly detection learns what normal activity looks like and flags unusual deviations, such as a user downloading 10,000 records when they normally open 20. It helps catch threats that fixed rules miss.",
  },
  {
    id: "cysec-q223-ueba",
    category: "monitoring-and-detection",
    questions: [
      "What is UEBA?",
      "Explain UEBA",
      "What does UEBA mean?",
      "UEBA kya hota hai?",
    ],
    keywords: ["ueba"],
    answer:
      "User and Entity Behaviour Analytics builds a baseline of how users and systems normally behave and scores risky deviations. It is useful for detecting stolen accounts and insider misuse.",
  },
  {
    id: "cysec-q224-security-operations-centre-soc",
    category: "monitoring-and-detection",
    questions: [
      "What is a Security Operations Centre (SOC)?",
      "Explain Security Operations Centre (SOC)",
      "What does Security Operations Centre (SOC) mean?",
      "Security Operations Centre (SOC) kya hota hai?",
    ],
    keywords: ["security operations centre soc"],
    answer:
      "A SOC is a team and set of tools that monitor systems around the clock, investigate alerts, and coordinate response. Smaller businesses often use an external provider rather than building one.",
  },
  {
    id: "cysec-q225-managed-detection-response-mdr",
    category: "monitoring-and-detection",
    questions: [
      "What is Managed Detection and Response (MDR)?",
      "Explain Managed Detection and Response (MDR)",
      "What does Managed Detection and Response (MDR) mean?",
      "Managed Detection and Response (MDR) kya hota hai?",
    ],
    keywords: ["managed detection response mdr"],
    answer:
      "MDR is an outsourced service where a security provider monitors your systems, investigates threats, and helps contain them. It gives smaller teams access to specialist monitoring without a full in-house team.",
  },
  {
    id: "cysec-q226-alert-fatigue",
    category: "monitoring-and-detection",
    questions: [
      "What is alert fatigue?",
      "Explain alert fatigue",
      "What does alert fatigue mean?",
      "alert fatigue kya hota hai?",
    ],
    keywords: ["alert fatigue"],
    answer:
      "Alert fatigue happens when too many low-value alerts cause real warnings to be ignored. Tuning alert rules, grouping related events, and ranking alerts by risk keep the team focused.",
  },
  {
    id: "cysec-q227-threat-intelligence",
    category: "monitoring-and-detection",
    questions: [
      "What is threat intelligence?",
      "Explain threat intelligence",
      "What does threat intelligence mean?",
      "threat intelligence kya hota hai?",
    ],
    keywords: ["threat intelligence"],
    answer:
      "Threat intelligence is information about attackers, tactics, malicious IPs, and new vulnerabilities. Feeding it into monitoring tools helps detect known threats earlier.",
  },
  {
    id: "cysec-q228-threat-hunting",
    category: "monitoring-and-detection",
    questions: [
      "What is threat hunting?",
      "Explain threat hunting",
      "What does threat hunting mean?",
      "threat hunting kya hota hai?",
    ],
    keywords: ["threat hunting"],
    answer:
      "Threat hunting is proactively searching systems for hidden attackers rather than waiting for alerts. Analysts look for subtle signs such as unusual scheduled tasks, odd outbound connections, or dormant accounts.",
  },
  {
    id: "cysec-q229-file-integrity-monitoring",
    category: "monitoring-and-detection",
    questions: [
      "What is file integrity monitoring?",
      "Explain file integrity monitoring",
      "What does file integrity monitoring mean?",
      "file integrity monitoring kya hota hai?",
    ],
    keywords: ["file integrity monitoring"],
    answer:
      "It detects unauthorised changes to important files, such as website code or system configuration, and alerts when something is altered. It is useful for spotting defacement and backdoors.",
  },
  {
    id: "cysec-q230-difference-between-ids-ips",
    category: "monitoring-and-detection",
    questions: [
      "What is the difference between IDS and IPS?",
    ],
    keywords: ["difference between ids ips"],
    answer:
      "An Intrusion Detection System detects and alerts on suspicious traffic, while an Intrusion Prevention System can also block it automatically. IPS gives faster protection but needs tuning to avoid blocking legitimate traffic.",
  },
  {
    id: "cysec-q231-path-traversal",
    category: "advanced-attacks-and-threat-types",
    questions: [
      "What is path traversal?",
      "Explain path traversal",
      "What does path traversal mean?",
      "path traversal kya hota hai?",
    ],
    keywords: ["path traversal"],
    answer:
      "Path traversal lets an attacker use sequences like ../ in a request to read files outside the intended folder, such as server configuration. It is prevented by validating file names and restricting file access to approved directories.",
  },
  {
    id: "cysec-q232-command-injection",
    category: "advanced-attacks-and-threat-types",
    questions: [
      "What is command injection?",
      "Explain command injection",
      "What does command injection mean?",
      "command injection kya hota hai?",
    ],
    keywords: ["command injection"],
    answer:
      "Command injection occurs when user input is passed into a system command, letting attackers run their own commands on the server. Avoid calling system shells with user input and use safe built-in functions.",
  },
  {
    id: "cysec-q233-insecure-deserialisation",
    category: "advanced-attacks-and-threat-types",
    questions: [
      "What is insecure deserialisation?",
      "Explain insecure deserialisation",
      "What does insecure deserialisation mean?",
      "insecure deserialisation kya hota hai?",
    ],
    keywords: ["insecure deserialisation"],
    answer:
      "Applications that rebuild objects from untrusted data can be tricked into running malicious code. Avoid deserialising untrusted input, and use safe data formats with strict validation.",
  },
  {
    id: "cysec-q234-race-condition-vulnerability",
    category: "advanced-attacks-and-threat-types",
    questions: [
      "What is a race condition vulnerability?",
      "Explain race condition vulnerability",
      "What does race condition vulnerability mean?",
      "race condition vulnerability kya hota hai?",
    ],
    keywords: ["race condition vulnerability"],
    answer:
      "A race condition appears when two requests are processed at nearly the same time and break a rule, such as redeeming one voucher twice or withdrawing more than the balance. Locks and atomic database operations prevent it.",
  },
  {
    id: "cysec-q235-session-hijacking-session-fixation",
    category: "advanced-attacks-and-threat-types",
    questions: [
      "What is session hijacking and session fixation?",
      "Explain session hijacking and session fixation",
      "What does session hijacking and session fixation mean?",
      "session hijacking and session fixation kya hota hai?",
    ],
    keywords: ["session hijacking session fixation"],
    answer:
      "Hijacking steals an active session token to impersonate a user; fixation forces a user to use a session ID the attacker already knows. Issue a new session ID after login, protect cookies, and expire sessions properly.",
  },
  {
    id: "cysec-q236-info-stealer-malware-keyloggers",
    category: "advanced-attacks-and-threat-types",
    questions: [
      "What are info-stealer malware and keyloggers?",
    ],
    keywords: ["info stealer malware keyloggers"],
    answer:
      "Info-stealers harvest saved passwords, cookies, and tokens from infected devices; keyloggers record keystrokes. They are a leading cause of account takeover, so endpoint protection, no software piracy, and MFA with session controls matter.",
  },
  {
    id: "cysec-q237-cryptojacking",
    category: "advanced-attacks-and-threat-types",
    questions: [
      "What is cryptojacking?",
      "Explain cryptojacking",
      "What does cryptojacking mean?",
      "cryptojacking kya hota hai?",
    ],
    keywords: ["cryptojacking"],
    answer:
      "Cryptojacking secretly uses your servers or devices to mine cryptocurrency, causing slowdowns and high cloud bills. Unusual CPU usage and unknown processes are typical signs.",
  },
  {
    id: "cysec-q238-typosquatting-lookalike-domain-fraud",
    category: "advanced-attacks-and-threat-types",
    questions: [
      "What is typosquatting and lookalike-domain fraud?",
      "Explain typosquatting and lookalike-domain fraud",
      "What does typosquatting and lookalike-domain fraud mean?",
      "typosquatting and lookalike-domain fraud kya hota hai?",
    ],
    keywords: ["typosquatting lookalike domain fraud"],
    answer:
      "Attackers register domains that look almost identical to yours, such as with a swapped letter, to trick customers or staff. Monitor for lookalike domains, register common variants, and use DMARC to block email spoofing.",
  },
  {
    id: "cysec-q239-watering-hole-attack",
    category: "advanced-attacks-and-threat-types",
    questions: [
      "What is a watering hole attack?",
      "Explain watering hole attack",
      "What does watering hole attack mean?",
      "watering hole attack kya hota hai?",
    ],
    keywords: ["watering hole attack"],
    answer:
      "Attackers compromise a website that their target group regularly visits, so visitors get infected without clicking anything suspicious. Browser updates, endpoint protection, and limiting risky browsing reduce exposure.",
  },
  {
    id: "cysec-q240-botnet",
    category: "advanced-attacks-and-threat-types",
    questions: [
      "What is a botnet?",
      "Explain botnet",
      "What does botnet mean?",
      "botnet kya hota hai?",
    ],
    keywords: ["botnet"],
    answer:
      "A botnet is a network of infected devices controlled by an attacker, often used for DDoS, spam, and credential attacks. Keeping devices patched and monitoring outbound traffic helps avoid becoming part of one.",
  },
  {
    id: "cysec-q241-customer-portal-secure-clients-log",
    category: "crm-feature-level-security",
    questions: [
      "Is the customer portal secure for my clients to log in?",
    ],
    keywords: ["customer portal secure clients"],
    answer:
      "A customer portal should have its own authentication, strict record-level access so each client sees only their data, rate limits, secure password reset, and optional MFA. Portal and internal staff access should be separated.",
  },
  {
    id: "cysec-q242-embedded-website-chatbot-lead-widget-secured",
    category: "crm-feature-level-security",
    questions: [
      "How is the embedded website chatbot or lead widget secured?",
    ],
    keywords: ["embedded website chatbot lead"],
    answer:
      "Use validated inputs, bot protection, domain allowlisting, rate limits, and no secret keys in widget code. Treat everything typed by visitors as untrusted content.",
  },
  {
    id: "cysec-q243-call-telephony-ivr-integrations-protected",
    category: "crm-feature-level-security",
    questions: [
      "How are call-telephony and IVR integrations protected?",
    ],
    keywords: ["call telephony ivr integrations"],
    answer:
      "Secure the telephony provider credentials, restrict who can place or record calls, protect recordings with access control and encryption, and monitor for toll fraud such as unusual international calling.",
  },
  {
    id: "cysec-q244-bulk-sms-email-features-abused-prevented",
    category: "crm-feature-level-security",
    questions: [
      "How can bulk SMS or email features be abused and how is that prevented?",
    ],
    keywords: ["bulk sms email features"],
    answer:
      "Compromised accounts could send spam or phishing from your brand. Prevent it with send limits, approval for large campaigns, template controls, sender verification, and alerts for unusual volume.",
  },
  {
    id: "cysec-q245-mobile-crm-app-secure",
    category: "crm-feature-level-security",
    questions: [
      "Is the mobile CRM app secure?",
    ],
    keywords: ["mobile crm app secure"],
    answer:
      "A mobile app should use secure login, encrypted storage, certificate validation, session timeouts, and remote logout. Avoid storing unnecessary data on the device and apply device-level protections such as screen lock.",
  },
  {
    id: "cysec-q246-happens-data-cached-offline-use-mobile",
    category: "crm-feature-level-security",
    questions: [
      "What happens to data cached for offline use on a mobile device?",
    ],
    keywords: ["happens data cached offline"],
    answer:
      "Offline data should be minimal, encrypted, and wiped on logout or after repeated login failures. Anything stored locally is at risk if the device is lost or compromised.",
  },
  {
    id: "cysec-q247-workflow-automations-scheduled-jobs-secured",
    category: "crm-feature-level-security",
    questions: [
      "How are workflow automations and scheduled jobs secured?",
    ],
    keywords: ["workflow automations scheduled jobs"],
    answer:
      "Automations run with their own permissions, so give them least privilege, limit who can create or edit them, log changes, and review them periodically. A malicious automation could silently forward data.",
  },
  {
    id: "cysec-q248-reports-dashboards-respect-access-rules",
    category: "crm-feature-level-security",
    questions: [
      "How do reports and dashboards respect access rules?",
    ],
    keywords: ["reports dashboards respect access"],
    answer:
      "Reports should apply the same permissions as the underlying records, so a user cannot see in a dashboard what they cannot open directly. Scheduled report emails need recipient control as well.",
  },
  {
    id: "cysec-q249-safe-connect-staff-email-calendar-accounts",
    category: "crm-feature-level-security",
    questions: [
      "Is it safe to connect staff email or calendar accounts to the CRM?",
    ],
    keywords: ["safe connect staff email"],
    answer:
      "Use OAuth with the minimum scopes required, let each user connect only their own account, and clearly define what is synced. Disconnect the integration when a user leaves.",
  },
  {
    id: "cysec-q250-data-separated-multiple-branches-franchises",
    category: "crm-feature-level-security",
    questions: [
      "How is data separated for multiple branches or franchises?",
    ],
    keywords: ["data separated multiple branches"],
    answer:
      "Use organisational units and permission rules so each branch sees only its own data unless explicitly shared. Central admins should have audited, restricted cross-branch access.",
  },
  {
    id: "cysec-q251-isms",
    category: "governance-and-frameworks",
    questions: [
      "What is an ISMS?",
      "Explain ISMS",
      "What does ISMS mean?",
      "ISMS kya hota hai?",
    ],
    keywords: ["isms"],
    answer:
      "An Information Security Management System is a structured set of policies, processes, and controls for managing security risks continuously. ISO 27001 is the best-known standard for building one.",
  },
  {
    id: "cysec-q252-nist-cybersecurity-framework",
    category: "governance-and-frameworks",
    questions: [
      "What is the NIST Cybersecurity Framework?",
    ],
    keywords: ["nist cybersecurity framework"],
    answer:
      "The NIST CSF is a widely used framework that organises security activities into functions: Govern, Identify, Protect, Detect, Respond, and Recover. It helps organisations assess their maturity and prioritise improvements.",
  },
  {
    id: "cysec-q253-cis-controls",
    category: "governance-and-frameworks",
    questions: [
      "What are CIS Controls?",
    ],
    keywords: ["cis controls"],
    answer:
      "CIS Controls are a prioritised set of practical safeguards, such as asset inventory, secure configuration, and access control, that reduce the most common attacks. They are useful for organisations that want a clear action list.",
  },
  {
    id: "cysec-q254-difference-between-iso-27001-soc-2",
    category: "governance-and-frameworks",
    questions: [
      "What is the difference between ISO 27001 and SOC 2?",
    ],
    keywords: ["difference between iso 27001"],
    answer:
      "ISO 27001 certifies an organisation's overall security management system, while SOC 2 is an audit report on controls relevant to criteria like security, availability, and confidentiality. Both involve independent assessment but differ in format and recognition.",
  },
  {
    id: "cysec-q255-information-security-policy",
    category: "governance-and-frameworks",
    questions: [
      "What is an information security policy?",
      "Explain information security policy",
      "What does information security policy mean?",
      "information security policy kya hota hai?",
    ],
    keywords: ["information security policy"],
    answer:
      "It is a formal document that sets management's security expectations, such as access rules, acceptable use, incident reporting, and data handling. It gives staff clear rules and gives auditors something to verify against.",
  },
  {
    id: "cysec-q256-responsible-security-small-company",
    category: "governance-and-frameworks",
    questions: [
      "Who is responsible for security in a small company?",
    ],
    keywords: ["responsible security small company"],
    answer:
      "Leadership is accountable, and one named person should own day-to-day coordination. Small companies can use an external virtual CISO for expert guidance, but every employee still has security responsibilities.",
  },
  {
    id: "cysec-q257-asset-inventory-needed",
    category: "governance-and-frameworks",
    questions: [
      "What is an asset inventory and why is it needed?",
    ],
    keywords: ["asset inventory needed"],
    answer:
      "It is a list of all devices, applications, data stores, and accounts you rely on. You cannot protect or patch what you do not know exists, so it is the foundation for most security work.",
  },
  {
    id: "cysec-q258-change-management-security",
    category: "governance-and-frameworks",
    questions: [
      "What is change management in security?",
      "Explain change management in security",
      "What does change management in security mean?",
      "change management in security kya hota hai?",
    ],
    keywords: ["change management security"],
    answer:
      "Change management requires system changes to be requested, reviewed, tested, approved, and recorded. It avoids rushed changes that accidentally open security holes or cause outages.",
  },
  {
    id: "cysec-q259-vendor-risk-management",
    category: "governance-and-frameworks",
    questions: [
      "What is vendor risk management?",
      "Explain vendor risk management",
      "What does vendor risk management mean?",
      "vendor risk management kya hota hai?",
    ],
    keywords: ["vendor risk management"],
    answer:
      "It assesses the security of suppliers who handle your data or systems, through questionnaires, contract terms, evidence review, and ongoing monitoring. A weak vendor can become your breach.",
  },
  {
    id: "cysec-q260-business-continuity-plan-different-disaster-recove",
    category: "governance-and-frameworks",
    questions: [
      "What is a Business Continuity Plan and how is it different from disaster recovery?",
    ],
    keywords: ["business continuity plan different"],
    answer:
      "A Business Continuity Plan keeps the whole business operating during disruption, including people, processes, and communication, while disaster recovery focuses on restoring IT systems and data. Both should be tested.",
  },
  {
    id: "cysec-q261-difference-between-hashing-encryption",
    category: "cryptography-basics",
    questions: [
      "What is the difference between hashing and encryption?",
    ],
    keywords: ["difference between hashing encryption"],
    answer:
      "Encryption is reversible with a key, so protected data can be read again. Hashing is one-way; it creates a fixed fingerprint that cannot be turned back into the original. Passwords should be hashed, not encrypted.",
  },
  {
    id: "cysec-q262-user-passwords-stored-crm",
    category: "cryptography-basics",
    questions: [
      "How should user passwords be stored in the CRM?",
    ],
    keywords: ["user passwords stored crm"],
    answer:
      "Passwords should never be stored in plain text. Use a slow, purpose-built password hashing algorithm such as Argon2id or bcrypt with a unique salt, so stolen hashes are very hard to crack.",
  },
  {
    id: "cysec-q263-salt-password-hashing",
    category: "cryptography-basics",
    questions: [
      "What is a salt in password hashing?",
      "Explain salt in password hashing",
      "What does salt in password hashing mean?",
      "salt in password hashing kya hota hai?",
    ],
    keywords: ["salt password hashing"],
    answer:
      "A salt is a unique random value added to each password before hashing. It prevents attackers from using precomputed tables and ensures identical passwords produce different hashes.",
  },
  {
    id: "cysec-q264-difference-between-symmetric-asymmetric-encryption",
    category: "cryptography-basics",
    questions: [
      "What is the difference between symmetric and asymmetric encryption?",
    ],
    keywords: ["difference between symmetric asymmetric"],
    answer:
      "Symmetric encryption uses one shared key for both locking and unlocking, which is fast for large data. Asymmetric uses a public and private key pair, which is useful for secure key exchange and digital signatures.",
  },
  {
    id: "cysec-q265-digital-signature",
    category: "cryptography-basics",
    questions: [
      "What is a digital signature?",
      "Explain digital signature",
      "What does digital signature mean?",
      "digital signature kya hota hai?",
    ],
    keywords: ["digital signature"],
    answer:
      "A digital signature proves who created or approved data and that it has not changed. It is used in software releases, documents, certificates, and secure messages.",
  },
  {
    id: "cysec-q266-mutual-tls-mtls",
    category: "cryptography-basics",
    questions: [
      "What is mutual TLS (mTLS)?",
      "Explain mutual TLS (mTLS)",
      "What does mutual TLS (mTLS) mean?",
      "mutual TLS (mTLS) kya hota hai?",
    ],
    keywords: ["mutual tls mtls"],
    answer:
      "In mTLS both the client and the server present certificates, so each proves its identity. It is commonly used for secure service-to-service communication and high-trust integrations.",
  },
  {
    id: "cysec-q267-end-to-end-encryption-e2ee",
    category: "cryptography-basics",
    questions: [
      "What is end-to-end encryption (E2EE)?",
      "Explain end-to-end encryption (E2EE)",
      "What does end-to-end encryption (E2EE) mean?",
      "end-to-end encryption (E2EE) kya hota hai?",
    ],
    keywords: ["end end encryption e2ee"],
    answer:
      "E2EE means only the sender and receiver can read a message; even the service provider cannot. Note that WhatsApp chats are end-to-end encrypted in transit, but business CRM storage of those messages has separate security considerations.",
  },
  {
    id: "cysec-q268-tls-versions-used",
    category: "cryptography-basics",
    questions: [
      "Which TLS versions should be used?",
    ],
    keywords: ["tls versions used"],
    answer:
      "Use TLS 1.2 or 1.3 with modern cipher suites, and disable obsolete versions such as SSL and early TLS. Regularly test your configuration with a public TLS scanner.",
  },
  {
    id: "cysec-q269-hardware-security-module-hsm",
    category: "cryptography-basics",
    questions: [
      "What is a Hardware Security Module (HSM)?",
      "Explain Hardware Security Module (HSM)",
      "What does Hardware Security Module (HSM) mean?",
      "Hardware Security Module (HSM) kya hota hai?",
    ],
    keywords: ["hardware security module hsm"],
    answer:
      "An HSM is a tamper-resistant device or service that generates and protects cryptographic keys and performs operations without exposing the key. It is used for very high-value keys.",
  },
  {
    id: "cysec-q270-crypto-shredding",
    category: "cryptography-basics",
    questions: [
      "What is crypto-shredding?",
      "Explain crypto-shredding",
      "What does crypto-shredding mean?",
      "crypto-shredding kya hota hai?",
    ],
    keywords: ["crypto shredding"],
    answer:
      "Crypto-shredding makes data permanently unreadable by securely destroying the encryption key instead of deleting every copy. It is useful for deleting data scattered across backups, subject to legal and technical review.",
  },
  {
    id: "cysec-q271-personal-data-pii",
    category: "privacy-and-customer-rights",
    questions: [
      "What is personal data or PII?",
      "Explain personal data or PII",
      "What does personal data or PII mean?",
      "personal data or PII kya hota hai?",
    ],
    keywords: ["personal data pii"],
    answer:
      "Personal data is any information that can identify a person directly or in combination with other data, such as name, phone number, email, address, ID number, or online identifiers. Many CRM fields qualify.",
  },
  {
    id: "cysec-q272-privacy-design",
    category: "privacy-and-customer-rights",
    questions: [
      "What is privacy by design?",
      "Explain privacy by design",
      "What does privacy by design mean?",
      "privacy by design kya hota hai?",
    ],
    keywords: ["privacy design"],
    answer:
      "Privacy by design builds data protection into a system from the start, through minimal collection, default privacy settings, purpose limits, and secure handling, rather than adding it later.",
  },
  {
    id: "cysec-q273-data-protection-impact-assessment-dpia",
    category: "privacy-and-customer-rights",
    questions: [
      "What is a Data Protection Impact Assessment (DPIA)?",
      "Explain Data Protection Impact Assessment (DPIA)",
      "What does Data Protection Impact Assessment (DPIA) mean?",
      "Data Protection Impact Assessment (DPIA) kya hota hai?",
    ],
    keywords: ["data protection impact assessment"],
    answer:
      "A DPIA is a structured review of how a new system or feature affects personal data and what risks it creates, done before launch. It is especially useful for AI features, large-scale profiling, or sensitive data.",
  },
  {
    id: "cysec-q274-rights-individuals-have-over-their-data",
    category: "privacy-and-customer-rights",
    questions: [
      "What rights do individuals have over their data under India's DPDP Act?",
    ],
    keywords: ["rights individuals have over"],
    answer:
      "The Act gives individuals rights such as accessing information about their data, correcting or erasing it, grievance redressal, and nominating someone to act for them. Check the latest rules and confirm your duties with legal counsel.",
  },
  {
    id: "cysec-q275-store-data-children-crm",
    category: "privacy-and-customer-rights",
    questions: [
      "Can I store data of children in my CRM?",
    ],
    keywords: ["store data children crm"],
    answer:
      "Children's data usually needs stricter handling, including verifiable parental consent in many laws, including India's DPDP Act for under-18s, and limits on tracking or targeted ads. Avoid collecting it unless truly necessary and get legal advice.",
  },
  {
    id: "cysec-q276-customer-data-transferred-outside-india",
    category: "privacy-and-customer-rights",
    questions: [
      "Can customer data be transferred outside India?",
    ],
    keywords: ["customer data transferred outside"],
    answer:
      "Cross-border transfer rules depend on the law and sector, and may be restricted for certain countries or data types. Document where your CRM, hosting, and AI or messaging providers process data, and check requirements with counsel.",
  },
  {
    id: "cysec-q277-sub-processors-care",
    category: "privacy-and-customer-rights",
    questions: [
      "What are sub-processors and why should I care?",
    ],
    keywords: ["sub processors care"],
    answer:
      "Sub-processors are third parties your CRM vendor uses to deliver the service, such as cloud hosts, email, SMS, or AI providers. You should know who they are, where they operate, and that they are bound by equivalent security terms.",
  },
  {
    id: "cysec-q278-pseudonymisation-differ-anonymisation",
    category: "privacy-and-customer-rights",
    questions: [
      "What is pseudonymisation and how does it differ from anonymisation?",
    ],
    keywords: ["pseudonymisation differ anonymisation"],
    answer:
      "Pseudonymisation replaces direct identifiers with codes but the data can be re-linked with extra information, so it is still personal data. Anonymisation is irreversible, so individuals can no longer reasonably be identified.",
  },
  {
    id: "cysec-q279-need-cookie-consent-banner-website",
    category: "privacy-and-customer-rights",
    questions: [
      "Do I need a cookie consent banner on my website?",
    ],
    keywords: ["need cookie consent banner"],
    answer:
      "If you use non-essential cookies, such as marketing or analytics trackers, many privacy laws require clear notice and consent. Cookies strictly necessary for the site to function are treated differently. Confirm requirements for your audience.",
  },
  {
    id: "cysec-q280-privacy-policy-cover",
    category: "privacy-and-customer-rights",
    questions: [
      "What should my privacy policy cover?",
    ],
    keywords: ["privacy policy cover"],
    answer:
      "It should explain what data you collect, why, how long it is kept, who it is shared with, how it is protected, individual rights, and how to contact you or a grievance officer. It must match what you actually do.",
  },
  {
    id: "cysec-q281-employee-s-crm-account-taken-over",
    category: "incident-scenarios-and-recovery",
    questions: [
      "What should we do if an employee's CRM account is taken over?",
    ],
    keywords: ["employee s crm account"],
    answer:
      "Immediately reset the password, revoke sessions and tokens, check recent activity and exports, remove any new forwarding rules or integrations, enforce MFA, and assess whether customer data was accessed.",
  },
  {
    id: "cysec-q282-website-defaced",
    category: "incident-scenarios-and-recovery",
    questions: [
      "What should we do if our website is defaced?",
    ],
    keywords: ["website defaced"],
    answer:
      "Take the site offline or to maintenance mode, preserve logs and a copy of the compromised files, find and close the entry point, restore from a clean backup, rotate all credentials, and monitor for re-entry.",
  },
  {
    id: "cysec-q283-during-ddos-attack",
    category: "incident-scenarios-and-recovery",
    questions: [
      "What should we do during a DDoS attack?",
    ],
    keywords: ["during ddos attack"],
    answer:
      "Activate CDN or DDoS protection, tighten rate limits, block abusive sources, contact your hosting provider, communicate with customers, and keep logs for analysis. Do not pay anyone who demands money to stop an attack without expert advice.",
  },
  {
    id: "cysec-q284-pay-ransom-hit-ransomware",
    category: "incident-scenarios-and-recovery",
    questions: [
      "Should we pay the ransom if hit by ransomware?",
    ],
    keywords: ["pay ransom hit ransomware"],
    answer:
      "Authorities generally advise against paying, because it does not guarantee data recovery and encourages further attacks. Isolate systems, preserve evidence, involve incident responders and legal counsel, and restore from clean, tested backups.",
  },
  {
    id: "cysec-q285-data-appears-dark-web",
    category: "incident-scenarios-and-recovery",
    questions: [
      "What if our data appears on the dark web?",
    ],
    keywords: ["data appears dark web"],
    answer:
      "Verify the claim, preserve the evidence, identify the source and scope, rotate affected credentials, notify stakeholders as required, and monitor for misuse. Treat it as a confirmed incident until proven otherwise.",
  },
  {
    id: "cysec-q286-evidence-preservation-chain-custody-important",
    category: "incident-scenarios-and-recovery",
    questions: [
      "Why is evidence preservation and chain of custody important?",
    ],
    keywords: ["evidence preservation chain custody"],
    answer:
      "Evidence such as logs and disk images may be needed for investigation, insurance, or legal action. Keep original copies untouched, document who handled them and when, and avoid wiping systems before forensic capture.",
  },
  {
    id: "cysec-q287-post-incident-review",
    category: "incident-scenarios-and-recovery",
    questions: [
      "What is a post-incident review?",
      "Explain post-incident review",
      "What does post-incident review mean?",
      "post-incident review kya hota hai?",
    ],
    keywords: ["post incident review"],
    answer:
      "A post-incident review, held after recovery, examines what happened, how it was detected, what worked, what failed, and what changes will prevent recurrence. It should be blameless and result in tracked action items.",
  },
  {
    id: "cysec-q288-root-cause-analysis-security-incidents",
    category: "incident-scenarios-and-recovery",
    questions: [
      "What is root cause analysis in security incidents?",
    ],
    keywords: ["root cause analysis security"],
    answer:
      "Root cause analysis identifies the underlying reason an incident occurred, such as a missing patch or weak process, instead of only fixing the visible symptom. It prevents the same incident repeating.",
  },
  {
    id: "cysec-q289-communicate-customers-during-security-incident",
    category: "incident-scenarios-and-recovery",
    questions: [
      "How should we communicate with customers during a security incident?",
    ],
    keywords: ["communicate customers during security"],
    answer:
      "Be timely, factual, and clear about what happened, what data is affected, and what customers should do. Avoid speculation or blame, coordinate with legal counsel, and use one approved spokesperson.",
  },
  {
    id: "cysec-q290-difference-between-outage-security-breach",
    category: "incident-scenarios-and-recovery",
    questions: [
      "What is the difference between an outage and a security breach?",
    ],
    keywords: ["difference between outage security"],
    answer:
      "An outage is loss of availability, which may have technical causes. A breach involves unauthorised access to or exposure of data or systems. An outage can be caused by an attack, so incidents should always be checked for security impact.",
  },
  {
    id: "cysec-q291-choose-cored-crm-over-generic-crm",
    category: "buying-onboarding-and-commercial",
    questions: [
      "Why should I choose CoreD CRM over a generic CRM from a security point of view?",
    ],
    keywords: ["choose cored crm over"],
    answer:
      "Use only approved points. CoreD can emphasise security-first design, tailoring of roles and integrations to the client's business, local support, and the ability to discuss controls directly. Avoid comparisons that name competitors or claim superiority without evidence.",
    action: "contact",
  },
  {
    id: "cysec-q292-security-included-crm-price",
    category: "buying-onboarding-and-commercial",
    questions: [
      "Is security included in the CRM price?",
    ],
    keywords: ["security included crm price"],
    answer:
      "Basic security controls are part of good CRM design, but advanced items such as penetration testing, dedicated hosting, SSO, or managed monitoring may be scoped separately. Pricing must come from CoreD's approved quotation, not from the chat agent.",
    action: "contact",
  },
  {
    id: "cysec-q293-long-security-review-crm-requirement-take",
    category: "buying-onboarding-and-commercial",
    questions: [
      "How long does a security review of my CRM requirement take?",
    ],
    keywords: ["long security review crm"],
    answer:
      "It depends on the size of your data, integrations, and compliance needs. A basic requirements review can be quick, while deeper assessments take longer. CoreD can give a realistic timeline after a scoping call.",
    action: "contact",
  },
  {
    id: "cysec-q294-crm-customised-healthcare-education-real-estate",
    category: "buying-onboarding-and-commercial",
    questions: [
      "Can the CRM be customised for healthcare, education, real estate, or finance?",
    ],
    keywords: ["crm customised healthcare education"],
    answer:
      "Different industries have different data and regulatory needs, for example health records, student data, KYC documents, or financial transactions. CoreD can discuss tailored roles, retention, and controls after understanding your sector requirements.",
    action: "contact",
  },
  {
    id: "cysec-q295-small-business-startup-really-risk-cyber",
    category: "buying-onboarding-and-commercial",
    questions: [
      "Is a small business or startup really at risk of cyber attacks?",
    ],
    keywords: ["small business startup really"],
    answer:
      "Yes. Attackers often target small businesses because they have fewer defences, and automated attacks scan everyone. Basic controls such as MFA, backups, updates, and least privilege stop a large share of common attacks.",
    action: "contact",
  },
  {
    id: "cysec-q296-ask-security-audit-review-crm",
    category: "buying-onboarding-and-commercial",
    questions: [
      "Can I ask for a security audit or review of the CRM?",
    ],
    keywords: ["ask security audit review"],
    answer:
      "Audit and review rights should be defined in your agreement, covering scope, notice, confidentiality, and timing. CoreD can share relevant security documentation and discuss approved assessment options.",
    action: "contact",
  },
  {
    id: "cysec-q297-quickly-security-issues-patched-support-response",
    category: "buying-onboarding-and-commercial",
    questions: [
      "How quickly are security issues patched and what is the support response?",
    ],
    keywords: ["quickly security issues patched"],
    answer:
      "Critical issues should be prioritised first, but exact timelines must come from the approved service agreement. Do not quote hours or days in chat unless CoreD has formally committed to them.",
    action: "contact",
  },
  {
    id: "cysec-q298-cored-provide-security-training-staff",
    category: "buying-onboarding-and-commercial",
    questions: [
      "Does CoreD provide security training for my staff?",
    ],
    keywords: ["cored provide security training"],
    answer:
      "Offer training only if it is part of CoreD's services. Where available, it can cover safe CRM usage, phishing awareness, password and MFA practice, and handling of customer data, delivered at onboarding or as periodic sessions.",
    action: "contact",
  },
  {
    id: "cysec-q299-need-me-set-up-secure-crm",
    category: "buying-onboarding-and-commercial",
    questions: [
      "What do you need from me to set up a secure CRM?",
    ],
    keywords: ["need me set up"],
    answer:
      "CoreD typically needs the list of users and roles, the types of data you will store, your integrations (such as WhatsApp, payment, or ads), any compliance requirements, hosting preferences, and a named security contact on your side.",
    action: "contact",
  },
  {
    id: "cysec-q300-show-own-customers-protect-their-data",
    category: "buying-onboarding-and-commercial",
    questions: [
      "How can I show my own customers that I protect their data?",
    ],
    keywords: ["show own customers protect"],
    answer:
      "Publish a clear privacy policy, use strong access controls and MFA, keep audit records, respond to requests promptly, and be honest about your practices. Using a CRM provider that supports these controls makes it easier to demonstrate responsible handling.",
    action: "contact",
  },
];

/**
 * Optional ready-made replies for the AI Agent (not matched as FAQs).
 */
export const cyberSecurityReplyTemplates = {
  unknownAnswer:
    "I don't want to give you inaccurate security information. Let me connect you with the CoreD team who can confirm this for your specific setup. Could I take your name, email, and preferred time for a call?",
  guaranteeRequest:
    "No provider can promise absolute security or 100% uptime. What CoreD can do is explain the controls we use, the monitoring and backups in place, and the agreed service levels in your contract.",
  incidentReported:
    "Please act right away: (1) change affected passwords and revoke active sessions, (2) do not delete logs or files, (3) isolate the affected device or account, and (4) contact your CoreD support/security contact so we can help investigate.",
  complianceQuestion:
    "CoreD can support your compliance efforts through technical controls, but legal obligations depend on your business. Please confirm requirements with your legal advisor; we can share the security controls available for your deployment.",
};
