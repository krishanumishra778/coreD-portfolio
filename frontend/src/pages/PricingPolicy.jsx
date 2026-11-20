import { Link } from "react-router-dom";
import LegalPage from "./LegalPage.jsx";
import { SERVICES, formatPrice, getServicePlans, leadForgeSupport } from "../components/services/servicesData.js";
import { legalDraftDate, legalDraftNotice, paymentMilestones, pricingPolicySections } from "../data/legalPolicies.js";

export default function PricingPolicy() {
  return (
    <LegalPage title="Pricing Policy" introduction="What CoreD prices include, how quotes and payments work, and how cancellations and refunds are handled."
      preparedOn={legalDraftDate} reviewNotice={legalDraftNotice} sections={pricingPolicySections}
      related={[{ path: "/termsCondition", label: "Terms & Conditions" }, { path: "/privacyPolicy", label: "Privacy Policy" }]}>
      <section className="mb-10" aria-labelledby="policy-payment-title">
        <h2 id="policy-payment-title" className="text-xl font-bold text-ink">Project payment schedule</h2>
        <ol className="mt-4 grid gap-4 sm:grid-cols-3">{paymentMilestones.map(({ percent, stage, detail }) => (
          <li key={percent} className="rounded-xl border border-black/10 bg-white p-4"><p className="text-2xl font-bold text-ink">{percent}%</p><h3 className="mt-2 font-bold text-ink">{stage}</h3><p className="mt-2 text-sm leading-6 text-ink/75">{detail}</p></li>
        ))}</ol>
        <p className="mt-4 text-sm leading-7 text-ink/75">CoreD is a services division of CoreDhristi LLP · LLPIN ADC-9115. GST registration is not yet in place, so the LLP does not currently charge GST.</p>
      </section>
      <section className="mb-12" aria-labelledby="policy-prices-title">
        <h2 id="policy-prices-title" className="text-xl font-bold text-ink">Current proposed plan prices</h2>
        <p className="mt-3 text-sm leading-7 text-ink/75">USD · one-time setup or review for the listed scope. Applicable taxes, selected add-ons, provider usage and optional support are separate unless included in your written quote.</p>
        <div className="mt-6 grid items-start gap-6 md:grid-cols-2">
          {SERVICES.map((service) => (
            <table key={service.id} className="w-full table-fixed border-collapse text-left text-sm leading-6 text-ink/80">
              <caption className="mb-2 text-left text-base font-bold text-ink">{service.label}</caption>
              <thead><tr className="border-b border-black/15"><th scope="col" className="w-2/3 py-2 pr-3 font-semibold">Plan</th><th scope="col" className="py-2 font-semibold">Proposed price</th></tr></thead>
              <tbody>{getServicePlans(service).map((plan) => (
                <tr key={plan.id} className="border-b border-black/10 align-top"><th scope="row" className="break-words py-3 pr-3 font-normal">{plan.name}</th><td className="py-3">{formatPrice(plan)}{plan.amount !== null ? " USD" : ""}</td></tr>
              ))}</tbody>
            </table>
          ))}
        </div>
        <p className="mt-6 text-sm leading-7 text-ink/75">LeadForge X: {leadForgeSupport}. Coverage and renewal terms are agreed separately.</p>
        <Link to="/services#quotation-section" className="cd-text-link mt-4 inline-flex">Compare plan inclusions and request a quote</Link>
      </section>
    </LegalPage>
  );
}
