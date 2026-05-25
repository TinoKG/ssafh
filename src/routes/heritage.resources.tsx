import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { blogQueryOptions, settingsQueryOptions } from "@/lib/site-data";
import { FAMILY_RESOURCES, FAQ, TOUR_CHECKLIST } from "@/lib/content";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/heritage/resources")({
  head: () => ({
    meta: [
      { title: "Resources & FAQ — Skagit Valley Care Home" },
      { name: "description", content: "Guides, tour checklists, DSHS inspection links, and answers to questions families ask most." },
      { property: "og:title", content: "Resources for Families" },
    ],
  }),
  component: Page,
});

function Page() {
  const { data: posts = [] } = useQuery(blogQueryOptions());
  const { data: s } = useQuery(settingsQueryOptions());
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
      <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--h-primary)" }}>Resources</p>
      <h1 className="font-display text-5xl md:text-6xl mt-4">For families, by experience.</h1>

      <section className="mt-16">
        <h2 className="font-display text-3xl mb-6">Guides</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {FAMILY_RESOURCES.map((r) => (
            <div key={r.title} className="p-6 rounded-xl bg-white" style={{ border: "1px solid var(--h-border)" }}>
              <h3 className="font-display text-lg">{r.title}</h3>
              <p className="mt-2 text-sm text-stone-600">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid lg:grid-cols-[1fr_1fr] gap-12">
        <div>
          <h2 className="font-display text-3xl mb-4">Tour checklist</h2>
          <ul className="space-y-2 text-stone-700">
            {TOUR_CHECKLIST.map((t) => <li key={t}>· {t}</li>)}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-3xl mb-4">DSHS inspection lookup</h2>
          <p className="text-stone-600">Washington publishes inspection reports for every licensed adult family home. Our license number is <strong>{s?.dshs_license}</strong>.</p>
          <a href="https://fortress.wa.gov/dshs/adsaapps/lookup/" target="_blank" rel="noreferrer" className="mt-4 inline-block px-5 py-2.5 rounded-full text-white" style={{ background: "var(--h-primary)" }}>Open DSHS lookup →</a>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-3xl mb-6">Frequently asked</h2>
        <Accordion type="single" collapsible className="bg-white rounded-2xl px-6" style={{ border: "1px solid var(--h-border)" }}>
          {FAQ.map((item, i) => (
            <AccordionItem key={item.q} value={`i${i}`}>
              <AccordionTrigger className="font-display text-lg text-left">{item.q}</AccordionTrigger>
              <AccordionContent className="text-stone-700">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {posts.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-3xl mb-6">From our journal</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((p) => (
              <article key={p.id} className="p-6 rounded-xl bg-white" style={{ border: "1px solid var(--h-border)" }}>
                <h3 className="font-display text-xl">{p.title}</h3>
                {p.excerpt && <p className="mt-2 text-sm text-stone-600">{p.excerpt}</p>}
              </article>
            ))}
          </div>
        </section>
      )}

      <div className="mt-16 text-center p-8 rounded-2xl" style={{ background: "var(--h-primary-soft)" }}>
        <p className="text-stone-700">Have a question we haven't answered?</p>
        <Link to="/heritage/contact" className="inline-block mt-3 px-6 py-3 rounded-full text-white" style={{ background: "var(--h-primary)" }}>Ask us directly</Link>
      </div>
    </div>
  );
}