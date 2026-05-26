import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { settingsQueryOptions } from "@/lib/site-data";
import { InquiryForm } from "@/components/shared/InquiryForm";
import { Phone, Mail, MapPin } from "lucide-react";

export const Route = createFileRoute("/heritage/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Senior Services Adult Family Home" },
      { name: "description", content: "Reach our Mount Vernon adult family home by phone, email, or message. We respond within one business day." },
      { property: "og:title", content: "Contact Senior Services Adult Family Home" },
    ],
  }),
  component: Page,
});

function Page() {
  const { data: s } = useQuery(settingsQueryOptions());
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
      <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--h-primary)" }}>Contact</p>
      <h1 className="font-display text-5xl md:text-6xl mt-4">We'd love to hear from you.</h1>
      <div className="mt-12 grid lg:grid-cols-[1fr_1.2fr] gap-12">
        <aside className="space-y-6">
          <a href={`tel:${s?.phone}`} className="flex gap-4 p-5 rounded-xl bg-white" style={{ border: "1px solid var(--h-border)" }}>
            <Phone className="size-6 mt-1" style={{ color: "var(--h-primary)" }} aria-hidden />
            <div><p className="text-xs uppercase tracking-widest text-stone-500">Phone</p><p className="font-display text-xl">{s?.phone}</p></div>
          </a>
          <a href={`mailto:${s?.email}`} className="flex gap-4 p-5 rounded-xl bg-white" style={{ border: "1px solid var(--h-border)" }}>
            <Mail className="size-6 mt-1" style={{ color: "var(--h-primary)" }} aria-hidden />
            <div><p className="text-xs uppercase tracking-widest text-stone-500">Email</p><p className="font-display text-xl break-all">{s?.email}</p></div>
          </a>
          <a href="mailto:joycengaruiya@gmail.com" className="flex gap-4 p-5 rounded-xl bg-white" style={{ border: "1px solid var(--h-border)" }}>
            <Mail className="size-6 mt-1" style={{ color: "var(--h-primary)" }} aria-hidden />
            <div><p className="text-xs uppercase tracking-widest text-stone-500">Owner</p><p className="font-display text-xl break-all">joycengaruiya@gmail.com</p></div>
          </a>
          <div className="flex gap-4 p-5 rounded-xl bg-white" style={{ border: "1px solid var(--h-border)" }}>
            <MapPin className="size-6 mt-1" style={{ color: "var(--h-primary)" }} aria-hidden />
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-500">Visit</p>
              <p>{s?.address_line}<br/>{s?.city}, {s?.state} {s?.zip}</p>
              <p className="text-sm text-stone-500 mt-2">Service area: {s?.service_area}</p>
            </div>
          </div>
        </aside>
        <div className="p-8 rounded-2xl bg-white" style={{ border: "1px solid var(--h-border)" }}>
          <h2 className="font-display text-2xl mb-6">Send us a message</h2>
          <InquiryForm kind="contact" design="heritage" sourcePath="/heritage/contact" variant="heritage" />
        </div>
      </div>
    </div>
  );
}