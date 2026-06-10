import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { roomsQueryOptions, statusLabel } from "@/lib/site-data";
import { ASSETS } from "@/lib/assets";
import { getRoomMedia } from "@/lib/room-media";
import { RoomMediaDialog } from "@/components/heritage/RoomMediaDialog";
import { RoomTileSlideshow } from "@/components/heritage/RoomTileSlideshow";
import { Images } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/heritage/rooms")({
  head: () => ({
    meta: [
      { title: "Private Bedrooms — Adult Family Home in Mount Vernon, WA" },
      { name: "description", content: "Six private bedrooms in our Mount Vernon, WA adult family home. Garden views, wood floors, and live availability for Skagit County families." },
      { property: "og:title", content: "Private Bedrooms — Mount Vernon, WA Adult Family Home" },
      { property: "og:url", content: "https://ssafh.lovable.app/heritage/rooms" },
      { property: "og:image", content: ASSETS.room },
    ],
    links: [{ rel: "canonical", href: "https://ssafh.lovable.app/heritage/rooms" }],
  }),
  component: Page,
});

function Page() {
  const { data: rooms = [] } = useQuery(roomsQueryOptions());
  const [filter, setFilter] = useState<"all" | "available" | "waitlist">("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  // Show every bedroom — those without a real media folder render a "Photos coming soon" tile.
  const filtered = rooms.filter((r) => filter === "all" || r.status === filter);
  const active = openSlug ? rooms.find((r) => r.slug === openSlug) : null;
  const activeMedia = active ? getRoomMedia(active.slug) : [];
  const bedroomCount = rooms.length;
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
      <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--h-primary)" }}>Bedrooms</p>
      <h1 className="font-display text-5xl md:text-6xl mt-4">Private bedrooms. Each one a home.</h1>
      <p className="mt-6 text-lg text-stone-600 max-w-2xl">Tap any bedroom to view all photos. Availability is updated by the owner directly.</p>
      <p className="mt-3 text-sm text-stone-600 max-w-2xl">
        <span className="font-medium" style={{ color: "var(--h-primary)" }}>TVs included:</span> a flat-screen TV is mounted in every resident's private bedroom before move-in — unless you'd rather bring your own.
      </p>

      <div className="flex flex-wrap gap-2 mt-10">
        {(["all", "available", "waitlist"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} aria-pressed={filter===f} className={"px-4 py-2 rounded-full text-sm capitalize border " + (filter===f ? "text-white" : "bg-white")} style={filter===f ? { background: "var(--h-primary)", borderColor: "var(--h-primary)" } : { borderColor: "var(--h-border)" }}>
            {f === "all" ? "All bedrooms" : f}
          </button>
        ))}
      </div>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((r) => {
          const media = getRoomMedia(r.slug);
          const hasRealMedia = media.length > 0 && media[0].name !== "placeholder";
          const mediaCount = hasRealMedia ? media.length : 0;
          return (
            <div key={r.id} className="rounded-xl overflow-hidden bg-white flex flex-col" style={{ border: "1px solid var(--h-border)" }}>
              <button
                type="button"
                onClick={() => hasRealMedia && setOpenSlug(r.slug)}
                disabled={!hasRealMedia}
                className="group relative aspect-[4/3] overflow-hidden bg-stone-100 block text-left"
                aria-label={`Open ${mediaCount} photos for ${r.name}`}
              >
                {hasRealMedia ? (
                  <RoomTileSlideshow media={media} alt={`Heritage adult family home ${r.name}`} />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-center px-6" style={{ background: "var(--h-primary-soft)" }}>
                    <div>
                      <Images className="size-7 mx-auto mb-2" style={{ color: "var(--h-primary)" }} />
                      <p className="font-display text-lg" style={{ color: "var(--h-primary)" }}>Photos coming soon</p>
                      <p className="text-xs text-stone-600 mt-1">We're capturing fresh images of this bedroom.</p>
                    </div>
                  </div>
                )}
                <div className={"absolute inset-0 bg-black/0 transition flex items-center justify-center " + (hasRealMedia ? "group-hover:bg-black/30" : "")}>
                  {hasRealMedia && (
                  <span className="opacity-0 group-hover:opacity-100 transition px-3 py-1.5 rounded-full bg-white/95 text-stone-900 text-xs font-medium inline-flex items-center gap-1.5">
                    <Images className="size-3.5" />
                    View all {mediaCount} photos
                  </span>
                  )}
                </div>
                {mediaCount > 1 && (
                  <span className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/60 text-white text-[11px] font-mono inline-flex items-center gap-1 pointer-events-none">
                    <Images className="size-3" /> {mediaCount}
                  </span>
                )}
              </button>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-display text-xl">{r.name}</h2>
                  <span className="text-xs px-2 py-1 rounded-full shrink-0" style={{
                    background: r.status === "available" ? "var(--h-primary-soft)" : "#fef3c7",
                    color: r.status === "available" ? "var(--h-primary)" : "#854d0e",
                  }}>{statusLabel(r.status)}</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs text-stone-500">{hasRealMedia ? `${mediaCount} photo${mediaCount === 1 ? "" : "s"}` : "Photos coming soon"}</p>
                  <Link
                    to="/heritage/rooms/$slug"
                    params={{ slug: r.slug }}
                    className="text-sm underline"
                    style={{ color: "var(--h-primary)" }}
                  >
                    Inquire →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <p className="text-stone-600">{bedroomCount === 0 ? "Bedroom photos coming soon." : "No bedrooms match this filter right now."}</p>}
      </div>

      {active && (
        <RoomMediaDialog
          open={!!openSlug}
          onOpenChange={(o) => !o && setOpenSlug(null)}
          roomName={active.name}
          media={activeMedia}
        />
      )}
    </div>
  );
}