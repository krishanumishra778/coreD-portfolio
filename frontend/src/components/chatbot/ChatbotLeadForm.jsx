import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { phoneCountries, generalEmail } from "../../data/contactOptions.js";
import { formspreeEndpoint } from "../lib/submitEnquiry.js";
import { submitChatLead } from "../lib/chatLead.js";
import { crmIntakeUrl } from "../lib/crmConfig.js";
import { publicAsset } from "../lib/publicAsset.js";
import { useTurnstile, contactProtection, turnstileRequired } from "../lib/useTurnstile.js";
import "./ChatbotLeadForm.css";

const formId = import.meta.env.VITE_FORMSPREE_FORM_ID;

export default function ChatbotLeadForm({ onComplete, onClose }) {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const firstInput = useRef(null);
  const inFlight = useRef(false);
  const requestId = useRef("");
  const verification = useTurnstile();

  useEffect(() => { firstInput.current?.focus({ preventScroll: true }); }, []);

  async function submit(event) {
    event.preventDefault();
    if (inFlight.current) return;
    const fields = new FormData(event.currentTarget);
    inFlight.current = true;
    setSending(true);
    setError("");
    requestId.current ||= crypto.randomUUID();
    try {
      await submitChatLead({ fields, requestId: requestId.current, formId,
        token: verification.token, protection: contactProtection, signal: AbortSignal.timeout(25000), crmUrl: crmIntakeUrl });
      onComplete();
    } catch (failure) {
      setError(failure.message);
    } finally {
      inFlight.current = false;
      setSending(false);
      verification.reset();
    }
  }

  return (
    <section className="chat-lead-panel" aria-labelledby="chat-lead-title" data-reveal="off">
      <header className="chat-lead-header">
        <div><strong>CoreD assistant</strong><p>A few details before we chat</p></div>
        <button type="button" className="chat-lead-close" onClick={onClose} aria-label="Close chat">×</button>
      </header>
      <div className="chat-lead-body">
        <img className="chat-lead-avatar" src={publicAsset("/Images/ChatWindow.png")} width="64" height="64" alt="" />
        <h2 id="chat-lead-title">Let’s get to know you</h2>
        <p>Share your name and contact details to start asking about CoreD’s services. Our team can follow up about your enquiry.</p>
        <form onSubmit={submit} className="chat-lead-form" aria-label="Start a chat">
          <fieldset disabled={sending}>
            <div className="contact-honeypot" aria-hidden="true"><label>Website<input name="Website" tabIndex={-1} autoComplete="off" /></label></div>
            <label htmlFor="chat-lead-name">Your name</label>
            <input ref={firstInput} id="chat-lead-name" name="FullName" autoComplete="name" required minLength={2} maxLength={120} />
            <label htmlFor="chat-lead-email">Email address</label>
            <input id="chat-lead-email" name="CompanyEmail" type="email" autoComplete="email" required maxLength={254} />
            <div className="chat-lead-phone">
              <div><label htmlFor="chat-lead-country">Country code</label>
                <select id="chat-lead-country" name="PhoneCountry" defaultValue="IN-91" autoComplete="tel-country-code">
                  {phoneCountries.map(({ id, name, dial }) => <option key={id} value={id}>{name} (+{dial})</option>)}
                </select>
              </div>
              <div><label htmlFor="chat-lead-phone">Phone number</label>
                <input id="chat-lead-phone" name="NationalNumber" type="tel" autoComplete="tel-national" inputMode="tel" required maxLength={22} />
              </div>
            </div>
          </fieldset>
          <p className="chat-lead-notice">{crmIntakeUrl ? "Your details are saved in CoreD’s CRM so the team can follow up. Read our" : "Your details are sent to CoreD through Formspree. Read our"} <Link to="/privacyPolicy" target="_blank" rel="noopener">Privacy Policy<span className="sr-only"> (opens in a new tab)</span></Link>. This does not sign you up for marketing.</p>
          <div className="contact-verification"><div ref={verification.container} />{verification.message && <p role="status">{verification.message}</p>}</div>
          {error && <p className="chat-lead-error" role="alert">{error}</p>}
          {!(crmIntakeUrl || formspreeEndpoint(formId)) && <p role="status">Chat registration is unavailable. Email <a href={`mailto:${generalEmail}`}>{generalEmail}</a>.</p>}
          <button className="cd-button cd-button--primary" type="submit" disabled={sending || !(crmIntakeUrl || formspreeEndpoint(formId)) || (turnstileRequired && !verification.token)}>{sending ? "Sending your details…" : "Start chatting"}</button>
        </form>
      </div>
    </section>
  );
}
