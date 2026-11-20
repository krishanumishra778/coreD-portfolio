import { RevealWords } from "../components/ui/WordReveal.jsx";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { websiteFaq } from "../data/KnowledgeBaseExpanded.js";

export default function Faq() {
  return (
    <div className="cd-shell faq-page">
      <header className="page-intro"><h1><RevealWords>Frequently asked questions</RevealWords></h1><p>What we build, how we price it and what to have ready before asking for a quote.</p></header>
      <section className="faq-list" aria-label="Service and quotation questions">
        {websiteFaq.map(({ id, question, answer }) => (
          <details key={id} id={id}><summary>{question}</summary><p>{answer}</p></details>
        ))}
      </section>
      <div className="cd-actions">
        <Link className="cd-button cd-button--primary" to="/services#quotation-section">Compare plans <ArrowUpRight size={17} /></Link>
        <Link className="cd-button cd-button--line" to="/contact">Ask CoreD <ArrowUpRight size={16} /></Link>
      </div>
    </div>
  );
}
