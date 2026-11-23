import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, ArrowUpRight, ShieldCheck } from "lucide-react";
import { RevealWords } from "../components/ui/WordReveal.jsx";
import CompanyLogoSection from "../components/CompanyLogoSection.jsx";
import CrmWorkflowSection from "../components/home/CrmWorkflowSection.jsx";
import CrmImportanceSection from "../components/home/CrmImportanceSection.jsx";
import PortfolioSection from "../components/home/PortfolioSection.jsx";
import TestimonialsSection from "../components/services/TestimonialsSection.jsx";
import { basicAgents, standardAgents, leadForge, leadForgeStatus, leadForgeSteps, formatPrice } from "../components/services/servicesData.js";
import { articles } from "../data/articles.js";

import "../components/home/HomeContinuation.css";
import "./Home.css";

function HeroGuardian() {
  return (
    <picture className="home-hero-background" data-reveal="off" aria-hidden="true">
      <source media="(max-width: 1023px)" srcSet="/Images/hero/cored-robot-background-mobile.webp" />
      <img
        src="/Images/hero/cored-robot-background.webp"
        width="1920"
        height="1080"
        alt=""
        fetchpriority="high"
        decoding="async"
      />
    </picture>
  );
}

function HeroSection() {
  return (
    <section id="home-hero" className="home-hero bg-black text-white">
      <HeroGuardian />
      <div className="cd-shell home-hero-content">
        <div className="home-hero-copy">
          <p className="home-hero-kicker">AI CRM · AI AGENTS · CYBERSECURITY</p>
          <h1><RevealWords>Tech solutions for your future.</RevealWords>{" "}<span className="home-hero-accent"><RevealWords start={5}>Stay ahead of time.</RevealWords></span></h1>
          <p className="home-hero-deck">We build AI-powered CRMs and AI agents for the work your team repeats. We also secure your systems against a new wave of AI-driven cyber attacks, so your business stays one step ahead.</p>
          <div className="cd-actions home-hero-actions">
            <a href="#home-services" className="cd-button cd-button--primary">Explore services <ArrowDown size={17} aria-hidden="true" /></a>
            <Link to="/see-our-work" className="cd-button cd-button--line cd-button--on-dark">See our work <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const homeServices = [
  { title: "AI-powered CRM", detail: "Add automation to the CRM you already use, or build a custom one around how your team sells.", anchor: "#ai-crm", link: "Explore AI-powered CRM" },
  { title: "AI agents", detail: "Start with one agent for a single job, such as a website chatbot, then add more as your needs grow.", anchor: "#ai-agents", link: "Explore AI agents" },
  { title: "Cybersecurity", detail: "Find the gaps in your systems and devices, then fix them in a clear order your team can follow.", anchor: "#cybersecurity", link: "Explore cybersecurity" },
];

function HomeServiceIndex() {
  return (
    <section id="home-services" className="cd-shell cd-section" aria-labelledby="home-services-title">
      <div className="classic-section-lead">
        <h2 id="home-services-title"><RevealWords>Three ways we help you stay ahead</RevealWords></h2>
        <p>Pick where to start. Many projects combine them, such as a new CRM with a security review before launch.</p>
      </div>
      <div className="home-service-paths">
        {homeServices.map(({ title, detail, anchor, link }, index) => (
          <article key={title}>
            <span className="home-service-number" aria-hidden="true">0{index + 1}</span>
            <div>
              <h3>{title}</h3>
              <p>{detail}</p>
              <a className="cd-text-link" href={anchor}>{link} <ArrowDown size={16} aria-hidden="true" /></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const agentPlans = [
  { tier: "Basic", lead: "Choose one agent:", items: basicAgents.map(([, name]) => name), note: "One agent for one clear job." },
  { tier: "Standard", lead: "Choose one agent:", items: standardAgents.map(([, name]) => name), note: "For jobs that need a connected tool, such as a CRM or a calendar." },
  { tier: "Custom", lead: "Built around your needs:", items: ["Several agents working together in one CRM", "Larger agent projects and integrations", "Scoped and priced after a short discovery call"], note: "Price by quote." },
];

function HomeAgentPlans() {
  return (
    <section id="ai-agents" className="cd-shell cd-section" aria-labelledby="home-agents-title">
      <header className="classic-section-lead">
        <p className="cd-label">02 / AI AGENTS</p>
        <h2 id="home-agents-title"><RevealWords>AI agents for the work your team repeats</RevealWords></h2>
        <p>An agent does one clear job within rules you set. It answers, collects details, books or follows up, and hands anything unclear to your team.</p>
      </header>
      <div className="home-agent-plans">
        {agentPlans.map(({ tier, lead, items, note }) => (
          <article key={tier} className="home-agent-plan">
            <h3>{tier}</h3>
            <p className="home-agent-lead">{lead}</p>
            <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
            <p className="home-agent-note">{note}</p>
          </article>
        ))}
      </div>
      <div className="cd-actions mt-8 justify-center">
        <Link className="cd-button cd-button--primary" to="/services/ai-agents#quotation-section">Compare AI agent plans <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <CompanyLogoSection />
      <HomeServiceIndex />

      <div className="home-continuation">
      <section id="ai-crm" aria-labelledby="home-ai-title">
        <header className="cd-shell classic-section-lead home-ai-intro">
          <p className="cd-label">01 / AI-POWERED CRM</p>
          <h2 id="home-ai-title"><RevealWords>A CRM that does more of the routine work</RevealWords></h2>
          <p>A CRM keeps customer work in one place. With automation and AI on top, it can sort enquiries, draft replies and remind your team what to do next, while your people stay in control.</p>
        </header>
      <CrmWorkflowSection />
      <CrmImportanceSection />
      <section className="cd-shell cd-section flagship-section" id="leadforge-x" aria-labelledby="leadforge-title">
        <header>
            <p className="classic-label">{leadForgeStatus}</p>
            <h2 id="leadforge-title"><RevealWords>CoreD LeadForge X</RevealWords></h2>
            <p className="flagship-deck">From an approved lead source to a sales conversation your team can pick up with context.</p>
            <p>Base setup covers one target segment, one lead source, one existing CRM and one messaging channel. We map records and reply rules, test the handoff and show your team how to run it.</p>
            <p><strong>{formatPrice(leadForge)} USD</strong> <span className="muted">· proposed one-time setup</span></p>
            <Link className="cd-button cd-button--line" to="/services#quotation-section">Compare CRM plans <ArrowUpRight size={17} /></Link>
        </header>
          <ol className="classic-feature-cards">
            {leadForgeSteps.map(([title, detail], index) => (
              <li key={title}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{detail}</p></div></li>
            ))}
          </ol>
        <div className="flagship-control">
          <h3>Your team stays in control</h3>
          <p>You approve the lead source, criteria, copy and channel. Staff can take over a conversation at any point. Replies, bookings and opt-outs stop the sequence. The workflow supports your sales team; it does not guarantee meetings or sales.</p>
        </div>
      </section>

      <section className="cd-band" aria-labelledby="custom-crm">
        <div className="cd-shell cd-section">
          <header className="classic-section-lead">
            <h2 id="custom-crm"><RevealWords>When a custom CRM is worth it</RevealWords></h2>
            <p>If teams re-enter the same information or work around your CRM’s approval rules, start by mapping the gaps. We can automate steps in your existing CRM or scope a custom build around your records, permissions and integrations.</p>
          </header>
          <div className="cd-actions justify-center">
            <Link className="cd-button cd-button--line" to="/services#quotation-section">Compare CRM options <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </section>
      </section>
      <HomeAgentPlans />
      <section className="cd-shell cd-section" aria-labelledby="home-security" id="cybersecurity">
        <header className="classic-section-lead">
          <ShieldCheck className="mx-auto mb-3 text-amber-700" size={29} aria-hidden="true" />
          <p className="cd-label">03 / CYBERSECURITY</p>
          <h2 id="home-security"><RevealWords>Protect the systems you rely on</RevealWords></h2>
          <p>Attackers now use AI to find weak spots faster. We help you find and fix yours first, with a clear list of what to fix, who owns each change and how to check it. Testing is limited to assets you authorize in writing.</p>
        </header>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Find the gaps", "Review access, patching and controls across the agreed systems. Get written findings in priority order."],
            ["Fix and verify", "Agree which issues to repair. Get a record of what changed and how the fixes were checked."],
            ["Protect devices", "Set up approved endpoint protection and check updates, alerts and device status. Software licenses are separate."],
          ].map(([title, detail]) => <article className="rounded-2xl border border-black/10 bg-white p-5" key={title}><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#5c616b]">{detail}</p></article>)}
        </div>
        <div className="cd-actions mt-6 justify-center">
          <Link className="cd-button cd-button--primary" to="/services/cybersecurity#quotation-section">See cybersecurity pricing <ArrowRight size={16} /></Link>
          <Link className="cd-button cd-button--line" to="/see-our-work#security-sample">View a sample assessment <ArrowUpRight size={16} /></Link>
        </div>
      </section>
      <PortfolioSection />
      <TestimonialsSection />

      <section className="cd-shell cd-section home-journal" aria-labelledby="home-journal">
        <div className="section-lead"><h2 id="home-journal"><RevealWords>Notes from CoreD</RevealWords></h2><p>Practical guides to CRM automation, AI agents and keeping business systems secure.</p></div>
        <div className="home-article-list">
          {articles.slice(0, 3).map((article) => <Link key={article.slug} to={`/blog/${article.slug}`}><span><span className="cd-label">{article.topic}</span><strong>{article.title}</strong></span><ArrowUpRight size={20} aria-hidden="true" /></Link>)}
        </div>
        <Link className="cd-button cd-button--line" to="/blog">Read the journal <ArrowUpRight size={16} /></Link>
      </section>
      </div>
    </>
  );
}
