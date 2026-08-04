import type { Metadata } from "next";

import { getContent } from "@/lib/content";
import { AdminClient, type TabDef } from "@/components/admin/AdminClient";

export const metadata: Metadata = {
  title: "Blog & Events Editor",
  robots: { index: false, follow: false },
};

/**
 * Blog + Events & Classes only, behind its own ADMIN_BLOG_PASSWORD. Saves from
 * this panel are limited server-side to these two sections, so it can never
 * change (or overwrite) the rest of the site.
 */
const BLOG_TABS: TabDef[] = [
  { key: "blog", label: "Blog", path: ["pages", "blog"] },
  { key: "events", label: "Events & Classes", path: ["pages", "events"] },
];

export default async function AdminBlogsPage() {
  const content = await getContent();
  return (
    <AdminClient
      initialContent={content}
      scope="blog"
      tabs={BLOG_TABS}
      panelTitle="Blog & Events Editor"
      loginHint="Enter the blog password to write posts and manage events."
    />
  );
}
