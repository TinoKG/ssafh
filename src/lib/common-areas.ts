// Common (shared) areas like dining, sitting, porch, kitchen.
// Drop image/video files into src/assets/common-areas/<slug>/ and they will be
// auto-discovered. Sort is alphabetical by filename.

import type { RoomMedia } from "@/lib/room-media";

const VIDEO_EXT = /\.(mp4|webm|mov)$/i;

const modules = import.meta.glob(
  "/src/assets/common-areas/**/*.{jpg,jpeg,png,webp,avif,mp4,webm,mov,JPG,JPEG,PNG,WEBP,AVIF,MP4,WEBM,MOV}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

const bySlug: Record<string, RoomMedia[]> = {};
for (const [path, url] of Object.entries(modules)) {
  const match = path.match(/\/src\/assets\/common-areas\/([^/]+)\/([^/]+)$/);
  if (!match) continue;
  const [, slug, name] = match;
  const type: RoomMedia["type"] = VIDEO_EXT.test(name) ? "video" : "image";
  (bySlug[slug] ||= []).push({ url, type, name });
}
for (const slug of Object.keys(bySlug)) {
  bySlug[slug].sort((a, b) => a.name.localeCompare(b.name));
}

export type CommonArea = {
  slug: string;
  name: string;
  description: string;
};

// Listed manually so we control display order and copy. Tiles only render for
// areas that actually have media in their folder.
export const COMMON_AREAS: CommonArea[] = [
  {
    slug: "sitting",
    name: "Sitting Room",
    description: "A bright, comfortable gathering space for visits, TV, and quiet afternoons.",
  },
  {
    slug: "dining",
    name: "Dining Room",
    description: "Home-cooked meals served family-style around a shared table.",
  },
  {
    slug: "kitchen",
    name: "Kitchen",
    description: "The heart of the home — where every meal is prepared fresh each day.",
  },
  {
    slug: "restroom-01",
    name: "Restroom 1",
    description: "A clean, accessible restroom maintained for daily comfort and ease.",
  },
  {
    slug: "porch",
    name: "Porch",
    description: "Covered outdoor seating for fresh air, sunshine, and a change of scenery.",
  },
];

export function getCommonAreaMedia(slug: string): RoomMedia[] {
  return bySlug[slug] ?? [];
}

export function getCommonArea(slug: string): CommonArea | undefined {
  return COMMON_AREAS.find((area) => area.slug === slug);
}

export function getCommonAreas(): CommonArea[] {
  return COMMON_AREAS.filter((a) => getCommonAreaMedia(a.slug).length > 0);
}
