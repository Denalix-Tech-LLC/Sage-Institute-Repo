import { NextRequest, NextResponse } from "next/server";

import {
  COOKIES,
  cookieOptions,
  deriveToken,
  isScope,
  safeEqual,
  scopePassword,
  type Scope,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ENV_NAME: Record<Scope, string> = {
  admin: "ADMIN_PASSWORD",
  blog: "ADMIN_BLOG_PASSWORD",
};

export async function POST(request: NextRequest) {
  let body: { password?: unknown; scope?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  const scope: Scope = isScope(body.scope) ? body.scope : "admin";
  const password = scopePassword(scope);

  if (!password) {
    return NextResponse.json(
      {
        ok: false,
        error: `This editor's password is not configured. Set ${ENV_NAME[scope]} in the environment and redeploy.`,
      },
      { status: 500 }
    );
  }

  const provided = typeof body.password === "string" ? body.password : "";
  if (!provided || !safeEqual(provided, password)) {
    return NextResponse.json(
      { ok: false, error: "Incorrect password." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true, scope });
  response.cookies.set(COOKIES[scope], deriveToken(scope, password), {
    ...cookieOptions(),
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return response;
}
