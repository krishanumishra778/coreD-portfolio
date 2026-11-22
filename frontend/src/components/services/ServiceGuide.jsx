import { basicAgents, standardAgents } from "./servicesData.js";
import { serviceGuides } from "./serviceGuides.js";

export default function ServiceGuide({ service }) {
  const guide = serviceGuides[service.id];
  if (!guide) return null;

  return (
    <section className="mb-8 rounded-3xl border border-black/10 bg-[#f3efe8] p-5 sm:p-7" aria-labelledby="service-guide-title">
      <h3 id="service-guide-title" className="text-xl font-bold tracking-tight text-[#14161a] sm:text-2xl">{guide.title}</h3>
      <p className="mt-3 max-w-4xl text-sm leading-6 text-[#555]">{guide.description}</p>
      <dl className="mt-5 grid gap-5 md:grid-cols-3">
        {guide.steps.map(([title, detail]) => <div key={title} className="min-w-0">
          <dt className="font-bold text-[#14161a]">{title}</dt>
          <dd className="mt-2 text-sm leading-6 text-[#555]">{detail}</dd>
        </div>)}
      </dl>
      {service.id === "ai-agents" && <div className="mt-6 grid gap-4 border-t border-black/10 pt-6 md:grid-cols-2">
        {[["basic", "Basic options · choose one", basicAgents], ["standard", "Standard options · choose one, plus one Basic", standardAgents]].map(([type, title, options]) => (
          <section key={type} id={`agent-options-${type}`} className="min-w-0 rounded-2xl border border-black/10 bg-white p-5" aria-labelledby={`agent-options-${type}-title`}>
            <h4 id={`agent-options-${type}-title`} className="font-bold text-[#14161a]">{title}</h4>
            <ul className="mt-3 space-y-4 text-sm leading-6 text-[#555]">
              {options.map(([id, name, detail]) => <li key={id}><strong className="block text-[#14161a]">{name}</strong>{detail}</li>)}
            </ul>
          </section>
        ))}
      </div>}
    </section>
  );
}
