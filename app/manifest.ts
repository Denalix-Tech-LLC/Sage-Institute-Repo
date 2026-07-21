import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F1ECEC",
    theme_color: "#365B6B",
    icons: [
      {
        // Sage-plant brand mark.
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
