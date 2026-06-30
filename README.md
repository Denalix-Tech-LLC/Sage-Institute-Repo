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
