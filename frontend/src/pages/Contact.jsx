import { Fragment, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { RevealWords } from "../components/ui/WordReveal.jsx";
import { SERVICES, addOns, basicAgents, formatPrice, getServicePlans, securityServices, standardAgents } from "../components/services/servicesData.js";
import { allowedModuleIds, supportsCrmModules } from "../components/services/crmModules.js";
import QuoteModules from "../components/services/QuoteModules.jsx";
import { quoteSelection } from "../components/lib/quoteSelection.js";
import { budgetCurrencies, generalEmail, phoneCountries, supportEmail } from "../data/contactOptions.js";
import { formspreeEndpoint, submitEnquiry } from "../components/lib/submitEnquiry.js";
import { useTurnstile, contactProtection, turnstileRequired } from "../components/lib/useTurnstile.js";
import { trackEnquiry } from "../components/lib/analytics.js";

const formspreeFormId = import.meta.env.VITE_FORMSPREE_FORM_ID;
const contactConfigured = Boolean(formspreeEndpoint(formspreeFormId));


export default function Contact() {
  const [params] = useSearchParams();
  return <ContactEnquiry key={params.toString()} params={params} />;
}


function ContactEnquiry({ params }) {
  const initialService = SERVICES.find(({ id }) => id === params.get("service"));
  const initialPlan = getServicePlans(initialService).find(({ id }) => id === params.get("plan"));
  const [serviceId, setService] = useState(initialService?.id ?? "");
  const [planId, setPlan] = useState(initialPlan?.id ?? "");
  const [moduleIds, setModules] = useState(() => allowedModuleIds(initialService?.id, params.getAll("module")));
  const [countryId, setCountry] = useState("IN-91");
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const inFlight = useRef(false);
  const request = useRef({ id: "", signature: "" });
  const turnstile = useTurnstile();
  const service = SERVICES.find(({ id }) => id === serviceId);
  const plan = getServicePlans(service).find(({ id }) => id === planId);
  const needsQuote = plan?.basis === "quote";
  const customScope = needsQuote || moduleIds.length > 0;
  const phoneCountry = phoneCountries.find(({ id }) => id === countryId);
  const requestedScope = serviceId === initialService?.id && planId === initialPlan?.id
    ? securityServices.find(({ id, planId: targetPlan }) => serviceId === "cybersecurity" && id === params.get("scope") && targetPlan === plan?.id)?.name ?? "" : "";

  async function submit(event) {
    event.preventDefault();
    if (inFlight.current || status?.type === "success") return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const value = (name) => String(fields.get(name) ?? "").trim();
    const fail = (message) => setStatus({ type: "error", message });
    if (!contactConfigured) return fail("The enquiry form is not connected yet. Please email CoreD.");
    if (value("Website")) return fail("This request could not be verified.");
    if (turnstileRequired && !turnstile.token) return fail("Complete security verification or email CoreD.");
    const localPhone = value("NationalNumber").replace(/[\s()-]/g, "");
    const fullPhone = phoneCountry ? "+" + phoneCountry.dial + localPhone : "";
    if (!/^\+\d{7,15}$/.test(fullPhone)) return fail("Choose your country code and enter a valid phone number without the country prefix.");
    let selection;
    try {
      selection = quoteSelection({ serviceId, planId, fields, scopeId: requestedScope ? params.get("scope") : "" });
    } catch (error) { return fail(error.message); }
    const signature = JSON.stringify([...fields.entries()].filter(([name]) => name != "cf-turnstile-response").concat([["ServiceId", serviceId], ["PlanId", planId]]));
    if (request.current.signature !== signature) request.current = { id: crypto.randomUUID(), signature };
    const body = new URLSearchParams({
      RequestId: request.current.id, FullName: value("FullName"), CompanyName: value("CompanyName"),
      CompanyEmail: value("CompanyEmail"), ContactNumber: fullPhone,
      CountryCode: phoneCountry?.code ?? "", DialCode: "+" + (phoneCountry?.dial ?? ""),
      ...selection, ProjectDescription: value("ProjectDescription"),
      TermsAccepted: value("TermsAccepted"), PrivacyAccepted: value("PrivacyAccepted"),
    });
    inFlight.current = true;
    setSubmitting(true);
    setStatus(null);
    try {
      await submitEnquiry({ formId: formspreeFormId, fields: body, token: turnstile.token, protection: contactProtection, signal: AbortSignal.timeout(25000) });
      setStatus({ type: "success", message: "We received your enquiry. CoreD will review your selected plan and reply by email." });
      try { trackEnquiry(serviceId, planId); } catch { /* Optional tracking must not affect confirmed delivery. */ }
    } catch (error) { fail(error.message); }
    finally { inFlight.current = false; setSubmitting(false); turnstile.reset(); }
  }

  return (
    <div className="cd-shell contact-page">
      <header className="page-intro"><h1><RevealWords>Reach Us Out</RevealWords></h1><p>Tell us what you need. Your selected service and plan are included in the enquiry.</p></header>
      <div className="contact-layout">
        <aside>
          <h2>Talk through your project</h2>
          <p>Share your current tools, the workflow you want to improve and any deadline. For security work, include asset types and counts.</p>
          <p>General enquiries</p><a className="cd-text-link" href={"mailto:" + generalEmail}>{generalEmail}</a>
          <p>Existing project support</p><a className="cd-text-link" href={"mailto:" + supportEmail}>{supportEmail}</a>
          <Link className="cd-button cd-button--on-dark mt-4" to="/services#quotation-section">Compare services <ArrowUpRight size={17} /></Link>
        </aside>
        <form id="project-enquiry" className="contact-form quote-form" onSubmit={submit}>
          <h2>Project enquiry</h2>
          {status?.type === "success" ? <p className="quote-feedback" role="status">{status.message}</p> : <>
            <fieldset className="quote-fields" disabled={submitting}>
              <label className="contact-honeypot" aria-hidden="true">Website<input name="Website" tabIndex={-1} autoComplete="off" /></label>
              <label>Your name<input name="FullName" required autoComplete="name" maxLength={100} /></label>
              <label>Company<input name="CompanyName" required autoComplete="organization" maxLength={140} /></label>
              <label className="quote-wide">Work email<input name="CompanyEmail" type="email" required autoComplete="email" maxLength={160} /></label>
              <label>Phone country code<select name="PhoneCountry" value={countryId} onChange={(event) => setCountry(event.target.value)} autoComplete="country">
                {phoneCountries.map((item) => <option key={item.id} value={item.id}>{item.name} (+{item.dial})</option>)}
              </select></label>
              <label>Phone number<input name="NationalNumber" type="tel" required autoComplete="tel-national" maxLength={20} placeholder="Number without the country code" /></label>
              <label>Service<select aria-label="Service" value={serviceId} onChange={(event) => { setService(event.target.value); setPlan(""); setModules([]); }}>
                <option value="">Help me choose</option>{SERVICES.map(({ id, label }) => <option key={id} value={id}>{label}</option>)}
              </select></label>
              <label>Plan<select aria-label="Plan" value={planId} onChange={(event) => { setPlan(event.target.value); setModules([]); }} disabled={!service}>
                <option value="">Help me choose</option>{getServicePlans(service).map((item) => <option key={item.id} value={item.id}>{item.tier} · {item.name} · {formatPrice(item)}</option>)}
              </select></label>
              {plan && <p className="quote-choice quote-wide"><strong>{plan.tier} · {plan.name}</strong><span>{formatPrice(plan)}{plan.amount != null ? " USD" : ""}{needsQuote ? " · price confirmed after scope review" : moduleIds.length ? " · package price; custom modules by quote" : " · proposed setup scope"}</span></p>}
              {service && <p className="quote-wide text-sm leading-6 text-[#555]">{service.prompt}</p>}
              {requestedScope && <p className="quote-wide muted">Requested service: {requestedScope}</p>}
              {customScope && <Fragment key={serviceId + planId + "-quote-scope"}>
                <p className="quote-wide rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6"><strong>By quote means we price your agreed scope.</strong> {needsQuote ? "Share the systems, volume and timing below if you know them." : "The listed package price covers its stated scope. Your selected custom modules need a separate quote."} Your budget is a preference, not a confirmed price. We send a written scope and price before work starts.</p>
                <label>{needsQuote ? "Budget amount" : "Budget amount for custom modules"} <span>(optional)</span><input name="BudgetAmount" type="number" min="0.01" step="any" inputMode="decimal" placeholder="Your budget" /></label>
                <label>Budget currency<select name="BudgetCurrency" defaultValue="USD">{budgetCurrencies.map(({ code, name }) => <option key={code} value={code}>{code} · {name}</option>)}</select></label>
                <label className="quote-wide">{serviceId === "cybersecurity" ? "Assets and test scope" : "Users, agents and workflows"} <span>(optional)</span><input name="RequestedVolume" maxLength={300} placeholder={serviceId === "cybersecurity" ? "Example: one web app, two named hostnames, ten devices" : "Example: five users, two agents, one sales workflow"} /></label>
                <label className="quote-wide">Target timeline <span>(optional)</span><input name="TargetTimeline" maxLength={120} placeholder="Your preferred deadline or test window" /></label>
              </Fragment>}
              {customScope && <Fragment key={serviceId + planId + "-systems"}>
                <label className="quote-wide">Current CRM, systems or platforms <span>(optional)</span><input name="CurrentSystems" maxLength={300} placeholder="The tools your team already uses" /></label>
                <label className="quote-wide">Integrations you need <span>(optional)</span><input name="RequestedIntegrations" maxLength={300} placeholder="Example: CRM, calendar, WhatsApp or finance system" /></label>
              </Fragment>}
              {plan?.choices?.includes("basic") && <label className="quote-wide">Choose your Basic option<select key={planId + "-basic"} name="BasicAgent" required defaultValue=""><option value="" disabled>Select one Basic option</option>{basicAgents.map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select></label>}
              {plan?.choices?.includes("standard") && <label className="quote-wide">Choose your Standard option<select key={planId + "-standard"} name="StandardAgent" required defaultValue=""><option value="" disabled>Select one Standard option</option>{standardAgents.map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select></label>}
              <label className="quote-wide">What do you need?<textarea name="ProjectDescription" required rows={5} maxLength={5000} /></label>
            </fieldset>
            {supportsCrmModules(serviceId) && <QuoteModules selected={moduleIds} onChange={setModules} disabled={submitting} />}
            {service && <fieldset className="quote-addons" disabled={submitting}>
              <legend>Optional add-ons · priced separately</legend>
              {service.addOns.map((id) => <label key={id}><input key={serviceId + id} type="checkbox" name="AddOnIds" value={id} />{addOns[id]}</label>)}
            </fieldset>}
            <div className="contact-agreements">
              <div className="contact-agreement"><input id="contact-terms" type="checkbox" name="TermsAccepted" value="yes" required aria-labelledby="contact-terms-text" /><p id="contact-terms-text"><label htmlFor="contact-terms">I accept the</label>{" "}<a href="/termsCondition" target="_blank" rel="noopener">Terms &amp; Conditions<span className="sr-only"> (opens in a new tab)</span></a>.</p></div>
              <div className="contact-agreement"><input id="contact-privacy" type="checkbox" name="PrivacyAccepted" value="yes" required aria-labelledby="contact-privacy-text" /><p id="contact-privacy-text"><label htmlFor="contact-privacy">I’ve read the</label>{" "}<a href="/privacyPolicy" target="_blank" rel="noopener">Privacy Policy<span className="sr-only"> (opens in a new tab)</span></a>.</p></div>
            </div>
            <p className="text-sm leading-6 text-ink/75">Submitting an enquiry does not place an order or authorize a payment. See the <a href="/pricingPolicy" className="cd-text-link" target="_blank" rel="noopener">Pricing Policy<span className="sr-only"> (opens in a new tab)</span></a> before accepting a quote.</p>
            <div className="contact-verification"><div ref={turnstile.container} />{turnstile.message && <p className="muted" role="status">{turnstile.message}</p>}</div>
            {status && <p className="quote-feedback quote-feedback--error" role="alert">{status.message}</p>}
            {!contactConfigured && <p className="muted" role="status">The enquiry form is being connected. Please email CoreD for now.</p>}
            <button className="cd-button cd-button--primary" type="submit" disabled={submitting || (turnstileRequired && !turnstile.token) || !contactConfigured}>{submitting ? "Sending enquiry…" : "Send enquiry"}</button>
          </>}
        </form>
      </div>
    </div>
  );
}
