import { NextRequest, NextResponse } from "next/server";

import { isAuthedFor, isScope, scopePassword, type Scope } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const requested = request.nextUrl.searchParams.get("scope");
  const scope: Scope = isScope(requested) ? requested : "admin";

  return NextResponse.json({
    scope,
    authed: isAuthedFor(request, scope),
    // Lets the login screen warn up front if the host is misconfigured.
    configured: Boolean(scopePassword(scope)),
  });
}
