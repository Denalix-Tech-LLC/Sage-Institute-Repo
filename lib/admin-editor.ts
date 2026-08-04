/**
 * Pure, client-side helpers for the /admin editor. No fs, no React — just the
 * immutable-update and list-template logic the form components share.
 */

export type Path = (string | number)[];

/** A short unique id for newly-added list items. */
export function newId(): string {
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

// Friendlier labels than a naive humanize for a few keys.
const LABEL_OVERRIDES: Record<string, string> = {
  seoTitle: "SEO title (browser tab & search)",
  seoDescription: "SEO description (search results)",
  browserTitle: "Default browser-tab title",
  shareTitle: "Social-share title",
  image: "Image",
  imageAlt: "Image description (alt text)",
  cta: "Button label",
  ctaLabel: "Button label",
  href: "Link (URL or /path)",
  url: "URL",
  embedSrc: "Map embed URL",
  linkUrl: "Link URL",
  linkLabel: "Link label",
  phoneNumber: "Phone (digits only, for the tel: link)",
  phoneLabel: "Phone (shown)",
  addressLine1: "Address line 1",
  addressLine2: "Address line 2",
  rightsText: "Rights line (after the year)",
  colophon: "Colophon (small print)",
  featured: "Featured (large card)",
  icon: "Icon",
  author: "Author",
  excerpt: "Short summary (shown on the blog list)",
  body: "Post text (press Enter twice to start a new paragraph)",
  slug: "Web address (optional — leave blank to use the title)",
  readMoreLabel: "“Read more” link label",
  backLabel: "“Back to posts” link label",
  byLabel: "Author prefix (e.g. “By”)",
};

/**
 * Fields that should always render as a multi-line textarea, even when empty —
 * otherwise a new blog post's body would start life as a one-line input.
 */
export const MULTILINE_KEYS = new Set([
  "body",
  "excerpt",
  "description",
  "intro",
  "blurb",
  "text",
  "lead",
  "disclaimer",
  "ageNote",
  "heading",
  "seoDescription",
]);

/** Turn a camelCase / snake_case key into a Title Case label. */
export function humanize(key: string): string {
  if (LABEL_OVERRIDES[key]) return LABEL_OVERRIDES[key];
  const spaced = key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/** Read the value at a key/index path. */
export function getAt(root: unknown, path: Path): unknown {
  let node: unknown = root;
  for (const key of path) {
    if (node == null) return undefined;
    node = (node as Record<string | number, unknown>)[key];
  }
  return node;
}

/** Immutably set the value at a path, returning a new root. */
export function setAt<T>(root: T, path: Path, value: unknown): T {
  const clone = structuredClone(root) as T;
  let node = clone as unknown as Record<string | number, unknown>;
  for (let i = 0; i < path.length - 1; i += 1) {
    node = node[path[i]] as Record<string | number, unknown>;
  }
  node[path[path.length - 1]] = value;
  return clone;
}

/** Deep clone giving every `id` key a fresh unique value. */
export function withFreshIds<T>(node: T): T {
  if (Array.isArray(node)) {
    return node.map((item) => withFreshIds(item)) as unknown as T;
  }
  if (node && typeof node === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(node)) {
      out[k] = k === "id" ? newId() : withFreshIds(v);
    }
    return out as unknown as T;
  }
  return node;
}

/**
 * Build a blank template from a sample item: strings emptied, booleans false,
 * numbers zeroed — but `icon` kept (a sensible default) and `_`-prefixed doc
 * keys preserved. Nested structure is retained so a new item is ready to fill.
 */
export function blankTemplate(node: unknown): unknown {
  if (Array.isArray(node)) return node.map(blankTemplate);
  if (node && typeof node === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(node)) {
      if (k === "id") out[k] = "id-template";
      else if (k === "icon" || k.startsWith("_")) out[k] = v;
      else out[k] = blankTemplate(v);
    }
    return out;
  }
  if (typeof node === "string") return "";
  if (typeof node === "boolean") return false;
  if (typeof node === "number") return 0;
  return node;
}

/** The template key for a path — the string keys only, indices dropped. */
export function templateKey(path: Path): string {
  return path.filter((k) => typeof k === "string").join(".");
}

/** Snapshot a blank template for every object-array in the tree, keyed by path. */
export function collectTemplates(root: unknown): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  function walk(node: unknown, keyPath: string[]) {
    if (Array.isArray(node)) {
      const first = node[0];
      if (first && typeof first === "object") {
        out[keyPath.join(".")] = blankTemplate(first);
        walk(first, keyPath);
      }
      return;
    }
    if (node && typeof node === "object") {
      for (const [k, v] of Object.entries(node)) {
        if (v && typeof v === "object") walk(v, [...keyPath, k]);
      }
    }
  }
  walk(root, []);
  return out;
}

/** Templates for lists that are empty by default (no sample to snapshot). */
export const EXTRA_TEMPLATES: Record<string, unknown> = {
  "pages.events.items": {
    id: "id-template",
    title: "",
    date: "",
    description: "",
    image: "",
    imageAlt: "",
    location: "",
    linkLabel: "",
    linkUrl: "",
  },
  "pages.blog.posts": {
    id: "id-template",
    title: "",
    date: "",
    author: "",
    excerpt: "",
    body: "",
    image: "",
    imageAlt: "",
    slug: "",
  },
};

/** A `{ id, text }` list row (rendered inline rather than as a card). */
export function isSimpleTextItem(item: unknown): boolean {
  if (!item || typeof item !== "object") return false;
  const keys = Object.keys(item).filter((k) => !k.startsWith("_"));
  return keys.length === 2 && keys.includes("id") && keys.includes("text");
}

/** A human label for a list row, derived from its most name-like field. */
export function itemLabel(item: unknown, index: number): string {
  if (item && typeof item === "object") {
    const record = item as Record<string, unknown>;
    for (const key of ["title", "name", "label", "heading", "text", "value", "date"]) {
      const value = record[key];
      if (typeof value === "string" && value.trim()) {
        return value.length > 70 ? `${value.slice(0, 70)}…` : value;
      }
    }
  }
  return `Item ${index + 1}`;
}
