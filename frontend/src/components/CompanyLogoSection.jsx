
import { useEffect, useRef } from "react";
import gsap from "gsap";


/* =========================
   COMPANY LOGO DATA
========================= */

const companyLogos = [
  {
    id: "tohfabazzar",
    name: "TohfaBazzar",
    logo: "/Images/tohfabazzar.png",
    size: "large",
  },
  {
    id: "crawldigitally",
    name: "Crawl Digitally",
    logo: "/Images/CrawlDigitally.png",
    size: "medium",
  },
  {
    id: "nexttechwaves",
    name: "NextTechWaves",
    logo: "/Images/NextTechWaves.png",
    size: "medium",
  },
  {
    id: "ads-marker",
    name: "Ads Marker",
    logo: "/Images/AdsMarker.png",
    size: "large",
  },
];

/* =========================
   LOGO ITEM
========================= */

function CompanyLogo({ company }) {
  const isLarge = company.size === "large";

  return (
    <div className="flex shrink-0 items-center gap-4 sm:gap-7">
      <div className="flex h-20 w-full min-w-0 items-center justify-center rounded-xl border border-white/10 bg-white px-3 py-2 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/50 md:h-[92px] md:motion-safe:min-w-[218px] md:px-4">
        <img
          src={company.logo}
          alt={company.name}
          width={isLarge ? 200 : 150}
          height={isLarge ? 70 : 42}
          loading="eager"
          decoding="async"
          draggable={false}
          className={`w-auto max-w-full object-contain md:motion-safe:max-w-[190px] ${
            isLarge ? "h-14 md:h-[70px]" : "h-12 md:h-14"
          }`}
        />
      </div>

      <span
        aria-hidden="true"
        className="hidden select-none md:motion-safe:block text-lg font-light text-zinc-600 sm:text-xl"
      >
        +
      </span>
    </div>
  );
}

/* =========================
   GSAP MARQUEE
========================= */

export default function CompanyLogosSection() {
  const trackRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return undefined;

    const mm = gsap.matchMedia();

    // Animate from right to left.
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.fromTo(
        track,
        { xPercent: 0 },
        {
          xPercent: -50,
          duration: 24,
          ease: "none",
          repeat: -1,
        }
      );

      animationRef.current = tween;

      return () => {
        tween.kill();

        if (animationRef.current === tween) {
          animationRef.current = null;
        }
      };
    });

    // Keep the logos still when reduced motion is requested.
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(track, { xPercent: 0 });
    });

    return () => {
      mm.revert();
      animationRef.current = null;
    };
  }, []);

  const pauseAnimation = () => {
    animationRef.current?.pause();
  };

  const resumeAnimation = () => {
    animationRef.current?.resume();
  };

  return (
    <section
      id="client-work"
      aria-label="Selected clients"
      className="relative w-full overflow-hidden bg-white  py-5 sm:py-6"
      onMouseEnter={pauseAnimation}
      onMouseLeave={resumeAnimation}
      onFocus={pauseAnimation}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          resumeAnimation();
        }
      }}
    >
      <div className="w-full overflow-clip">
        <div ref={trackRef} className="w-full md:motion-safe:flex md:motion-safe:w-max">
          {[0, 1].map((groupIndex) => (
            <div
              key={groupIndex}
              aria-hidden={groupIndex === 1 ? true : undefined}
              className={[
                "items-center gap-3 px-3 md:gap-6 md:px-7 lg:gap-10",
                "md:motion-safe:min-w-[100vw] md:motion-safe:shrink-0 md:motion-safe:justify-around",
                groupIndex === 0
                  ? "grid grid-cols-2 md:motion-safe:flex lg:grid-cols-4"
                  : "hidden md:motion-safe:flex",
              ].join(" ")}
            >
              {companyLogos.map((company) => (
                <CompanyLogo key={company.id} company={company} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
