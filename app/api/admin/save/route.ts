import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";

import { BLOG_SCOPE_SECTIONS, resolveScope } from "@/lib/admin-auth";
import { CONTENT_PATH } from "@/lib/content";
import { isValidContentDoc, writeFileAtomic } from "@/lib/admin-save";
import { commitFileToGithub } from "@/lib/admin-github";
import type { SiteContent } from "@/types/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REPO_CONTENT_PATH = "content/site-content.json";

type Pages = SiteContent["pages"];

/**
 * Each panel owns its own sections, so the two editors can never overwrite one
 * another: the blog panel writes ONLY Blog + Events, and the site panel writes
 * everything EXCEPT Blog + Events. Both merge onto the document currently on
 * disk rather than replacing it wholesale, so a stale browser tab can't wipe
 * changes another panel just made.
 */
function mergeForScope(
  scope: "admin" | "blog",
  incoming: SiteContent,
  current: SiteContent
): SiteContent {
  const merged = structuredClone(current);

  if (scope === "blog") {
    BLOG_SCOPE_SECTIONS.forEach((section) => {
      const value = incoming.pages[section as keyof Pages];
      if (value) {
        (merged.pages as Record<string, unknown>)[section] = value;
      }
    });
    return merged;
  }

  // Site-wide panel: take everything from the incoming document, then restore
  // the blog-owned sections from disk.
  const next = structuredClone(incoming);
  BLOG_SCOPE_SECTIONS.forEach((section) => {
    const value = current.pages[section as keyof Pages];
    if (value) {
      (next.pages as Record<string, unknown>)[section] = value;
    }
  });
  return next;
}

export async function POST(request: NextRequest) {
  const scope = resolveScope(request);
  if (!scope) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  let doc: unknown;
  try {
    doc = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  if (!isValidContentDoc(doc)) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Payload is not a complete content document — refusing to save so the file can't be corrupted.",
      },
      { status: 400 }
    );
  }

  // Merge onto what's on disk right now, limited to this panel's sections.
  let current: SiteContent;
  try {
    current = JSON.parse(await fs.readFile(CONTENT_PATH, "utf8")) as SiteContent;
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: `Could not read the current content file: ${(err as Error).message}`,
      },
      { status: 500 }
    );
  }

  const finalDoc = mergeForScope(scope, doc as SiteContent, current);
  const json = JSON.stringify(finalDoc, null, 2) + "\n";

  // 1. Try a local, atomic write first.
  let local: "ok" | "readonly";
  try {
    local = await writeFileAtomic(CONTENT_PATH, json);
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: `Could not write the file: ${(err as Error).message}` },
      { status: 500 }
    );
  }

  if (local === "ok") {
    return NextResponse.json({ ok: true, mode: "file", scope });
  }

  // 2. Read-only host (e.g. Vercel) → commit to GitHub; the host redeploys.
  const result = await commitFileToGithub({
    repoPath: REPO_CONTENT_PATH,
    contentBase64: Buffer.from(json, "utf8").toString("base64"),
    message:
      scope === "blog"
        ? "Update blog/events content via blog editor"
        : "Update site content via admin editor",
  });

  if (result.ok) {
    return NextResponse.json({
      ok: true,
      mode: "github",
      scope,
      message:
        "Saved to GitHub — the host is redeploying; changes go live in a minute or two.",
    });
  }

  return NextResponse.json(
    { ok: false, error: result.error },
    { status: result.status }
  );
}
