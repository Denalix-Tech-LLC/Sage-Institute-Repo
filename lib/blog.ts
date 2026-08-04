import type { BlogPost } from "@/types/content";

/**
 * Blog helpers. Post web addresses (slugs) are derived automatically from the
 * post title so the owner never has to think about URLs — but a post can carry
 * an explicit `slug` to override it (e.g. to keep an old link working).
 */

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export interface BlogPostWithSlug extends BlogPost {
  /** The URL segment actually used for this post; always unique. */
  effectiveSlug: string;
}

/**
 * Attaches a unique `effectiveSlug` to every post. Duplicate titles get a
 * numeric suffix so two posts can never claim the same address.
 */
export function withSlugs(posts: BlogPost[]): BlogPostWithSlug[] {
  const used = new Map<string, number>();

  return posts.map((post, index) => {
    const base =
      slugify(post.slug || post.title) || `post-${index + 1}`;
    const seen = used.get(base) ?? 0;
    used.set(base, seen + 1);
    return {
      ...post,
      effectiveSlug: seen === 0 ? base : `${base}-${seen + 1}`,
    };
  });
}

/**
 * Splits the plain-text body the owner typed into paragraphs. Any run of line
 * breaks starts a new paragraph — no markdown to learn.
 */
export function toParagraphs(body: string): string[] {
  return body
    .split(/\r?\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}
