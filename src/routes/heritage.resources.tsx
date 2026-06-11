import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { blogQueryOptions } from "@/lib/site-data";
import { FAMILY_RESOURCES, FAQ, RESOURCE_TOPICS, TOUR_CHECKLIST } from "@/lib/content";
import {
  BookOpen,
  Check,
  ClipboardCheck,
  FileSearch,
  HelpCircle,
  Home,
  MessageCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/heritage/resources")({
  head: () => ({
    meta: [
      { title: "Adult Family Home FAQ & Resources — Mount Vernon, WA" },
      {
        name: "description",
        content:
          "Answers about adult family homes in Mount Vernon and Skagit County — licensing, Medicaid, caregiver ratios, DSHS inspections, and tour checklists.",
      },
      { property: "og:title", content: "Adult Family Home FAQ & Resources — Mount Vernon, WA" },
      { property: "og:url", content: "https://ssafh.lovable.app/heritage/resources" },
    ],
    links: [{ rel: "canonical", href: "https://ssafh.lovable.app/heritage/resources" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Page,
});

function Page() {
  const { data: posts = [] } = useQuery(blogQueryOptions());
  return (
    <div className="section-y">
      <div className="site-container">
        <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--h-primary)" }}>
          Resources
        </p>
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-end">
          <div>
            <h1 className="font-display text-5xl md:text-6xl mt-4">For families, by experience.</h1>
            <p className="mt-6 text-lg text-stone-600 max-w-2xl">
              Practical guidance for comparing homes, planning tours, understanding public records,
              and helping a loved one move with dignity.
            </p>
          </div>
          <div className="rounded-2xl p-6 bg-white" style={{ border: "1px solid var(--h-border)" }}>
            <p className="text-xs uppercase tracking-widest text-stone-500">Best next step</p>
            <p className="font-display text-2xl mt-2">Visit before deciding.</p>
            <p className="mt-2 text-sm text-stone-600">
              A calm tour will answer more than a brochure can. Bring the checklist below and
              compare notes as a family afterward.
            </p>
            <Link
              to="/heritage/tour"
              className="inline-flex mt-5 px-5 py-2.5 rounded-full text-white text-sm font-medium"
              style={{ background: "var(--h-primary)" }}
            >
              Schedule a tour
            </Link>
          </div>
        </div>
      </div>

      <section className="wide-container mt-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {RESOURCE_TOPICS.map((topic, index) => {
            const icons = [Home, ClipboardCheck, FileSearch, MessageCircle];
            const Icon = icons[index] ?? BookOpen;
            return (
              <article
                key={topic.title}
                className="p-6 rounded-xl bg-white"
                style={{ border: "1px solid var(--h-border)" }}
              >
                <Icon className="size-5 mb-4" style={{ color: "var(--h-primary)" }} />
                <h2 className="font-display text-xl">{topic.title}</h2>
                <p className="mt-2 text-sm text-stone-600">{topic.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="wide-container mt-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <p
              className="text-xs uppercase tracking-[0.25em]"
              style={{ color: "var(--h-primary)" }}
            >
              Guides
            </p>
            <h2 className="font-display text-4xl md:text-5xl mt-2">
              Useful before the first call.
            </h2>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {FAMILY_RESOURCES.map((r) => (
            <div
              key={r.title}
              className="p-6 rounded-xl bg-white"
              style={{ border: "1px solid var(--h-border)" }}
            >
              <h3 className="font-display text-lg">{r.title}</h3>
              <p className="mt-2 text-sm text-stone-600">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 py-16" style={{ background: "var(--h-surface)" }}>
        <div className="wide-container grid lg:grid-cols-[1fr_1fr] gap-12">
          <div>
            <p
              className="text-xs uppercase tracking-[0.25em]"
              style={{ color: "var(--h-primary)" }}
            >
              Tour checklist
            </p>
            <h2 className="font-display text-4xl md:text-5xl mt-2 mb-6">What to bring and ask.</h2>
            <ul className="space-y-3 text-stone-700">
              {TOUR_CHECKLIST.map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="size-4 mt-1 shrink-0" style={{ color: "var(--h-primary)" }} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl p-8 bg-white" style={{ border: "1px solid var(--h-border)" }}>
            <FileSearch className="size-7 mb-5" style={{ color: "var(--h-primary)" }} />
            <h2 className="font-display text-3xl mb-4">DSHS inspection lookup</h2>
            <p className="text-stone-600">
              Washington publishes inspection reports for licensed adult family homes. Licensing
              documentation is available upon request during admissions.
            </p>
            <a
              href="https://fortress.wa.gov/dshs/adsaapps/lookup/"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block px-5 py-2.5 rounded-full text-white"
              style={{ background: "var(--h-primary)" }}
            >
              Open DSHS lookup →
            </a>
          </div>
        </div>
      </section>

      <section className="site-container mt-20">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="size-6" style={{ color: "var(--h-primary)" }} />
          <h2 className="font-display text-3xl">Frequently asked</h2>
        </div>
        <Accordion
          type="single"
          collapsible
          className="bg-white rounded-2xl px-6"
          style={{ border: "1px solid var(--h-border)" }}
        >
          {FAQ.map((item, i) => (
            <AccordionItem key={item.q} value={`i${i}`}>
              <AccordionTrigger className="font-display text-lg text-left">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-stone-700">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {posts.length > 0 && (
        <section className="site-container mt-16">
          <h2 className="font-display text-3xl mb-6">From our journal</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((p) => (
              <article
                key={p.id}
                className="p-6 rounded-xl bg-white"
                style={{ border: "1px solid var(--h-border)" }}
              >
                <h3 className="font-display text-xl">{p.title}</h3>
                {p.excerpt && <p className="mt-2 text-sm text-stone-600">{p.excerpt}</p>}
              </article>
            ))}
          </div>
        </section>
      )}

      <div
        className="site-container mt-16 text-center p-8 rounded-2xl"
        style={{ background: "var(--h-primary-soft)" }}
      >
        <p className="text-stone-700">Have a question we haven't answered?</p>
        <Link
          to="/heritage/contact"
          className="inline-block mt-3 px-6 py-3 rounded-full text-white"
          style={{ background: "var(--h-primary)" }}
        >
          Ask us directly
        </Link>
      </div>
    </div>
  );
}
