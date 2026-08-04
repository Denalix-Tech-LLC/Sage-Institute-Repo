import type { Metadata } from "next";

import { getContent } from "@/lib/content";
import { AdminClient, type TabDef } from "@/components/admin/AdminClient";

export const metadata: Metadata = {
  title: "Site Editor",
  robots: { index: false, follow: false },
};

/**
 * Site-wide content. Blog and Events & Classes live in their own panel at
 * /admin-blogs (separate password), and saves here never touch those sections.
 */
const SITE_TABS: TabDef[] = [
  { key: "site", label: "Site & Navigation", path: ["site"] },
  { key: "seo", label: "SEO", path: ["seo"] },
  { key: "home", label: "Home", path: ["pages", "home"] },
  { key: "about", label: "About", path: ["pages", "about"] },
  { key: "services", label: "Services", path: ["pages", "services"] },
  { key: "contact", label: "Contact", path: ["pages", "contact"] },
  { key: "notFound", label: "404 Page", path: ["pages", "notFound"] },
];

export default async function AdminPage() {
  const content = await getContent();
  return (
    <AdminClient
      initialContent={content}
      scope="admin"
      tabs={SITE_TABS}
      panelTitle="Site Editor"
      loginHint="Enter the admin password to edit the website’s text and images. Blog and Events have their own editor at /admin-blogs."
    />
  );
}
