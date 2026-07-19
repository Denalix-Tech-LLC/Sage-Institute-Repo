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
        // Flower-only brand mark; scales to any size.
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        // Raster fallback for platforms without SVG manifest support.
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
