import LegalPage from "./LegalPage.jsx";
import { privacyPolicy } from "../data/PortfolioData.js";

export default function PrivacyNotice() {
  return <LegalPage title="Privacy Policy" introduction="What we collect on this site, why we use it and who handles it."
    sections={privacyPolicy} related={{ path: "/termsCondition", label: "Terms & Conditions" }} />;
}
