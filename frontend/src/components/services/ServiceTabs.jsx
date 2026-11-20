import { useRef } from "react";
import { Check, Circle } from "lucide-react";

export default function ServiceTabs({ services, activeId, onChange }) {
  const tabs = useRef([]);
  function handleKey(event, index) {
    const step = { ArrowLeft: -1, ArrowUp: -1, ArrowRight: 1, ArrowDown: 1 }[event.key];
    const next = event.key === "Home" ? 0 : event.key === "End" ? services.length - 1
      : step ? (index + step + services.length) % services.length : null;
    if (next === null) return;
    event.preventDefault();
    onChange(services[next].id);
    tabs.current[next]?.focus({ preventScroll: true });
  }

  return (
    <div className="mx-auto mb-8 grid w-full max-w-5xl grid-cols-2 gap-1 rounded-2xl border border-black/[0.06] bg-black/[0.035] p-1.5 shadow-inner sm:gap-1.5 lg:grid-cols-5" role="tablist" aria-label="Services and pricing">
      {services.map((service, index) => (
        <button key={service.id} ref={(node) => { tabs.current[index] = node; }}
          type="button" role="tab" id={`service-tab-${service.id}`}
          aria-controls="service-content" aria-selected={activeId === service.id}
          tabIndex={activeId === service.id ? 0 : -1} onClick={() => onChange(service.id)}
          onKeyDown={(event) => handleKey(event, index)}
          className={`flex min-h-12 items-center justify-center gap-1.5 rounded-xl border px-2 py-2 text-center text-xs font-semibold leading-tight sm:text-sm ${index === services.length - 1 ? "col-span-2 lg:col-span-1" : ""} ${activeId === service.id ? "border-black/[0.05] bg-white text-[#14161A] shadow-sm" : "border-transparent text-[#6B6B6B] hover:bg-white/60"}`}>
          {activeId === service.id ? <Check size={14} className="shrink-0 text-[#FF9100]" aria-hidden="true" /> : <Circle size={11} className="shrink-0 text-black/30" aria-hidden="true" />}
          {service.label}
        </button>
      ))}
    </div>
  );
}
