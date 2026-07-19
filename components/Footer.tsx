import { Fragment } from "react";
import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/site";
import { LogoMark } from "@/components/LogoMark";
import { LinkedinIcon, XIcon, InstagramIcon } from "@/components/SocialIcons";

function FooterHeading({ label }: { label: string }) {
  return (
    <h3 className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold-light">
      {label}
      <span
        aria-hidden="true"
        className="h-px flex-1 bg-gradient-to-r from-gold-light/50 to-transparent"
      />
    </h3>
  );
}

function ExternalGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3"
    >
      <path d="M3.5 8.5 8.5 3.5M4.5 3.5h4v4" />
    </svg>
  );
}

export function Footer() {
  const phoneHref = `tel:${siteConfig.contact.phone.replace(/[\s()]/g, "")}`;
  const year = new Date().getFullYear();
  const taglineWords = siteConfig.tagline.split(",").map((word) => word.trim());

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-forest via-forest to-forest-dark text-cream/80">
      {/* Gold hairline seam between the cream page and the footer */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-gold-light/40 to-transparent"
      />

      {/* Botanical grove: hand-drawn sage-branch etching rising from the bottom-left,
          in the same line-art language as the inner-page headers. Fainter on
          mobile where the stacked columns sit on top of it. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 440 560"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute -bottom-16 -left-14 h-[24rem] w-auto origin-bottom animate-sway text-cream opacity-[0.08] sm:h-[32rem] sm:opacity-[0.14]"
      >
        <defs>
          <g id="footer-sage-leaf">
            <path
              vectorEffect="non-scaling-stroke"
              d="M0 0C22 -15 60 -17 90 -2C60 13 22 15 0 0Z"
            />
            <path vectorEffect="non-scaling-stroke" d="M7 0C35 -4 62 -5 83 -2" />
          </g>
          <g id="footer-sage-whorl">
            <circle vectorEffect="non-scaling-stroke" cx="0" cy="0" r="3" />
            <circle vectorEffect="non-scaling-stroke" cx="0" cy="-11" r="4" />
            <circle vectorEffect="non-scaling-stroke" cx="10" cy="-4" r="4" />
            <circle vectorEffect="non-scaling-stroke" cx="-10" cy="-4" r="4" />
            <circle vectorEffect="non-scaling-stroke" cx="7" cy="8" r="3.5" />
            <circle vectorEffect="non-scaling-stroke" cx="-7" cy="8" r="3.5" />
          </g>
        </defs>

        {/* main stem + side branch */}
        <path d="M92 560C86 486 98 420 124 356C152 288 172 224 182 156C188 116 190 78 188 34" />
        <path d="M138 330C190 318 240 316 288 326" />

        {/* opposite lanceolate leaf pairs, tapering toward the tip */}
        <use href="#footer-sage-leaf" transform="translate(94 530) rotate(-12) scale(1.05)" />
        <use href="#footer-sage-leaf" transform="translate(94 530) rotate(-168) scale(1.05)" />
        <use href="#footer-sage-leaf" transform="translate(100 470) rotate(-25)" />
        <use href="#footer-sage-leaf" transform="translate(100 470) rotate(-155)" />
        <use href="#footer-sage-leaf" transform="translate(116 396) rotate(-30) scale(0.95)" />
        <use href="#footer-sage-leaf" transform="translate(116 396) rotate(-150) scale(0.95)" />
        <use href="#footer-sage-leaf" transform="translate(138 330) rotate(-38) scale(0.85)" />
        <use href="#footer-sage-leaf" transform="translate(138 330) rotate(-142) scale(0.85)" />
        <use href="#footer-sage-leaf" transform="translate(160 264) rotate(-42) scale(0.72)" />
        <use href="#footer-sage-leaf" transform="translate(160 264) rotate(-138) scale(0.72)" />
        <use href="#footer-sage-leaf" transform="translate(174 204) rotate(-48) scale(0.58)" />
        <use href="#footer-sage-leaf" transform="translate(174 204) rotate(-132) scale(0.58)" />

        {/* side-branch leaves */}
        <use href="#footer-sage-leaf" transform="translate(205 320) rotate(-55) scale(0.55)" />
        <use href="#footer-sage-leaf" transform="translate(205 320) rotate(55) scale(0.55)" />
        <use href="#footer-sage-leaf" transform="translate(250 317) rotate(-50) scale(0.45)" />
        <use href="#footer-sage-leaf" transform="translate(250 317) rotate(50) scale(0.45)" />

        {/* lavender flower whorls */}
        <g className="text-gold-light">
          <use href="#footer-sage-whorl" transform="translate(182 150)" />
          <use href="#footer-sage-whorl" transform="translate(186 110) scale(0.85)" />
          <use href="#footer-sage-whorl" transform="translate(188 72) scale(0.7)" />
          <use href="#footer-sage-whorl" transform="translate(188 38) scale(0.55)" />
          <use href="#footer-sage-whorl" transform="translate(288 326) scale(0.7)" />
        </g>
      </svg>

      <div className="container relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Brand statement */}
          <div className="md:col-span-2 lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3">
              {/* Cream tile keeps the mark's dark strokes visible on the teal footer */}
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-cream">
                <LogoMark className="h-9 w-6" />
              </span>
              <span className="font-serif text-2xl text-cream">
                The Sage Institute
              </span>
            </Link>
            <p className="mt-7 font-serif text-4xl leading-[1.12] text-cream sm:text-5xl">
              {taglineWords.map((word, index) => (
                <Fragment key={word}>
                  {index > 0 ? ", " : ""}
                  {index === 1 ? (
                    <span className="italic text-gold-light">{word}</span>
                  ) : (
                    word
                  )}
                </Fragment>
              ))}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/75">
              Calm, thoughtful telehealth psychiatry for North Carolina &mdash;
              evidence-based care from wherever you feel most at ease.
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <FooterHeading label="Explore" />
            <ul className="mt-6 space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/75 transition-colors hover:text-gold-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={siteConfig.screeningFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-cream/75 transition-colors hover:text-gold-light"
                >
                  Begin a Screening
                  <ExternalGlyph />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.clientPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-cream/75 transition-colors hover:text-gold-light"
                >
                  Client Portal
                  <ExternalGlyph />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <FooterHeading label="Contact" />
            <address className="mt-6 space-y-3 text-sm not-italic leading-relaxed">
              <p className="text-cream/75">
                {siteConfig.contact.address.line1}
                {siteConfig.contact.address.line2 ? (
                  <>
                    <br />
                    {siteConfig.contact.address.line2}
                  </>
                ) : null}
                <br />
                {siteConfig.contact.address.country}
              </p>
              <p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-cream/75 underline-offset-4 transition-colors hover:text-gold-light hover:underline"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
              <p>
                <a
                  href={phoneHref}
                  className="text-cream/75 transition-colors hover:text-gold-light"
                >
                  {siteConfig.contact.phone}
                </a>
              </p>
              <p className="text-cream/70">{siteConfig.contact.hours}</p>
            </address>
          </div>

          {/* Connect */}
          <div className="lg:col-span-2">
            <FooterHeading label="Connect" />
            <ul className="mt-6 flex gap-3">
              <li>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream/80 transition-colors hover:border-gold-light/70 hover:bg-gold-light/10 hover:text-gold-light"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label="X (Twitter)"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream/80 transition-colors hover:border-gold-light/70 hover:bg-gold-light/10 hover:text-gold-light"
                >
                  <XIcon className="h-4 w-4" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream/80 transition-colors hover:border-gold-light/70 hover:bg-gold-light/10 hover:text-gold-light"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-cream/15">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/60 sm:flex-row">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="hidden font-serif italic md:block">
            Set in Playfair Display &amp; Inter
          </p>
          <ul className="flex items-center gap-6">
            <li>
              <a href="#" className="transition-colors hover:text-gold-light">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-gold-light">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
