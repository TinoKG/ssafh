import { createFileRoute, Link } from "@tanstack/react-router";
import { ADMISSION_STEPS } from "@/lib/content";
import { InquiryForm } from "@/components/shared/InquiryForm";

export const Route = createFileRoute("/heritage/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — Adult Family Home in Mount Vernon, WA" },
      { name: "description", content: "Five-step admissions process for our Mount Vernon, WA adult family home. Washington RCW 70.128.280 disclosures, Medicaid and private pay options for Skagit County families." },
      { property: "og:title", content: "Admissions — Mount Vernon, WA Adult Family Home" },
      { property: "og:url", content: "https://ssafh.lovable.app/heritage/admissions" },
    ],
    links: [{ rel: "canonical", href: "https://ssafh.lovable.app/heritage/admissions" }],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
      <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--h-primary)" }}>Admissions</p>
      <h1 className="font-display text-5xl md:text-6xl mt-4">A clear path to moving in.</h1>
      <p className="mt-6 text-lg text-stone-600 max-w-3xl">Five steps. No pressure. We'll walk you through each one — and tell you honestly if we're not the right fit.</p>

      <ol className="mt-12 space-y-6">
        {ADMISSION_STEPS.map((step) => (
          <li key={step.n} className="grid grid-cols-[64px_1fr] gap-6 p-6 rounded-2xl bg-white" style={{ border: "1px solid var(--h-border)" }}>
            <span className="font-display text-3xl" style={{ color: "var(--h-primary)" }}>{step.n}</span>
            <div><h2 className="font-display text-2xl">{step.title}</h2><p className="text-stone-600 mt-1">{step.body}</p></div>
          </li>
        ))}
      </ol>

      <div className="mt-4 p-6 rounded-2xl text-sm text-stone-700 leading-relaxed" style={{ background: "var(--h-surface)" }}>
        <p><strong>Per Washington State RCW 70.128.280</strong>, prospective residents receive written disclosure of:</p>
        <ul className="mt-3 list-disc pl-6 space-y-1">
          <li>Services included in the base rate and services billed separately</li>
          <li>Reasons for resident termination of stay</li>
          <li>Specialty care designations and any limitations on scope of care</li>
          <li>The home's complete fee structure and refund policies</li>
          <li>Resident rights under WAC 388-76</li>
        </ul>
        <p className="mt-3">A full copy is provided in person before any agreement is signed. <Link to="/heritage/contact" className="underline">Request a copy.</Link></p>
      </div>

      <div className="mt-16 grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-3xl">Start a conversation</h2>
          <p className="mt-2 text-stone-600">Tell us about your loved one and a good time to talk.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white" style={{ border: "1px solid var(--h-border)" }}>
          <InquiryForm kind="admissions" design="heritage" sourcePath="/heritage/admissions" variant="heritage" submitLabel="Begin admissions" />
        </div>
      </div>
    </div>
  );
}