import { createFileRoute, Link } from "@tanstack/react-router";

const URL = "https://ssafh.lovable.app/heritage/guides/afh-vs-assisted-living";
const TITLE = "Adult Family Home vs. Assisted Living — Key Differences";
const DESC =
  "Adult family home vs. assisted living: compare resident ratios, setting, cost, and care for Mount Vernon, WA families.";

export const Route = createFileRoute("/heritage/guides/afh-vs-assisted-living")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESC,
          url: URL,
          author: { "@type": "Organization", name: "Senior Services Adult Family Home" },
        }),
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <article className="site-container section-y prose prose-stone max-w-3xl">
      <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--h-primary)" }}>
        Guide
      </p>
      <h1 className="font-display text-4xl md:text-5xl mt-3">
        Adult Family Home vs. Assisted Living: Key Differences for Families
      </h1>
      <p className="mt-6 text-lg text-stone-600">
        If you are weighing care options in Skagit County, the two terms families hear most often
        are <strong>adult family home</strong> (AFH) and <strong>assisted living</strong>. They
        sound similar, but the day-to-day experience and the staffing ratios are very different.
      </p>

      <h2 className="font-display text-2xl mt-10">Size and setting</h2>
      <p className="mt-3 text-stone-700">
        An adult family home is a licensed residence — a real house in a real neighborhood —
        serving up to six residents. Assisted living facilities (ALFs) are larger commercial
        buildings, often 40 to 150+ apartments, with shared dining rooms and long hallways.
      </p>

      <h2 className="font-display text-2xl mt-10">Caregiver-to-resident ratio</h2>
      <p className="mt-3 text-stone-700">
        Because an AFH is capped at six residents, ratios are typically 1:3 to 1:6 around the
        clock. Assisted living staffing is usually 1:10 to 1:20 on day shifts and looser
        overnight. For someone living with dementia or needing help with most activities of daily
        living, that ratio is the single biggest difference in quality of life.
      </p>

      <h2 className="font-display text-2xl mt-10">Care level</h2>
      <p className="mt-3 text-stone-700">
        Washington adult family homes are licensed by DSHS to provide personal care, medication
        management, and — with the right specialty designation — dementia and mental-health care.
        Many AFHs care for residents from move-in through end of life. ALFs vary widely; some
        decline higher-acuity residents and ask families to move out as needs increase.
      </p>

      <h2 className="font-display text-2xl mt-10">Cost</h2>
      <p className="mt-3 text-stone-700">
        Private-pay AFH rates in Skagit County are often comparable to or lower than mid-range
        assisted living once ALF "à la carte" care fees are added. AFHs also accept Medicaid (via
        COPES/CFC) more readily than most private ALFs.
      </p>

      <h2 className="font-display text-2xl mt-10">Which is right for your family?</h2>
      <p className="mt-3 text-stone-700">
        Choose an adult family home if you want a residential setting, consistent caregivers, and
        higher ratios — especially for dementia, mobility limitations, or end-of-life support.
        Choose assisted living if your loved one is largely independent and wants the social
        amenities of a larger community.
      </p>

      <div className="mt-12 p-6 rounded-2xl bg-white" style={{ border: "1px solid var(--h-border)" }}>
        <p className="font-display text-xl">Tour our Mount Vernon adult family home</p>
        <p className="mt-2 text-stone-600">
          See the difference in person. We'll answer your questions honestly and tell you if we're
          not the right fit.
        </p>
        <div className="mt-4 flex gap-3 flex-wrap">
          <Link
            to="/heritage/tour"
            className="px-5 py-2 rounded-full text-white text-sm"
            style={{ background: "var(--h-primary)" }}
          >
            Book a tour
          </Link>
          <Link to="/heritage/admissions" className="px-5 py-2 rounded-full text-sm border">
            See admissions
          </Link>
        </div>
      </div>
    </article>
  );
}
