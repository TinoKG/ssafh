import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { roomsQueryOptions, statusLabel } from "@/lib/site-data";
import { ASSETS } from "@/lib/assets";
import { useState } from "react";

export const Route = createFileRoute("/heritage/rooms")({
  head: () => ({
    meta: [
      { title: "Our Rooms — Skagit Valley Care Home" },
      { name: "description", content: "Six private rooms with garden views, wood floors, and personalized touches. See live availability." },
      { property: "og:title", content: "Our Rooms" },
      { property: "og:image", content: ASSETS.room },
    ],
  }),
  component: Page,
});

function Page() {
  const { data: rooms = [] } = useQuery(roomsQueryOptions());
  const [filter, setFilter] = useState<"all" | "available" | "waitlist">("all");
  const filtered = rooms.filter((r) => filter === "all" || r.status === filter);
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
      <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--h-primary)" }}>Rooms</p>
      <h1 className="font-display text-5xl md:text-6xl mt-4">Six rooms. Each one a home.</h1>
      <p className="mt-6 text-lg text-stone-600 max-w-2xl">Every room has its own character — a corner window, a reading nook, a view of the back garden. Availability is updated by the owner directly.</p>

      <div className="flex flex-wrap gap-2 mt-10">
        {(["all", "available", "waitlist"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} aria-pressed={filter===f} className={"px-4 py-2 rounded-full text-sm capitalize border " + (filter===f ? "text-white" : "bg-white")} style={filter===f ? { background: "var(--h-primary)", borderColor: "var(--h-primary)" } : { borderColor: "var(--h-border)" }}>
            {f === "all" ? "All rooms" : f}
          </button>
        ))}
      </div>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((r) => (
          <Link key={r.id} to="/heritage/rooms/$slug" params={{ slug: r.slug }} className="group rounded-xl overflow-hidden bg-white block" style={{ border: "1px solid var(--h-border)" }}>
            <div className="aspect-[4/3] overflow-hidden bg-stone-100">
              <img src={r.photos[0] ?? ASSETS.room} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition" loading="lazy" />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl">{r.name}</h2>
                <span className="text-xs px-2 py-1 rounded-full" style={{
                  background: r.status === "available" ? "var(--h-primary-soft)" : "#fef3c7",
                  color: r.status === "available" ? "var(--h-primary)" : "#854d0e",
                }}>{statusLabel(r.status)}</span>
              </div>
              <p className="text-sm text-stone-600 mt-2 line-clamp-2">{r.description}</p>
              <p className="text-xs text-stone-500 mt-3">{r.sqft ? `${r.sqft} sq ft` : ""}</p>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && <p className="text-stone-600">No rooms match this filter right now.</p>}
      </div>
    </div>
  );
}