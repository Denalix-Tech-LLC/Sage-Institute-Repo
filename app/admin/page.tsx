import type { Metadata } from "next";

import { getContent } from "@/lib/content";
import { AdminClient } from "./AdminClient";

export const metadata: Metadata = {
  title: "Site Editor",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const content = await getContent();
  return <AdminClient initialContent={content} />;
}
