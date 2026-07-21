import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { navLinks, siteConfig } from "@/lib/site";
import { FacebookIcon, InstagramIcon } from "@/components/SocialIcons";

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

      {/* The actual sage-plant logo as an oversized botanical watermark,
          bleeding off the bottom-left corner. Very low opacity so it reads as
          a texture behind the columns; fainter still on mobile where the
          stacked content sits over it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 bottom-0 top-0 flex items-stretch opacity-[0.06] sm:opacity-[0.12]"
      >
        <Image
          src="/logo.png"
          alt=""
          width={324}
          height={798}
          className="h-full w-auto"
        />
      </div>
      {/* A mirrored plant on the bottom-right, filling the open space beside
          the Contact/Connect columns. Flipped so it leans the opposite way. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 top-0 hidden items-stretch opacity-[0.07] lg:flex"
      >
        <Image
          src="/logo.png"
          alt=""
          width={324}
          height={798}
          className="h-full w-auto -scale-x-100"
        />
      </div>

      <div className="container relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Brand statement */}
          <div className="md:col-span-2 lg:col-span-5">
            <Link href="/" className="inline-flex items-center">
              <span className="font-serif text-2xl text-cream">
                The Sage Institute
              </span>
            </Link>
            <p className="mt-7 font-serif text-4xl leading-[1.12] text-cream sm:text-5xl">
              {taglineWords.map((word, index) => (
                <Fragment key={word}>
                  {index > 0 ? ", " : ""}
                  {index === 1 ? (
                    <span className="text-gold-light">{word}</span>
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
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="The Sage Institute on Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream/80 transition-colors hover:border-gold-light/70 hover:bg-gold-light/10 hover:text-gold-light"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="The Sage Institute on Instagram"
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
