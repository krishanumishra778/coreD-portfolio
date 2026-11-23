import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { RevealWords } from "../components/ui/WordReveal.jsx";
import { SERVICES } from "../components/services/servicesData.js";
import { contractingBusiness } from "../data/legalPolicies.js";

export default function About() {
  return <div className="cd-shell">
    <header className="page-intro">
      <p className="cd-label">CoreD by CoreDhristi</p>
      <h1><RevealWords>About CoreD</RevealWords></h1>
      <p>CoreD is the services division of {contractingBusiness.legalName}, an Indian limited liability partnership with LLPIN {contractingBusiness.llpin}. We build AI-powered CRM workflows, AI agents and business automation, and provide consulting and scoped cybersecurity services.</p>
    </header>
    <section aria-labelledby="about-services-title" className="pb-12">
      <h2 id="about-services-title" className="text-2xl font-bold tracking-tight sm:text-3xl">What does CoreD do?</h2>
      <div className="security-list">{SERVICES.map(({ id, label, intro }) => <article key={id}>
        <div><h3>{label}</h3><p>{intro}</p></div>
        <Link className="cd-text-link" to={`/services/${id}`}>Scope &amp; pricing <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </article>)}</div>
    </section>
    <section className="service-detail pb-12" aria-label="Working with CoreD">
      <div><h2 className="text-xl font-bold">How does a project start?</h2><p>Choose a service and describe your current systems, the workflow or assets involved and your goal. We review the fit and agree the deliverables, boundaries, provider costs and price in a written quote before work starts.</p><Link className="cd-text-link" to="/contact">Discuss your project <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
      <div><h2 className="text-xl font-bold">What is this website for?</h2><p>This main-domain website presents CoreD’s services and receives project enquiries. The separate CoreDhristi marketplace project is paused and is not currently available for purchases on this domain.</p><Link className="cd-text-link" to="/see-our-work">Explore our work <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
    </section>
    <section className="pb-16" aria-labelledby="about-contact-title">
      <h2 id="about-contact-title" className="mb-3 text-2xl font-bold">Contact CoreD</h2>
      <p className="mb-2">General enquiries: <a className="cd-text-link" href="mailto:info@coredhristi.com">info@coredhristi.com</a></p>
      <p>Support: <a className="cd-text-link" href="mailto:support@coredhristi.com">support@coredhristi.com</a></p>
    </section>
  </div>;
}
