import { createFileRoute } from "@tanstack/react-router";
import { SERVICES } from "@/lib/content";
import { ASSETS } from "@/lib/assets";

export const Route = createFileRoute("/heritage/services")({
  head: () => ({
    meta: [
      { title: "Services — Senior Services Adult Family Home" },
      { name: "description", content: "Daily living support, meals, medication management, memory care, and 24-hour supervision in a six-resident home." },
      { property: "og:title", content: "Our Services" },
      { property: "og:image", content: ASSETS.dining },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
      <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--h-primary)" }}>Services</p>
      <h1 className="font-display text-5xl md:text-6xl mt-4">Care, the way it should be.</h1>
      <p className="mt-6 text-lg text-stone-600 max-w-2xl">Every service below is included in our base rate — no à la carte fees, no surprise charges. Provided within the scope of our DSHS adult family home license.</p>
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        {SERVICES.map((s) => (
          <div key={s.title} className="p-8 rounded-2xl bg-white" style={{ border: "1px solid var(--h-border)" }}>
            <h2 className="font-display text-2xl">{s.title}</h2>
            <p className="mt-3 text-stone-600">{s.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-12 text-sm text-stone-500 max-w-3xl">Compliance note: Services are limited to the scope of our Washington DSHS Adult Family Home license. We do not provide skilled nursing beyond delegated tasks. Specialty designations on file: dementia care.</p>
    </div>
  );
}