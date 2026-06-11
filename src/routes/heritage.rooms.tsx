import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { roomsQueryOptions, statusLabel, statusTone } from "@/lib/site-data";
import { ASSETS } from "@/lib/assets";
import { getRealRoomMedia, getRoomSlugsWithMedia } from "@/lib/room-media";
import { RoomMediaDialog } from "@/components/heritage/RoomMediaDialog";
import { RoomTileSlideshow } from "@/components/heritage/RoomTileSlideshow";
import { Images } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/heritage/rooms")({
  head: () => ({
    meta: [
      { title: "Private Bedrooms — Adult Family Home in Mount Vernon, WA" },
      {
        name: "description",
        content:
          "Six private bedrooms in our Mount Vernon, WA adult family home. Garden views, wood floors, and live availability for Skagit County families.",
      },
      { property: "og:title", content: "Private Bedrooms — Mount Vernon, WA Adult Family Home" },
      {
        property: "og:description",
        content:
          "Six private bedrooms with garden views and live availability in our Mount Vernon, WA adult family home.",
      },
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
  const mediaSlugs = getRoomSlugsWithMedia();
  const roomsWithMedia = rooms.filter((r) => mediaSlugs.includes(r.slug));
  const filtered = roomsWithMedia.filter((r) => filter === "all" || r.status === filter);
  const active = openSlug ? roomsWithMedia.find((r) => r.slug === openSlug) : null;
  const activeMedia = active ? getRealRoomMedia(active.slug) : [];
  return (
    <div className="wide-container section-y">
      <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--h-primary)" }}>
        Bedrooms
      </p>
      <h1 className="font-display text-5xl md:text-6xl mt-4">Private bedrooms. Each one a home.</h1>
      <p className="mt-6 text-lg text-stone-600 max-w-2xl">
        Tap any bedroom to view all photos. Availability is updated by the owner directly.
      </p>
      <p className="mt-3 text-sm text-stone-600 max-w-2xl">
        <span className="font-medium" style={{ color: "var(--h-primary)" }}>
          TVs included:
        </span>{" "}
        a flat-screen TV is mounted in every resident's private bedroom before move-in — unless
        you'd rather bring your own.
      </p>

      <div className="flex flex-wrap gap-2 mt-10">
        {(["all", "available", "waitlist"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={
              "px-4 py-2 rounded-full text-sm capitalize border " +
              (filter === f ? "text-white" : "bg-white")
            }
            style={
              filter === f
                ? { background: "var(--h-primary)", borderColor: "var(--h-primary)" }
                : { borderColor: "var(--h-border)" }
            }
          >
            {f === "all" ? "All bedrooms" : f}
          </button>
        ))}
      </div>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((r) => {
          const media = getRealRoomMedia(r.slug);
          const mediaCount = media.length;
          const isOccupied = r.status === "occupied";
          return (
            <div
              key={r.id}
              className={`rounded-xl overflow-hidden flex flex-col transition ${isOccupied ? "bg-stone-100 opacity-70 grayscale" : "bg-white"}`}
              style={{ border: `1px solid ${isOccupied ? "#d6d3d1" : "var(--h-border)"}` }}
            >
              <button
                type="button"
                onClick={() => setOpenSlug(r.slug)}
                className="group relative aspect-[4/3] overflow-hidden bg-stone-100 block text-left"
                aria-label={`Open ${mediaCount} photos for ${r.name}`}
              >
                <RoomTileSlideshow media={media} alt={`Heritage adult family home ${r.name}`} />
                {isOccupied && (
                  <div className="absolute inset-0 bg-stone-900/20 pointer-events-none" />
                )}
                <div className="absolute inset-0 bg-black/0 transition flex items-center justify-center group-hover:bg-black/30">
                  <span className="opacity-0 group-hover:opacity-100 transition px-3 py-1.5 rounded-full bg-white/95 text-stone-900 text-xs font-medium inline-flex items-center gap-1.5">
                    <Images className="size-3.5" />
                    View all {mediaCount} photos
                  </span>
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
                  <span
                    className="text-xs px-2 py-1 rounded-full shrink-0"
                    style={statusTone(r.status)}
                  >
                    {statusLabel(r.status)}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs text-stone-500">
                    {mediaCount} photo{mediaCount === 1 ? "" : "s"}
                  </p>
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
        {filtered.length === 0 && (
          <p className="text-stone-600">No bedrooms match this filter right now.</p>
        )}
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
