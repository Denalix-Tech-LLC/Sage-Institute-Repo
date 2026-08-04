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
export function isValidContentDoc(doc: unknown): boolean {
  if (!doc || typeof doc !== "object") return false;
  const root = doc as Record<string, unknown>;
  if (!root.site || typeof root.site !== "object") return false;
  if (!root.seo || typeof root.seo !== "object") return false;
  if (!root.pages || typeof root.pages !== "object") return false;
  const pages = root.pages as Record<string, unknown>;
  const required = ["home", "about", "services", "contact", "events", "notFound"];
  return required.every(
    (key) => pages[key] && typeof pages[key] === "object"
  );
}
