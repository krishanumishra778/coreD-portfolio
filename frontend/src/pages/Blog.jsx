import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { RevealWords } from "../components/ui/WordReveal.jsx";
import { articles, articleImage } from "../data/articles.js";

function JournalArt({ article, priority = false, decorative = false }) {
  return (
    <div className="journal-art" data-scroll-reveal={decorative ? undefined : ""}>
      <img src={articleImage(article)} alt={decorative ? "" : article.imageAlt} width={1440} height={810}
        loading={priority ? "eager" : "lazy"} fetchpriority={priority ? "high" : undefined} decoding="async" />
    </div>
  );
}

const sectionId = (heading) => heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "");

function ArticleMeta({ article }) {
  const words = [article.answer, ...article.sections.flatMap(({ heading, body }) => [heading, ...body])].join(" ").split(/\s+/).length;
  return <p className="journal-meta"><span>{article.topic}</span><span aria-hidden="true">·</span><span>{Math.max(1, Math.ceil(words / 200))} min read</span>
    {article.author && <span>· {article.author}</span>}{article.date && <time dateTime={article.date}>{article.date}</time>}
  </p>;
}

export default function Blog() {
  const [featured, ...reading] = articles;
  const topics = [...new Set(articles.map(({ topic }) => topic))];
  return (
    <div className="cd-shell journal">
      <header className="page-intro journal-intro">
        <h1><RevealWords>CoreD Journal</RevealWords></h1>
        <p>Practical notes on AI agents, CRM automation and cybersecurity for teams doing the work.</p>
      </header>
      <div className="journal-columns">
        <div>
          <article className="journal-feature">
            <Link to={`/blog/${featured.slug}`}>
              <JournalArt article={featured} decorative priority />
              <div className="journal-feature-copy">
                <p className="cd-label">Featured guide</p>
                <h2>{featured.title}</h2>
                <p>{featured.description}</p>
                <ArticleMeta article={featured} />
              </div>
            </Link>
          </article>
          <div className="journal-list" aria-label="More articles">
            {reading.map((article) => <article key={article.slug} id={article.slug}>
              <Link to={`/blog/${article.slug}`}>
                <div><ArticleMeta article={article} /><h2>{article.title}</h2><p>{article.description}</p></div>
                <JournalArt article={article} decorative />
              </Link>
            </article>)}
          </div>
        </div>
        <aside className="journal-sidebar">
          <h2>Explore by topic</h2>
          <ul>{topics.map((topic) => {
            const matching = articles.filter((item) => item.topic === topic);
            if (matching.length === 1) return <li key={topic}><Link to={`/blog/${matching[0].slug}`}>{topic} <ArrowUpRight size={14} /></Link></li>;
            return <li key={topic}><details><summary>{topic}</summary><ul>
              {matching.map(({ slug, art }) => <li key={slug}><Link to={`/blog/${slug}`}>{art === "email" ? "Email follow-ups" : "WhatsApp follow-ups"} <ArrowUpRight size={14} /></Link></li>)}
            </ul></details></li>;
          })}</ul>
          <div className="journal-related-site">
            <h2>CoreDhristi Marketplace</h2>
            <p>Explore the related marketplace for AI agents and automations.</p>
            <a className="cd-button cd-button--line" href="https://www.coredhristi.com/">Visit CoreDhristi <ArrowUpRight size={16} /></a>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function BlogArticle() {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);
  if (!article) return <header className="cd-shell page-intro"><h1>Article not found</h1><Link className="cd-text-link" to="/blog">Back to the journal</Link></header>;
  return (
    <article className="cd-shell journal-article">
      <header className="article-head">
        <Link className="cd-text-link" to="/blog"><ArrowLeft size={16} /> CoreD Journal</Link>
        <h1><RevealWords>{article.title}</RevealWords></h1>
        <p className="article-deck">{article.description}</p>
        <ArticleMeta article={article} />
      </header>
      <JournalArt article={article} priority />
      <div className="article-prose">
        <div className="article-quick-answer"><p className="cd-label">Short answer</p><p>{article.answer}</p></div>
        <nav className="article-contents" aria-label="On this page">
          <h2>On this page</h2>
          <ol>{article.sections.map(({ heading }) => <li key={heading}><a href={'#' + sectionId(heading)}>{heading}</a></li>)}</ol>
        </nav>
        {article.sections.map(({ heading, body }) => <section key={heading} id={sectionId(heading)}>
          <h2>{heading}</h2>
          {body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>)}
        {article.sources && <section><h2>References</h2><ul>{article.sources.map(([title, url]) => <li key={url}><a href={url}>{title}</a></li>)}</ul></section>}
      </div>
      <div className="article-service"><Link className="cd-button cd-button--line" to={article.service[1]}>{article.service[0]} <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
      <section className="article-more"><h2>Keep reading</h2><ul>{article.related.map((id) => {
        const related = articles.find((item) => item.slug === id);
        return <li key={id}><Link to={`/blog/${id}`}>{related.title} <ArrowUpRight size={17} /></Link></li>;
      })}</ul></section>
    </article>
  );
}
