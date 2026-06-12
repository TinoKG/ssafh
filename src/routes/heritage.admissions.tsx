import { createFileRoute, Link } from "@tanstack/react-router";
import { ADMISSION_STEPS, ADMISSIONS_PREP, ADMISSIONS_PROMISES } from "@/lib/content";
import { InquiryForm } from "@/components/shared/InquiryForm";
import { Check, ClipboardList, FileText, HeartHandshake, Home, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/heritage/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — Adult Family Home in Mount Vernon, WA" },
      {
        name: "description",
        content:
          "Five-step admissions for our Mount Vernon, WA adult family home. RCW 70.128.280 disclosures, Medicaid and private pay options.",
      },
      { property: "og:title", content: "Admissions — Mount Vernon, WA Adult Family Home" },
      { property: "og:url", content: "https://ssafh.lovable.app/heritage/admissions" },
    ],
    links: [{ rel: "canonical", href: "https://ssafh.lovable.app/heritage/admissions" }],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="section-y">
      <div className="site-container">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-end">
          <div>
            <p
              className="text-xs uppercase tracking-[0.25em]"
              style={{ color: "var(--h-primary)" }}
            >
              Admissions
            </p>
            <h1 className="font-display text-5xl md:text-6xl mt-4">A clear path to moving in.</h1>
            <p className="mt-6 text-lg text-stone-600 max-w-3xl">
              Five steps. No pressure. We'll walk you through each one and tell you honestly if
              we're not the right fit.
            </p>
          </div>
          <div className="rounded-2xl p-6 bg-white" style={{ border: "1px solid var(--h-border)" }}>
            <p className="text-xs uppercase tracking-widest text-stone-500">Good fit starts with</p>
            <div className="mt-4 space-y-3 text-sm text-stone-700">
              {ADMISSIONS_PROMISES.slice(0, 3).map((promise) => (
                <p key={promise} className="flex gap-3">
                  <Check className="size-4 mt-0.5 shrink-0" style={{ color: "var(--h-primary)" }} />
                  <span>{promise}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="wide-container mt-16">
        <ol className="grid md:grid-cols-2 xl:grid-cols-5 gap-5">
          {ADMISSION_STEPS.map((step) => (
            <li
              key={step.n}
              className="p-6 rounded-2xl bg-white"
              style={{ border: "1px solid var(--h-border)" }}
            >
              <span className="font-display text-3xl" style={{ color: "var(--h-primary)" }}>
                {step.n}
              </span>
              <h2 className="font-display text-2xl mt-5">{step.title}</h2>
              <p className="text-stone-600 mt-2 text-sm">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20 py-16" style={{ background: "var(--h-surface)" }}>
        <div className="wide-container">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
            <div>
              <p
                className="text-xs uppercase tracking-[0.25em]"
                style={{ color: "var(--h-primary)" }}
              >
                Before the assessment
              </p>
              <h2 className="font-display text-4xl md:text-5xl mt-3">
                What helps us understand fit.
              </h2>
              <p className="mt-5 text-stone-600">
                The first conversation works best when families can share the practical details of
                daily care, the resident's preferences, and the timeline they are planning around.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {ADMISSIONS_PREP.map((item, index) => {
                const icons = [HeartHandshake, ClipboardList, FileText, Home];
                const Icon = icons[index] ?? Check;
                return (
                  <article
                    key={item.title}
                    className="p-6 rounded-xl bg-white"
                    style={{ border: "1px solid var(--h-border)" }}
                  >
                    <Icon className="size-5 mb-4" style={{ color: "var(--h-primary)" }} />
                    <h3 className="font-display text-xl">{item.title}</h3>
                    <p className="mt-2 text-sm text-stone-600">{item.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="site-container mt-16">
        <div
          className="p-6 rounded-2xl text-sm text-stone-700 leading-relaxed"
          style={{ background: "var(--h-primary-soft)" }}
        >
          <div className="flex gap-4">
            <ShieldCheck className="size-6 shrink-0 mt-1" style={{ color: "var(--h-primary)" }} />
            <div>
              <p>
                <strong>Per Washington State RCW 70.128.280</strong>, prospective residents receive
                written disclosure of:
              </p>
              <ul className="mt-3 grid sm:grid-cols-2 gap-x-8 gap-y-1">
                <li>Services included in the base rate and services billed separately</li>
                <li>Reasons for resident termination of stay</li>
                <li>Specialty care designations and any limitations on scope of care</li>
                <li>The home's complete fee structure and refund policies</li>
                <li>Resident rights under WAC 388-76</li>
              </ul>
              <p className="mt-3">
                A full copy is provided in person before any agreement is signed.{" "}
                <Link to="/heritage/contact" className="underline">
                  Request a copy.
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-3xl">Start a conversation</h2>
            <p className="mt-2 text-stone-600">
              Tell us about your loved one, what has changed recently, and a good time to talk. A
              quick note is enough to begin.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white" style={{ border: "1px solid var(--h-border)" }}>
            <InquiryForm
              kind="admissions"
              design="heritage"
              sourcePath="/heritage/admissions"
              variant="heritage"
              submitLabel="Begin admissions"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
