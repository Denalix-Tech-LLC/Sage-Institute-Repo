import { NextRequest, NextResponse } from "next/server";
import path from "path";
import crypto from "crypto";

import { resolveScope } from "@/lib/admin-auth";
import { writeFileAtomic } from "@/lib/admin-save";
import { commitFileToGithub } from "@/lib/admin-github";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 4 * 1024 * 1024; // 4 MB

// Raster + modern formats only. SVG is intentionally excluded (script risk).
const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
};

export async function POST(request: NextRequest) {
  // Either panel may upload images.
  if (!resolveScope(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Expected a file upload." },
      { status: 400 }
    );
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "No file provided." }, { status: 400 });
  }

  const ext = EXT_BY_MIME[file.type];
  if (!ext) {
    return NextResponse.json(
      { ok: false, error: "Unsupported image type. Use JPG, PNG, WebP, GIF, or AVIF." },
      { status: 400 }
    );
  }

  if (file.size === 0) {
    return NextResponse.json({ ok: false, error: "The file is empty." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      {
        ok: false,
        error: `Image is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). The limit is 4 MB.`,
      },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Sanitize the base name, then make it unique.
  const rawBase = path.basename(file.name || "image", path.extname(file.name || ""));
  const base =
    rawBase
      .toLowerCase()
      .replace(/[^a-z0-9-_]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "image";
  const unique = `${base}-${Date.now().toString(36)}-${crypto
    .randomBytes(3)
    .toString("hex")}${ext}`;

  const publicPath = `/uploads/${unique}`;
  const targetPath = path.join(process.cwd(), "public", "uploads", unique);
  const repoPath = `public/uploads/${unique}`;

  // 1. Try a local write first.
  let local: "ok" | "readonly";
  try {
    local = await writeFileAtomic(targetPath, buffer);
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: `Could not save the image: ${(err as Error).message}` },
      { status: 500 }
    );
  }

  if (local === "ok") {
    return NextResponse.json({ ok: true, path: publicPath, mode: "file" });
  }

  // 2. Read-only host → commit the image to GitHub as base64.
  const result = await commitFileToGithub({
    repoPath,
    contentBase64: buffer.toString("base64"),
    message: `Upload image ${unique} via admin editor`,
  });

  if (result.ok) {
    return NextResponse.json({
      ok: true,
      path: publicPath,
      mode: "github",
      message:
        "Image saved to GitHub — the host is redeploying; it goes live in a minute or two.",
    });
  }

  return NextResponse.json({ ok: false, error: result.error }, { status: result.status });
}
