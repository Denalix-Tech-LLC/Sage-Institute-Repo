/**
 * Commits a single file to the GitHub repo via the Contents API. Used as the
 * save/upload fallback on read-only hosts (e.g. Vercel), where the local
 * filesystem can't be written. The token is used server-side only and never
 * reaches the browser.
 */

type CommitResult =
  | { ok: true }
  | { ok: false; status: number; error: string };

async function readBody(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as { message?: string };
    return data?.message ? `GitHub says: ${data.message}` : "";
  } catch {
    return "";
  }
}

export function githubConfigured(): boolean {
  return Boolean(process.env.GITHUB_TOKEN && process.env.GITHUB_REPO);
}

export async function commitFileToGithub(opts: {
  repoPath: string;
  contentBase64: string;
  message: string;
}): Promise<CommitResult> {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token || !repo) {
    return {
      ok: false,
      status: 500,
      error:
        'This host is read-only and GitHub saving is not configured. Set GITHUB_TOKEN and GITHUB_REPO (and GITHUB_BRANCH if it is not "main") in the host, then redeploy — or use "Export JSON" to save a backup.',
    };
  }

  const apiUrl = `https://api.github.com/repos/${repo}/contents/${opts.repoPath}`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "sage-institute-admin",
  };

  // Look up the current file sha (needed to update; absent means create).
  let sha: string | undefined;
  const getRes = await fetch(
    `${apiUrl}?ref=${encodeURIComponent(branch)}`,
    { headers, cache: "no-store" }
  );

  if (getRes.status === 200) {
    const data = (await getRes.json()) as { sha?: string };
    sha = data.sha;
  } else if (getRes.status !== 404) {
    return {
      ok: false,
      status: getRes.status,
      error: `Could not read the file on GitHub (HTTP ${getRes.status}). Check GITHUB_TOKEN and GITHUB_REPO. ${await readBody(getRes)}`.trim(),
    };
  }

  const putRes = await fetch(apiUrl, {
    method: "PUT",
    headers: { ...headers, "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({
      message: opts.message,
      content: opts.contentBase64,
      branch,
      ...(sha ? { sha } : {}),
    }),
  });

  if (putRes.ok) return { ok: true };

  return {
    ok: false,
    status: putRes.status,
    error: `GitHub rejected the save (HTTP ${putRes.status}). Check the token has Contents: Read and write on this repo. ${await readBody(putRes)}`.trim(),
  };
}
