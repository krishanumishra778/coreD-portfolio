import { RevealWords } from "../components/ui/WordReveal.jsx";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Award,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronRight,
  FileText,
  Layers,
  Maximize2,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

import { portfolioCaseStudies } from "../data/PortfolioData.js";

/* ------------------------------------------------------------------ */
/* Constants                                                          */
/* ------------------------------------------------------------------ */

const SITE_NAME = "CoreD";
const BACK_LINK = "/see-our-work";
const CONTACT_LINK = "/contact";

// Icons remain optional in PortfolioData.js.
// Every feature only needs a title and description.
const CAPABILITY_ICONS = {
  zap: Zap,
  layers: Layers,
  shield: ShieldCheck,
  chart: BarChart3,
};

const INFO_VARIANTS = {
  problem: {
    badgeClass: "bg-amber-200/60 text-amber-900",
    listLabel: "Key Friction Points:",
    listLabelClass: "text-amber-800",
    itemClass: "items-start",
    Bullet: () => (
      <span className="mt-1 h-2 w-2 rounded-full bg-amber-600 flex-shrink-0" />
    ),
  },

  solution: {
    badgeClass: "bg-emerald-200/60 text-emerald-900",
    listLabel: "Key Solutions Implemented:",
    listLabelClass: "text-emerald-900",
    itemClass: "items-center",
    Bullet: () => (
      <CheckCircle2 className="h-4 w-4 text-emerald-700 flex-shrink-0" />
    ),
  },
};

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

const toArray = (value) => (Array.isArray(value) ? value : []);

const SAFE_DATA_IMAGE =
  /^data:image\/(png|jpe?g|webp|gif|avif);base64,/i;

/**
 * Allows same-site image paths, HTTP(S) image URLs, and supported
 * raster image data URLs.
 */
function safeImageSrc(value) {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  const src = value.trim();

  if (src.startsWith("/") && !src.startsWith("//")) {
    return src;
  }

  if (SAFE_DATA_IMAGE.test(src)) {
    return src;
  }

  try {
    const { protocol, href } = new URL(src);

    return protocol === "https:" || protocol === "http:"
      ? href
      : null;
  } catch {
    return null;
  }
}

function getFeatureTitle(feature) {
  return typeof feature === "string" ? feature : feature?.title;
}

function getFeatureDescription(feature) {
  return typeof feature === "string"
    ? ""
    : feature?.description || "";
}

/* ------------------------------------------------------------------ */
/* Small presentational components                                    */
/* ------------------------------------------------------------------ */

function StatTile({ label, value, className = "" }) {
  return (
    <div
      className={`bg-[#F3EDE2]/60 p-3 rounded-xl border border-amber-900/5 ${className}`}
    >
      <span className="block text-slate-500 text-[11px] uppercase tracking-wider font-bold">
        {label}
      </span>

      <span className="font-semibold text-slate-900">
        {value || "—"}
      </span>
    </div>
  );
}

function InfoCard({ variant, content, className = "", showParagraphs = true, }) {
  if (!content) return null;

  const {
    badgeClass,
    listLabel,
    listLabelClass,
    itemClass,
    Bullet,

  } = INFO_VARIANTS[variant];

  const description = toArray(content.paragraphs).filter(Boolean).join(" ");

  const highlights = toArray(content.highlights);

  return (
    <div
      className={`flex flex-col  rounded-2xl bg-[#F3EDE2] p-6 sm:p-8 border border-amber-900/10 shadow-sm transition hover:shadow-md ${className}`}
    >
      <div>
        <div
          className={`inline-flex items-center gap-2 rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4 ${badgeClass}`}
        >
          <span>{content.tag}</span>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 leading-snug">
          {content.heading}
        </h3>

        {showParagraphs && description && (
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {highlights.length > 0 && (
        <div className="mt-6 pt-6 border-t border-amber-900/10">
          <span
            className={`text-xs font-bold uppercase tracking-wider block mb-3 ${listLabelClass}`}
          >
            {content.listLabel || listLabel}
          </span>

          <ul className="space-y-2">
            {highlights.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className={`flex gap-2 text-sm text-slate-700 ${itemClass}`}
              >
                <Bullet />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ScreenshotCard({
  label,
  shot,
  urlClassName,
  onOpen,
  report,
  className = "",
}) {
  if (!shot) return null;

  const imageSrc = safeImageSrc(shot.src);
  const screenshotLabel = shot.label || label;

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen(shot);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Expand ${screenshotLabel}`}
      onClick={() => onOpen(shot)}
      onKeyDown={handleKeyDown}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-slate-900 p-6 sm:p-8 text-white shadow-md transition hover:shadow-xl flex flex-col justify-between border border-slate-800 min-h-[320px] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${className}`}
    >
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
        <div className="flex items-center gap-2 min-w-0">
          {report ? <FileText className="h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" /> : (
            <>
              <div className="h-3 w-3 rounded-full bg-rose-500/80 flex-shrink-0" />
              <div className="h-3 w-3 rounded-full bg-amber-500/80 flex-shrink-0" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/80 flex-shrink-0" />
            </>
          )}

          <span className={`ml-2 text-xs font-mono truncate ${urlClassName}`}>
            {shot.url || screenshotLabel}
          </span>
        </div>

        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 px-2 py-1 rounded text-[11px] text-amber-400 flex items-center gap-1 flex-shrink-0">
          <Maximize2 className="w-3 h-3" />
          Zoom
        </div>
      </div>

      {/* Screenshot from PortfolioData.js */}
      <div className="my-auto">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={shot.alt || screenshotLabel}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className={report ? "w-full rounded-lg border border-slate-700" : "w-full max-h-56 rounded-lg border border-slate-700 object-cover object-top"}
          />
        ) : (
          <div className="w-full min-h-40 rounded-lg border border-slate-700 bg-slate-950 flex items-center justify-center text-sm text-slate-400">
            Preview not available
          </div>
        )}
      </div>

      {/* Caption */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="block text-xs font-semibold text-slate-300">
            {screenshotLabel}
          </span>

          {shot.caption && (
            <span className="text-xs text-slate-500">
              {shot.caption}
            </span>
          )}
        </div>

        <span className="text-xs text-amber-400 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 flex-shrink-0">
          Click to Expand
          <ChevronRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
}

function CapabilityCard({ capability, index }) {
  const Icon = CAPABILITY_ICONS[capability.icon] ?? Layers;
  const title = getFeatureTitle(capability);
  const description = getFeatureDescription(capability);

  if (!title) return null;

  return (
    <div className="group relative rounded-xl border border-slate-100 bg-[#faf7f1]/50 p-4 transition duration-200 hover:bg-[#F3EDE2]/60 hover:border-amber-300">
      <div className="flex items-center justify-between mb-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-amber-400 group-hover:scale-105 transition-transform">
          <Icon className="h-5 w-5" />
        </div>

        <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-amber-700">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h4 className="text-base font-bold text-slate-900">
        {title}
      </h4>

      {description && (
        <p className="mt-1 text-xs text-slate-600 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

function ResultCard({ result }) {
  return (
    <div className="rounded-xl bg-slate-800/80 p-4 border border-slate-700/60 hover:border-amber-500/50 transition">
      <div className="text-base font-bold text-amber-400 tracking-tight">
        {result.metric || result.title}
      </div>

      <div className="text-xs font-semibold text-slate-200 mt-1">
        {result.label}
      </div>

      <div className="text-sm text-slate-300 mt-2 leading-relaxed">
        {result.detail}
      </div>
    </div>
  );
}

function ScreenshotLightbox({ shot, onClose, report }) {
  const imageSrc = safeImageSrc(shot?.src);
  const screenshotLabel = shot?.label || "Project Screenshot";

  const dialog = useRef(null);

  useEffect(() => {
    const modal = dialog.current;
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    modal.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      modal.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog ref={dialog}
      aria-labelledby="lightbox-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.currentTarget === event.target) onClose(); }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-3xl overflow-auto rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white shadow-2xl backdrop:bg-slate-950/80"
    >
      <div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close preview"
          className="absolute right-4 top-4 rounded-full bg-slate-800 p-2 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" onClick={onClose}/>
        </button>

        <h3
          id="lightbox-title"
          className="text-xl font-bold text-amber-400 mb-2"
        >
          {screenshotLabel}
        </h3>

        {shot.caption && (
          <p className="text-xs text-slate-400 mb-6">
            {shot.caption}
          </p>
        )}

        <div className={report ? "overflow-hidden rounded-xl bg-white" : "h-64 sm:h-80 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center p-4"}>
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={shot.alt || screenshotLabel}
              decoding="async"
              referrerPolicy="no-referrer"
              className={report ? "block w-full" : "max-h-full max-w-full object-contain"}
            />
          ) : (
            <p className="text-center font-mono text-sm text-slate-400">
              Preview not available
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="cd-button cd-button--line cd-button--on-dark"
          >
            Close Preview
          </button>
        </div>
      </div>
    </dialog>
  );
}

/* ------------------------------------------------------------------ */
/* Page sections                                                      */
/* ------------------------------------------------------------------ */

function TopNav({ report }) {
  return (
    <nav className="border-b border-amber-900/10 bg-[#faf7f1]/80 backdrop-blur-md relative px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <Link
          to={BACK_LINK}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>See our work</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-amber-100/80 px-3 py-1 text-xs font-semibold text-amber-900 border border-amber-200">
            {report ? "Sample Case Study" : "Case Study"}
          </span>
        </div>
      </div>
    </nav>
  );
}

function CaseStudyHeader({ caseStudy }) {
  return (
    <header className="mx-auto max-w-3xl text-center mb-16 sm:mb-20">
      <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
        {caseStudy.category && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-800">
            <Sparkles className="w-3 h-3 text-amber-600" />
            {caseStudy.category}
          </span>
        )}

        {caseStudy.client && (
          <>
            <span className="text-slate-300">•</span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-200/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-700">
              <Building2 className="w-3 h-3 text-slate-500" />
              {caseStudy.client}
            </span>
          </>
        )}
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl lg:leading-[1.15]">
        <RevealWords>{caseStudy.title}</RevealWords>
      </h1>

      {caseStudy.summary && (
        <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg lg:text-xl">
          {caseStudy.summary}
        </p>
      )}

      <div className="mt-8 pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left sm:text-center text-xs sm:text-sm">
        <StatTile
          label={caseStudy.isSample ? "Scenario" : "Client"}
          value={caseStudy.client}
        />

        <StatTile
          label={caseStudy.isSample ? "Scope" : "Duration"}
          value={caseStudy.isSample ? "One app and managed devices" : caseStudy.duration || "Not recorded"}
        />

        <StatTile
          label="Industry"
          value={caseStudy.industry}
          className="col-span-2 sm:col-span-1"
        />
      </div>
    </header>
  );
}


function ProblemSolutionSection({ caseStudy, onOpenShot }) {
  const screenshots = toArray(caseStudy.screenshots);

  return (
    <section className="mb-20 space-y-8 sm:space-y-12">
      <div className="text-center max-w-xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Problem &amp; Transformation
        </h2>

        <p className="text-sm text-slate-600 mt-2">
          {caseStudy.isSample ? "How the sample moves from control gaps to a report and fix plan." : "How we diagnosed the issues and built the custom web architecture."}
        </p>
      </div>

      {/* Row 1: Their Problem | Screenshot 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <InfoCard
          variant="problem"
          content={caseStudy.problem}
        />

        {screenshots[0] && (
          <ScreenshotCard
            label="Screenshot 1"
            shot={screenshots[0]}
            urlClassName="text-slate-400"
            onOpen={onOpenShot}
            report={caseStudy.isSample}
          />
        )}
      </div>

      {/* Row 2 and below: Screenshots on the left, one elongated
          Solution card on the right */}
      {(screenshots.length > 1 || caseStudy.solution) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* Left column: Screenshot 2, Screenshot 3, etc. */}
          <div className="flex flex-col gap-8">
            {screenshots.slice(1).map((shot, index) => (
              <ScreenshotCard
                key={`${shot.src}-${index + 1}`}
                label={`Screenshot ${index + 2}`}
                shot={shot}
                urlClassName={
                  index === 0
                    ? "text-emerald-400"
                    : "text-slate-400"
                }
                onOpen={onOpenShot}
                report={caseStudy.isSample}
              />
            ))}
          </div>

          {/* Right column: One continuous Solution card */}
          {caseStudy.solution && (
            <InfoCard
              variant="solution"
              content={caseStudy.solution}
              className="h-full"
            />
          )}
        </div>
      )}
    </section>
  );
}


function CapabilitiesCard({ capabilities, stack }) {
  const validCapabilities = capabilities.filter((capability) =>
    Boolean(getFeatureTitle(capability))
  );

  if (validCapabilities.length === 0) return null;

  return (
    <div className="lg:col-span-7 rounded-2xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
              Architecture
            </span>

            <h3 className="text-2xl font-bold text-slate-900 mt-0.5">
              Key Capabilities
            </h3>
          </div>

          <span className="hidden sm:inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {validCapabilities.length} Core Modules
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {validCapabilities.map((capability, index) => (
            <CapabilityCard
              key={`${getFeatureTitle(capability)}-${index}`}
              capability={capability}
              index={index}
            />
          ))}
        </div>
      </div>

      {stack && (
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Technology stack: {stack}</span>
        </div>
      )}
    </div>
  );
}

function ResultsCard({ results, note }) {
  const validResults = toArray(results).filter(
    (result) =>
      result &&
      (result.metric || result.label || result.title || result.detail)
  );

  if (validResults.length === 0 && !note) return null;

  return (
    <div className="lg:col-span-5 rounded-2xl bg-slate-900 p-6 sm:p-8 text-white shadow-md flex flex-col justify-between border border-slate-800">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Impact
            </span>

            <h3 className="text-2xl font-bold text-white mt-0.5">
              Results &amp; Impact
            </h3>
          </div>

          <Award className="h-6 w-6 text-amber-400" />
        </div>

        {note && (
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            {note}
          </p>
        )}

        {validResults.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {validResults.map((result, index) => (
              <ResultCard
                key={`${result.title || result.label || result.metric}-${index}`}
                result={result}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
        <span className="text-xs text-slate-400">
          Want to discuss a similar project?
        </span>

        <Link
          to={CONTACT_LINK}
          className="cd-button cd-button--primary"
        >
          Let&apos;s Talk
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

function CaseStudyView({ caseStudy }) {
  const [activeShot, setActiveShot] = useState(null);

  const closeLightbox = useCallback(() => {
    setActiveShot(null);
  }, []);

  // features in PortfolioData.js supply title and description.
  const capabilities = toArray(caseStudy.features);

  // All screenshots are supplied through screenshots[].
  const screenshots = toArray(caseStudy.screenshots);

  // All result metrics are supplied through results[].
  const results = toArray(caseStudy.results);

  // Keep the existing result string usable as supporting copy
  // while the separate results metrics are populated in the data.
  const resultsNote = caseStudy.isSample
    ? "Sample findings are shown as open. Each has a proposed owner and a closure check."
    : "What the project materials show. Measured changes in cost, time or revenue have not been verified.";

  const hasCapabilities = capabilities.some((feature) =>
    Boolean(getFeatureTitle(feature))
  );

  const hasResults =
    results.some(
      (result) =>
        result &&
        (result.metric || result.label || result.title || result.detail)
    ) || Boolean(resultsNote);

  return (
    <div className="min-h-screen bg-[#faf7f1] text-slate-800 font-sans antialiased selection:bg-amber-200">
      <TopNav report={caseStudy.isSample} />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <CaseStudyHeader caseStudy={caseStudy} />

        <ProblemSolutionSection
          caseStudy={caseStudy}
          onOpenShot={setActiveShot}
        />

        <section className="mb-10 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="project-timeline-title">
          <h2 id="project-timeline-title" className="text-2xl font-bold text-slate-900">Project timeline</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{caseStudy.isSample
            ? "The three phases show how a scoped assessment would run."
            : caseStudy.duration
            ? `Documented duration: ${caseStudy.duration.toLowerCase()}. Individual milestone dates are not recorded.`
            : "The project materials show the work below. Dates and the order of delivery have not been confirmed."}</p>
          <ol className="mt-5 grid gap-3 sm:grid-cols-3">
            {caseStudy.timeline.map((phase, index) => (
              <li key={phase} className="rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm font-semibold text-slate-800">
                <span className="mr-2 text-amber-800">{index + 1}.</span>{phase}
              </li>
            ))}
          </ol>
        </section>

        {(hasCapabilities || hasResults) && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {hasCapabilities && (
              <CapabilitiesCard
                capabilities={capabilities}
                stack={!caseStudy.isSample && (caseStudy.stack?.join(" · ") || "Not confirmed")}
              />
            )}

            {hasResults && (
              <ResultsCard
                results={results}
                note={resultsNote}
              />
            )}
          </section>
        )}
        <div className="mt-8 flex flex-wrap gap-4">
          {caseStudy.isSample && <Link to="/services#cybersecurity" className="cd-button cd-button--line">Cybersecurity services</Link>}
          {caseStudy.website && <a href={caseStudy.website} className="cd-button cd-button--line">Visit client website</a>}
          <Link to={`/case-studies/${portfolioCaseStudies[(portfolioCaseStudies.indexOf(caseStudy) + 1) % portfolioCaseStudies.length].id}`} className="cd-button cd-button--line">Next case study</Link>
        </div>
      </div>

      {activeShot && (
        <ScreenshotLightbox
          shot={activeShot}
          onClose={closeLightbox}
          report={caseStudy.isSample}
        />
      )}

      
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Not found                                                          */
/* ------------------------------------------------------------------ */

function CaseStudyNotFound() {
  return (
    <div className="min-h-screen bg-[#faf7f1] text-slate-800 font-sans antialiased flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Case study not found
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          The case study you are looking for does not exist or has been moved.
        </p>

        <Link
          to={BACK_LINK}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-amber-700"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>See Our Work</span>
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page entry: /case-studies/:id                                      */
/* ------------------------------------------------------------------ */

export default function CaseStudyPage() {
  const { id } = useParams();

  const caseStudy = useMemo(
    () =>
      toArray(portfolioCaseStudies).find(
        (item) => String(item.id) === id
      ),
    [id]
  );

  if (!caseStudy) {
    return <CaseStudyNotFound />;
  }

  return <CaseStudyView caseStudy={caseStudy} />;
}
