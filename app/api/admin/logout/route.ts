import { NextRequest, NextResponse } from "next/server";

import { COOKIES, cookieOptions, isScope, type Scope } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let scope: Scope | null = null;
  try {
    const body = await request.json();
    if (isScope(body?.scope)) scope = body.scope;
  } catch {
    /* no body — clear both */
  }

  const response = NextResponse.json({ ok: true });
  const targets: Scope[] = scope ? [scope] : ["admin", "blog"];
  targets.forEach((target) => {
    response.cookies.set(COOKIES[target], "", { ...cookieOptions(), maxAge: 0 });
  });
  return response;
}
