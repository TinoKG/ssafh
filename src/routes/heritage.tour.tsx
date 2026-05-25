import { createFileRoute } from "@tanstack/react-router";
import { InquiryForm } from "@/components/shared/InquiryForm";
import { TOUR_CHECKLIST } from "@/lib/content";

export const Route = createFileRoute("/heritage/tour")({
  head: () => ({
    meta: [
      { title: "Schedule a Tour — Skagit Valley Care Home" },
      { name: "description", content: "Schedule an in-person tour of our adult family home in Mount Vernon, WA. 45 minutes, no pressure." },
      { property: "og:title", content: "Schedule a Tour" },
    ],
  }),
  component: Page,
});

const STEPS = [
  { n: "1", title: "Pick a time", body: "Tell us a day and time that works. We confirm within a few hours." },
  { n: "2", title: "Visit", body: "Meet the owner and caregivers, see the rooms, and walk the garden." },
  { n: "3", title: "Decide on your timeline", body: "No pressure. Take a few days. Talk it over with family." },
];

function Page() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
      <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--h-primary)" }}>Visit</p>
      <h1 className="font-display text-5xl md:text-6xl mt-4">Come spend 45 minutes with us.</h1>
      <p className="mt-6 text-lg text-stone-600 max-w-2xl">Tours are calmest mid-morning, and we'll always offer coffee. Bring your questions.</p>

      <div className="mt-12 grid lg:grid-cols-[1fr_1fr] gap-12">
        <div>
          <h2 className="font-display text-3xl">What to expect</h2>
          <ol className="mt-6 space-y-5">
            {STEPS.map((s) => (
              <li key={s.n} className="grid grid-cols-[40px_1fr] gap-4">
                <span className="size-9 grid place-items-center rounded-full text-white font-display" style={{ background: "var(--h-primary)" }}>{s.n}</span>
                <div><h3 className="font-display text-xl">{s.title}</h3><p className="text-stone-600 text-sm mt-1">{s.body}</p></div>
              </li>
            ))}
          </ol>

          <h2 className="font-display text-2xl mt-12">Tour checklist</h2>
          <ul className="mt-3 space-y-2 text-stone-700 text-sm">
            {TOUR_CHECKLIST.map((t) => <li key={t}>· {t}</li>)}
          </ul>
        </div>
        <div className="p-8 rounded-2xl bg-white h-fit" style={{ border: "1px solid var(--h-border)" }}>
          <h2 className="font-display text-2xl mb-6">Request a tour</h2>
          <InquiryForm kind="tour" design="heritage" sourcePath="/heritage/tour" variant="heritage" showSchedule submitLabel="Request tour" />
        </div>
      </div>
    </div>
  );
}