import { NextRequest, NextResponse } from "next/server";

import {
  ADMIN_COOKIE,
  adminPassword,
  cookieOptions,
  deriveToken,
  safeEqual,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const password = adminPassword();
  if (!password) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Admin password is not configured. Set ADMIN_PASSWORD in the environment and redeploy.",
      },
      { status: 500 }
    );
  }

  let body: { password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  const provided = typeof body.password === "string" ? body.password : "";
  if (!provided || !safeEqual(provided, password)) {
    return NextResponse.json(
      { ok: false, error: "Incorrect password." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, deriveToken(password), {
    ...cookieOptions(),
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return response;
}
