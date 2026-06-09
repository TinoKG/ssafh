import { useEffect, useState } from "react";
import type { RoomMedia } from "@/lib/room-media";

interface Props {
  media: RoomMedia[];
  alt: string;
  intervalMs?: number;
}

/**
 * Auto-cycling slideshow for a room tile. Shows one image at a time with a
 * smooth cross-fade. Videos are shown as a static poster frame (muted) so the
 * tile stays calm and non-distracting.
 */
export function RoomTileSlideshow({ media, alt, intervalMs = 8000 }: Props) {
  const images = media.length > 0 ? media : [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  if (images.length === 0) return null;

  return (
    <div className="absolute inset-0">
      {images.map((m, i) => {
        const active = i === index;
        return (
          <div
            key={m.url}
            className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
            style={{ opacity: active ? 1 : 0 }}
            aria-hidden={!active}
          >
            {m.type === "image" ? (
              <img
                src={m.url}
                alt={active ? `${alt} photo ${i + 1}` : ""}
                className="w-full h-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
            ) : (
              <video
                src={m.url}
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}