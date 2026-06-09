import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { roomsQueryOptions, settingsQueryOptions, statusLabel } from "@/lib/site-data";
import { VALUE_PROPS, SERVICES } from "@/lib/content";
import { ASSETS } from "@/lib/assets";
import { Gamepad2, Puzzle, Music, Palette, Flower2, Car, Ticket } from "lucide-react";

export const Route = createFileRoute("/heirloom/")({
  head: () => ({
    meta: [
      { title: "Senior Services Adult Family Home — Mount Vernon, WA" },
      { name: "description", content: "Senior Services Adult Family Home is a licensed Mount Vernon adult family home with private rooms, personalized care, and a calm residential atmosphere." },
      { property: "og:title", content: "Senior Services Adult Family Home" },
      { property: "og:image", content: ASSETS.hero },
    ],
  }),
  component: Page,
});

function Page() {
  const { data: rooms = [] } = useQuery(roomsQueryOptions());
  const { data: s } = useQuery(settingsQueryOptions());
  
  const available = rooms.filter(r => r.status === "available").length;
  return (
    <>
      <section className="max-w-7xl mx-auto px-6 pt-16 lg:pt-24 pb-12">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--hl-muted)]">
              Vol. 01 · Adult Family Home · {s?.city ?? "Mount Vernon"}, {s?.state ?? "WA"}
            </p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mt-8 leading-[0.95]">
              A quieter way<br/>to grow <em className="italic">older</em>,<br/>at home.
            </h1>
            <p className="mt-8 text-lg text-[var(--hl-muted)] max-w-xl">
              Six private rooms. One caregiver to every three residents. Three home-cooked meals. A garden out back. We are small, on purpose.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to={"/heirloom/tour" as any} className="px-7 py-3 text-white font-mono text-sm uppercase tracking-[0.18em]" style={{ background: "var(--hl-ink)" }}>Book a tour</Link>
              <Link to={"/heirloom/rooms" as any} className="px-7 py-3 font-mono text-sm uppercase tracking-[0.18em]" style={{ border: "1px solid var(--hl-ink)" }}>See rooms</Link>
            </div>
          </div>
          <div className="text-right">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--hl-muted)]">Today</p>
            <p className="font-serif text-7xl mt-2">{available}</p>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--hl-muted)] mt-2">rooms available</p>
          </div>
        </div>
        <img src={ASSETS.hero} alt="Heritage adult family home exterior with apple tree in the front yard" className="mt-16 w-full aspect-[21/9] object-cover" width={1600} height={700} />
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--hl-muted)]">— Why us</p>
        <div className="mt-10 grid md:grid-cols-3 gap-x-10 gap-y-12">
          {VALUE_PROPS.map((v, i) => (
            <div key={v.title}>
              <p className="font-mono text-xs text-[var(--hl-primary)]">{String(i+1).padStart(2, "0")}</p>
              <h3 className="font-serif text-2xl mt-3">{v.title}</h3>
              <p className="mt-3 text-[var(--hl-muted)]">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20" style={{ background: "var(--hl-surface)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--hl-muted)]">— Services</p>
              <h2 className="font-serif text-4xl md:text-5xl mt-3">Care, made personal.</h2>
            </div>
            <Link to={"/heirloom/services" as any} className="font-mono text-xs uppercase tracking-[0.18em] underline">All services</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
            {SERVICES.slice(0,4).map((s, i) => (
              <div key={s.title} className="pb-6" style={{ borderBottom: "1px solid var(--hl-border)" }}>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-2xl">{s.title}</h3>
                  <span className="font-mono text-xs text-[var(--hl-muted)]">{String(i+1).padStart(2,"0")}</span>
                </div>
                <p className="mt-3 text-[var(--hl-muted)]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <h2 className="font-serif text-4xl md:text-5xl">Rooms</h2>
          <Link to={"/heirloom/rooms" as any} className="font-mono text-xs uppercase tracking-[0.18em] underline">All rooms</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.slice(0,3).map(r => (
            <Link key={r.id} to={"/heirloom/rooms/$slug" as any} params={{ slug: r.slug } as any} className="block group">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={r.photos[0] ?? ASSETS.room} alt={r.name} className="w-full h-full object-cover group-hover:scale-[1.02] transition" loading="lazy" />
              </div>
              <div className="flex items-baseline justify-between mt-4">
                <h3 className="font-serif text-xl">{r.name}</h3>
                <span className="font-mono text-xs text-[var(--hl-muted)] uppercase">{statusLabel(r.status)}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-20" style={{ background: "var(--hl-surface)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--hl-muted)]">— Daily life</p>
          <h2 className="font-serif text-4xl md:text-5xl mt-3 mb-12">Activities &amp; Engagement</h2>

          <p className="font-mono text-xs uppercase tracking-widest text-[var(--hl-muted)] mb-6">Indoor</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="p-6 bg-white" style={{ border: "1px solid var(--hl-border)" }}>
              <Gamepad2 className="size-5 mb-4 text-[var(--hl-primary)]" />
              <h4 className="font-serif text-xl">Games</h4>
            </div>
            <div className="p-6 bg-white" style={{ border: "1px solid var(--hl-border)" }}>
              <Puzzle className="size-5 mb-4 text-[var(--hl-primary)]" />
              <h4 className="font-serif text-xl">Puzzles</h4>
            </div>
            <div className="p-6 bg-white" style={{ border: "1px solid var(--hl-border)" }}>
              <Music className="size-5 mb-4 text-[var(--hl-primary)]" />
              <h4 className="font-serif text-xl">Music</h4>
            </div>
            <div className="p-6 bg-white" style={{ border: "1px solid var(--hl-border)" }}>
              <Palette className="size-5 mb-4 text-[var(--hl-primary)]" />
              <h4 className="font-serif text-xl">Painting &amp; Coloring</h4>
            </div>
          </div>

          <p className="font-mono text-xs uppercase tracking-widest text-[var(--hl-muted)] mb-6">Outdoor</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white" style={{ border: "1px solid var(--hl-border)" }}>
              <Flower2 className="size-5 mb-4 text-[var(--hl-primary)]" />
              <h4 className="font-serif text-xl">Gardening</h4>
            </div>
            <div className="p-6 bg-white" style={{ border: "1px solid var(--hl-border)" }}>
              <Car className="size-5 mb-4 text-[var(--hl-primary)]" />
              <h4 className="font-serif text-xl">Docking Bay &amp; Recovery Café trips</h4>
              <p className="mt-2 text-sm text-[var(--hl-muted)]">Outdoor entertainment &amp; performances</p>
            </div>
            <div className="p-6 bg-white" style={{ border: "1px solid var(--hl-border)" }}>
              <Ticket className="size-5 mb-4 text-[var(--hl-primary)]" />
              <h4 className="font-serif text-xl">Bingo</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--hl-muted)]">— Licensed & compliant</p>
        <p className="font-serif text-3xl mt-4">DSHS License {s?.dshs_license ?? "—"}</p>
        <a href="https://fortress.wa.gov/dshs/adsaapps/lookup/" target="_blank" rel="noreferrer" className="inline-block mt-6 font-mono text-xs uppercase tracking-[0.18em] underline">Verify on DSHS</a>
      </section>
    </>
  );
}