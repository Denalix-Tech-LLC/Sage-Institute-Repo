import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { site } = await getContent();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Dormant, noindexed screening route; PHI intake lives off-site.
      // Both editor panels are also kept out of search results.
      disallow: ["/intake", "/admin", "/admin-blogs"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
