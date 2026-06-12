import { createFileRoute } from "@tanstack/react-router";
import { HOME_AMENITIES, SERVICES } from "@/lib/content";
import { ASSETS } from "@/lib/assets";
import {
  Bath,
  BedDouble,
  Check,
  Clock3,
  HeartHandshake,
  Home,
  House,
  Pill,
  Shirt,
  Soup,
  Sparkles,
  Trees,
  Users,
  Utensils,
  Wand2,
} from "lucide-react";

export const Route = createFileRoute("/heritage/services")({
  head: () => ({
    meta: [
      { title: "Senior Care Services — Mount Vernon, WA Adult Family Home" },
      {
        name: "description",
        content:
          "Senior care in Mount Vernon, WA: daily living support, meals, medication management, dementia care, and 24-hour supervision.",
      },
      { property: "og:title", content: "Senior Care Services — Mount Vernon, WA" },
      { property: "og:url", content: "https://ssafh.lovable.app/heritage/services" },
      { property: "og:image", content: ASSETS.dining },
    ],
    links: [{ rel: "canonical", href: "https://ssafh.lovable.app/heritage/services" }],
  }),
  component: Page,
});

function Page() {
  const serviceIcons = [Bath, Soup, Pill, HeartHandshake, Shirt, Clock3, Sparkles, Users];
  const amenityIcons = [BedDouble, Utensils, House, Trees, Home, Wand2];

  return (
    <div className="section-y">
      <div className="site-container">
        <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--h-primary)" }}>
          Services
        </p>
        <h1 className="font-display text-5xl md:text-6xl mt-4">Care, the way it should be.</h1>
        <p className="mt-6 text-lg text-stone-600 max-w-2xl">
          Daily support is organized around each resident's needs, preferences, and routines.
          Services are provided within the approved adult family home scope, and families are
          encouraged to discuss specific care needs during admissions.
        </p>
      </div>

      <section className="wide-container mt-16">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p
              className="text-xs uppercase tracking-[0.25em]"
              style={{ color: "var(--h-primary)" }}
            >
              Care services
            </p>
            <h2 className="font-display text-4xl md:text-5xl mt-2">
              Practical help, delivered with dignity.
            </h2>
          </div>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {SERVICES.map((s, index) => {
            const Icon = serviceIcons[index] ?? Check;
            return (
              <article
                key={s.title}
                className="p-6 rounded-xl bg-white"
                style={{ border: "1px solid var(--h-border)" }}
              >
                <div
                  className="size-11 rounded-full grid place-items-center mb-5"
                  style={{ background: "var(--h-primary-soft)" }}
                >
                  <Icon className="size-5" style={{ color: "var(--h-primary)" }} />
                </div>
                <h3 className="font-display text-xl">{s.title}</h3>
                <p className="mt-3 text-sm text-stone-600">{s.body}</p>
                <ul className="mt-5 space-y-2 text-sm text-stone-600">
                  {s.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <Check
                        className="size-4 mt-0.5 shrink-0"
                        style={{ color: "var(--h-primary)" }}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-20 py-16" style={{ background: "var(--h-surface)" }}>
        <div className="wide-container">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
            <div>
              <p
                className="text-xs uppercase tracking-[0.25em]"
                style={{ color: "var(--h-primary)" }}
              >
                Home comforts & amenities
              </p>
              <h2 className="font-display text-4xl md:text-5xl mt-2">
                The warmth of a home, not the feel of an institution.
              </h2>
              <p className="mt-5 text-stone-600">
                The setting matters. Private bedrooms, shared rooms, meals, garden time, and family
                connection all support a calmer daily rhythm for residents.
              </p>
              <img
                src={ASSETS.dining}
                alt="Dining room table prepared in a warm residential adult family home"
                className="mt-8 rounded-xl aspect-[4/3] object-cover w-full"
                loading="lazy"
                style={{ border: "1px solid var(--h-border)" }}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {HOME_AMENITIES.map((item, index) => {
                const Icon = amenityIcons[index] ?? Home;
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

      <div className="site-container mt-12">
        <p className="text-sm text-stone-500 max-w-3xl">
          Compliance note: Services are limited to the scope of the Washington DSHS Adult Family
          Home license. The home does not advertise skilled nursing, therapy, hospice, wound care,
          tube feeding, or lift services here. Specialty designations and documentation are
          available upon request during admissions.
        </p>
      </div>
    </div>
  );
}
