import { promises as fs } from "fs";
import path from "path";
import { cache } from "react";
import { unstable_noStore as noStore } from "next/cache";

import type { SiteContent } from "@/types/content";

export const CONTENT_PATH = path.join(
  process.cwd(),
  "content",
  "site-content.json"
);

/**
 * Reads the editable content document fresh on every request.
 *
 * `noStore()` opts the caller out of the full-route cache so an admin save is
 * reflected on the next refresh with no rebuild; `cache()` (React, per-request)
 * dedupes so layout + page + footer share a single disk read within one request.
 *
 * The JSON is intentionally NOT `import`ed at build time — that would bake a
 * stale copy into the bundle.
 */
export const getContent = cache(async (): Promise<SiteContent> => {
  noStore();
  const raw = await fs.readFile(CONTENT_PATH, "utf8");
  return JSON.parse(raw) as SiteContent;
});

/**
 * Absolute base for canonical + Open Graph URLs. Defaults to the content `url`;
 * set NEXT_PUBLIC_SITE_URL to preview OG cards on a tunnel/staging host.
 */
export function resolveSiteUrl(content: SiteContent): string {
  return process.env.NEXT_PUBLIC_SITE_URL || content.site.url;
}
