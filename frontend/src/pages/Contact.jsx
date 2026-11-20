import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { RevealWords } from "../components/ui/WordReveal.jsx";
import { SERVICES, addOns, basicAgents, formatPrice, getServicePlans, securityServices, standardAgents } from "../components/services/servicesData.js";
import { budgetCurrencies, generalEmail, phoneCountries, supportEmail } from "../data/contactOptions.js";
import { formspreeEndpoint, submitEnquiry } from "../components/lib/submitEnquiry.js";
import { trackEnquiry } from "../components/lib/analytics.js";

const formspreeFormId = import.meta.env.VITE_FORMSPREE_FORM_ID;
const contactConfigured = Boolean(formspreeEndpoint(formspreeFormId));
const contactProtection = import.meta.env.VITE_CONTACT_SPAM_PROTECTION === "formshield" ? "formshield" : "turnstile";
const turnstileRequired = contactProtection === "turnstile";
const turnstileKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
const turnstileScript = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

export default function Contact() {
  const [params] = useSearchParams();
  return <ContactEnquiry key={params.toString()} params={params} />;
}

function useTurnstile() {
  const container = useRef(null);
  const widget = useRef(null);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState(!turnstileRequired ? "" : turnstileKey ? "Loading verification…" : "Verification isn’t configured here. You can email CoreD instead.");

  useEffect(() => {
    if (!turnstileRequired || !turnstileKey) return;
    let disposed = false;
    const render = () => {
      if (disposed || !container.current || !window.turnstile || widget.current != null) return;
      try {
        widget.current = window.turnstile.render(container.current, {
          sitekey: turnstileKey, theme: "light", size: "flexible",
          callback: (value) => { setToken(value); setMessage(""); },
          "expired-callback": () => { setToken(""); setMessage("Verification expired. Please verify again."); },
          "error-callback": () => { setToken(""); setMessage("Verification failed. Please try again or email CoreD."); },
          "timeout-callback": () => { setToken(""); setMessage("Verification timed out. Please try again."); },
        });
        setMessage("");
      } catch { setMessage("Verification could not load. Please refresh or email CoreD."); }
    };
    const error = () => { if (!disposed) setMessage("Verification could not load. Please refresh or email CoreD."); };
    let script = document.querySelector("script[data-cored-turnstile]");
    if (window.turnstile) render();
    else {
      const addScript = !script;
      if (!script) {
        script = document.createElement("script");
        script.src = turnstileScript;
        script.async = true;
        script.dataset.coredTurnstile = "true";
      }
      script.addEventListener("load", render);
      script.addEventListener("error", error);
      if (addScript) document.head.append(script);
    }
    return () => {
      disposed = true;
      script?.removeEventListener("load", render);
      script?.removeEventListener("error", error);
      if (widget.current != null) window.turnstile?.remove(widget.current);
      widget.current = null;
    };
  }, []);

  function reset() {
    setToken("");
    if (widget.current != null) window.turnstile?.reset(widget.current);
  }
  return { container, token, message, reset };
}

function ContactEnquiry({ params }) {
  const initialService = SERVICES.find(({ id }) => id === params.get("service"));
  const initialPlan = getServicePlans(initialService).find(({ id }) => id === params.get("plan"));
  const [serviceId, setService] = useState(initialService?.id ?? "");
  const [planId, setPlan] = useState(initialPlan?.id ?? "");
  const [countryId, setCountry] = useState("IN-91");
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const inFlight = useRef(false);
  const request = useRef({ id: "", signature: "" });
  const turnstile = useTurnstile();
  const service = SERVICES.find(({ id }) => id === serviceId);
  const plan = getServicePlans(service).find(({ id }) => id === planId);
  const custom = plan?.tier === "Custom";
  const phoneCountry = phoneCountries.find(({ id }) => id === countryId);
  const requestedScope = serviceId === initialService?.id && planId === initialPlan?.id
    ? securityServices.find(({ id }) => id === params.get("scope"))?.name ?? "" : "";

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
    const budget = custom ? value("BudgetAmount") : "";
    const currency = custom ? value("BudgetCurrency") : "";
    if (budget && (!Number.isFinite(Number(budget)) || Number(budget) <= 0 || !budgetCurrencies.some(({ code }) => code === currency))) {
      return fail("Enter a positive budget and choose its currency.");
    }
    const selectedAddOns = fields.getAll("AddOnIds").filter((id) => service?.addOns.includes(id));
    const basicAgent = basicAgents.find(([id]) => id === value("BasicAgent"));
    const standardAgent = standardAgents.find(([id]) => id === value("StandardAgent"));
    const signature = JSON.stringify([...fields.entries()].filter(([name]) => name != "cf-turnstile-response").concat([["ServiceId", serviceId], ["PlanId", planId]]));
    if (request.current.signature !== signature) request.current = { id: crypto.randomUUID(), signature };
    const body = new URLSearchParams({
      RequestId: request.current.id, FullName: value("FullName"), CompanyName: value("CompanyName"),
      CompanyEmail: value("CompanyEmail"), ContactNumber: fullPhone,
      CountryCode: phoneCountry?.code ?? "", DialCode: "+" + (phoneCountry?.dial ?? ""),
      ServiceId: service?.id ?? "", ServiceSelection: service?.label ?? "Help me choose",
      PlanId: plan?.id ?? "", ChooseYourPlan: plan?.name ?? "Help me choose",
      DisplayedPrice: plan ? formatPrice(plan) : "Not selected", PriceBasis: plan?.basis ?? "",
      PriceAmount: plan?.amount == null ? "" : String(plan.amount), Currency: "USD", PricingStatus: "proposed",
      BudgetRange: budget ? budget + " " + currency : "Not provided", BudgetAmount: budget, BudgetCurrency: currency,
      AddOnIds: selectedAddOns.join(","), AddOns: selectedAddOns.map((id) => addOns[id]).join("; "),
      BasicAgent: basicAgent?.[1] ?? "", StandardAgent: standardAgent?.[1] ?? "",
      RequestedScope: requestedScope, ProjectDescription: value("ProjectDescription"),
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
              <label>Service<select aria-label="Service" value={serviceId} onChange={(event) => { setService(event.target.value); setPlan(""); }}>
                <option value="">Help me choose</option>{SERVICES.map(({ id, label }) => <option key={id} value={id}>{label}</option>)}
              </select></label>
              <label>Plan<select aria-label="Plan" value={planId} onChange={(event) => { setPlan(event.target.value); }} disabled={!service}>
                <option value="">Help me choose</option>{getServicePlans(service).map((item) => <option key={item.id} value={item.id}>{item.tier} · {item.name} · {formatPrice(item)}</option>)}
              </select></label>
              {plan && <p className="quote-choice quote-wide"><strong>{plan.tier} · {plan.name}</strong><span>{formatPrice(plan)}{plan.amount != null ? " USD" : ""} · proposed setup scope</span></p>}
              {requestedScope && <p className="quote-wide muted">Requested service: {requestedScope}</p>}
              {custom && <>
                <label>Budget amount <span>(optional)</span><input name="BudgetAmount" type="number" min="0.01" step="any" inputMode="decimal" placeholder="Your budget" /></label>
                <label>Budget currency<select name="BudgetCurrency" defaultValue="USD">{budgetCurrencies.map(({ code, name }) => <option key={code} value={code}>{code} · {name}</option>)}</select></label>
              </>}
              {plan?.choices?.includes("basic") && <label className="quote-wide">Choose your Basic option<select key={planId + "-basic"} name="BasicAgent" required defaultValue=""><option value="" disabled>Select one Basic option</option>{basicAgents.map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select></label>}
              {plan?.choices?.includes("standard") && <label className="quote-wide">Choose your Standard option<select key={planId + "-standard"} name="StandardAgent" required defaultValue=""><option value="" disabled>Select one Standard option</option>{standardAgents.map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select></label>}
              <label className="quote-wide">What do you need?<textarea name="ProjectDescription" required rows={5} maxLength={5000} /></label>
            </fieldset>
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
