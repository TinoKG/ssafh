import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { roomsQueryOptions, settingsQueryOptions, statusLabel, statusTone } from "@/lib/site-data";
import { VALUE_PROPS, SERVICES, TRUST_BADGES, HOME_AMENITIES } from "@/lib/content";
import { ASSETS } from "@/lib/assets";
import { getRoomMedia } from "@/lib/room-media";
import { getCommonArea, getCommonAreas, getCommonAreaMedia } from "@/lib/common-areas";
import { RoomTileSlideshow } from "@/components/heritage/RoomTileSlideshow";
import { RoomMediaDialog } from "@/components/heritage/RoomMediaDialog";
import {
  ArrowRight,
  Heart,
  Home,
  Users,
  ShieldCheck,
  Phone,
  Gamepad2,
  Puzzle,
  Music,
  Palette,
  Flower2,
  Car,
  Ticket,
  Images,
  BookOpen,
  ClipboardList,
  Sun,
  Sparkles,
  Check,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";
import gardenA from "@/assets/garden/g1.jpg";
import gardenB from "@/assets/garden/g2.jpg";
import gardenC from "@/assets/garden/g3.jpg";
import gardenD from "@/assets/garden/g4.jpg";
import rooster from "@/assets/garden/rooster.jpg";

export const Route = createFileRoute("/heritage/")({
  head: () => ({
    meta: [
      { title: "Adult Family Home in Mount Vernon, WA | Senior Services AFH" },
      {
        name: "description",
        content:
          "Licensed adult family home in Mount Vernon, WA. Six private bedrooms, 24-hour personalized senior care, and dementia support in Skagit County.",
      },
      {
        property: "og:title",
        content: "Adult Family Home in Mount Vernon, WA — Senior Services AFH",
      },
      {
        property: "og:description",
        content:
          "Licensed adult family home in Mount Vernon, WA. Private bedrooms, 24-hour care, dementia support across Skagit County.",
      },
      { property: "og:url", content: "https://ssafh.lovable.app/heritage" },
      { property: "og:image", content: ASSETS.hero },
    ],
    links: [
      { rel: "canonical", href: "https://ssafh.lovable.app/heritage" },
      { rel: "preload", as: "image", href: ASSETS.hero, fetchpriority: "high" },
    ],
  }),
  component: Page,
});

function Page() {
  const { data: rooms = [] } = useQuery(roomsQueryOptions());
  const { data: s } = useQuery(settingsQueryOptions());

  return (
    <>
      <section className="heritage-hero-section relative">
        <div className="heritage-hero wide-container section-y">
          <div className="heritage-hero__media" aria-hidden="true">
            <img
              src={ASSETS.hero}
              alt=""
              className="heritage-hero__image"
              width={1600}
              height={900}
              fetchPriority="high"
            />
          </div>
          <div className="heritage-hero__panel animate-fade-up">
            <p
              className="text-xs uppercase tracking-[0.25em]"
              style={{ color: "var(--h-primary)" }}
            >
              Adult Family Home · Mount Vernon, WA
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mt-6 leading-[1.05]">
              Adult family home in{" "}
              <em className="italic" style={{ color: "var(--h-primary)" }}>
                Mount Vernon, WA
              </em>{" "}
              — a real home for our community's seniors.
            </h1>
            <p className="mt-6 text-lg text-stone-600 max-w-xl">
              Washington State licensed adult family home serving Mount Vernon, Burlington,
              Sedro-Woolley, Anacortes and Skagit County. Six private bedrooms, 1:3 personalized
              care, 24-hour support, home-cooked meals, and a true residential setting.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 heritage-hero__actions">
              <Link to="/heritage/tour" className="heritage-primary-cta">
                Schedule a Tour <ArrowRight className="size-4" />
              </Link>
              <a href={`tel:${s?.phone ?? ""}`} className="heritage-secondary-cta">
                <Phone className="size-4" /> Call Now
              </a>
              <Link to="/heritage/rooms" className="heritage-tertiary-cta">
                View Bedrooms
              </Link>
            </div>
            <div className="heritage-trust-stats" aria-label="Care highlights">
              {TRUST_BADGES.map((b) => (
                <div key={b.label}>
                  <strong>{b.value}</strong>
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="heritage-hero__availability">
            <p className="text-xs uppercase tracking-widest text-stone-500">Today</p>
            <p className="font-display text-2xl mt-1">
              {rooms.filter((r) => r.status === "available").length} bedrooms available
            </p>
            <Link
              to="/heritage/rooms"
              className="text-sm mt-2 inline-block"
              style={{ color: "var(--h-primary)" }}
            >
              See bedrooms →
            </Link>
          </div>
        </div>
      </section>

      <section className="wide-container section-y">
        <div className="grid md:grid-cols-3 gap-8">
          {VALUE_PROPS.map((v, i) => (
            <div
              key={v.title}
              className="p-8 rounded-2xl"
              style={{ background: "var(--h-card)", border: "1px solid var(--h-border)" }}
            >
              <div
                className="size-10 rounded-full grid place-items-center mb-5"
                style={{ background: "var(--h-primary-soft)" }}
              >
                {i === 0 ? (
                  <Heart className="size-5" style={{ color: "var(--h-primary)" }} />
                ) : i === 1 ? (
                  <Home className="size-5" style={{ color: "var(--h-primary)" }} />
                ) : (
                  <Users className="size-5" style={{ color: "var(--h-primary)" }} />
                )}
              </div>
              <h2 className="font-display text-2xl">{v.title}</h2>
              <p className="mt-3 text-stone-600">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-y" style={{ background: "var(--h-surface)" }}>
        <div className="wide-container">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <p
                className="text-xs uppercase tracking-[0.25em]"
                style={{ color: "var(--h-primary)" }}
              >
                What we provide
              </p>
              <h2 className="font-display text-4xl md:text-5xl mt-3">
                Care that meets each person where they are.
              </h2>
            </div>
            <Link to="/heritage/services" className="text-sm font-medium underline">
              All services →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.slice(0, 4).map((s) => (
              <div
                key={s.title}
                className="p-6 rounded-xl bg-white"
                style={{ border: "1px solid var(--h-border)" }}
              >
                <h3 className="font-display text-lg">{s.title}</h3>
                <p className="mt-2 text-sm text-stone-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wide-container section-y">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <h2 className="font-display text-4xl md:text-5xl">Bedrooms at a glance</h2>
          <Link to="/heritage/rooms" className="text-sm font-medium underline">
            View all bedrooms →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.slice(0, 3).map((r) => {
            const media = getRoomMedia(r.slug);
            const isOccupied = r.status === "occupied";
            return (
              <Link
                key={r.id}
                to="/heritage/rooms/$slug"
                params={{ slug: r.slug }}
                className={`group rounded-xl overflow-hidden block transition ${isOccupied ? "bg-stone-100 opacity-70 grayscale" : "bg-white"}`}
                style={{ border: `1px solid ${isOccupied ? "#d6d3d1" : "var(--h-border)"}` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <RoomTileSlideshow media={media} alt={r.name} />
                  {isOccupied && <div className="absolute inset-0 bg-stone-900/20" />}
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl">{r.name}</h3>
                    <span className="text-xs px-2 py-1 rounded-full" style={statusTone(r.status)}>
                      {statusLabel(r.status)}
                    </span>
                  </div>
                  <p className="text-sm text-stone-500 mt-1">{r.sqft ? `${r.sqft} sq ft` : ""}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <CommonAreasSection />

      <AmenitiesPreviewSection />

      <ActivitiesSection />

      <FamilyDecisionSection />

      <section className="wide-container section-y">
        <div
          className="rounded-2xl p-8 md:p-12 flex flex-wrap items-center gap-6 justify-between"
          style={{ background: "var(--h-primary)", color: "white" }}
        >
          <div className="flex items-center gap-4">
            <ShieldCheck className="size-10" aria-hidden />
            <div>
              <p className="text-xs uppercase tracking-[0.25em] opacity-80">Licensed & Compliant</p>
              <p className="font-display text-2xl mt-1">
                Washington State licensed adult family home
              </p>
              <p className="text-sm opacity-85 mt-1">
                Care provided within approved adult family home scope.
              </p>
            </div>
          </div>
          <a
            href="https://fortress.wa.gov/dshs/adsaapps/lookup/"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full bg-white font-medium"
            style={{ color: "var(--h-primary)" }}
          >
            Verify on DSHS →
          </a>
        </div>
      </section>
    </>
  );
}

function FamilyDecisionSection() {
  return (
    <section className="wide-container section-y">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-stretch">
        <div
          className="rounded-2xl p-8 md:p-10 bg-white"
          style={{ border: "1px solid var(--h-border)" }}
        >
          <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--h-primary)" }}>
            Planning the next step
          </p>
          <h2 className="font-display text-4xl md:text-5xl mt-3">
            Admissions should feel clear, not rushed.
          </h2>
          <p className="mt-5 text-stone-600">
            Families can start with a simple conversation, tour the home, and review fit,
            documentation, services, and resident rights before any agreement is signed.
          </p>
          <Link
            to="/heritage/admissions"
            className="inline-flex items-center gap-2 mt-7 px-6 py-3 rounded-full text-white font-medium"
            style={{ background: "var(--h-primary)" }}
          >
            See admissions <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <Link
            to="/heritage/resources"
            className="p-7 rounded-xl bg-white block"
            style={{ border: "1px solid var(--h-border)" }}
          >
            <HelpCircle className="size-6 mb-5" style={{ color: "var(--h-primary)" }} />
            <h3 className="font-display text-2xl">Questions families ask</h3>
            <p className="mt-3 text-sm text-stone-600">
              Compare care settings, understand licensing, and bring better questions to a tour.
            </p>
          </Link>
          <Link
            to="/heritage/tour"
            className="p-7 rounded-xl bg-white block"
            style={{ border: "1px solid var(--h-border)" }}
          >
            <ClipboardList className="size-6 mb-5" style={{ color: "var(--h-primary)" }} />
            <h3 className="font-display text-2xl">Tour checklist</h3>
            <p className="mt-3 text-sm text-stone-600">
              Bring care notes, medication details, preferences, and the concerns your family wants
              answered.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}

function AmenitiesPreviewSection() {
  return (
    <section className="wide-container section-y">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--h-primary)" }}>
            Home comforts
          </p>
          <h2 className="font-display text-4xl md:text-5xl mt-2">
            A residential setting, built for daily care.
          </h2>
        </div>
        <Link to="/heritage/services" className="text-sm font-medium underline">
          See services & amenities →
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {HOME_AMENITIES.slice(0, 6).map((item) => (
          <div
            key={item.title}
            className="p-6 rounded-xl bg-white"
            style={{ border: "1px solid var(--h-border)" }}
          >
            <Check className="size-5 mb-4" style={{ color: "var(--h-primary)" }} />
            <h3 className="font-display text-xl">{item.title}</h3>
            <p className="mt-2 text-sm text-stone-600">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CommonAreasSection() {
  const areas = getCommonAreas();
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const activeArea = openSlug ? getCommonArea(openSlug) : undefined;
  const activeMedia = openSlug ? getCommonAreaMedia(openSlug) : [];

  if (areas.length === 0) return null;
  return (
    <section className="wide-container section-y">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--h-primary)" }}>
            Shared spaces
          </p>
          <h2 className="font-display text-4xl md:text-5xl mt-2">Common areas</h2>
          <p className="mt-3 text-stone-600 max-w-2xl">
            The kitchen, dining room, sitting room, and porch — the spaces where life happens
            together every day.
          </p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {areas.map((a) => {
          const media = getCommonAreaMedia(a.slug);
          const mediaCount = media.length;
          return (
            <div
              key={a.slug}
              className="rounded-xl overflow-hidden bg-white"
              style={{ border: "1px solid var(--h-border)" }}
            >
              <button
                type="button"
                onClick={() => setOpenSlug(a.slug)}
                className="group relative aspect-[4/3] overflow-hidden bg-stone-100 block w-full text-left"
                aria-label={`Open ${mediaCount} photos for ${a.name}`}
              >
                <RoomTileSlideshow media={media} alt={a.name} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition px-3 py-1.5 rounded-full bg-white/95 text-stone-900 text-xs font-medium inline-flex items-center gap-1.5">
                    <Images className="size-3.5" />
                    View gallery
                  </span>
                </div>
                {mediaCount > 1 && (
                  <span className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/60 text-white text-[11px] font-mono inline-flex items-center gap-1 pointer-events-none">
                    <Images className="size-3" /> {mediaCount}
                  </span>
                )}
              </button>
              <div className="p-5">
                <h3 className="font-display text-xl">{a.name}</h3>
                <p className="text-sm text-stone-600 mt-1">{a.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {activeArea && (
        <RoomMediaDialog
          open={!!openSlug}
          onOpenChange={(open) => !open && setOpenSlug(null)}
          roomName={activeArea.name}
          media={activeMedia}
        />
      )}
    </section>
  );
}

const INDOOR_ACTIVITIES = [
  {
    icon: Gamepad2,
    title: "Games & cards",
    body: "Rummy, dominoes, checkers — small-group play that keeps minds sharp.",
  },
  {
    icon: Puzzle,
    title: "Puzzles",
    body: "Jigsaws and word puzzles always out on the table for whoever feels like joining.",
  },
  {
    icon: Music,
    title: "Music hour",
    body: "Hymns, old favorites, and Sunday gospel — sometimes a singalong, always a smile.",
  },
  {
    icon: Palette,
    title: "Painting & coloring",
    body: "Watercolors and adult coloring books — gentle creative time, no skill required.",
  },
  {
    icon: BookOpen,
    title: "Reading & storytelling",
    body: "Daily papers, large-print books, and shared stories from a lifetime of memories.",
  },
  {
    icon: Sparkles,
    title: "Baking together",
    body: "Helping knead dough or stir batter — the kitchen smells like home on baking days.",
  },
];

const OUTDOOR_ACTIVITIES = [
  {
    icon: Flower2,
    title: "Gardening & potting",
    body: "Tending the porch planters, deadheading roses, watering ferns — small wins, every day.",
  },
  {
    icon: Sun,
    title: "Porch & lawn time",
    body: "Morning coffee on the porch, afternoon sun in the lawn chairs, fresh air whenever you want it.",
  },
  {
    icon: Car,
    title: "Dockton Park & café outings",
    body: "Scenic drives, waterfront walks, and visits to a favorite local café — weather permitting.",
  },
  {
    icon: Ticket,
    title: "Bingo & community events",
    body: "In-house bingo nights and seasonal performances — birthdays, holidays, and everything in between.",
  },
];

function ActivitiesSection() {
  const photos = [
    { src: gardenA, alt: "Tall ornamental grasses in a blue glazed pot beside the porch" },
    { src: gardenB, alt: "Black planter with red coleus, ferns, and yellow blooms" },
    { src: gardenC, alt: "Green ceramic pot of ferns and pink wildflowers in the garden" },
    { src: gardenD, alt: "Climbing red roses in a black planter against the home" },
  ];
  return (
    <section className="section-y" style={{ background: "var(--h-surface)" }}>
      <div className="wide-container">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start mb-14">
          <div>
            <p
              className="text-xs uppercase tracking-[0.25em] mb-3"
              style={{ color: "var(--h-primary)" }}
            >
              Daily life
            </p>
            <h2 className="font-display text-4xl md:text-5xl">Activities & Engagement</h2>
            <p className="mt-5 text-lg text-stone-600 max-w-xl">
              Days here move at a gentle pace — but they're never empty. Mornings start with coffee
              and the paper, afternoons drift between the garden, the porch, and the sitting room,
              and evenings end with music or a favorite show.
            </p>
            <p className="mt-4 text-stone-600 max-w-xl">
              We plan around each resident — what they love, what they used to do, what makes them
              light up. Caregivers join in, family is always welcome, and our little flock of garden
              visitors (yes, including the patriotic rooster out front) keeps things cheerful.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {photos.map((p) => (
              <img
                key={p.src}
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="rounded-xl aspect-[4/3] object-cover w-full shadow-sm"
                style={{ border: "1px solid var(--h-border)" }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <h3 className="font-display text-2xl">Inside</h3>
          <div className="h-px flex-1" style={{ background: "var(--h-border)" }} />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {INDOOR_ACTIVITIES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="p-6 rounded-xl bg-white"
              style={{ border: "1px solid var(--h-border)" }}
            >
              <div
                className="size-10 rounded-full grid place-items-center mb-4"
                style={{ background: "var(--h-primary-soft)" }}
              >
                <Icon className="size-5" style={{ color: "var(--h-primary)" }} />
              </div>
              <h4 className="font-display text-lg">{title}</h4>
              <p className="mt-2 text-sm text-stone-600">{body}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-6">
          <h3 className="font-display text-2xl">Outside</h3>
          <div className="h-px flex-1" style={{ background: "var(--h-border)" }} />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {OUTDOOR_ACTIVITIES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="p-6 rounded-xl bg-white"
              style={{ border: "1px solid var(--h-border)" }}
            >
              <div
                className="size-10 rounded-full grid place-items-center mb-4"
                style={{ background: "var(--h-primary-soft)" }}
              >
                <Icon className="size-5" style={{ color: "var(--h-primary)" }} />
              </div>
              <h4 className="font-display text-lg">{title}</h4>
              <p className="mt-2 text-sm text-stone-600">{body}</p>
            </div>
          ))}
        </div>

        <div
          className="mt-12 rounded-2xl overflow-hidden grid md:grid-cols-[1fr_1.5fr] bg-white"
          style={{ border: "1px solid var(--h-border)" }}
        >
          <img
            src={rooster}
            alt="Painted red, white, and blue rooster yard ornament in the garden bed"
            className="w-full h-full object-cover aspect-[4/3] md:aspect-auto"
            loading="lazy"
          />
          <div className="p-6 md:p-8">
            <p
              className="text-xs uppercase tracking-[0.25em]"
              style={{ color: "var(--h-primary)" }}
            >
              A note about home
            </p>
            <h3 className="font-display text-2xl md:text-3xl mt-2">Small things, every day.</h3>
            <p className="mt-3 text-stone-600">
              A red, white, and blue rooster watching the garden. Roses against the siding. A blue
              ceramic pot full of grass that catches the light just right. It's the little touches
              that make this feel like home — and it's what residents notice first.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
