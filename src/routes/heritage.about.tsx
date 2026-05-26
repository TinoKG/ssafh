import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { settingsQueryOptions } from "@/lib/site-data";
import { ASSETS } from "@/lib/assets";

export const Route = createFileRoute("/heritage/about")({
  head: () => ({
    meta: [
      { title: "About Us — Senior Services Adult Family Home" },
      { name: "description", content: "Family-owned adult family home in Mount Vernon. Meet the owner, caregivers, and mission behind our home." },
      { property: "og:title", content: "About Senior Services Adult Family Home" },
      { property: "og:description", content: "A small home, run by a family with deep Skagit Valley roots." },
      { property: "og:image", content: ASSETS.garden },
    ],
  }),
  component: Page,
});

const TIMELINE = [
  { year: "Care-centered", title: "Doors opened", body: "Founded with one goal: a true home for six neighbors in a comfortable residential setting." },
  { year: "Licensed", title: "State-regulated care", body: "Built around licensed adult family home standards, clear communication, and steady day-to-day support." },
  { year: "Today", title: "A growing legacy", body: "Dozens of families served — and friendships that outlast a stay." },
];

function Page() {
  const { data: s } = useQuery(settingsQueryOptions());
  return (
    <article className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
      <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--h-primary)" }}>About</p>
      <h1 className="font-display text-5xl md:text-6xl mt-4">Family-owned, since {s?.year_opened ?? "[YEAR]"}.</h1>
      <p className="mt-6 text-lg text-stone-600 max-w-3xl">
        We're a small, licensed adult family home in {s?.city ?? "Mount Vernon"}, {s?.state ?? "WA"}. Our job is simple and serious: care for six people the way we'd want our own family cared for.
      </p>

      <img src={ASSETS.garden} alt="Landscaped exterior garden and lawn at Senior Services Adult Family Home" className="mt-12 rounded-2xl w-full aspect-[16/9] object-cover" width={1400} height={1000} loading="lazy" />

      <div className="grid md:grid-cols-2 gap-12 mt-16">
        <div>
          <h2 className="font-display text-3xl">Our mission</h2>
          <p className="mt-4 text-stone-600">To make growing older feel less like a transition and more like coming home — with the dignity, autonomy, and warmth every person deserves.</p>
        </div>
        <div>
          <h2 className="font-display text-3xl">The owner</h2>
          <p className="mt-4 text-stone-600">Joycen Garuiya personally oversees the home and welcomes families who want a calm, dignified, residential care setting. You'll meet her during your tour and be able to ask questions directly.</p>
        </div>
      </div>

      <h2 className="font-display text-3xl mt-16">Our caregivers</h2>
      <p className="mt-4 text-stone-600 max-w-2xl">Our team is small and steady — first names known to every resident. Each caregiver is trained in Washington-required CPR/First Aid, Nurse Delegation, and Dementia Specialty when applicable.</p>

      <h2 className="font-display text-3xl mt-16">Credentials</h2>
      <ul className="mt-4 grid sm:grid-cols-2 gap-3 text-stone-700">
        <li>· DSHS Licensed Adult Family Home — {s?.dshs_license}</li>
        <li>· Annual state inspections passed</li>
        <li>· CPR / First Aid certified staff</li>
        <li>· Nurse Delegation trained</li>
      </ul>

      <h2 className="font-display text-3xl mt-16">A short history</h2>
      <ol className="mt-6 space-y-6">
        {TIMELINE.map((t) => (
          <li key={t.title} className="grid grid-cols-[80px_1fr] gap-6">
            <span className="text-sm text-stone-500 pt-1">{t.year}</span>
            <div><h3 className="font-display text-xl">{t.title}</h3><p className="text-stone-600 mt-1">{t.body}</p></div>
          </li>
        ))}
      </ol>

      <div className="mt-16 p-8 rounded-2xl text-center" style={{ background: "var(--h-primary-soft)" }}>
        <h2 className="font-display text-3xl">Come see for yourself.</h2>
        <p className="mt-2 text-stone-700">A tour takes about 45 minutes. Bring questions — we'll answer all of them.</p>
        <Link to="/heritage/tour" className="inline-block mt-5 px-6 py-3 rounded-full text-white font-medium" style={{ background: "var(--h-primary)" }}>Schedule a tour</Link>
      </div>
    </article>
  );
}