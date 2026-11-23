import { RevealWords } from "../components/ui/WordReveal.jsx";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ServiceHero from "../components/services/ServiceHero.jsx";
import ServiceTabs from "../components/services/ServiceTabs.jsx";
import QuotationCards from "../components/services/QuotationCards.jsx";
import ServiceGuide from "../components/services/ServiceGuide.jsx";
import CrmAddOns from "../components/services/CrmAddOns.jsx";
import { SERVICES, formatPrice, getServicePlans, leadForgeSupport, quoteLink, securityServices } from "../components/services/servicesData.js";

export default function Services({ serviceId }) {
  const [params] = useSearchParams();
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const active = SERVICES.find(({ id }) => id === (serviceId || params.get("service"))) ?? SERVICES[0];
  const activeIndex = SERVICES.indexOf(active);
  const security = SERVICES.find(({ id }) => id === "cybersecurity");
  const changeService = (id) => {
    const next = new URLSearchParams(params);
    if (serviceId || id === SERVICES[0].id) next.delete("service"); else next.set("service", id);
    navigate({ pathname: serviceId ? `/services/${id}` : pathname, search: next.toString(), hash }, { replace: true, preventScrollReset: true });
  };

  return (
    <>
      <header className="classic-services-intro mx-auto mb-8 max-w-2xl px-4 text-center sm:mb-9">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-black/[0.035] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.13em] text-[#6B6B6B]"><span className="h-1.5 w-1.5 rounded-full bg-[#FF9100]" />CoreD · Services &amp; Pricing</span>
        <h1 className="text-[34px] font-bold leading-[1.08] tracking-[-0.04em] text-[#14161A] sm:text-[42px] lg:text-[48px]"><RevealWords>{serviceId ? active.label + " · Services & Pricing" : "Services & Pricing"}</RevealWords></h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#6B6B6B] sm:text-base sm:leading-7">{serviceId ? active.intro : "Choose AI help for your team or security for your systems. Compare what you get, what it costs and what stays in your control."}</p>
        <div className="cd-actions mt-5 justify-center">
          <a className="cd-button cd-button--primary" href="#quotation-section">Compare plans</a>
          <a className="cd-button cd-button--line" href="#cybersecurity">Cybersecurity <ArrowUpRight size={16} /></a>
        </div>
      </header>

      {!serviceId && <section className="cd-shell service-directory" aria-labelledby="service-directory-title">
        <h2 id="service-directory-title">Which service do you need?</h2>
        <p>Read the scope and pricing for each service. CoreD is the services division of CoreDhristi LLP.</p>
        <ul>{SERVICES.map((service) => <li key={service.id}>
          <h3><Link to={`/services/${service.id}`}>{service.label} <ArrowUpRight size={16} aria-hidden="true" /></Link></h3>
          <p>{service.intro}</p>
        </li>)}</ul>
      </section>}

      <section id="quotation-section" className="mx-auto w-full max-w-[1280px] px-4 pb-16 sm:px-6 lg:px-8" aria-labelledby="pricing-title">
        <div className="mx-auto mb-6 max-w-2xl px-2 text-center">
          <h2 id="pricing-title" className="text-2xl font-bold tracking-tight text-[#14161a] sm:text-3xl">Services &amp; pricing</h2>
          <p className="mt-2 text-sm leading-6 text-[#5c616b]">Choose a service to see its proposed USD pricing. Fixed prices cover the listed scope. Starting prices are confirmed in writing after review.</p>
        </div>
        <ServiceTabs services={SERVICES} activeId={active.id} onChange={changeService} />
        <div role="tabpanel" id="service-content" aria-labelledby={`service-tab-${active.id}`}>
          <ul className="mb-6 grid grid-cols-2 gap-2 rounded-2xl border border-black/10 bg-white px-3 py-2 md:flex md:flex-wrap md:justify-center" aria-label="Prices at a glance">
            {getServicePlans(active).map((pkg) => (
              <li key={pkg.id} className="min-w-0 md:flex-1">
                <a className="block rounded-xl px-3 py-2 text-sm hover:bg-amber-50" href={'#plan-' + pkg.id}>
                  <span className="block text-xs font-semibold text-[#5c616b]">{pkg.tier}</span><span className="block">{pkg.name}</span>
                  <strong>{formatPrice(pkg)}{pkg.amount !== null ? " USD" : ""}</strong>
                </a>
              </li>
            ))}
          </ul>
          <ServiceGuide service={active} />
          <div id="plan-cards" tabIndex={-1}>
            <QuotationCards service={active} />
          </div>
          {active.standalonePlans && <section className="mt-10" aria-labelledby="standalone-pricing-title">
            <h3 id="standalone-pricing-title" className="mb-3 text-2xl font-bold tracking-tight text-[#14161a]">Need one service? Start here.</h3>
            <p className="mb-5 max-w-3xl text-sm leading-6 text-[#555]">These starting prices cover the listed standalone scope. They are not prices for the full VA/PT or repair packages above.</p>
            <QuotationCards service={active} plans={active.standalonePlans} />
          </section>}
          <CrmAddOns service={active} />
          <div className="mt-12"><ServiceHero service={active} activeIndex={activeIndex} serviceCount={SERVICES.length}
            onPrevious={() => changeService(SERVICES[(activeIndex - 1 + SERVICES.length) % SERVICES.length].id)}
            onNext={() => changeService(SERVICES[(activeIndex + 1) % SERVICES.length].id)}  /></div>
        </div>
        <div className="cost-notes">
          <div><h3>One-time work</h3><p>Setup, agreed tests and handover, or the review described in your plan.</p></div>
          <div><h3>Optional support</h3><p>{leadForgeSupport}. Your quote states the hours, coverage and response window.</p></div>
          <div><h3>Provider charges</h3><p>CRM seats, lead data, messages, model usage, inboxes, voice, hosting, licenses and applicable taxes are listed separately.</p></div>
        </div>
        <p className="mt-4 text-center text-sm leading-6 text-[#5c616b]">Read the <Link className="cd-text-link" to="/pricingPolicy">Pricing Policy</Link> for currency, taxes, payment stages and refunds.</p>
        <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-black/10 bg-white p-5 sm:p-7">
          <h3 className="text-lg font-bold">What happens after you request a quote?</h3>
          <ol className="mt-4 grid list-decimal gap-4 pl-5 text-sm leading-6 text-[#5c616b] md:grid-cols-3 md:gap-7">
            <li>Choose a plan or Custom. Include your current systems, your goal and the add-ons you need.</li>
            <li>The Reach Us Out form preselects your plan. We check fit, permissions, budget and who will own the work.</li>
            <li>Your written quote lists the scope, dates, one-time and recurring charges, and how to accept the work.</li>
          </ol>
        </div>
      </section>

      <section className="cd-band" aria-labelledby="crm-types">
        <div className="cd-shell cd-section">
          <div className="classic-section-lead"><h2 id="crm-types">Three ways to automate a CRM</h2><p>We check your current CRM plan, API access, fields and data volume before proposing a change. You may be able to keep the tools your team already uses.</p></div>
          <dl className="definition-list">
            <div><dt>Automation CRM</dt><dd>Rules handle predictable steps, such as assigning an enquiry or scheduling a reminder.</dd></div>
            <div><dt>Agent-based CRM</dt><dd>An agent uses approved information to do a defined task, such as reviewing lead fit or drafting a reply for staff.</dd></div>
            <div><dt>Multi-agent CRM</dt><dd>Several roles handle separate steps. Each has its own permissions, stop rules and handoff.</dd></div>
          </dl>
          <div className="service-detail">
            <div><h3>WhatsApp and email</h3><p>Connect an approved business number for WhatsApp and use opted-in contacts and approved templates where required. For email, set up an approved sender and domain authentication. Map replies to the CRM and suppress duplicates before sending.</p><p>Stop follow-ups after a reply, booking, opt-out or staff takeover. One channel is included in the base LeadForge X scope; additional channels and provider charges are separate.</p></div>
            <div><h3>What we can quote separately</h3><p>Booking and voice, extra CRM integrations, migration, dashboards, staff training and workflows across teams. Invoice and payment reminders use balances verified in the finance system; we check ERP and payment access before quoting.</p></div>
          </div>
        </div>
      </section>

      <section id="cybersecurity" className="cd-shell cd-section" aria-labelledby="security-title">
        <div className="classic-section-lead">
          <h2 id="security-title">Cybersecurity</h2>
          <p>Get a clear record of what needs attention, what was fixed and what to check next. We test only authorized assets under a written scope approved by their owner.</p>
        </div>
        <div className="security-list">
          {securityServices.map(({ id, name, detail, planId }) => {
            const pkg = getServicePlans(security).find(({ id }) => id === planId);
            return <article key={name}><div><h3>{name}</h3><p>{detail}</p></div><div className="security-quote">
              <span>{formatPrice(pkg)}{pkg.amount != null ? " USD" : ""}</span>
              <Link to={quoteLink(security, pkg, id)} className="cd-button cd-button--primary" aria-label={"Request quote: " + name}>Request quote <ArrowUpRight size={16} aria-hidden="true" /></Link>
            </div></article>;
          })}
        </div>
        <p className="service-footnote">Need a custom antivirus tool? We first assess supported devices, maintenance and feasibility. Defensive AI tools for alerts or reporting are scoped separately under AI Cybersecurity Consulting.</p>
        <Link className="cd-button cd-button--line mt-4" to="/faq">Read the service and quote FAQ <ArrowUpRight size={16} /></Link>
      </section>

    </>
  );
}
