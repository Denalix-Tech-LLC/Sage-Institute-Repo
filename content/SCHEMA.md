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
| **404 Page** | The message shown when someone hits a broken link. |

## How images work

- Every image field shows a **thumbnail**, a **Choose file** button, and an
  **Image description (alt text)** box right beside it.
- Click **Choose file**, pick a picture (JPG, PNG, WebP, GIF, or AVIF, up to
  **4 MB**), and it uploads and swaps in automatically.
- Always fill in the **alt text** — a short description of the picture. It helps
  people using screen readers and helps search engines.
- To leave an image blank (e.g. an optional event photo), clear the path box.

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

## Two things the editor does *not* control (by design)

- **The social-share card image** (the picture shown when the link is posted to
  Facebook/LinkedIn) uses the practice name and tagline baked in at build time.
  If you rename the practice, that card updates on the next deploy.
- **The "Something went wrong" error screens** are intentionally fixed text, so
  they still work even if something is broken.

Everything a visitor actually reads on the normal pages is editable here.
