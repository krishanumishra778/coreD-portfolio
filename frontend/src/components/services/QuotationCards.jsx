import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { basicAgents, formatPrice, quoteLink, standardAgents } from "./servicesData.js";

export default function QuotationCards({ service, plans = service.plans }) {
  return (
    <div className={plans.length === 4
      ? "mx-auto grid max-w-7xl items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4"
      : `mx-auto grid max-w-6xl items-stretch gap-5 md:grid-cols-2 ${plans.length === 3 ? "xl:grid-cols-3" : ""}`}>
      {plans.map((pkg) => {
        const featured = pkg.id === "leadforge-x";
        return (
          <article key={pkg.id} id={"plan-" + pkg.id} tabIndex={-1} className={"flex min-w-0 flex-col rounded-3xl border p-6 shadow-sm " + (featured ? "border-white/10 bg-[#14161a] text-white" : "border-black/10 bg-white text-[#14161a]")}>
            <p className={"text-xs font-bold uppercase tracking-wider " + (featured ? "text-amber-300" : "text-amber-800")}>{pkg.tier}</p>
            <h3 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">{pkg.name}</h3>
            <p className="mt-2 text-2xl font-bold">{formatPrice(pkg)}{pkg.amount != null && <small className="ml-1 text-xs">USD</small>}</p>
            <p className={"mt-2 text-sm " + (featured ? "text-white/80" : "text-[#555]")}>{pkg.fit}</p>
            <div className={"mt-5 flex-1 border-t pt-4 text-sm leading-6 " + (featured ? "border-white/15" : "border-black/10")}>
              <h4 className="mb-2 font-bold">What you get</h4>
              <ul className="space-y-2">{pkg.includes.map((item) => <li key={item} className="flex gap-2"><Check size={15} className="mt-1 shrink-0 text-orange-500" aria-hidden="true" />{item}</li>)}</ul>
              {pkg.choices?.map((type) => (
                <div key={type} className="mt-4">
                  <h4 className="font-bold">{type === "basic" ? "Choose one Basic option" : "Choose one Standard option"}</h4>
                  <p className="mt-1 text-[#555]">{(type === "basic" ? basicAgents : standardAgents).map(([, label]) => label).join(" · ")}</p>
                  <a href={`#agent-options-${type}`} className="cd-text-link mt-1 inline-block">Read what each {type === "basic" ? "Basic" : "Standard"} option does</a>
                </div>
              ))}
              <p className={"mt-4 border-t pt-3 text-xs leading-5 " + (featured ? "border-white/15 text-white/75" : "border-black/10 text-[#555]")}><strong>Scope:</strong> {pkg.boundary}</p>
            </div>
            <Link to={quoteLink(service, pkg)} className="cd-button cd-button--primary cd-button--block mt-6" aria-label={"Request quote: " + pkg.name}>
              Request quote <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </article>
        );
      })}
    </div>
  );
}
