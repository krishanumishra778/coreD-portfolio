import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Clock, ShieldCheck } from "lucide-react";
import { crmApiBase } from "../components/lib/crmConfig.js";
import { fetchSlots, submitBooking } from "../components/lib/crmApi.js";
import { useTurnstile, turnstileRequired } from "../components/lib/useTurnstile.js";
import { generalEmail, phoneCountries } from "../data/contactOptions.js";
import "../components/cdx/cdx.css";

// Must match config('cored.booking.services') / channels on the CRM.
const SERVICES = ["Cloud & AI infrastructure", "Web development", "Automation & AI agents", "General consultation"];
const CHANNELS = [["phone", "Phone call"], ["whatsapp", "WhatsApp"], ["email", "Email"]];
const pad = (n) => String(n).padStart(2, "0");
const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const TZ = "Asia/Kolkata";

export default function BookAppointment() {
  const today = useMemo(() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }, []);
  const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState(null); // null = not loaded
  const [slot, setSlot] = useState("");
  const [channel, setChannel] = useState("phone");
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);
  const inFlight = useRef(false);
  const requestId = useRef(crypto.randomUUID());
  const turnstile = useTurnstile();
  const maxDate = useMemo(() => new Date(today.getTime() + 45 * 86400000), [today]);

  useEffect(() => {
    if (!date) return;
    const ctl = new AbortController();
    setSlots(null); setSlot("");
    fetchSlots({ base: crmApiBase, date, signal: ctl.signal }).then((r) => setSlots(r.slots)).catch(() => { if (!ctl.signal.aborted) setSlots("error"); });
    return () => ctl.abort();
  }, [date]);

  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const lead = (first.getDay() + 6) % 7; // Monday first
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const fmt = (iso) => new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: TZ }).format(new Date(iso));

  async function submit(event) {
    event.preventDefault();
    if (inFlight.current || status?.type === "success") return;
    const f = new FormData(event.currentTarget);
    const v = (n) => String(f.get(n) ?? "").trim();
    const fail = (message) => setStatus({ type: "error", message });
    if (v("Website")) return fail("This request could not be verified.");
    if (!slot) return fail("Choose a date and time first.");
    if (turnstileRequired && !turnstile.token) return fail("Complete security verification first.");
    const country = phoneCountries.find(({ id }) => id === v("PhoneCountry"));
    const number = v("NationalNumber").replace(/[\s()-]/g, "");
    const phone = country ? `+${country.dial}${number}` : "";
    if (!/^\+\d{7,15}$/.test(phone)) return fail("Choose your country code and enter a valid phone number without the country prefix.");
    if (!v("Terms")) return fail("Please accept the Terms and Privacy Notice.");
    inFlight.current = true; setSending(true); setStatus(null);
    try {
      const { message } = await submitBooking({ base: crmApiBase, token: turnstile.token, signal: AbortSignal.timeout(25000), booking: {
        request_id: requestId.current, name: v("FullName"), email: v("CompanyEmail"), phone, company: v("CompanyName"),
        service: v("Service"), channel, message: v("Overview"), starts_at: slot, timezone: TZ, website: "" } });
      setStatus({ type: "success", message: message || "We’ll reach out to confirm your appointment." });
    } catch (e) { requestId.current = crypto.randomUUID(); fail(e.message); }
    finally { inFlight.current = false; setSending(false); turnstile.reset(); }
  }

  return (
    <div className="cdx-page"><div className="cdx-wrap">
      <span className="cdx-eyebrow">Direct consultation · 30-minute session</span>
      <h1>Book an Architecture &amp; Strategy Session</h1>
      <p className="cdx-lead">Schedule a 30-minute conversation with CoreDhristi engineers to scope your AI CRM, automation agents, cloud infrastructure or security assessment.</p>
      <div className="cdx-badges"><span className="cdx-badge"><Clock size={14} aria-hidden="true" /> 30-minute call</span><span className="cdx-badge">No obligation</span><span className="cdx-badge">Free scoping</span></div>

      <div className="cdx-grid2">
        <section className="cdx-card" aria-label="Choose a date and time">
          <div className="cdx-cal-head"><h2 style={{ margin: 0, fontSize: "1.2rem" }}>{month.toLocaleString("en", { month: "long", year: "numeric" })}</h2>
            <div className="cdx-cal-nav">
              <button type="button" aria-label="Previous month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} disabled={month <= new Date(today.getFullYear(), today.getMonth(), 1)}><ChevronLeft size={16} /></button>
              <button type="button" aria-label="Next month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} disabled={new Date(month.getFullYear(), month.getMonth() + 1, 1) > maxDate}><ChevronRight size={16} /></button></div></div>
          <div className="cdx-cal" role="group" aria-label="Days">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => <b key={d}>{d}</b>)}
            {Array.from({ length: lead }, (_, i) => <span key={"e" + i} />)}
            {Array.from({ length: days }, (_, i) => { const d = new Date(month.getFullYear(), month.getMonth(), i + 1); const id = ymd(d);
              return <button key={id} type="button" className="cdx-day" aria-pressed={date === id} disabled={d < today || d > maxDate} onClick={() => setDate(id)}>{i + 1}</button>; })}
          </div>
          <p className="cdx-note">Times shown in {TZ} (IST, UTC+05:30).</p>
          <h3 style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".05em", margin: "16px 0 0" }}>Available slots{date ? ` · ${date}` : ""}</h3>
          <div aria-live="polite">
            {!date && <p className="cdx-note">Pick a date to see available times.</p>}
            {date && slots === null && <p className="cdx-note">Loading times…</p>}
            {slots === "error" && <p className="cdx-msg cdx-msg--err">Times could not be loaded. Please refresh or email {generalEmail}.</p>}
            {Array.isArray(slots) && !slots.length && <p className="cdx-note">No open times that day. Try another date.</p>}
            {Array.isArray(slots) && slots.length > 0 && <div className="cdx-slots">{slots.map((s) => <button key={s} type="button" className="cdx-slot" aria-pressed={slot === s} onClick={() => setSlot(s)}>{fmt(s)}</button>)}</div>}
          </div>
          <p className="cdx-note">We’ll reach out to confirm your appointment after you submit. Meeting details are sent once confirmed.</p>
        </section>

        <section className="cdx-card" aria-labelledby="bk-title">
          <h2 id="bk-title">Tell us about your project</h2>
          <p className="cdx-lead" style={{ fontSize: 14 }}>Share a few details so we can pair you with the right engineer.</p>
          {status?.type === "success" ? <p className="cdx-msg cdx-msg--ok" role="status">{status.message}</p> :
          <form className="cdx-form" onSubmit={submit} noValidate={false}>
            <fieldset disabled={sending} style={{ border: 0, padding: 0, margin: 0, display: "grid", gap: 14 }}>
              <label className="cdx-hp" aria-hidden="true">Website<input name="Website" tabIndex={-1} autoComplete="off" /></label>
              <div className="cdx-row">
                <label>Full name *<input name="FullName" required minLength={2} maxLength={120} autoComplete="name" /></label>
                <label>Business email *<input name="CompanyEmail" type="email" required maxLength={254} autoComplete="email" /></label>
              </div>
              <div className="cdx-row">
                <label>Phone / WhatsApp *<span style={{ display: "grid", gridTemplateColumns: "130px 1fr", gap: 8 }}>
                  <select name="PhoneCountry" defaultValue="IN-91" aria-label="Country code">{phoneCountries.map((c) => <option key={c.id} value={c.id}>{c.code} +{c.dial}</option>)}</select>
                  <input name="NationalNumber" inputMode="tel" required aria-label="Phone number" maxLength={20} /></span></label>
                <label>Company (optional)<input name="CompanyName" maxLength={120} autoComplete="organization" /></label>
              </div>
              <label>Primary service *<select name="Service" required defaultValue=""><option value="" disabled>Select a focus area</option>{SERVICES.map((s) => <option key={s}>{s}</option>)}</select></label>
              <label>What would you like to discuss? *<textarea name="Overview" rows={4} required minLength={5} maxLength={3000} placeholder="Your current stack, bottlenecks, timeline…" /></label>
              <div><span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase" }}>Preferred contact channel</span>
                <div className="cdx-seg" role="group" aria-label="Preferred contact channel" style={{ marginTop: 6 }}>{CHANNELS.map(([k, l]) => <button key={k} type="button" aria-pressed={channel === k} onClick={() => setChannel(k)}>{l}</button>)}</div></div>
              <label style={{ display: "flex", gap: 8, alignItems: "flex-start", textTransform: "none", letterSpacing: 0, fontWeight: 500 }}><input type="checkbox" name="Terms" value="yes" required style={{ width: 18, height: 18 }} /> I accept the <Link to="/termsCondition">Terms</Link> and <Link to="/privacyPolicy">Privacy Notice</Link>.</label>
              <div><div ref={turnstile.container} />{turnstile.message && <p role="status" className="cdx-note">{turnstile.message}</p>}</div>
              {status?.type === "error" && <p className="cdx-msg cdx-msg--err" role="alert">{status.message}</p>}
              <button className="cdx-btn cdx-btn--wide" type="submit" disabled={sending || !slot || (turnstileRequired && !turnstile.token)}>{sending ? "Sending…" : "Request appointment"}</button>
              <p style={{ fontSize: 12, color: "#5c5a55", display: "flex", gap: 6 }}><ShieldCheck size={14} aria-hidden="true" /> Your details are used only to arrange this conversation.</p>
            </fieldset>
          </form>}
        </section>
      </div>

      <div className="cdx-band" style={{ margin: "56px -24px 0" }}><div className="cdx-wrap">
        <span className="cdx-eyebrow">What happens next</span><h2 style={{ marginTop: 10 }}>What happens after you request a slot?</h2>
        <div className="cdx-steps">
          {[["01", "We confirm your slot", "A CoreD team member contacts you on your chosen channel to confirm the time."], ["02", "Pre-call review", "We read your project overview beforehand so the session starts at the substance."], ["03", "Practical next steps", "You leave with a clear view of scope, options and a sensible way forward."]].map(([n, t, b]) => <div className="cdx-card cdx-step" key={n}><i>{n}</i><h3 style={{ margin: "0 0 6px" }}>{t}</h3><p style={{ margin: 0, color: "#5c5a55" }}>{b}</p></div>)}
        </div>
        <div className="cdx-dark"><div><strong style={{ fontSize: "1.15rem" }}>Need to reach us sooner?</strong><p>Email the team and mention your preferred time.</p></div><a className="cdx-btn" href={`mailto:${generalEmail}`}>{generalEmail}</a></div>
      </div></div>
    </div></div>
  );
}
