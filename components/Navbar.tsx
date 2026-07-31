"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import type { LinkItem } from "@/types/content";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/LogoMark";
import { cn } from "@/lib/utils";

interface NavbarProps {
  nav: LinkItem[];
  ctaLabel: string;
  brandName: string;
  logoSrc: string;
}

export function Navbar({ nav, ctaLabel, brandName, logoSrc }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href;

  const [brandFirst, ...brandRest] = brandName.split(" ");
  const brandRestJoined = brandRest.join(" ");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200/50 bg-white/70 backdrop-blur-md">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${brandName} home`}>
          <LogoMark src={logoSrc} className="h-12 w-auto" priority />
          <span className="flex flex-col leading-none">
            <span className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-gold-deep">
              {brandFirst}
            </span>
            <span className="font-serif text-xl font-semibold text-forest">
              {brandRestJoined}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.id}
                href={link.href}
                className={cn(
                  "relative py-1 text-sm transition-colors",
                  active
                    ? "font-semibold text-forest"
                    : "text-ink/70 hover:text-forest"
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-gold" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:inline-flex">
          <Button asChild variant="gold" size="sm">
            <Link href="/contact">{ctaLabel}</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="relative flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="relative block h-4 w-6">
            <motion.span
              className="absolute left-0 top-0 block h-0.5 w-6 rounded-full bg-forest"
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="absolute left-0 top-[7px] block h-0.5 w-6 rounded-full bg-forest"
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute bottom-0 left-0 block h-0.5 w-6 rounded-full bg-forest"
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-stone-200/50 bg-white/90 backdrop-blur-md md:hidden"
          >
            <nav className="container flex flex-col py-4">
              {nav.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "py-3 text-lg transition-colors",
                      active
                        ? "font-semibold text-forest"
                        : "text-ink/70 hover:text-forest"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Button
                asChild
                variant="gold"
                size="lg"
                className="mt-4 w-full"
              >
                <Link href="/contact" onClick={() => setOpen(false)}>
                  {ctaLabel}
                </Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
