# The Sage Institute

A production-ready, multi-page marketing website for **The Sage Institute** — a premium
coaching, training, and organizational-development consultancy. Built to feel like
"McKinsey meets a boutique wellness brand": clean, authoritative, and elegant.

## Tech stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS with a custom brand theme
- **UI primitives:** shadcn/ui-style components (Button, Input, Textarea, Label, Select, Card)
- **Animations:** Framer Motion (scroll-triggered reveals + staggered grids)
- **Icons:** Lucide React (brand/social marks ship as local inline SVGs)
- **Fonts:** Playfair Display (headings) + Inter (body) via `next/font/google`

## Brand palette

| Token        | Hex       | Use                        |
| ------------ | --------- | -------------------------- |
| `forest`     | `#1B4332` | Primary (trust, growth)    |
| `gold`       | `#D4A853` | Accent (prestige, insight) |
| `cream`      | `#F9F6F0` | Page background            |
| `ink`        | `#1C1917` | Primary text               |
| `gray-500/600` | —       | Secondary text             |

## Pages

- `/` — Hero, stats bar, services preview, testimonials, CTA banner
- `/services` — 6-service grid + 4-step process timeline (Discovery → Design → Deliver → Debrief)
- `/about` — Mission, story, values, team, accreditations
- `/contact` — Contact details + Google Maps embed + validated form with simulated submit

## Project structure

```
app/
  layout.tsx          Root layout: fonts, metadata, Navbar, Footer
  page.tsx            Landing page
  globals.css         Tailwind layers + smooth scroll + base styles
  services/page.tsx
  about/page.tsx
  contact/page.tsx
components/
  ui/                 Button, Input, Textarea, Label, Select, Card
  Navbar.tsx          Sticky nav, active-link highlight, animated mobile menu
  Footer.tsx
  HeroSection.tsx
  ServiceCard.tsx
  TestimonialCard.tsx
  TeamCard.tsx
  ContactForm.tsx     Client-side validation + simulated success state
  AnimatedSection.tsx Framer Motion wrappers (AnimatedSection / StaggerGroup / StaggerItem)
  SocialIcons.tsx     Inline brand SVGs (LinkedIn, X, Instagram)
lib/
  utils.ts            cn() helper
  site.ts             Brand config + nav links
```

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

## Notes

- The contact form has **no backend** — it validates locally and simulates a successful
  submission with a `setTimeout`.
- Remote images are loaded from `images.unsplash.com` (whitelisted in `next.config.js`).
- All copy is original, professional content for a coaching/consulting institute.

## Deploy to Vercel

```bash
npm i -g vercel
vercel            # preview deployment (follow the prompts)
vercel --prod     # production deployment
```

Or push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new) — no
configuration is required; Vercel auto-detects Next.js.

## Editing the site content — for the practice owner (no code)

All of the website's words and pictures live in **`content/site-content.json`**, and you
edit them through a password-protected editor in your browser. You never touch code.

### How to edit

There are **two editors**, each with its own password:

| URL | Password | Covers |
| --- | --- | --- |
| `/admin` | `ADMIN_PASSWORD` | Home, About, Services, Contact, SEO, navigation, footer, 404 |
| `/admin-blogs` | `ADMIN_BLOG_PASSWORD` | Blog posts and Events & Classes only |

The split is enforced server-side: a blog-editor save cannot alter site pages, and a
site-editor save cannot alter blog posts or events, so the two can never overwrite each
other. Give the blog password to whoever writes posts.

1. Go to **`https://your-site.com/admin`** (or **`/admin-blogs`**) and enter the password.
2. Pick a tab. Change any text box, pick dates from the **calendar**, or swap a picture with
   **Choose file** (JPG/PNG/WebP/GIF/AVIF, up to 4 MB). Every image has an **alt text** box
   and a **crop control** — click the part of the picture that must stay visible.
3. Lists (team members, services, events) have **+ Add**, **Remove**, and **↑ / ↓** to
   reorder.
4. Click **Save** (or **Ctrl+S** / **⌘S**). **Export JSON** downloads a backup at any time.

On the live site, each save is committed to the GitHub repo, the host redeploys, and your
change goes live in **about a minute or two**. Because every save is a commit, the project's
history is a complete record — reverting a commit is the undo button. See
`content/SCHEMA.md` for a field-by-field guide.

### One-time setup on the host (Vercel)

Add these to the project's **Production** environment variables, then **redeploy once**
(env vars only apply to deployments created after they're added):

| Variable | What it is |
| --- | --- |
| `ADMIN_PASSWORD` | The password for `/admin` (site-wide content). Choose a long one. |
| `ADMIN_BLOG_PASSWORD` | The password for `/admin-blogs` (blog + events only). |
| `GITHUB_TOKEN` | A GitHub token so saves can be committed (see below). |
| `GITHUB_REPO` | `owner/repo`, e.g. `Denalix-Tech-LLC/Sage-Institute-Repo`. |
| `GITHUB_BRANCH` | Optional; only if your default branch is **not** `main`. |

Locally (development) you only need `ADMIN_PASSWORD` and `ADMIN_BLOG_PASSWORD` in
`.env.local`; saves write straight to the file on disk.

### Creating the GitHub token (fine-grained PAT)

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** →
   **Fine-grained tokens** → **Generate new token**.
2. **Resource owner:** the account/org that owns the repo. (For an org repo, the org must
   allow fine-grained PATs; if it doesn't, create a **classic** token with the `repo` scope
   instead.)
3. **Repository access:** *Only select repositories* → choose this repo.
4. **Permissions:** **Repository permissions → Contents → Read and write.** Nothing else.
5. Generate, copy the token, and paste it into the host as `GITHUB_TOKEN`. Redeploy once.

The token is used only on the server and is never sent to the browser.

