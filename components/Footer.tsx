import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";

import { getContent } from "@/lib/content";
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

export async function Footer() {
  const { site } = await getContent();
  const { contact, social, links, footer, nav } = site;

  const phoneHref = `tel:${contact.phone.replace(/[\s()]/g, "")}`;
  const year = new Date().getFullYear();
  const taglineWords = site.tagline.split(",").map((word) => word.trim());

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
          src={site.logo.src}
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
          src={site.logo.src}
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
                {site.name}
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
              {footer.blurb}
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <FooterHeading label={footer.exploreHeading} />
            <ul className="mt-6 space-y-3 text-sm">
              {nav.map((link) => (
                <li key={link.id}>
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
                  href={links.screeningFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-cream/75 transition-colors hover:text-gold-light"
                >
                  {footer.screeningLabel}
                  <ExternalGlyph />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a
                  href={links.clientPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-cream/75 transition-colors hover:text-gold-light"
                >
                  {footer.portalLabel}
                  <ExternalGlyph />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <FooterHeading label={footer.contactHeading} />
            <address className="mt-6 space-y-3 text-sm not-italic leading-relaxed">
              <p className="text-cream/75">
                {contact.addressLine1}
                {contact.addressLine2 ? (
                  <>
                    <br />
                    {contact.addressLine2}
                  </>
                ) : null}
                <br />
                {contact.country}
              </p>
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-cream/75 underline-offset-4 transition-colors hover:text-gold-light hover:underline"
                >
                  {contact.email}
                </a>
              </p>
              <p>
                <a
                  href={phoneHref}
                  className="text-cream/75 transition-colors hover:text-gold-light"
                >
                  {contact.phone}
                </a>
              </p>
              <p className="text-cream/70">{contact.hours}</p>
            </address>
          </div>

          {/* Connect */}
          <div className="lg:col-span-2">
            <FooterHeading label={footer.connectHeading} />
            <ul className="mt-6 flex gap-3">
              <li>
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on Facebook`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream/80 transition-colors hover:border-gold-light/70 hover:bg-gold-light/10 hover:text-gold-light"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
              </li>
              <li>
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on Instagram`}
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
            &copy; {year} {site.name}. {footer.rightsText}
          </p>
          <p className="hidden font-serif italic md:block">
            {footer.colophon}
          </p>
          <ul className="flex items-center gap-6">
            {footer.legal.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="transition-colors hover:text-gold-light"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
