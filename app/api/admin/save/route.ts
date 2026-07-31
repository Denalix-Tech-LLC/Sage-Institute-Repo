import { NextRequest, NextResponse } from "next/server";

import { isAuthed } from "@/lib/admin-auth";
import { CONTENT_PATH } from "@/lib/content";
import { isValidContentDoc, writeFileAtomic } from "@/lib/admin-save";
import { commitFileToGithub } from "@/lib/admin-github";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REPO_CONTENT_PATH = "content/site-content.json";

export async function POST(request: NextRequest) {
  if (!isAuthed(request)) {
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

  const json = JSON.stringify(doc, null, 2) + "\n";

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
    return NextResponse.json({ ok: true, mode: "file" });
  }

  // 2. Read-only host (e.g. Vercel) → commit to GitHub; the host redeploys.
  const result = await commitFileToGithub({
    repoPath: REPO_CONTENT_PATH,
    contentBase64: Buffer.from(json, "utf8").toString("base64"),
    message: "Update site content via admin editor",
  });

  if (result.ok) {
    return NextResponse.json({
      ok: true,
      mode: "github",
      message:
        "Saved to GitHub — the host is redeploying; changes go live in a minute or two.",
    });
  }

  return NextResponse.json(
    { ok: false, error: result.error },
    { status: result.status }
  );
}
