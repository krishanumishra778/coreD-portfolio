import { crmAddOnGroups } from "./crmModules.js";

export default function QuoteModules({ selected, onChange, disabled }) {
  return (
    <fieldset className="quote-modules min-w-0 rounded-2xl border border-black/10 p-4" disabled={disabled}>
      <legend className="px-1 text-sm font-bold">AI roles &amp; CRM modules · by quote</legend>
      <p className="mb-3 text-sm leading-6 text-[#555]">Choose the roles you want to discuss. Custom integration work is priced separately after review. Work already included in your package is charged once.</p>
      <div className="space-y-2">
        {crmAddOnGroups.map(({ id, title, items }) => (
          <details key={id} open={items.some(({ id: moduleId }) => selected.includes(moduleId)) || undefined} className="min-w-0 rounded-xl border border-black/10 bg-[var(--cd-paper)] px-3">
            <summary className="cursor-pointer py-3 text-sm font-bold">{title}</summary>
            <div className="space-y-2 pb-3">
              {items.map(({ id: moduleId, name, detail }) => (
                <label key={moduleId} className="flex min-h-11 items-start gap-3 py-2 text-sm leading-6">
                  <input type="checkbox" name="ModuleIds" value={moduleId} checked={selected.includes(moduleId)}
                    onChange={(event) => onChange(event.target.checked ? [...selected, moduleId] : selected.filter((value) => value !== moduleId))}
                    className="mt-1 h-4 w-4 shrink-0 accent-amber-800" />
                  <span className="min-w-0"><strong className="block">{name}</strong><span className="text-[#555]">{detail}</span></span>
                </label>
              ))}
            </div>
          </details>
        ))}
      </div>
      <p className="mt-3 text-sm leading-6 text-[#555]" role="status">{selected.length ? `${selected.length} role${selected.length === 1 ? "" : "s"} selected for scoping. Final price will be confirmed in writing.` : "No custom roles selected. You can describe another requirement in the project description."}</p>
    </fieldset>
  );
}
