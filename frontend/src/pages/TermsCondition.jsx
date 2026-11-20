import LegalPage from "./LegalPage.jsx";
import { legalDraftDate, legalDraftNotice, termsSections } from "../data/legalPolicies.js";

export default function TermsCondition() {
  return <LegalPage title="Terms & Conditions" introduction="How CoreD enquiries, written agreements and AI, automation and cybersecurity services work."
    preparedOn={legalDraftDate} reviewNotice={legalDraftNotice} sections={termsSections}
    related={[{ path: "/pricingPolicy", label: "Pricing Policy" }, { path: "/privacyPolicy", label: "Privacy Policy" }]} />;
}
