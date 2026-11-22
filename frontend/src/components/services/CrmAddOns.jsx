import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SERVICES, quoteLink } from "./servicesData.js";
import { crmAddOnGroups } from "./serviceGuides.js";

export default function CrmAddOns({ service }) {
  if (!["ai-powered-crm", "ai-agents"].includes(service.id)) return null;
  const crm = SERVICES.find(({ id }) => id === "ai-powered-crm");
  const customPlan = crm.plans.find(({ id }) => id === "custom-crm");

  return (
    <section className="mt-10" aria-labelledby="crm-addons-title">
      <h3 id="crm-addons-title" className="text-2xl font-bold tracking-tight text-[#14161a]">Add AI help to the CRM your team already uses</h3>
      <p className="mt-3 max-w-4xl text-sm leading-6 text-[#555]">Choose one role or connect several across departments. These are custom integration options, not a list of agents included in every plan. We check your CRM, data access and tools before confirming what can be connected.</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {crmAddOnGroups.map(({ title, items }) => <article key={title} className="min-w-0 rounded-3xl border border-black/10 bg-white p-5 sm:p-6">
          <h4 className="text-lg font-bold text-[#14161a]">{title}</h4>
          <ul className="mt-4 space-y-4 text-sm leading-6 text-[#555]">
            {items.map(([name, detail]) => <li key={name}><strong className="block text-[#14161a]">{name}</strong>{detail}</li>)}
          </ul>
        </article>)}
        <article className="min-w-0 rounded-3xl border border-black/10 bg-[#f3efe8] p-5 sm:p-6">
          <h4 className="text-lg font-bold text-[#14161a]">How add-on pricing works</h4>
          <p className="mt-3 text-sm leading-6 text-[#555]">Custom roles and department bundles are priced by quote. The quote lists each role, integration, record volume, approval step and provider cost. A finance-only workflow has a different scope from a CRM spanning several teams.</p>
          <p className="mt-3 text-sm leading-6 text-[#555]">Work already included in your package is charged once. Meeting capture and MOM creation can be scoped together without charging the same work twice. Software licences, model calls, transcription, voice minutes and optional support are separate.</p>
          <Link className="cd-button cd-button--primary mt-5" to={quoteLink(crm, customPlan)}>Scope my CRM add-ons <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </article>
      </div>
    </section>
  );
}
