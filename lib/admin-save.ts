import { promises as fs } from "fs";
import path from "path";

/**
 * Local-filesystem write helpers for the admin editor.
 *
 * Writes are atomic (temp file in the same directory, then rename over the
 * target) so a visitor reading a file mid-save never sees truncated content,
 * and serialized through an in-process promise chain so two concurrent saves
 * can't interleave.
 */

// Filesystem errors that mean "this host won't let us write" → use the GitHub
// fallback. ENOENT is included because on serverless hosts (Vercel) the
// function bundle has no `public/` directory at all — static files are served
// from the CDN — so even creating the folder fails with ENOENT, not EROFS.
const READONLY_CODES = new Set(["EROFS", "EACCES", "EPERM", "ENOENT"]);

let chain: Promise<unknown> = Promise.resolve();

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = chain.then(task, task);
  // Keep the chain alive regardless of individual task outcome.
  chain = run.then(
    () => undefined,
    () => undefined
  );
  return run;
}

export type LocalWrite = "ok" | "readonly";

/**
 * Atomically write `data` to `targetPath`. Returns "readonly" when the host
 * filesystem rejects the write (serverless), signalling the GitHub fallback.
 * Any other error is thrown.
 */
export function writeFileAtomic(
  targetPath: string,
  data: string | Buffer
): Promise<LocalWrite> {
  return enqueue<LocalWrite>(async () => {
    const dir = path.dirname(targetPath);
    const tmp = path.join(
      dir,
      `.${path.basename(targetPath)}.${process.pid}.${Date.now()}.tmp`
    );
    try {
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(tmp, data);
      await fs.rename(tmp, targetPath);
      return "ok";
    } catch (err) {
      try {
        await fs.unlink(tmp);
      } catch {
        /* temp file may not exist */
      }
      const code = (err as NodeJS.ErrnoException).code;
      if (code && READONLY_CODES.has(code)) return "readonly";
      throw err;
    }
  });
}

/**
 * Validate that a parsed payload is a full content document before it is
 * written, so a malformed request can never truncate the real file.
 */
function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function hasText(node: unknown, key: string): boolean {
  return isObject(node) && typeof node[key] === "string" && node[key] !== "";
}

export function isValidContentDoc(doc: unknown): boolean {
  if (!isObject(doc)) return false;

  const { site, seo, pages } = doc;
  if (!isObject(site) || !isObject(seo) || !isObject(pages)) return false;

  // Landmarks in the site block — an empty-but-correctly-shaped object is not
  // a real document and must not be allowed to erase the file.
  if (!hasText(site, "name") || !hasText(site, "tagline")) return false;
  if (!Array.isArray(site.nav)) return false;
  if (!isObject(site.contact) || !isObject(site.footer)) return false;
  if (!hasText(seo, "browserTitle")) return false;

  const required = [
    "home",
    "about",
    "services",
    "contact",
    "events",
    "blog",
    "notFound",
  ];
  if (!required.every((key) => isObject(pages[key]))) return false;

  // Landmarks inside each page section.
  const p = pages as Record<string, Record<string, unknown>>;
  if (!isObject(p.home.hero) || !isObject(p.home.stats)) return false;
  if (!isObject(p.about.team) || !isObject(p.about.philosophy)) return false;
  if (!Array.isArray(p.services.list)) return false;
  if (!isObject(p.contact.cta)) return false;
  if (!Array.isArray(p.events.items)) return false;
  if (!Array.isArray(p.blog.posts)) return false;
  if (!hasText(p.notFound, "heading")) return false;

  return true;
}
