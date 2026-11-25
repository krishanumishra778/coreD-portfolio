// Privacy-policy wording for builds whose enquiries go to CoreD's CRM instead of Formspree.
// Pure and exact-match: a test fails if the base copy changes and a replacement no longer applies.
const REPLACEMENTS = [
  ["Formspree receives and stores contact, quotation and assistant registration submissions in its hosted dashboard. It may send a notification to CoreD’s configured enquiry inbox, where authorized staff review and reply. The submission includes the details listed in this notice and a request identifier for reference. The forms use Cloudflare Turnstile, Formspree’s spam filtering and a hidden honeypot field. Formspree and the email provider process the enquiry under their respective privacy terms.",
   "CoreD receives contact, quotation and assistant registration submissions directly in its own customer-relationship system (CRM), hosted on CoreD’s hosting account at crm.coredhristi.com. Authorized CoreD staff review and reply to them there, and the CRM may send a notification to CoreD’s configured enquiry inbox. The submission includes the details listed in this notice, your consent choices and a request identifier for reference. It is linked to a contact record for your email address so that related requests can be handled together. The forms use Cloudflare Turnstile, server-side validation, rate limits and a hidden honeypot field. CoreD’s hosting provider and email provider process the enquiry under their respective privacy terms."],
  ["are sent to CoreD through Formspree so the team can follow up", "are saved in CoreD’s CRM so the team can follow up"],
  ["sends its verification token to Formspree for validation", "sends its verification token to CoreD’s CRM server, which validates it with Cloudflare"],
  ["Hosting, Formspree, Google and Cloudflare", "Hosting, CoreD’s CRM host, Google and Cloudflare"],
  ["contact enquiries stored by Formspree and CoreD’s email provider", "contact enquiries stored in CoreD’s CRM and email provider"],
];

export function privacyForCrm(sections) {
  return sections.map((section) => ({
    ...section,
    paragraphs: section.paragraphs.map((text) => REPLACEMENTS.reduce((out, [from, to]) => out.replace(from, to), text)),
  }));
}
export const privacyReplacementCount = REPLACEMENTS.length;
