// Shared by Services & Pricing and the enquiry form. These are custom-scope options.
export const crmAddOnGroups = [
  { id: "sales-support", title: "Sales & customer support", items: [
    { id: "lead-qualification", name: "AI Lead Qualification Agent", detail: "Reviews lead details against agreed criteria and records the result in the CRM." },
    { id: "customer-support", name: "AI Customer Support Assistant", detail: "Drafts answers from approved support content and routes exceptions to staff." },
    { id: "sales-review", name: "AI Sales Conversation Coaching Assistant", detail: "Reviews approved conversation records and drafts feedback for your sales team. This is AI-assisted review, not a human coaching service." },
  ] },
  { id: "operations", title: "Operations", items: [
    { id: "operations-intake", name: "AI Operations Intake Agent", detail: "Collects request details, checks missing fields and creates an agreed task or CRM record." },
    { id: "project-status", name: "AI Project Status Assistant", detail: "Summarizes approved project updates and flags overdue work for the owner." },
    { id: "inventory", name: "AI Inventory Assistant", detail: "Reads the connected stock records and flags agreed exceptions for review." },
  ] },
  { id: "finance", title: "Finance administration", items: [
    { id: "supplier-invoices", name: "AI Supplier Invoice Processing Assistant", detail: "Extracts fields from supplied invoices and prepares records for staff review." },
    { id: "payment-reminders", name: "Payment Reminder Automation", detail: "Uses balances verified in the finance system to prepare or send approved reminders. It does not move money." },
    { id: "reconciliation", name: "AI Reconciliation Assistant", detail: "Suggests matches between approved finance records and flags differences for a person to check." },
  ] },
  { id: "hr-management", title: "HR & management", items: [
    { id: "employee-policy", name: "AI Employee Policy Assistant", detail: "Answers employee questions using approved policies and routes requests to HR." },
    { id: "employee-onboarding", name: "Employee Onboarding Automation", detail: "Tracks an agreed checklist and reminds the named HR owner about missing steps." },
    { id: "management-briefing", name: "AI Management Briefing Assistant", detail: "Summarizes agreed business reports and links managers to the source records. Managers make the decisions." },
    { id: "approval-routing", name: "Approval Routing Automation", detail: "Sends requests to authorized approvers, reminds them and records their response." },
  ] },
  { id: "meetings", title: "Meetings & follow-up", items: [
    { id: "meeting-capture", name: "AI Meeting Capture Agent", detail: "Joins a supported meeting as a visible bot and creates a transcript, with the required permission and participant consent." },
    { id: "mom-creation", name: "AI MOM Creation Assistant", detail: "Turns an approved transcript into Minutes of Meeting (MOM): decisions, actions, owners and deadlines for staff to review before sharing." },
    { id: "meeting-crm", name: "Meeting-to-CRM Automation", detail: "Saves approved meeting notes and creates agreed follow-up tasks in the compatible CRM." },
  ] },
];

export const crmModules = crmAddOnGroups.flatMap(({ items }) => items);
export const supportsCrmModules = (serviceId) => ["ai-powered-crm", "ai-agents"].includes(serviceId);
export function allowedModuleIds(serviceId, ids) {
  if (!supportsCrmModules(serviceId)) return [];
  const selected = new Set(ids);
  return crmModules.filter(({ id }) => selected.has(id)).map(({ id }) => id);
}
