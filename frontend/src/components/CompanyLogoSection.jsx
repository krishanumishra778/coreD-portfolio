import "./ui/Marquee.css";

const companyLogos = [
  { id: "tohfabazzar", name: "TohfaBazzar", logo: "/Images/tohfabazzar.png" },
  { id: "crawldigitally", name: "Crawl Digitally", logo: "/Images/CrawlDigitally.png" },
  { id: "nexttechwaves", name: "NextTechWaves", logo: "/Images/NextTechWaves.png" },
  { id: "ads-marker", name: "Ads Marker", logo: "/Images/AdsMarker.png" },
];

export default function CompanyLogosSection() {
  return (
    <section id="client-work" aria-label="Selected clients" className="client-logo-strip">
      <div className="client-logo-track">
        {[0, 1].map((group) => (
          <div key={group} className="client-logo-group" aria-hidden={group === 1 ? true : undefined}>
            {companyLogos.map((company) => (
              <div key={company.id} className="client-logo-item">
                <div className="client-logo-frame">
                  <img src={company.logo} alt={group === 0 ? company.name : ""} width="200" height="80" decoding="async" draggable={false} />
                </div>
                <span aria-hidden="true">+</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
