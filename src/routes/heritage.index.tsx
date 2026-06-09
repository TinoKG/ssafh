import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { roomsQueryOptions, settingsQueryOptions, statusLabel } from "@/lib/site-data";
import { VALUE_PROPS, SERVICES, TRUST_BADGES } from "@/lib/content";
import { ASSETS } from "@/lib/assets";
import { getRoomMedia } from "@/lib/room-media";
import { getCommonAreas, getCommonAreaMedia } from "@/lib/common-areas";
import { RoomTileSlideshow } from "@/components/heritage/RoomTileSlideshow";
import {
  ArrowRight, Heart, Home, Users, ShieldCheck,
  Gamepad2, Puzzle, Music, Palette, Flower2, Car, Ticket,
} from "lucide-react";

export const Route = createFileRoute("/heritage/")({
  head: () => ({
    meta: [
      { title: "Adult Family Home in Mount Vernon, WA | Senior Services AFH" },
      { name: "description", content: "Senior Services Adult Family Home — a licensed adult family home in Mount Vernon, WA serving Skagit County. Six private rooms, 24-hour personalized senior care, dementia support, and a true residential setting." },
      { property: "og:title", content: "Adult Family Home in Mount Vernon, WA — Senior Services AFH" },
      { property: "og:description", content: "Licensed adult family home in Mount Vernon, WA. Private rooms, 24-hour care, dementia support across Skagit County." },
      { property: "og:url", content: "https://ssafh.lovable.app/heritage" },
      { property: "og:image", content: ASSETS.hero },
    ],
    links: [
      { rel: "canonical", href: "https://ssafh.lovable.app/heritage" },
    ],
  }),
  component: Page,
});

function Page() {
  const { data: rooms = [] } = useQuery(roomsQueryOptions());
  const { data: s } = useQuery(settingsQueryOptions());
  
  return (
    <>
      <section className="relative">
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto px-6 py-16 lg:py-24 items-center">
          <div className="animate-fade-up">
            <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--h-primary)" }}>
              Adult Family Home · Mount Vernon, WA
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mt-6 leading-[1.05]">
              Adult family home in <em className="italic" style={{ color: "var(--h-primary)" }}>Mount Vernon, WA</em> — a real home for our community's seniors.
            </h1>
            <p className="mt-6 text-lg text-stone-600 max-w-xl">
              Licensed adult family home serving Mount Vernon, Burlington, Sedro-Woolley, Anacortes and Skagit County. Six private rooms, 1:3 caregiver ratio, 24-hour care, home-cooked meals, and a true residential setting.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/heritage/tour" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium hover:brightness-110 transition" style={{ background: "var(--h-primary)" }}>
                Schedule a tour <ArrowRight className="size-4" />
              </Link>
              <a href={`tel:${s?.phone ?? ""}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-stone-300 font-medium hover:bg-stone-50">
                Call {s?.phone}
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-widest text-stone-500">
              {TRUST_BADGES.map((b) => <span key={b}>· {b}</span>)}
            </div>
          </div>
          <div className="relative">
              <img src={ASSETS.hero} alt="Heritage adult family home exterior with apple tree in the front yard" className="rounded-2xl shadow-xl w-full aspect-[4/5] object-cover" width={1600} height={1100} />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-5 max-w-[240px] hidden md:block" style={{ border: "1px solid var(--h-border)" }}>
              <p className="text-xs uppercase tracking-widest text-stone-500">Today</p>
              <p className="font-display text-2xl mt-1">{rooms.filter(r=>r.status==="available").length} rooms available</p>
              <Link to="/heritage/rooms" className="text-sm mt-2 inline-block" style={{ color: "var(--h-primary)" }}>See rooms →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid md:grid-cols-3 gap-8">
          {VALUE_PROPS.map((v, i) => (
            <div key={v.title} className="p-8 rounded-2xl" style={{ background: "var(--h-card)", border: "1px solid var(--h-border)" }}>
              <div className="size-10 rounded-full grid place-items-center mb-5" style={{ background: "var(--h-primary-soft)" }}>
                {i === 0 ? <Heart className="size-5" style={{ color: "var(--h-primary)" }} /> : i === 1 ? <Home className="size-5" style={{ color: "var(--h-primary)" }} /> : <Users className="size-5" style={{ color: "var(--h-primary)" }} />}
              </div>
              <h3 className="font-display text-2xl">{v.title}</h3>
              <p className="mt-3 text-stone-600">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ background: "var(--h-surface)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--h-primary)" }}>What we provide</p>
              <h2 className="font-display text-4xl md:text-5xl mt-3">Care that meets each person where they are.</h2>
            </div>
            <Link to="/heritage/services" className="text-sm font-medium underline">All services →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.slice(0, 4).map((s) => (
              <div key={s.title} className="p-6 rounded-xl bg-white" style={{ border: "1px solid var(--h-border)" }}>
                <h3 className="font-display text-lg">{s.title}</h3>
                <p className="mt-2 text-sm text-stone-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <h2 className="font-display text-4xl md:text-5xl">Rooms at a glance</h2>
          <Link to="/heritage/rooms" className="text-sm font-medium underline">View all rooms →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.slice(0, 3).map((r) => {
            const media = getRoomMedia(r.slug);
            return (
            <Link key={r.id} to="/heritage/rooms/$slug" params={{ slug: r.slug }} className="group rounded-xl overflow-hidden bg-white block" style={{ border: "1px solid var(--h-border)" }}>
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <RoomTileSlideshow media={media} alt={r.name} />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl">{r.name}</h3>
                  <span className="text-xs px-2 py-1 rounded-full" style={{
                    background: r.status === "available" ? "var(--h-primary-soft)" : "#fef3c7",
                    color: r.status === "available" ? "var(--h-primary)" : "#854d0e",
                  }}>{statusLabel(r.status)}</span>
                </div>
                <p className="text-sm text-stone-500 mt-1">{r.sqft ? `${r.sqft} sq ft` : ""}</p>
              </div>
            </Link>
          );})}
        </div>
      </section>

      <CommonAreasSection />

      <section className="py-16 lg:py-24" style={{ background: "var(--h-surface)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "var(--h-primary)" }}>Daily life</p>
          <h2 className="font-display text-4xl md:text-5xl mb-12">Activities & Engagement</h2>

          <h3 className="font-display text-2xl mb-6">Indoor</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="p-6 rounded-xl bg-white" style={{ border: "1px solid var(--h-border)" }}>
              <div className="size-10 rounded-full grid place-items-center mb-4" style={{ background: "var(--h-primary-soft)" }}>
                <Gamepad2 className="size-5" style={{ color: "var(--h-primary)" }} />
              </div>
              <h4 className="font-display text-lg">Games</h4>
            </div>
            <div className="p-6 rounded-xl bg-white" style={{ border: "1px solid var(--h-border)" }}>
              <div className="size-10 rounded-full grid place-items-center mb-4" style={{ background: "var(--h-primary-soft)" }}>
                <Puzzle className="size-5" style={{ color: "var(--h-primary)" }} />
              </div>
              <h4 className="font-display text-lg">Puzzles</h4>
            </div>
            <div className="p-6 rounded-xl bg-white" style={{ border: "1px solid var(--h-border)" }}>
              <div className="size-10 rounded-full grid place-items-center mb-4" style={{ background: "var(--h-primary-soft)" }}>
                <Music className="size-5" style={{ color: "var(--h-primary)" }} />
              </div>
              <h4 className="font-display text-lg">Music</h4>
            </div>
            <div className="p-6 rounded-xl bg-white" style={{ border: "1px solid var(--h-border)" }}>
              <div className="size-10 rounded-full grid place-items-center mb-4" style={{ background: "var(--h-primary-soft)" }}>
                <Palette className="size-5" style={{ color: "var(--h-primary)" }} />
              </div>
              <h4 className="font-display text-lg">Painting &amp; Coloring</h4>
            </div>
          </div>

          <h3 className="font-display text-2xl mb-6">Outdoor</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white" style={{ border: "1px solid var(--h-border)" }}>
              <div className="size-10 rounded-full grid place-items-center mb-4" style={{ background: "var(--h-primary-soft)" }}>
                <Flower2 className="size-5" style={{ color: "var(--h-primary)" }} />
              </div>
              <h4 className="font-display text-lg">Gardening</h4>
            </div>
            <div className="p-6 rounded-xl bg-white" style={{ border: "1px solid var(--h-border)" }}>
              <div className="size-10 rounded-full grid place-items-center mb-4" style={{ background: "var(--h-primary-soft)" }}>
                <Car className="size-5" style={{ color: "var(--h-primary)" }} />
              </div>
              <h4 className="font-display text-lg">Docking Bay &amp; Recovery Café trips</h4>
              <p className="text-sm text-stone-500 mt-1">Outdoor entertainment &amp; performances</p>
            </div>
            <div className="p-6 rounded-xl bg-white" style={{ border: "1px solid var(--h-border)" }}>
              <div className="size-10 rounded-full grid place-items-center mb-4" style={{ background: "var(--h-primary-soft)" }}>
                <Ticket className="size-5" style={{ color: "var(--h-primary)" }} />
              </div>
              <h4 className="font-display text-lg">Bingo</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="rounded-2xl p-8 md:p-12 flex flex-wrap items-center gap-6 justify-between" style={{ background: "var(--h-primary)", color: "white" }}>
          <div className="flex items-center gap-4">
            <ShieldCheck className="size-10" aria-hidden />
            <div>
              <p className="text-xs uppercase tracking-[0.25em] opacity-80">Licensed & Compliant</p>
              <p className="font-display text-2xl mt-1">DSHS License {s?.dshs_license ?? "—"}</p>
            </div>
          </div>
          <a href="https://fortress.wa.gov/dshs/adsaapps/lookup/" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full bg-white font-medium" style={{ color: "var(--h-primary)" }}>
            Verify on DSHS →
          </a>
        </div>
      </section>
    </>
  );
}