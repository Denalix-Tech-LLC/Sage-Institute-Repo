import crypto from "crypto";
import type { NextRequest } from "next/server";

/**
 * Minimal shared-password auth for the two editor panels. No database, no
 * accounts. Passwords live only in env vars and are never sent to the client;
 * the cookie stores a sha256 token derived from the password.
 *
 *  - "admin" scope (/admin)        -> ADMIN_PASSWORD       -> site-wide content
 *  - "blog"  scope (/admin-blogs)  -> ADMIN_BLOG_PASSWORD  -> Blog + Events only
 *
 * Each scope has its own cookie and its own token namespace, so one panel's
 * cookie can never authenticate the other.
 */

export type Scope = "admin" | "blog";

export const COOKIES: Record<Scope, string> = {
  admin: "sage_admin",
  blog: "sage_admin_blog",
};

const NAMESPACES: Record<Scope, string> = {
  admin: "sage-institute-admin:v1:",
  blog: "sage-institute-admin-blog:v1:",
};

/** Sections of the content document the blog panel is allowed to change. */
export const BLOG_SCOPE_SECTIONS = ["blog", "events"] as const;

export function isScope(value: unknown): value is Scope {
  return value === "admin" || value === "blog";
}

/** The cookie token derived from a password (never the raw password). */
export function deriveToken(scope: Scope, password: string): string {
  return crypto
    .createHash("sha256")
    .update(NAMESPACES[scope] + password)
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

/** The configured password for a scope, or "" when unset. */
export function scopePassword(scope: Scope): string {
  const value =
    scope === "admin"
      ? process.env.ADMIN_PASSWORD
      : process.env.ADMIN_BLOG_PASSWORD;
  return value || "";
}

/** True when the request carries a valid cookie for that scope. */
export function isAuthedFor(request: NextRequest, scope: Scope): boolean {
  const password = scopePassword(scope);
  if (!password) return false;
  const cookie = request.cookies.get(COOKIES[scope])?.value ?? "";
  if (!cookie) return false;
  return safeEqual(cookie, deriveToken(scope, password));
}

/**
 * Which panel this request is acting as.
 *
 * A browser can hold both cookies at once (someone opens both editors), so the
 * caller states which panel it is via `?scope=` and that wins as long as the
 * request is actually authenticated for it. Without a usable hint we fall back
 * to whichever cookie is valid, preferring the site-wide one.
 */
export function resolveScope(request: NextRequest): Scope | null {
  const requested = request.nextUrl.searchParams.get("scope");
  if (isScope(requested) && isAuthedFor(request, requested)) return requested;
  if (isAuthedFor(request, "admin")) return "admin";
  if (isAuthedFor(request, "blog")) return "blog";
  return null;
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
