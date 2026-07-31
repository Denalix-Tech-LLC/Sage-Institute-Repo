import { NextRequest, NextResponse } from "next/server";

import { adminPassword, isAuthed } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    authed: isAuthed(request),
    // Lets the login screen warn the owner up front if the host is misconfigured.
    configured: Boolean(adminPassword()),
  });
}
