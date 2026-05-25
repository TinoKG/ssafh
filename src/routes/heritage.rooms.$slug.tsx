import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { roomQueryOptions, roomsQueryOptions, statusLabel } from "@/lib/site-data";
import { ASSETS } from "@/lib/assets";
import { InquiryForm } from "@/components/shared/InquiryForm";
import { Check } from "lucide-react";

export const Route = createFileRoute("/heritage/rooms/$slug")({
  loader: ({ context, params }) => context.queryClient.ensureQueryData(roomQueryOptions(params.slug)),
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — Skagit Valley Care Home` },
      { property: "og:image", content: ASSETS.room },
    ],
  }),
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="font-display text-3xl">Room not found</h1>
      <Link to="/heritage/rooms" className="underline mt-4 inline-block">Back to rooms</Link>
    </div>
  ),
  errorComponent: () => <div className="max-w-3xl mx-auto px-6 py-24">Something went wrong loading this room.</div>,
  component: Page,
});

function Page() {
  const { slug } = Route.useParams();
  const { data: room } = useQuery(roomQueryOptions(slug));
  const { data: all = [] } = useQuery(roomsQueryOptions());
  if (!room) throw notFound();
  const others = all.filter((r) => r.slug !== slug).slice(0, 3);
  const photos = room.photos.length ? room.photos : [ASSETS.room];
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
      <Link to="/heritage/rooms" className="text-sm text-stone-600 underline">← All rooms</Link>
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 mt-6">
        <div>
          <img src={photos[0]} alt={room.name} className="rounded-2xl w-full aspect-[4/3] object-cover" width={1400} height={1000} />
          {photos.length > 1 && (
            <div className="grid grid-cols-3 gap-3 mt-3">
              {photos.slice(1, 4).map((p, i) => (
                <img key={i} src={p} alt="" className="rounded-lg aspect-[4/3] object-cover" loading="lazy" />
              ))}
            </div>
          )}
        </div>
        <div>
          <span className="text-xs px-3 py-1 rounded-full inline-block" style={{
            background: room.status === "available" ? "var(--h-primary-soft)" : "#fef3c7",
            color: room.status === "available" ? "var(--h-primary)" : "#854d0e",
          }}>{statusLabel(room.status)}</span>
          <h1 className="font-display text-4xl md:text-5xl mt-4">{room.name}</h1>
          <p className="text-stone-500 mt-1">{room.sqft ? `${room.sqft} sq ft` : ""}</p>
          <p className="mt-5 text-stone-700">{room.description}</p>
          {room.amenities.length > 0 && (
            <>
              <h2 className="font-display text-xl mt-8">Amenities</h2>
              <ul className="mt-3 grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                {room.amenities.map((a) => <li key={a} className="flex gap-2"><Check className="size-4 mt-1 shrink-0" style={{ color: "var(--h-primary)" }} />{a}</li>)}
              </ul>
            </>
          )}
        </div>
      </div>

      <div className="mt-16 grid lg:grid-cols-[1fr_1fr] gap-12">
        <div>
          <h2 className="font-display text-3xl">Ask about this room</h2>
          <p className="mt-2 text-stone-600">Tell us a little about your loved one and we'll respond within one business day.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white" style={{ border: "1px solid var(--h-border)" }}>
          <InquiryForm kind="room" design="heritage" sourcePath={`/heritage/rooms/${slug}`} roomSlug={slug} variant="heritage" submitLabel={`Inquire about ${room.name}`} />
        </div>
      </div>

      {others.length > 0 && (
        <div className="mt-20">
          <h2 className="font-display text-2xl mb-6">Other rooms</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {others.map((r) => (
              <Link key={r.id} to="/heritage/rooms/$slug" params={{ slug: r.slug }} className="rounded-xl overflow-hidden bg-white block" style={{ border: "1px solid var(--h-border)" }}>
                <img src={r.photos[0] ?? ASSETS.room} alt={r.name} className="w-full aspect-[4/3] object-cover" loading="lazy" />
                <div className="p-4"><h3 className="font-display">{r.name}</h3></div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}