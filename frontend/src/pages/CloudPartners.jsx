import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { crmApiBase } from "../components/lib/crmConfig.js";
import { fetchPartners } from "../components/lib/crmApi.js";
import { generalEmail } from "../data/contactOptions.js";
import "../components/cdx/cdx.css";

const FAQ = [
  ["How are partners chosen?", "We list platforms we have reviewed or would be comfortable recommending to clients. Each page says what we checked and what we did not."],
  ["Do I pay more through these links?", "No. If a link is an affiliate link, the partner may pay CoreD a commission or credit at no extra cost to you. Offers and eligibility are set by the partner and can change."],
  ["Can CoreD set up the infrastructure for us?", "Yes. Book a session and tell us what you want to run; we will advise on options and can handle setup and deployment as a scoped engagement."],
  ["Which provider suits AI models and which suits business apps?", "It depends on workload, budget and compliance needs. A short call is the quickest way to narrow it down."],
];

export default function CloudPartners() {
  const [partners, setPartners] = useState(null);
  const [tag, setTag] = useState("All");
  useEffect(() => { const c = new AbortController(); fetchPartners({ base: crmApiBase, signal: c.signal }).then(setPartners).catch(() => { if (!c.signal.aborted) setPartners("error"); }); return () => c.abort(); }, []);
  const list = Array.isArray(partners) ? partners : [];
  const tags = useMemo(() => ["All", ...new Set(list.flatMap((p) => p.tags ?? []))], [list]);
  const shown = tag === "All" ? list : list.filter((p) => (p.tags ?? []).includes(tag));

  return (
    <div className="cdx-page"><div className="cdx-wrap">
      <span className="cdx-eyebrow">Infrastructure partners</span>
      <h1>Cloud &amp; Hosting Partners</h1>
      <p className="cdx-lead">Platforms CoreD reviews for AI agents, CRMs and business applications, with plain-language notes on what each is good for.</p>
      <div className="cdx-badges"><span className="cdx-badge">Independent notes</span><span className="cdx-badge">Affiliate links disclosed</span><span className="cdx-badge">Setup help available</span></div>

      <div className="cdx-chips" role="group" aria-label="Filter partners">{tags.map((t) => <button key={t} type="button" className="cdx-chip" aria-pressed={tag === t} onClick={() => setTag(t)}>{t}{t === "All" ? ` (${list.length})` : ""}</button>)}</div>

      <div aria-live="polite">
        {partners === null && <p className="cdx-note">Loading partners…</p>}
        {partners === "error" && <p className="cdx-msg cdx-msg--err">Partners could not be loaded right now. Please refresh or email {generalEmail}.</p>}
        {Array.isArray(partners) && !list.length && <p className="cdx-note">No partners are published yet.</p>}
      </div>
      <div className="cdx-pgrid">
        {shown.map((p) => (
          <article className="cdx-card cdx-pcard" key={p.slug}>
            <div className="cdx-tags">{p.is_demo && <span className="cdx-tag cdx-demo">Demo data</span>}{(p.tags ?? []).filter((t) => t !== "demo").map((t) => <span className="cdx-tag" key={t}>{t}</span>)}</div>
            <h3>{p.name}</h3>
            {p.tagline && <p style={{ margin: 0, fontWeight: 600 }}>{p.tagline}</p>}
            {p.summary && <p style={{ margin: 0, color: "#5c5a55" }}>{p.summary}</p>}
            {(p.details?.metrics ?? []).length > 0 && <div className="cdx-metrics">{p.details.metrics.slice(0, 3).map((m) => <div key={m.label}><small>{m.label}</small><strong>{m.value}</strong></div>)}</div>}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: "auto" }}>
              <Link className="cdx-btn" to={`/cloud-partners/${p.slug}`}>Read the review <ArrowUpRight size={16} /></Link>
              {p.affiliate_url && <a className="cdx-btn cdx-btn--ghost" href={p.affiliate_url} target="_blank" rel="sponsored noopener noreferrer">Visit partner (affiliate link)</a>}
            </div>
          </article>
        ))}
      </div>

      <div className="cdx-dark"><div><strong style={{ fontSize: "1.2rem" }}>Run a cloud or hosting platform?</strong><p>Tell us about it. We review platforms on technical merit before listing any.</p></div><a className="cdx-btn" href={`mailto:${generalEmail}?subject=Partner%20listing`}>Talk to us</a></div>
      <aside className="cdx-card cdx-discl" aria-label="Affiliate disclosure"><ShieldCheck aria-hidden="true" /><div><strong>Affiliate disclosure</strong><p style={{ margin: "6px 0 0", color: "#5c5a55", fontSize: 14 }}>Some links on this page may earn CoreD a commission or platform credit at no extra cost to you. Listings marked “Demo data” are placeholders and are not endorsements.</p></div></aside>

      <section className="cdx-faq" style={{ marginTop: 40 }} aria-labelledby="cp-faq"><h2 id="cp-faq">Cloud &amp; hosting FAQ</h2>{FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p style={{ color: "#5c5a55" }}>{a}</p></details>)}
        <Link className="cdx-btn cdx-btn--ghost" to="/book-appointment">Have a specific architecture question? Book a session</Link></section>
    </div></div>
  );
}
