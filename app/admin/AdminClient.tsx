"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { SiteContent } from "@/types/content";
import {
  blankTemplate,
  collectTemplates,
  EXTRA_TEMPLATES,
  getAt,
  setAt,
  templateKey,
  withFreshIds,
  type Path,
} from "@/lib/admin-editor";
import { ObjectFields, type EditorActions } from "@/components/admin/Fields";

type Status = { type: "info" | "success" | "error"; text: string } | null;

interface TabDef {
  key: string;
  label: string;
  path: Path;
}

const TABS: TabDef[] = [
  { key: "site", label: "Site & Navigation", path: ["site"] },
  { key: "seo", label: "SEO", path: ["seo"] },
  { key: "home", label: "Home", path: ["pages", "home"] },
  { key: "about", label: "About", path: ["pages", "about"] },
  { key: "services", label: "Services", path: ["pages", "services"] },
  { key: "contact", label: "Contact", path: ["pages", "contact"] },
  { key: "events", label: "Events & Classes", path: ["pages", "events"] },
  { key: "notFound", label: "404 Page", path: ["pages", "notFound"] },
];

export function AdminClient({ initialContent }: { initialContent: SiteContent }) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [configured, setConfigured] = useState(true);
  const [activeTab, setActiveTab] = useState("site");
  const [reloginOpen, setReloginOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginBusy, setLoginBusy] = useState(false);

  const savingRef = useRef(false);
  const dirtyRef = useRef(false);
  dirtyRef.current = dirty;

  // Templates for "Add" are snapshotted from the initial content (stable).
  const templates = useMemo(
    () => ({ ...collectTemplates(initialContent), ...EXTRA_TEMPLATES }),
    [initialContent]
  );

  const actions: EditorActions = useMemo(
    () => ({
      update(path, value) {
        setContent((prev) => setAt(prev, path, value));
        setDirty(true);
      },
      addItem(path) {
        setContent((prev) => {
          const arr = (getAt(prev, path) as unknown[]) ?? [];
          const key = templateKey(path);
          const template =
            templates[key] ??
            (arr.length ? blankTemplate(arr[arr.length - 1]) : { id: "", text: "" });
          return setAt(prev, path, [...arr, withFreshIds(template)]);
        });
        setDirty(true);
      },
      removeItem(path, id) {
        setContent((prev) => {
          const arr = (getAt(prev, path) as { id: string }[]) ?? [];
          return setAt(prev, path, arr.filter((item) => item.id !== id));
        });
        setDirty(true);
      },
      moveItem(path, id, dir) {
        setContent((prev) => {
          const arr = [...((getAt(prev, path) as { id: string }[]) ?? [])];
          const i = arr.findIndex((item) => item.id === id);
          const j = i + dir;
          if (i < 0 || j < 0 || j >= arr.length) return prev;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          return setAt(prev, path, arr);
        });
        setDirty(true);
      },
    }),
    [templates]
  );

  const save = useCallback(async () => {
    if (savingRef.current) return; // guard re-entrancy (ref, not just state)
    savingRef.current = true;
    setSaving(true);
    setStatus({ type: "info", text: "Saving…" });
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.status === 401) {
        setStatus({
          type: "error",
          text: "Your session expired. Log in again to save — your edits are kept.",
        });
        setReloginOpen(true);
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStatus({ type: "error", text: data.error || `Save failed (HTTP ${res.status}).` });
        return;
      }
      setDirty(false);
      setStatus({
        type: "success",
        text: data.message || (data.mode === "github" ? "Saved to GitHub." : "Saved."),
      });
    } catch {
      setStatus({ type: "error", text: "Save failed — network error." });
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  }, [content]);

  // Keep the latest save in a ref so the key handler never goes stale.
  const saveRef = useRef(save);
  saveRef.current = save;

  // Check the session once on mount.
  useEffect(() => {
    let alive = true;
    fetch("/api/admin/session")
      .then((res) => res.json())
      .then((data) => {
        if (!alive) return;
        setAuthed(Boolean(data.authed));
        setConfigured(Boolean(data.configured));
      })
      .catch(() => {
        if (alive) setAuthed(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  // Ctrl/Cmd+S saves (also guarded by savingRef).
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        if (!savingRef.current) saveRef.current();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Warn before leaving with unsaved edits.
  useEffect(() => {
    function onBeforeUnload(event: BeforeUnloadEvent) {
      if (dirtyRef.current) {
        event.preventDefault();
        event.returnValue = "";
      }
    }
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, []);

  function exportJson() {
    const blob = new Blob([JSON.stringify(content, null, 2) + "\n"], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "site-content.json";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setLoginError(null);
    setLoginBusy(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setLoginError(data.error || "Login failed.");
        return;
      }
      setPassword("");
      setAuthed(true);
      setReloginOpen(false);
    } catch {
      setLoginError("Login failed — network error.");
    } finally {
      setLoginBusy(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    setAuthed(false);
  }

  /* ---------------------------------------------------------------- render */

  if (authed === null) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center py-24">
        <p className="text-sm text-stone-500">Loading the editor…</p>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="container flex min-h-[70vh] items-center justify-center py-16">
        <form
          onSubmit={login}
          className="w-full max-w-sm rounded-2xl border border-stone-200/70 bg-white p-8 shadow-sm"
        >
          <h1 className="font-serif text-2xl font-semibold text-forest">Site Editor</h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter the admin password to edit the website’s text and images.
          </p>
          {!configured ? (
            <p className="mt-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
              Heads up: <code>ADMIN_PASSWORD</code> is not set on this host, so login
              will not work until it is configured and the site is redeployed.
            </p>
          ) : null}
          <label htmlFor="admin-password" className="mt-6 block text-sm font-medium text-ink">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            className="mt-1.5 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/20"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {loginError ? (
            <p role="alert" className="mt-3 text-sm text-red-600">
              {loginError}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={loginBusy}
            className="mt-6 w-full rounded-full bg-forest px-6 py-2.5 text-sm font-medium text-cream transition hover:bg-forest-dark disabled:opacity-60"
          >
            {loginBusy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    );
  }

  const activePath = TABS.find((tab) => tab.key === activeTab)?.path ?? ["site"];
  const activeNode = getAt(content, activePath) as Record<string, unknown>;

  return (
    <div className="bg-cream">
      {/* Toolbar */}
      <div className="sticky top-20 z-30 border-b border-stone-200/70 bg-cream/95 backdrop-blur">
        <div className="container flex flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-lg font-semibold text-forest">Site Editor</h1>
            {dirty ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Unsaved changes
              </span>
            ) : (
              <span className="text-xs text-stone-400">All changes saved</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={exportJson}
              className="rounded-full border border-stone-300 bg-white px-4 py-2 text-xs font-medium text-ink transition hover:bg-stone-100"
            >
              Export JSON
            </button>
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-stone-300 bg-white px-4 py-2 text-xs font-medium text-ink transition hover:bg-stone-100"
            >
              Log out
            </button>
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="rounded-full bg-forest px-5 py-2 text-xs font-semibold text-cream transition hover:bg-forest-dark disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
        {/* Status line (announced) */}
        <div aria-live="polite" className="container pb-2">
          {status ? (
            <p
              className={
                status.type === "error"
                  ? "text-xs text-red-600"
                  : status.type === "success"
                  ? "text-xs text-forest"
                  : "text-xs text-stone-500"
              }
            >
              {status.text}
            </p>
          ) : null}
        </div>
      </div>

      {/* Tabs */}
      <div className="container pt-6">
        <div className="flex flex-wrap gap-2 border-b border-stone-200/70 pb-3">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={
                tab.key === activeTab
                  ? "rounded-full bg-forest px-4 py-1.5 text-sm font-medium text-cream"
                  : "rounded-full px-4 py-1.5 text-sm font-medium text-ink/70 transition hover:bg-stone-100"
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active tab fields */}
      <div className="container py-8">
        <div className="mx-auto max-w-3xl">
          <ObjectFields obj={activeNode} path={activePath} actions={actions} />
        </div>
      </div>

      {/* Re-login overlay — editor stays mounted, edits are kept in memory */}
      {reloginOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
          <form
            onSubmit={login}
            className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-8 shadow-xl"
          >
            <h2 className="font-serif text-xl font-semibold text-forest">Session expired</h2>
            <p className="mt-2 text-sm text-gray-600">
              Log in again to save. Your edits are still here — nothing is lost.
            </p>
            <label htmlFor="relogin-password" className="mt-6 block text-sm font-medium text-ink">
              Password
            </label>
            <input
              id="relogin-password"
              type="password"
              autoComplete="current-password"
              className="mt-1.5 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/20"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {loginError ? (
              <p role="alert" className="mt-3 text-sm text-red-600">
                {loginError}
              </p>
            ) : null}
            <div className="mt-6 flex items-center gap-2">
              <button
                type="submit"
                disabled={loginBusy}
                className="rounded-full bg-forest px-5 py-2 text-sm font-medium text-cream transition hover:bg-forest-dark disabled:opacity-60"
              >
                {loginBusy ? "Signing in…" : "Log in & continue"}
              </button>
              <button
                type="button"
                onClick={exportJson}
                className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-ink transition hover:bg-stone-100"
              >
                Export JSON
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
