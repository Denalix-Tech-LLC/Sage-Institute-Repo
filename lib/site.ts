export const siteConfig = {
  name: "The Sage Institute",
  shortName: "Sage Institute",
  tagline: "Learn, Heal, Grow",
  description:
    "Compassionate, evidence-based psychiatric care — medication management, therapy, and holistic psychiatry via telehealth across North Carolina.",
  url: "https://thesageinstitute.com",
  // New-client screening lives in the practice's own HIPAA-covered tools
  // (Microsoft 365 BAA); PHI never touches this site's infrastructure.
  screeningFormUrl:
    "https://forms.office.com/Pages/ResponsePage.aspx?id=W5H1hw18gEixhjajJI8x-j-CWXtpGlpDtQ5LPzDBA89UNFFUODFFUlpFSU1JNVBMT0wwS0Q5VVFMSi4u",
  clientPortalUrl: "https://www.therapyportal.com/p/thesageinstitute/",
  social: {
    facebook: "https://m.facebook.com/SageInstitute/",
    instagram: "https://www.instagram.com/thesageinstitute/",
  },
  contact: {
    email: "hello@sageinstitute.com", // TODO: confirm practice email address
    phone: "336-920-3487",
    address: {
      line1: "Telehealth across North Carolina", // TODO: confirm office address, if any
      line2: "",
      country: "United States",
    },
    hours: "Monday – Friday", // TODO: confirm office hours
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
  { label: "Events & Classes", href: "/events-classes" },
];
