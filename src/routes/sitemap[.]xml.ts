import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

const BASE_URL = "https://ssafh.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/heritage", changefreq: "weekly", priority: "1.0" },
          { path: "/heritage/about", changefreq: "monthly", priority: "0.8" },
          { path: "/heritage/services", changefreq: "monthly", priority: "0.9" },
          { path: "/heritage/rooms", changefreq: "weekly", priority: "0.9" },
          { path: "/heritage/admissions", changefreq: "monthly", priority: "0.8" },
          { path: "/heritage/resources", changefreq: "monthly", priority: "0.7" },
          { path: "/heritage/contact", changefreq: "monthly", priority: "0.9" },
          { path: "/heritage/tour", changefreq: "monthly", priority: "0.9" },
          {
            path: "/heritage/guides/afh-vs-assisted-living",
            changefreq: "monthly",
            priority: "0.7",
          },
          { path: "/privacy", changefreq: "yearly", priority: "0.2" },
          { path: "/terms", changefreq: "yearly", priority: "0.2" },
          { path: "/accessibility", changefreq: "yearly", priority: "0.3" },
        ];

        try {
          const { data: rooms } = await supabase.from("rooms").select("slug").order("sort_order");
          (rooms ?? []).forEach((r: { slug: string }) => {
            entries.push({
              path: `/heritage/rooms/${r.slug}`,
              changefreq: "weekly",
              priority: "0.7",
            });
          });
        } catch {
          // ignore — sitemap still valid without dynamic rows
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
