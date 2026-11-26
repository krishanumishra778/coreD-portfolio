import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AlertTriangle, ArrowRight, Check, ChevronRight, Star } from "lucide-react";
import { crmApiBase } from "../components/lib/crmConfig.js";
import { fetchPartner } from "../components/lib/crmApi.js";
import { cleanReviews, currentOffer, hashtag, initials, outboundLink, paragraphs, reviewSource, verifiedMetrics } from "../components/lib/partnerView.js";
import "../components/cdx/cdx.css";

const arr = (v) => (Array.isArray(v) ? v : []);
const num = (i) => String(i + 1).padStart(2, "0");
const REL = "sponsored noopener noreferrer";

function Stars({ n }) { return <span className="cp-stars" role="img" aria-label={`${n} out of 5`}>{[1, 2, 3, 4, 5].map((i) => <Star key={i} size={16} aria-hidden="true" fill={i <= n ? "currentColor" : "none"} />)}</span>; }

export default function CloudPartnerDetail() {
  const { slug } = useParams();
  const [state, setState] = useState({ status: "loading" });
  useEffect(() => {
    const c = new AbortController(); setState({ status: "loading" });
    fetchPartner({ base: crmApiBase, slug, signal: c.signal }).then((partner) => setState({ status: "ok", partner }))
      .catch((e) => { if (!c.signal.aborted) setState({ status: e.message === "not-found" ? "missing" : "error" }); });
    return () => c.abort();
  }, [slug]);
  if (state.status !== "ok") return (
    <div className="cdx-page cdx-partners"><div className="cdx-wrap">
      <p className="cdx-crumbs"><Link to="/cloud-partners">Cloud partners</Link></p>
      <h1>{state.status === "loading" ? "Loading…" : state.status === "missing" ? "Partner not found" : "Could not load this partner"}</h1>
      <Link className="cp-btn" to="/cloud-partners">Back to all partners</Link></div></div>);

  const p = state.partner, d = p.details ?? {};
  const offer = currentOffer(p), out = outboundLink(p), reviews = cleanReviews(p), metrics = verifiedMetrics(p);
  const evidence = d.evidence?.verified === true && (d.evidence.title || d.evidence.body) ? d.evidence : null;
  const caps = arr(d.capabilities).filter((c) => c?.title), pros = arr(d.pros), cons = arr(d.cons), steps = arr(d.steps);
  const overview = paragraphs(p.summary), tags = arr(p.tags).filter((t) => t && t.toLowerCase() !== "demo");
  const ctaLabel = offer ? "Get the Deal" : `Visit ${p.name}`;
  const Cta = ({ className = "" }) => out && <a className={`cp-btn ${className}`} href={out.href} target="_blank" rel={out.affiliate ? REL : "noopener noreferrer"}>{ctaLabel} <ArrowRight size={16} aria-hidden="true" /></a>;
  const disclosure = out?.affiliate && <p className="cp-fine">Affiliate disclosure: this is an affiliate link. CoreD may earn a commission or credit at no extra cost to you.</p>;

  return (
    <div className="cdx-page cdx-partners cp-detail">
      <div className="cp-crumbbar"><div className="cdx-wrap">
        <nav className="cdx-crumbs" aria-label="Breadcrumb"><Link to="/">Home</Link> <ChevronRight size={14} aria-hidden="true" /> <Link to="/cloud-partners">Partners &amp; Cloud</Link> <ChevronRight size={14} aria-hidden="true" /> <span aria-current="page">{p.name}</span></nav>
        {p.is_demo && <span className="cdx-eyebrow cdx-demo">Demo data — not an endorsement</span>}
      </div></div>

      <div className="cdx-wrap">
        <section className="cp-hero" aria-labelledby="cp-name">
          <div className="cp-hero__main">
            <div className="cp-hero__id">
              <span className="cp-logo cp-logo--lg">{p.logo_url ? <img src={p.logo_url} alt="" width="64" height="64" decoding="async" /> : <span aria-hidden="true">{(p.name ?? "").match(/[A-Za-z0-9]/)?.[0]}</span>}</span>
              <span className="cp-kicker">Cloud partner review</span>
            </div>
            <h1 id="cp-name">{p.name}</h1>
            {p.tagline && <p className="cp-hero__tag">{p.tagline}</p>}
            {tags.length > 0 && <ul className="cp-tags" aria-label="Topics">{tags.map((t) => <li key={t}>{hashtag(t)}</li>)}</ul>}
          </div>
          <aside className="cp-offer" aria-label={offer ? "Partner offer" : `Visit ${p.name}`}>
            {offer ? <>
              <span className="cp-kicker">Partner offer</span>
              {offer.title && <h2>{offer.title}</h2>}
              {offer.body && <p>{offer.body}</p>}
              {offer.code && <p className="cp-code">Code <code>{offer.code}</code></p>}
            </> : <>
              <span className="cp-kicker">Next step</span>
              <h2>Visit {p.name}</h2>
              <p>Check current plans and pricing on the provider’s own site, or talk to CoreD first.</p>
            </>}
            <Cta className="cp-btn--block" />
            {!out && <Link className="cp-btn cp-btn--block" to="/book-appointment">Discuss this with CoreD</Link>}
            {disclosure}
          </aside>
        </section>

        {overview.length > 0 && <section className="cp-sec" aria-labelledby="cp-ov"><h2 id="cp-ov">Overview</h2><div className="cp-prose">{overview.map((t) => <p key={t}>{t}</p>)}</div></section>}

        {metrics.length > 0 && <dl className="cp-stats">{metrics.map((m) => <div key={m.label}><dt>{m.label}</dt><dd>{m.value}</dd></div>)}</dl>}

        {evidence && <section className="cp-evidence" aria-labelledby="cp-ev"><span className="cp-band__tag">{evidence.checked_on ? `Checked ${evidence.checked_on}` : "Evidence"}</span>
          <h2 id="cp-ev">{evidence.title}</h2>{evidence.body && <p>{evidence.body}</p>}
          {evidence.source_url && <a className="cp-link cp-link--onDark" href={evidence.source_url} target="_blank" rel="noopener noreferrer">Source <ArrowRight size={16} aria-hidden="true" /></a>}</section>}

        {caps.length > 0 && <section className="cp-sec" aria-labelledby="cp-cap"><span className="cp-kicker">What it offers</span><h2 id="cp-cap">Where {p.name} fits</h2>
          <div className="cp-caps">{caps.map((c, i) => <article className="cp-cap" key={c.title}><span className="cp-num" aria-hidden="true">{num(i)}</span><h3>{c.title}</h3>{c.body && <p>{c.body}</p>}</article>)}</div></section>}

        {(pros.length > 0 || cons.length > 0) && <section className="cp-sec" aria-labelledby="cp-pc"><h2 id="cp-pc" className="cp-center">{p.name}: strengths and trade-offs</h2>
          <div className="cp-pc">
            {pros.length > 0 && <div className="cp-pc__card cp-pc__card--pro"><h3>Strengths</h3><ul>{pros.map((x) => <li key={x}><Check size={18} aria-hidden="true" /><span>{x}</span></li>)}</ul></div>}
            {cons.length > 0 && <div className="cp-pc__card cp-pc__card--con"><h3>Trade-offs to check</h3><ul>{cons.map((x) => <li key={x}><AlertTriangle size={18} aria-hidden="true" /><span>{x}</span></li>)}</ul></div>}
          </div></section>}

        {reviews.length > 0 && <section className="cp-sec" aria-labelledby="cp-rev"><span className="cp-kicker">Customer reviews</span><h2 id="cp-rev">What customers say</h2>
          <p className="cp-sub">Each entry is attributed to its source. Entries marked “summary” are CoreD’s short summaries of a public review, not verbatim quotes.</p>
          <div className="cp-reviews">{reviews.map((r) => { const src = reviewSource(r); return (
            <figure className="cp-review" key={`${r.author}-${r.text.slice(0, 24)}`}>
              <div className="cp-review__top">{r.rating ? <Stars n={r.rating} /> : <span />}{src && <span className="cp-pill">{src}</span>}</div>
              <blockquote>{r.text}</blockquote>
              <figcaption><span className="cp-avatar" aria-hidden="true">{initials(r.author)}</span><span><strong>{r.author}</strong>{r.role && <small>{r.role}</small>}</span></figcaption>
            </figure>); })}</div></section>}

        {steps.length > 0 && <section className="cp-sec" aria-labelledby="cp-st"><span className="cp-kicker">Getting started</span><h2 id="cp-st">How to get started</h2>
          <ol className="cp-steps">{steps.map((s, i) => <li key={s}><span className="cp-num" aria-hidden="true">{i + 1}</span><p>{s}</p></li>)}</ol></section>}

        <section className="cp-final" aria-labelledby="cp-fin">
          <div><span className="cp-band__tag">{offer ? "Partner offer" : "Next step"}</span><h2 id="cp-fin">Ready to try {p.name}?</h2>
            <p>{offer ? "Use the partner link to claim the offer, or book a session and we will talk through your workload first." : "Check the provider directly, or book a session and we will talk through your workload."}</p></div>
          <div className="cp-final__act"><Cta className="cp-btn--onDark" /><Link className="cp-btn cp-btn--ghostDark" to="/book-appointment">Discuss this with CoreD</Link></div>
          {disclosure && <div className="cp-final__fine">{disclosure}</div>}
        </section>
      </div>
    </div>
  );
}
