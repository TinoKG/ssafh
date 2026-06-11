// Auto-discovers media files under src/assets/rooms/<slug>/*
// To add or change media for a room: drop image/video files into
// src/assets/rooms/<room-slug>/  — filenames can be anything, sort is alphabetical.
// Supported: jpg, jpeg, png, webp, avif, mp4, webm, mov

import { ROOM_FALLBACK } from "@/lib/assets";

export type RoomMedia = {
  url: string;
  type: "image" | "video";
  name: string;
};

const VIDEO_EXT = /\.(mp4|webm|mov)$/i;
const ROOM_SLUG = /^room-\d+$/;

const modules = import.meta.glob(
  "/src/assets/rooms/**/*.{jpg,jpeg,png,webp,avif,mp4,webm,mov,JPG,JPEG,PNG,WEBP,AVIF,MP4,WEBM,MOV}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

const bySlug: Record<string, RoomMedia[]> = {};
for (const [path, url] of Object.entries(modules)) {
  // path format: /src/assets/rooms/<slug>/<filename>
  const match = path.match(/\/src\/assets\/rooms\/([^/]+)\/([^/]+)$/);
  if (!match) continue;
  const [, slug, name] = match;
  const type: RoomMedia["type"] = VIDEO_EXT.test(name) ? "video" : "image";
  (bySlug[slug] ||= []).push({ url, type, name });
}
for (const slug of Object.keys(bySlug)) {
  bySlug[slug].sort((a, b) => a.name.localeCompare(b.name));
}

export function getRoomSlugsWithMedia(): string[] {
  return Object.keys(bySlug)
    .filter((slug) => ROOM_SLUG.test(slug) && bySlug[slug].some((m) => m.type === "image"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

export function getRoomMedia(slug: string): RoomMedia[] {
  const list = bySlug[slug];
  if (list && list.length > 0) return list;
  return [{ url: ROOM_FALLBACK, type: "image", name: "placeholder" }];
}

export function getRealRoomMedia(slug: string): RoomMedia[] {
  return (bySlug[slug] ?? []).filter((m) => m.type === "image");
}

export function getRoomCover(slug: string): RoomMedia {
  const list = getRoomMedia(slug);
  // Prefer first image as cover, fall back to first item
  return list.find((m) => m.type === "image") ?? list[0];
}
