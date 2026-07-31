"use client";

import { useId, useRef, useState } from "react";

import { ICON_OPTIONS } from "@/lib/icons";
import {
  humanize,
  isSimpleTextItem,
  itemLabel,
  type Path,
} from "@/lib/admin-editor";

export interface EditorActions {
  update: (path: Path, value: unknown) => void;
  addItem: (path: Path) => void;
  removeItem: (path: Path, id: string) => void;
  moveItem: (path: Path, id: string, dir: -1 | 1) => void;
}

const inputClass =
  "w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-ink shadow-sm outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/20";
const labelClass = "block text-sm font-medium text-ink";
const smallBtn =
  "rounded-md border border-stone-300 bg-white px-2 py-1 text-xs font-medium text-ink transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40";

/* --------------------------------------------------------------- primitives */

function StringField({
  keyName,
  value,
  path,
  actions,
}: {
  keyName: string;
  value: string;
  path: Path;
  actions: EditorActions;
}) {
  const id = useId();
  const multiline = value.length > 60 || value.includes("\n");
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className={labelClass}>
        {humanize(keyName)}
      </label>
      {multiline ? (
        <textarea
          id={id}
          className={`${inputClass} min-h-[4.5rem] resize-y leading-relaxed`}
          rows={Math.min(10, Math.max(3, Math.ceil(value.length / 70)))}
          value={value}
          onChange={(event) => actions.update(path, event.target.value)}
        />
      ) : (
        <input
          id={id}
          type="text"
          className={inputClass}
          value={value}
          onChange={(event) => actions.update(path, event.target.value)}
        />
      )}
    </div>
  );
}

function NumberField({
  keyName,
  value,
  path,
  actions,
}: {
  keyName: string;
  value: number;
  path: Path;
  actions: EditorActions;
}) {
  const id = useId();
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className={labelClass}>
        {humanize(keyName)}
      </label>
      <input
        id={id}
        type="number"
        className={inputClass}
        value={value}
        onChange={(event) => actions.update(path, Number(event.target.value))}
      />
    </div>
  );
}

function CheckboxField({
  keyName,
  value,
  path,
  actions,
}: {
  keyName: string;
  value: boolean;
  path: Path;
  actions: EditorActions;
}) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-ink">
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-stone-300 text-forest focus:ring-forest/30"
        checked={value}
        onChange={(event) => actions.update(path, event.target.checked)}
      />
      {humanize(keyName)}
    </label>
  );
}

function IconSelect({
  value,
  path,
  actions,
}: {
  value: string;
  path: Path;
  actions: EditorActions;
}) {
  const id = useId();
  const options = ICON_OPTIONS.includes(value)
    ? ICON_OPTIONS
    : [value, ...ICON_OPTIONS];
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className={labelClass}>
        {humanize("icon")}
      </label>
      <select
        id={id}
        className={inputClass}
        value={value}
        onChange={(event) => actions.update(path, event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function ImageField({
  value,
  path,
  actions,
}: {
  value: string;
  path: Path;
  actions: EditorActions;
}) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function onFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setMessage(null);

    if (!file.type.startsWith("image/")) {
      setMessage("Please choose an image file.");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setMessage(
        `That image is ${(file.size / 1024 / 1024).toFixed(1)} MB. The limit is 4 MB.`
      );
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    const body = new FormData();
    body.append("file", file);
    setUploading(true);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setMessage(data.error || `Upload failed (HTTP ${res.status}).`);
      } else {
        actions.update(path, data.path);
        setMessage(data.message || "Image updated.");
      }
    } catch {
      setMessage("Upload failed — network error.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <span className={labelClass}>{humanize("image")}</span>
      <div className="flex items-start gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-stone-200 bg-stone-50 text-center text-[10px] text-stone-400">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            "No image"
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            type="text"
            className={inputClass}
            value={value}
            onChange={(event) => actions.update(path, event.target.value)}
            aria-label="Image path"
          />
          <div className="flex items-center gap-3">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={onFile}
              className="block text-xs text-ink file:mr-3 file:rounded-md file:border file:border-stone-300 file:bg-white file:px-3 file:py-1.5 file:text-xs file:font-medium hover:file:bg-stone-100"
            />
            {uploading ? <span className="text-xs text-forest">Uploading…</span> : null}
          </div>
        </div>
      </div>
      <span role="status" aria-live="polite" className="block text-xs text-forest">
        {message}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------- lists */

function RowControls({
  index,
  count,
  id,
  listPath,
  actions,
}: {
  index: number;
  count: number;
  id: string;
  listPath: Path;
  actions: EditorActions;
}) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      <button
        type="button"
        className={smallBtn}
        disabled={index === 0}
        onClick={() => actions.moveItem(listPath, id, -1)}
        aria-label="Move up"
      >
        ↑
      </button>
      <button
        type="button"
        className={smallBtn}
        disabled={index === count - 1}
        onClick={() => actions.moveItem(listPath, id, 1)}
        aria-label="Move down"
      >
        ↓
      </button>
      <button
        type="button"
        className={`${smallBtn} text-red-600 hover:bg-red-50`}
        onClick={() => actions.removeItem(listPath, id)}
      >
        Remove
      </button>
    </div>
  );
}

function ListRow({
  item,
  index,
  count,
  listPath,
  actions,
}: {
  item: Record<string, unknown>;
  index: number;
  count: number;
  listPath: Path;
  actions: EditorActions;
}) {
  const id = String(item.id ?? "");
  const rowPath: Path = [...listPath, index];

  // Simple { id, text } rows edit inline.
  if (isSimpleTextItem(item)) {
    return (
      <div className="flex items-start gap-2 rounded-lg border border-stone-200 bg-white p-2">
        <textarea
          className={`${inputClass} min-h-[2.75rem] resize-y`}
          rows={2}
          value={String(item.text ?? "")}
          onChange={(event) => actions.update([...rowPath, "text"], event.target.value)}
          aria-label={`Item ${index + 1}`}
        />
        <RowControls index={index} count={count} id={id} listPath={listPath} actions={actions} />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-stone-200 bg-white">
      <div className="flex items-center justify-between gap-2 p-3">
        <span className="truncate text-sm font-medium text-forest">
          {itemLabel(item, index)}
        </span>
        <RowControls index={index} count={count} id={id} listPath={listPath} actions={actions} />
      </div>
      <details className="border-t border-stone-200">
        <summary className="cursor-pointer px-3 py-2 text-xs font-medium text-gold-deep">
          Edit fields
        </summary>
        <div className="space-y-3 p-3 pt-1">
          <ObjectFields obj={item} path={rowPath} actions={actions} />
        </div>
      </details>
    </div>
  );
}

function ListEditor({
  keyName,
  items,
  path,
  actions,
}: {
  keyName: string;
  items: unknown[];
  path: Path;
  actions: EditorActions;
}) {
  return (
    <fieldset className="rounded-xl border border-stone-200/70 bg-stone-50/50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <legend className="text-sm font-semibold text-ink">
          {humanize(keyName)}{" "}
          <span className="font-normal text-stone-400">({items.length})</span>
        </legend>
        <button
          type="button"
          className="rounded-md bg-forest px-3 py-1.5 text-xs font-medium text-cream transition hover:bg-forest-dark"
          onClick={() => actions.addItem(path)}
        >
          + Add
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <ListRow
            key={String((item as Record<string, unknown>).id ?? index)}
            item={item as Record<string, unknown>}
            index={index}
            count={items.length}
            listPath={path}
            actions={actions}
          />
        ))}
        {items.length === 0 ? (
          <p className="text-sm text-stone-500">None yet. Click “Add” to create one.</p>
        ) : null}
      </div>
    </fieldset>
  );
}

/* ------------------------------------------------------------------ objects */

function FieldRenderer({
  keyName,
  value,
  path,
  actions,
}: {
  keyName: string;
  value: unknown;
  path: Path;
  actions: EditorActions;
}) {
  if (keyName === "icon" && typeof value === "string") {
    return <IconSelect value={value} path={path} actions={actions} />;
  }
  if (typeof value === "boolean") {
    return <CheckboxField keyName={keyName} value={value} path={path} actions={actions} />;
  }
  if (typeof value === "string") {
    if (keyName === "image") {
      return <ImageField value={value} path={path} actions={actions} />;
    }
    return <StringField keyName={keyName} value={value} path={path} actions={actions} />;
  }
  if (typeof value === "number") {
    return <NumberField keyName={keyName} value={value} path={path} actions={actions} />;
  }
  if (Array.isArray(value)) {
    return <ListEditor keyName={keyName} items={value} path={path} actions={actions} />;
  }
  if (value && typeof value === "object") {
    return (
      <fieldset className="rounded-xl border border-stone-200/70 p-4">
        <legend className="px-1 text-sm font-semibold text-ink">
          {humanize(keyName)}
        </legend>
        <ObjectFields obj={value as Record<string, unknown>} path={path} actions={actions} />
      </fieldset>
    );
  }
  return null;
}

export function ObjectFields({
  obj,
  path,
  actions,
}: {
  obj: Record<string, unknown>;
  path: Path;
  actions: EditorActions;
}) {
  return (
    <div className="space-y-4">
      {Object.entries(obj).map(([key, value]) => {
        if (key === "id" || key.startsWith("_")) return null;
        return (
          <FieldRenderer
            key={key}
            keyName={key}
            value={value}
            path={[...path, key]}
            actions={actions}
          />
        );
      })}
    </div>
  );
}
