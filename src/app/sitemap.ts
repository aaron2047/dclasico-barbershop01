import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (process.env.NEXT_PUBLIC_ENABLE_INDEXING !== "true") return [];
  return [{ url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000", changeFrequency: "weekly", priority: 1 }];
}
