import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Check, Link2, ShieldCheck, Tag, Wrench } from "lucide-react";
import { crmApiBase } from "../components/lib/crmConfig.js";
import { fetchPartners } from "../components/lib/crmApi.js";
import { bestFitLabel, categoryOf, currentOffer, partnerHighlights, scrubbedPartner, verifiedMetrics } from "../components/lib/partnerView.js";
import { generalEmail } from "../data/contactOptions.js";
import "../components/cdx/cdx.css";

const FAQ = [
  ["How are partners chosen?", "We list platforms we have reviewed or would be comfortable recommending to clients. Each page says what we checked and what we did not."],
  ["Do I pay more through these links?", "No. If a link is an affiliate link, the partner may pay CoreD a commission or credit at no extra cost to you. Offers and eligibility are set by the partner and can change."],
  ["Can CoreD set up the infrastructure for us?", "Yes. Book a session and tell us what you want to run; we will advise on options and can handle setup and deployment as a scoped engagement."],
  ["Which provider suits AI models and which suits business apps?", "It depends on workload, budget and compliance needs. A short call is the quickest way to narrow it down."],
];
const BENEFITS = [[ShieldCheck, "Independent notes"], [Link2, "Affiliate links disclosed"], [BadgeCheck, "Only verified offers shown"], [Wrench, "Setup help available"]];

function ProviderCard({ p: raw, wide }) {
  const p = scrubbedPartner(raw);
  const category = categoryOf(p), fit = bestFitLabel(p), points = partnerHighlights(p), metrics = verifiedMetrics(p, 3), offer = currentOffer(p);
  return (
    <article className={`cp-card${wide ? " cp-card--wide" : ""}`} aria-labelledby={`cp-${p.slug}`}>
      <div className="cp-card__main">
        <div className="cp-card__head">
          <span className="cp-logo">{p.logo_url ? <img src={p.logo_url} alt="" width="56" height="56" loading="lazy" decoding="async" /> : <span aria-hidden="true">{(p.name ?? "").match(/[A-Za-z0-9]/)?.[0]}</span>}</span>
          <div className="cp-card__title">
            {fit && <span className="cp-fit">{fit}</span>}
            <h2 id={`cp-${p.slug}`}>{p.name}</h2>
          </div>
          {(category || p.is_demo) && <span className="cp-cat">{p.is_demo ? "Demo data" : category}</span>}
        </div>
        {p.tagline && <p className="cp-tagline">{p.tagline}</p>}
      </div>
      <div className="cp-card__side">
        {points.length > 0 && <ul className="cp-points">{points.map((x) => <li key={x}><Check size={16} aria-hidden="true" /><span>{x}</span></li>)}</ul>}
        {metrics.length > 0 && <dl className="cp-metrics">{metrics.map((m) => <div key={m.label}><dt>{m.label}</dt><dd>{m.value}</dd></div>)}</dl>}
        {offer && <p className="cp-deal"><Tag size={16} aria-hidden="true" /><span>{offer.title || "Partner offer"}</span>{offer.code && <code>{offer.code}</code>}</p>}
        <Link className="cp-btn" to={`/cloud-partners/${p.slug}`} aria-label={`View Product: ${p.name}`}>View Product <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
    </article>
  );
}

export default function CloudPartners() {
  const [partners, setPartners] = useState(null);
  const [tag, setTag] = useState("All");
  useEffect(() => { const c = new AbortController(); fetchPartners({ base: crmApiBase, signal: c.signal }).then(setPartners).catch(() => { if (!c.signal.aborted) setPartners("error"); }); return () => c.abort(); }, []);
  const list = Array.isArray(partners) ? partners : [];
  const tags = useMemo(() => [...new Set(list.flatMap((p) => p.tags ?? []).filter((t) => t && t.toLowerCase() !== "demo"))], [list]);
  const shown = tag === "All" ? list : list.filter((p) => (p.tags ?? []).includes(tag));

  return (
    <div className="cdx-page cdx-partners"><div className="cdx-wrap">
      <header className="cp-intro">
        <span className="cdx-eyebrow">Affiliate &amp; infrastructure partners</span>
        <h1>Cloud &amp; Hosting Partners</h1>
        <p className="cdx-lead">Platforms CoreD reviews for AI agents, CRMs and business applications, with plain-language notes on what each is good for.</p>
        <ul className="cp-benefits" aria-label="What to expect">{BENEFITS.map(([Icon, label]) => <li key={label}><Icon size={16} aria-hidden="true" />{label}</li>)}</ul>
      </header>

      {list.length > 0 && <div className="cp-filters" role="group" aria-label="Filter partners by category">
        <button type="button" className="cp-chip" aria-pressed={tag === "All"} onClick={() => setTag("All")}>All Partners ({list.length})</button>
        {tags.map((t) => <button key={t} type="button" className="cp-chip" aria-pressed={tag === t} onClick={() => setTag(t)}>{t}</button>)}
      </div>}

      <div aria-live="polite">
        {partners === null && <p className="cdx-note">Loading partners…</p>}
        {partners === "error" && <p className="cdx-msg cdx-msg--err">Partners could not be loaded right now. Please refresh or email {generalEmail}.</p>}
        {Array.isArray(partners) && !list.length && <p className="cdx-note">No partners are published yet.</p>}
      </div>
      <div className="cp-grid">{shown.map((p, i) => <ProviderCard key={p.slug} p={p} wide={shown.length % 2 === 1 && i === shown.length - 1} />)}</div>

      <section className="cp-band" aria-labelledby="cp-band-h">
        <div><span className="cp-band__tag">Expanding our infrastructure network</span><h2 id="cp-band-h">Run a cloud or hosting platform?</h2>
          <p>Tell us about it. We review platforms on technical merit before listing any.</p></div>
        <a className="cp-btn cp-btn--onDark" href={`mailto:${generalEmail}?subject=Partner%20listing`}>Become an infrastructure partner <ArrowRight size={16} aria-hidden="true" /></a>
      </section>

      <aside className="cp-disclosure" aria-label="Affiliate disclosure"><ShieldCheck aria-hidden="true" size={28} /><div><h2>Editorial integrity &amp; affiliate disclosure</h2>
        <p>Some links on this site may earn CoreD a commission or platform credit at no extra cost to you. Offers and eligibility are set by each partner, and we show an offer only when we have verified it. Listings marked “Demo data” are placeholders and are not endorsements.</p></div></aside>

      <section className="cp-faq" aria-labelledby="cp-faq">
        <div><span className="cp-kicker">Frequently asked questions</span><h2 id="cp-faq">Cloud &amp; hosting FAQ</h2>
          <Link className="cp-link" to="/book-appointment">Have a specific architecture question? <ArrowRight size={16} aria-hidden="true" /></Link></div>
        <div>{FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
      </section>
    </div></div>
  );
}
