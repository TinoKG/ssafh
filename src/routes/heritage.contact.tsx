import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { settingsQueryOptions } from "@/lib/site-data";
import { InquiryForm } from "@/components/shared/InquiryForm";
import { Phone, Mail, MapPin } from "lucide-react";

export const Route = createFileRoute("/heritage/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Adult Family Home in Mount Vernon, WA" },
      {
        name: "description",
        content:
          "Contact Senior Services Adult Family Home in Mount Vernon, WA. Call (360) 770-6434 or email us to schedule a tour. Serving Skagit County.",
      },
      { property: "og:title", content: "Contact — Adult Family Home in Mount Vernon, WA" },
      { property: "og:url", content: "https://ssafh.lovable.app/heritage/contact" },
    ],
    links: [{ rel: "canonical", href: "https://ssafh.lovable.app/heritage/contact" }],
  }),
  component: Page,
});

function Page() {
  const { data: s } = useQuery(settingsQueryOptions());
  const address =
    `${s?.address_line ?? ""}, ${s?.city ?? ""}, ${s?.state ?? ""} ${s?.zip ?? ""}`.trim();
  const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  return (
    <div className="site-container section-y">
      <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--h-primary)" }}>
        Contact
      </p>
      <h1 className="font-display text-5xl md:text-6xl mt-4">We'd love to hear from you.</h1>
      <div className="mt-12 grid lg:grid-cols-[1fr_1.2fr] gap-12">
        <aside className="space-y-6">
          <a
            href={`tel:${s?.phone}`}
            className="flex gap-4 p-5 rounded-xl bg-white"
            style={{ border: "1px solid var(--h-border)" }}
          >
            <Phone className="size-6 mt-1" style={{ color: "var(--h-primary)" }} aria-hidden />
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-500">Phone</p>
              <p className="font-display text-xl">{s?.phone}</p>
            </div>
          </a>
          <a
            href="tel:+13607553352"
            className="flex gap-4 p-5 rounded-xl bg-white"
            style={{ border: "1px solid var(--h-border)" }}
          >
            <Phone className="size-6 mt-1" style={{ color: "var(--h-primary)" }} aria-hidden />
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-500">
                Phone · Hours 8am – 5pm
              </p>
              <p className="font-display text-xl">+1 360 755 3352</p>
            </div>
          </a>
          <a
            href={`mailto:${s?.email}`}
            className="flex gap-4 p-5 rounded-xl bg-white"
            style={{ border: "1px solid var(--h-border)" }}
          >
            <Mail className="size-6 mt-1" style={{ color: "var(--h-primary)" }} aria-hidden />
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-500">Email</p>
              <p className="font-display text-xl break-all">{s?.email}</p>
            </div>
          </a>
          <a
            href="mailto:joycengaruiya@gmail.com"
            className="flex gap-4 p-5 rounded-xl bg-white"
            style={{ border: "1px solid var(--h-border)" }}
          >
            <Mail className="size-6 mt-1" style={{ color: "var(--h-primary)" }} aria-hidden />
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-500">Owner</p>
              <p className="font-display text-xl break-all">joycengaruiya@gmail.com</p>
            </div>
          </a>
          <div
            className="rounded-xl bg-white overflow-hidden"
            style={{ border: "1px solid var(--h-border)" }}
          >
            <div className="aspect-[4/3] w-full bg-stone-100">
              <iframe
                title="Map to Senior Services Adult Family Home"
                src={mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>
            <div className="flex gap-4 p-5">
              <MapPin className="size-6 mt-1" style={{ color: "var(--h-primary)" }} aria-hidden />
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-500">Visit</p>
                <p>
                  {s?.address_line}
                  <br />
                  {s?.city}, {s?.state} {s?.zip}
                </p>
                <p className="text-sm text-stone-500 mt-2">Service area: {s?.service_area}</p>
              </div>
            </div>
          </div>
        </aside>
        <div className="p-8 rounded-2xl bg-white" style={{ border: "1px solid var(--h-border)" }}>
          <h2 className="font-display text-2xl mb-6">Send us a message</h2>
          <InquiryForm
            kind="contact"
            design="heritage"
            sourcePath="/heritage/contact"
            variant="heritage"
          />
        </div>
      </div>
    </div>
  );
}
