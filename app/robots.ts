import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Dormant, noindexed screening route; PHI intake lives off-site.
      disallow: "/intake",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
