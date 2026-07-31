import crypto from "crypto";
import type { NextRequest } from "next/server";

/**
 * Minimal shared-password auth for the /admin editor. No database, no accounts.
 * The password lives only in the ADMIN_PASSWORD env var and is never sent to
 * the client or embedded in the bundle. The cookie stores a sha256 token
 * derived from the password — not the password itself.
 */

export const ADMIN_COOKIE = "sage_admin";
const TOKEN_NAMESPACE = "sage-institute-admin:v1:";

/** The cookie token derived from a password (never the raw password). */
export function deriveToken(password: string): string {
  return crypto
    .createHash("sha256")
    .update(TOKEN_NAMESPACE + password)
    .digest("hex");
}

/**
 * Constant-time equality. Both inputs are hashed first so the comparison runs
 * on equal-length buffers and never leaks length via early exit.
 */
export function safeEqual(a: string, b: string): boolean {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

/** The configured admin password, or "" when unset. */
export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || "";
}

/** True when the request carries a cookie matching the configured password. */
export function isAuthed(request: NextRequest): boolean {
  const password = adminPassword();
  if (!password) return false;
  const cookie = request.cookies.get(ADMIN_COOKIE)?.value ?? "";
  if (!cookie) return false;
  return safeEqual(cookie, deriveToken(password));
}

/** Cookie options shared by login (set) and logout (clear). */
export function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  };
}
