import LegalPage from "./LegalPage.jsx";
import { privacyPolicy } from "../data/PortfolioData.js";
import { privacyForCrm } from "../data/privacyCrm.js";
import { crmIntakeUrl } from "../components/lib/crmConfig.js";

const sections = crmIntakeUrl ? privacyForCrm(privacyPolicy) : privacyPolicy;

export default function PrivacyNotice() {
  return <LegalPage title="Privacy Policy" introduction="What we collect on this site, why we use it and who handles it."
    sections={sections} related={{ path: "/termsCondition", label: "Terms & Conditions" }} />;
}
