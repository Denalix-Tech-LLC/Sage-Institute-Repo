# Editing the website content

All of the website's words and pictures live in one file: **`site-content.json`**
(right next to this one). You normally never touch that file directly — you edit
everything through the **`/admin`** editor in your browser. This page explains
how it all fits together, for reference.

## The golden rules

1. **Never delete a field — blank it instead.** If you don't want something to
   show, clear the text box (leave it empty). Deleting a whole field can break
   the page. In the editor, use the **Remove** button only on *list rows* (a
   team member, a service, an event) — that is the safe way to remove those.
2. **Lines that start with `_` are notes.** Anything like `_comment` is a note
   to yourself/developers. It never appears on the website and is kept exactly
   as-is when you save. You can ignore these.
3. **Save often.** Click **Save** (or press **Ctrl+S** / **⌘S**). On the live
   site each save is recorded in the project's history, so nothing is ever
   truly lost.
4. **Use one editor tab at a time.** Saving sends the whole page of content, so
   if you have `/admin` open in two tabs, whichever you save last wins and the
   other tab's changes are overwritten. Reload a tab before editing in it.

## What each section (tab) controls

| Tab | Controls |
| --- | --- |
| **Site & Navigation** | Practice name, tagline, phone, email, address, hours, social links, the screening-form and client-portal links, the top menu, and all footer text. |
| **SEO** | The browser-tab title, the title used on social shares, and search keywords. |
| **Home** | The homepage: hero, mission, the stat boxes, the three service cards, the team strip, the "No Surprises Act" section, and the closing call-to-action. |
| **About** | The About page: mission, the founder (Laurie), the philosophy cards, and the **team list** (add / remove / reorder clinicians). |
| **Services** | The **services list** (add / remove / reorder) and the "From intake to first visit" steps. |
| **Contact** | The contact intro, the labels, the map, and the "become a new client" panel. |
| **Events & Classes** | The **events list**. When it's empty the page shows "Nothing at this time, check back soon!" Add an event and it appears as a card. |
| **Blog** | The **blog posts list**. When it's empty the page shows "No posts yet, check back soon!" Each post gets its own web page automatically. |
| **404 Page** | The message shown when someone hits a broken link. |

## How images work

- Every image field shows a **thumbnail**, a **Choose file** button, and an
  **Image description (alt text)** box right beside it.
- Click **Choose file**, pick a picture (JPG, PNG, WebP, GIF, or AVIF, up to
  **4 MB**), and it uploads and swaps in automatically.
- Always fill in the **alt text** — a short description of the picture. It helps
  people using screen readers and helps search engines.
- To leave an image blank (e.g. an optional event or blog photo), clear the path
  box. Nothing broken shows up — the picture area is simply skipped.

### Choosing which part of a picture shows (cropping)

The site fits pictures into fixed shapes (for example a wide 16:9 card), so a
tall photo has to be trimmed somewhere. You decide where:

- **How it fills the frame**
  - *Fill the frame (crops the edges)* — the normal choice. Fills the space and
    trims whatever doesn't fit.
  - *Show the whole picture* — nothing is trimmed; the full picture is fitted
    inside the space instead.
- **Click the part of the picture that must stay visible.** Click a face, for
  instance, and the crop keeps it in view. A dot marks your choice, and the
  **“How it will look”** box beside it previews the real result.
- Prefer buttons? The **nine preset spots** (top-left … bottom-right) do the
  same thing and work with the keyboard.

Your original file is never altered or re-saved — only the framing choice is
stored, so you can change it as often as you like without losing quality.

## Dates

Date fields use a **calendar picker** — click the box and choose a day. The site
then writes it out in full, e.g. `August 1, 2026`.

If a date was typed as free text before (like "August 21st"), it keeps showing
exactly as typed and the editor notes it below the calendar. Pick a date to
replace it.

## Adding a list item (example)

Say you want to add a **new team member** on the About page:

1. Open the **About** tab.
2. Scroll to **Members** and click **+ Add**. A new blank member appears at the
   bottom with the same structure as the others (name, title, photo, bio,
   quotes, the three cards, and the insurance panel).
3. Click **Edit fields** on the new row and fill everything in. Upload a photo.
4. Use **↑ / ↓** to move the member up or down, or **Remove** to delete a row.
5. Click **Save**.

Adding a **service** or an **event** works exactly the same way, on their tabs.

## Writing a blog post

1. Open the **Blog** tab and click **+ Add** under **Posts**.
2. Click **Edit fields** and fill in:
   - **Title** — the headline.
   - **Date** — type it however you like, e.g. `August 21, 2026`.
   - **Author** — e.g. `Laurie Arena, PMHNP`.
   - **Short summary** — one or two sentences. This is what people see on the
     blog list, and what search engines show.
   - **Post text** — the article itself. **Press Enter twice** between
     paragraphs. No special formatting codes to learn.
   - **Image** — completely optional. No picture? The post simply shows without
     one. If you add one, fill in the alt text too.
   - **Web address** — leave this blank. The address is created from the title
     automatically (e.g. "Finding calm" → `/blog/finding-calm`). Only fill it in
     if you need to keep an older link working.
3. Click **Save**. The post appears at `/blog`, and it gets its own page.
4. Use **↑ / ↓** to reorder posts (the list order is the order visitors see) and
   **Remove** to delete a post.

## Two things the editor does *not* control (by design)

- **The social-share card image** (the picture shown when the link is posted to
  Facebook/LinkedIn) uses the practice name and tagline baked in at build time.
  If you rename the practice, that card updates on the next deploy.
- **The "Something went wrong" error screens** are intentionally fixed text, so
  they still work even if something is broken.

Everything a visitor actually reads on the normal pages is editable here.
