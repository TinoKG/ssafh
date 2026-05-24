import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type RoomStatus = "available" | "waitlist" | "occupied";

export interface Room {
  id: string;
  slug: string;
  name: string;
  description: string;
  sqft: number | null;
  amenities: string[];
  photos: string[];
  status: RoomStatus;
  sort_order: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  relation: string | null;
}

export interface SiteSettings {
  business_name: string;
  tagline: string | null;
  dshs_license: string | null;
  year_opened: number | null;
  phone: string | null;
  email: string | null;
  address_line: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  service_area: string | null;
  hours: string | null;
  facebook_url: string | null;
  google_maps_url: string | null;
  calendly_url: string | null;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  hero_url: string | null;
  published_at: string | null;
}

export const roomsQueryOptions = () =>
  queryOptions({
    queryKey: ["rooms"],
    queryFn: async (): Promise<Room[]> => {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return (data ?? []).map((r) => ({
        ...r,
        amenities: Array.isArray(r.amenities) ? (r.amenities as string[]) : [],
        photos: Array.isArray(r.photos) ? (r.photos as string[]) : [],
      })) as Room[];
    },
  });

export const roomQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["room", slug],
    queryFn: async (): Promise<Room | null> => {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return {
        ...data,
        amenities: Array.isArray(data.amenities) ? (data.amenities as string[]) : [],
        photos: Array.isArray(data.photos) ? (data.photos as string[]) : [],
      } as Room;
    },
  });

export const testimonialsQueryOptions = () =>
  queryOptions({
    queryKey: ["testimonials"],
    queryFn: async (): Promise<Testimonial[]> => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("id, quote, author, relation")
        .eq("published", true)
        .order("sort_order");
      if (error) throw error;
      return (data ?? []) as Testimonial[];
    },
  });

export const settingsQueryOptions = () =>
  queryOptions({
    queryKey: ["site_settings"],
    queryFn: async (): Promise<SiteSettings> => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", 1)
        .maybeSingle();
      if (error) throw error;
      return (data ?? {
        business_name: "Skagit Valley Care Home",
      }) as SiteSettings;
    },
  });

export const blogQueryOptions = () =>
  queryOptions({
    queryKey: ["blog_posts"],
    queryFn: async (): Promise<BlogPost[]> => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, body, hero_url, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as BlogPost[];
    },
  });

export async function submitInquiry(input: {
  kind: "contact" | "tour" | "room" | "admissions";
  design: "heritage" | "heirloom";
  source_path: string;
  name: string;
  email?: string;
  phone?: string;
  relation?: string;
  message?: string;
  room_slug?: string;
  preferred_date?: string;
  preferred_time?: string;
}) {
  const { error } = await supabase.from("inquiries").insert({
    ...input,
    handled: false,
  });
  if (error) throw error;
}

export function statusLabel(status: RoomStatus) {
  return status === "available" ? "Available now" : status === "waitlist" ? "Waitlist" : "Occupied";
}