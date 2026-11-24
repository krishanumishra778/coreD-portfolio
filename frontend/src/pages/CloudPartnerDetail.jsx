import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { crmApiBase } from "../components/lib/crmConfig.js";
import { fetchPartner } from "../components/lib/crmApi.js";
import "../components/cdx/cdx.css";

const arr = (v) => (Array.isArray(v) ? v : []);

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
    <div className="cdx-page"><div className="cdx-wrap">
      <p className="cdx-crumbs"><Link to="/cloud-partners">Cloud partners</Link></p>
      <h1>{state.status === "loading" ? "Loading…" : state.status === "missing" ? "Partner not found" : "Could not load this partner"}</h1>
      <Link className="cdx-btn" to="/cloud-partners">Back to all partners</Link></div></div>);
  const p = state.partner, d = p.details ?? {};
  return (
    <div className="cdx-page"><div className="cdx-wrap">
      <nav className="cdx-crumbs" aria-label="Breadcrumb"><Link to="/">Home</Link> / <Link to="/cloud-partners">Cloud partners</Link> / <span aria-current="page">{p.name}</span></nav>
      {p.is_demo && <span className="cdx-eyebrow cdx-demo">Demo data — not an endorsement</span>}
      <h1>{p.name}</h1>
      {p.tagline && <p className="cdx-lead" style={{ fontWeight: 600 }}>{p.tagline}</p>}
      {p.summary && <p className="cdx-lead">{p.summary}</p>}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "18px 0" }}>
        <Link className="cdx-btn" to="/book-appointment">Discuss this with CoreD</Link>
        {p.affiliate_url && <a className="cdx-btn cdx-btn--ghost" href={p.affiliate_url} target="_blank" rel="sponsored noopener noreferrer">Visit {p.name} (affiliate link)</a>}
        {!p.affiliate_url && p.website_url && <a className="cdx-btn cdx-btn--ghost" href={p.website_url} target="_blank" rel="noopener noreferrer">Visit website</a>}
      </div>
      {arr(d.metrics).length > 0 && <div className="cdx-metrics" style={{ marginBottom: 24 }}>{arr(d.metrics).map((m) => <div key={m.label}><small>{m.label}</small><strong>{m.value}</strong></div>)}</div>}
      {arr(d.capabilities).length > 0 && <section><h2>Capabilities</h2><div className="cdx-2col">{arr(d.capabilities).map((c) => <div className="cdx-card" key={c.title}><h3 style={{ margin: "0 0 6px" }}>{c.title}</h3><p style={{ margin: 0, color: "#5c5a55" }}>{c.body}</p></div>)}</div></section>}
      {(arr(d.pros).length > 0 || arr(d.cons).length > 0) && <section style={{ marginTop: 28 }}><div className="cdx-2col">
        <div className="cdx-card"><h2>Strengths</h2><ul className="cdx-list">{arr(d.pros).map((x) => <li key={x}>{x}</li>)}</ul></div>
        <div className="cdx-card"><h2>Trade-offs</h2><ul className="cdx-list">{arr(d.cons).map((x) => <li key={x}>{x}</li>)}</ul></div></div></section>}
      {arr(d.steps).length > 0 && <section style={{ marginTop: 28 }}><h2>Getting started</h2><div className="cdx-steps">{arr(d.steps).map((s, i) => <div className="cdx-card cdx-step" key={s}><i>{String(i + 1).padStart(2, "0")}</i><p style={{ margin: 0 }}>{s}</p></div>)}</div></section>}
      <div className="cdx-dark"><div><strong style={{ fontSize: "1.2rem" }}>Want help choosing or setting this up?</strong><p>Book a 30-minute session and we will talk through your workload.</p></div><Link className="cdx-btn" to="/book-appointment">Book a session</Link></div>
      <p className="cdx-note">Affiliate disclosure: links to partners may earn CoreD a commission or credit at no extra cost to you.</p>
    </div></div>
  );
}
