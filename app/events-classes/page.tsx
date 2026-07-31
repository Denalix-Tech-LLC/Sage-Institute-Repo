import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, ChevronRight, MapPin, ArrowRight } from "lucide-react";

import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/AnimatedSection";
import { getContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { pages } = await getContent();
  return {
    title: pages.events.seoTitle,
    description: pages.events.seoDescription,
  };
}

export default async function EventsClassesPage() {
  const { pages } = await getContent();
  const events = pages.events;

  return (
    <>
      {/* Page header band with the events background */}
      <section className="relative overflow-hidden bg-forest">
        <Image
          src={events.header.image}
          alt={events.header.imageAlt}
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
            <span className="text-cream">{events.header.crumb}</span>
          </nav>
          <h1 className="mt-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {events.header.title}
          </h1>
        </div>
      </section>

      {/* Events, or the empty state when there are none */}
      <section className="py-16 md:py-24">
        <div className="container">
          {events.items.length === 0 ? (
            <AnimatedSection className="mx-auto max-w-2xl">
              <div className="rounded-2xl border border-stone-200/60 bg-white p-10 text-center shadow-sm md:p-14">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest/10">
                  <CalendarDays className="h-8 w-8 text-forest" aria-hidden="true" />
                </div>
                <p className="mt-6 font-serif text-2xl font-semibold text-forest">
                  {events.emptyState.text}
                </p>
              </div>
            </AnimatedSection>
          ) : (
            <StaggerGroup className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {events.items.map((event) => (
                <StaggerItem key={event.id}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/60 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1">
                    {event.image ? (
                      <div className="relative aspect-[16/9] w-full overflow-hidden">
                        <Image
                          src={event.image}
                          alt={event.imageAlt}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                    <div className="flex flex-1 flex-col p-7 md:p-8">
                      {event.date ? (
                        <p className="text-xs font-semibold uppercase tracking-wide text-gold-deep">
                          {event.date}
                        </p>
                      ) : null}
                      <h2 className="mt-2 font-serif text-xl font-semibold text-forest">
                        {event.title}
                      </h2>
                      {event.location ? (
                        <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-gray-600">
                          <MapPin className="h-4 w-4 shrink-0 text-forest" aria-hidden="true" />
                          {event.location}
                        </p>
                      ) : null}
                      <p className="mt-3 flex-grow text-sm leading-relaxed text-gray-600">
                        {event.description}
                      </p>
                      {event.linkUrl && event.linkLabel ? (
                        <a
                          href={event.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-forest transition-all hover:gap-2.5"
                        >
                          {event.linkLabel}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                      ) : null}
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </div>
      </section>
    </>
  );
}
