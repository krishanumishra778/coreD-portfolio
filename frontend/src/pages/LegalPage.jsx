import { RevealWords } from "../components/ui/WordReveal.jsx";
import { Link } from "react-router-dom";

export default function LegalPage({ title, introduction, sections, related, preparedOn, reviewNotice, children }) {
  const relatedLinks = Array.isArray(related) ? related : [related];
  return (
    <article className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-ink"><RevealWords>{title}</RevealWords></h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-ink/75 sm:text-base">{introduction}</p>
        {preparedOn && <p className="mt-3 text-sm text-ink/65">Prepared for review: {preparedOn}</p>}
        {reviewNotice && <aside className="mt-5 rounded-xl border border-amber-700/20 bg-amber-50 p-4 text-sm leading-6 text-ink" aria-label="Policy review status">{reviewNotice}</aside>}
      </header>
      {children}
      <div className="space-y-9 text-ink/80 sm:space-y-10">
        {sections.map(({ title: sectionTitle, paragraphs, contact, resources }, index) => (
          <section id={`section-${index + 1}`} key={sectionTitle} aria-labelledby={`legal-title-${index + 1}`}>
            <h2 id={`legal-title-${index + 1}`} className="text-lg font-bold leading-snug text-ink sm:text-xl">{index + 1}. {sectionTitle}</h2>
            <div className="mt-3 space-y-3 text-sm leading-7 text-ink/75 sm:text-base">
              {paragraphs.map((text) => <p key={text}>{text}</p>)}
              {resources?.map(({ label, href }) => <p key={href}><a className="cd-text-link" href={href} target="_blank" rel="noopener noreferrer">{label}<span className="sr-only"> (opens in a new tab)</span></a></p>)}
            </div>
            {contact && <div className="mt-4 flex justify-end"><a className="cd-button cd-button--primary" href="mailto:info@coredhristi.com">Email CoreD</a></div>}
          </section>
        ))}
        <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Related policies">
          {relatedLinks.filter(Boolean).map(({ path, label }) => <Link key={path} className="cd-text-link" to={path}>{label}</Link>)}
        </nav>
      </div>
    </article>
  );
}
