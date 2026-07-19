import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, ChevronRight } from "lucide-react";

import { AnimatedSection } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Events & Classes",
  description:
    "Upcoming events, groups, and classes at The Sage Institute. Check back soon for new offerings.",
};

export default function EventsClassesPage() {
  return (
    <>
      {/* Page header band with the events background */}
      <section className="relative overflow-hidden bg-forest">
        <Image
          src="/events-hero.jpg"
          alt="A dirt road winding through green fields under a bright evening sky"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-forest/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/60 to-transparent" />

        <div className="container relative z-10 py-24 md:py-28">
          <nav className="text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-cream/60 transition-colors hover:text-gold">
              Home
            </Link>
            <ChevronRight className="mx-1 inline h-4 w-4 text-cream/40" aria-hidden="true" />
            <span className="text-cream">Events &amp; Classes</span>
          </nav>
          <h1 className="mt-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Events &amp; Classes
          </h1>
        </div>
      </section>

      {/* Empty state */}
      <section className="py-16 md:py-24">
        <div className="container">
          <AnimatedSection className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-stone-200/60 bg-white p-10 text-center shadow-sm md:p-14">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest/10">
                <CalendarDays className="h-8 w-8 text-forest" aria-hidden="true" />
              </div>
              <p className="mt-6 font-serif text-2xl font-semibold text-forest">
                Nothing at this time, check back soon!
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
