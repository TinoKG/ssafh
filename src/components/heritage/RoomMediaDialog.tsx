import { useCallback, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { RoomMedia } from "@/lib/room-media";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roomName: string;
  media: RoomMedia[];
  startIndex?: number;
}

export function RoomMediaDialog({ open, onOpenChange, roomName, media, startIndex = 0 }: Props) {
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    if (open) setIndex(startIndex);
  }, [open, startIndex]);

  const count = media.length;
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, prev, next]);

  if (count === 0) return null;
  const current = media[index];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl p-0 bg-black border-0 overflow-hidden">
        <DialogTitle className="sr-only">{roomName} — photo gallery</DialogTitle>
        <div className="flex flex-col md:flex-row md:h-[80vh]">
          {/* Thumbnail panel: vertical on desktop, horizontal on mobile */}
          {count > 1 && (
            <div className="order-2 md:order-1 bg-black/95 md:w-28 lg:w-32 shrink-0 flex md:flex-col gap-2 p-2 md:p-3 overflow-x-auto md:overflow-y-auto md:overflow-x-hidden">
              {media.map((m, i) => (
                <button
                  key={m.url}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`View ${roomName} photo ${i + 1}`}
                  aria-current={i === index}
                  className={
                    "relative shrink-0 size-16 md:w-full md:h-20 rounded overflow-hidden border-2 transition " +
                    (i === index
                      ? "border-white opacity-100"
                      : "border-transparent opacity-60 hover:opacity-100")
                  }
                >
                  {m.type === "image" ? (
                    <img src={m.url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-stone-800 flex items-center justify-center text-white text-[10px] font-mono">
                      VIDEO
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Main preview area */}
          <div className="order-1 md:order-2 relative flex-1 bg-black flex items-center justify-center min-h-[50vh] md:min-h-0">
            {current.type === "image" ? (
              <img
                src={current.url}
                alt={`${roomName} photo ${index + 1} of ${count}`}
                className="w-full h-full object-contain"
              />
            ) : (
              <video
                key={current.url}
                src={current.url}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain bg-black"
              />
            )}

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 -translate-y-1/2 size-11 rounded-full bg-white/90 hover:bg-white text-stone-900 flex items-center justify-center shadow-lg"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 size-11 rounded-full bg-white/90 hover:bg-white text-stone-900 flex items-center justify-center shadow-lg"
                >
                  <ChevronRight className="size-6" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 text-white text-xs font-medium">
                  {index + 1} / {count}
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}