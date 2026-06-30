import Link from "next/link";
import { Sprout } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site";
import { LinkedinIcon, XIcon, InstagramIcon } from "@/components/SocialIcons";

export function Footer() {
  const phoneHref = `tel:${siteConfig.contact.phone.replace(/[\s()]/g, "")}`;

  return (
    <footer className="bg-forest text-cream/80">
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 — Brand */}
          <div>
            <div className="flex items-center gap-2">
              <Sprout className="h-6 w-6 text-gold" />
              <span className="font-serif text-xl font-semibold text-cream">
                Sage Institute
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
              {siteConfig.tagline}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/70">
              Evidence-based coaching, training, and organizational development.
            </p>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h3 className="mb-4 font-serif text-base text-cream">Explore</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/70 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <h3 className="mb-4 font-serif text-base text-cream">Contact</h3>
            <address className="space-y-2 text-sm not-italic text-cream/70">
              <p>{siteConfig.contact.address.line1}</p>
              <p>{siteConfig.contact.address.line2}</p>
              <p>{siteConfig.contact.address.country}</p>
              <p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="transition-colors hover:text-gold"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
              <p>
                <a
                  href={phoneHref}
                  className="transition-colors hover:text-gold"
                >
                  {siteConfig.contact.phone}
                </a>
              </p>
              <p>{siteConfig.contact.hours}</p>
            </address>
          </div>

          {/* Col 4 — Connect */}
          <div>
            <h3 className="mb-4 font-serif text-base text-cream">Connect</h3>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="LinkedIn"
                className="rounded-full border border-cream/20 p-2.5 transition-colors hover:border-gold hover:text-gold"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="X"
                className="rounded-full border border-cream/20 p-2.5 transition-colors hover:border-gold hover:text-gold"
              >
                <XIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="rounded-full border border-cream/20 p-2.5 transition-colors hover:border-gold hover:text-gold"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container">
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/15 pt-8 sm:flex-row">
          <p className="text-sm text-cream/60">
            © 2024 The Sage Institute. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-cream/60 transition-colors hover:text-gold"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-cream/60 transition-colors hover:text-gold"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
