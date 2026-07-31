/**
 * Types for the editable site content document (content/site-content.json).
 *
 * Every user-visible string and image path on the public site is described
 * here and rendered from the JSON at request time (see lib/content.ts).
 *
 * Conventions:
 *  - Every item in a list/array carries a stable, unique `id`. All reordering
 *    and deletion in the admin editor keys off `id`, never the array index.
 *  - Keys prefixed with `_` (e.g. `_comment`) are editor documentation only.
 *    They round-trip through save untouched and never render.
 *  - `icon` fields hold a string key resolved by lib/icons.ts to a Lucide icon.
 *  - Image fields are public paths (e.g. "/home-hero.jpg"); an empty string
 *    means "no image".
 */

/** A stable-id'd line of text — used in bullet lists, paragraph lists, chips. */
export interface TextItem {
  id: string;
  text: string;
}

/** A navigation / footer link. */
export interface LinkItem {
  id: string;
  label: string;
  href: string;
}

/** Insurance block inside a clinician's practical panel. */
export interface Insurance {
  carriers: TextItem[];
  notes: TextItem[];
}

/** The three-column "Ages / Self-Pay / Insurances" panel under a clinician. */
export interface PracticalPanel {
  ages: string;
  selfPay: TextItem[];
  insurance: Insurance;
}

/** An icon-headed card with a bullet list (philosophy areas, clinician sections). */
export interface IconListCard {
  id: string;
  icon: string;
  title: string;
  items: TextItem[];
}

/* ------------------------------------------------------------------ site */

export interface SiteSection {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  logo: { src: string };
  contact: {
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    country: string;
    hours: string;
  };
  social: { facebook: string; instagram: string };
  links: { screeningFormUrl: string; clientPortalUrl: string };
  nav: LinkItem[];
  navbar: { ctaLabel: string };
  footer: {
    blurb: string;
    exploreHeading: string;
    contactHeading: string;
    connectHeading: string;
    screeningLabel: string;
    portalLabel: string;
    rightsText: string;
    colophon: string;
    legal: LinkItem[];
  };
}

/* ------------------------------------------------------------------- seo */

export interface SeoSection {
  browserTitle: string;
  shareTitle: string;
  keywords: TextItem[];
}

/* ------------------------------------------------------------------ home */

export interface StatItem {
  id: string;
  value: string;
  label: string;
}

export interface HomeServiceCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  cta: string;
}

export interface TeamPreviewMember {
  id: string;
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  initials: string;
}

export interface HomePage {
  seoTitle: string;
  seoDescription: string;
  hero: {
    image: string;
    imageAlt: string;
    title: string;
    tagline: string;
    description: string;
    screeningLabel: string;
    portalLabel: string;
    servicesLabel: string;
  };
  mission: { text: string };
  stats: { featured: string; items: StatItem[] };
  servicesPreview: {
    eyebrow: string;
    heading: string;
    intro: string;
    cards: HomeServiceCard[];
    buttonLabel: string;
  };
  teamPreview: {
    eyebrow: string;
    heading: string;
    intro: string;
    members: TeamPreviewMember[];
    buttonLabel: string;
  };
  rights: {
    eyebrow: string;
    heading: string;
    lead: string;
    lawParagraphs: TextItem[];
    items: TextItem[];
    panel: {
      textBefore: string;
      linkUrl: string;
      linkLabel: string;
      textMiddle: string;
      phoneNumber: string;
      phoneLabel: string;
      textAfter: string;
    };
  };
  cta: {
    eyebrow: string;
    heading: string;
    description: string;
    buttonLabel: string;
  };
}

/* ----------------------------------------------------------------- about */

export interface Clinician {
  id: string;
  name: string;
  title: string;
  image: string;
  imageAlt: string;
  initials: string;
  bio: TextItem[];
  quotes: TextItem[];
  sections: IconListCard[];
  practical: PracticalPanel;
}

export interface AboutPage {
  seoTitle: string;
  seoDescription: string;
  header: { crumb: string; title: string; intro: string };
  practicalLabels: { ages: string; selfPay: string; insurance: string };
  mission: { eyebrow: string; heading: string; image: string; imageAlt: string };
  founder: {
    eyebrow: string;
    sectionHeading: string;
    image: string;
    imageAlt: string;
    initials: string;
    name: string;
    role: string;
    paragraphs: TextItem[];
  };
  philosophy: {
    eyebrow: string;
    heading: string;
    intro: string;
    cards: IconListCard[];
    practical: PracticalPanel;
    medication: {
      icon: string;
      heading: string;
      body: string;
      disclaimer: string;
    };
    influences: { heading: string; intro: string; chips: TextItem[] };
  };
  team: {
    eyebrow: string;
    heading: string;
    intro: string;
    members: Clinician[];
  };
}

/* -------------------------------------------------------------- services */

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  featured: boolean;
}

export interface ProcessStep {
  id: string;
  icon: string;
  number: string;
  title: string;
  description: string;
}

export interface ServicesPage {
  seoTitle: string;
  seoDescription: string;
  header: { crumb: string; title: string; intro: string };
  learnMoreLabel: string;
  list: ServiceItem[];
  process: {
    eyebrow: string;
    heading: string;
    intro: string;
    steps: ProcessStep[];
  };
}

/* --------------------------------------------------------------- contact */

export interface ContactPage {
  seoTitle: string;
  seoDescription: string;
  header: { crumb: string; title: string; intro: string };
  getInTouch: { eyebrow: string; intro: string };
  labels: { callOrText: string; email: string; where: string; hours: string };
  map: { title: string; embedSrc: string };
  cta: {
    heading: string;
    description: string;
    screeningLabel: string;
    ageNote: string;
    establishedHeading: string;
    portalLabel: string;
  };
}

/* ---------------------------------------------------------------- events */

export interface EventItem {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  imageAlt: string;
  location: string;
  linkLabel: string;
  linkUrl: string;
}

export interface EventsPage {
  seoTitle: string;
  seoDescription: string;
  header: { crumb: string; title: string; image: string; imageAlt: string };
  emptyState: { text: string };
  items: EventItem[];
}

/* -------------------------------------------------------------- notFound */

export interface NotFoundPage {
  seoTitle: string;
  eyebrow: string;
  heading: string;
  body: string;
  homeLabel: string;
  contactLabel: string;
}

/* -------------------------------------------------------------- document */

export interface SiteContent {
  _comment?: string;
  site: SiteSection;
  seo: SeoSection;
  pages: {
    home: HomePage;
    about: AboutPage;
    services: ServicesPage;
    contact: ContactPage;
    events: EventsPage;
    notFound: NotFoundPage;
  };
}
