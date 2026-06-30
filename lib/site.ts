export const siteConfig = {
  name: "The Sage Institute",
  shortName: "Sage Institute",
  tagline: "Cultivating wisdom. Transforming lives.",
  description:
    "Evidence-based coaching, leadership training, and organizational development for individuals and teams ready to grow.",
  url: "https://sageinstitute.com",
  contact: {
    email: "hello@sageinstitute.com",
    phone: "+44 (0)20 7946 0123",
    address: {
      line1: "27 Bloomsbury Square",
      line2: "London, WC1A 2PJ",
      country: "United Kingdom",
    },
    hours: "Monday – Friday, 9:00 – 18:00 GMT",
  },
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
