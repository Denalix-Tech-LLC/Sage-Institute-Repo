import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, ExternalLink, Phone } from "lucide-react";

import { HeroSection } from "@/components/HeroSection";
import { ServiceCard } from "@/components/ServiceCard";
import { Eyebrow } from "@/components/Eyebrow";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { FounderPhoto } from "@/components/FounderPhoto";
import { getContent } from "@/lib/content";
import { resolveIcon } from "@/lib/icons";

export async function generateMetadata(): Promise<Metadata> {
  const { pages } = await getContent();
  return {
    title: pages.home.seoTitle,
    description: pages.home.seoDescription,
  };
}

export default async function Home() {
  const { site, pages } = await getContent();
  const home = pages.home;

  return (
    <>
      <HeroSection
        hero={home.hero}
        screeningFormUrl={site.links.screeningFormUrl}
        clientPortalUrl={site.links.clientPortalUrl}
      />

      {/* Mission statement */}
      <section className="border-b border-stone-200/60 bg-cream">
        <AnimatedSection className="container py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mx-auto block h-px w-12 bg-gold" />
            <p className="mt-8 font-serif text-xl leading-relaxed text-forest text-balance md:text-2xl">
              {home.mission.text}
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Stats bento */}
      <section className="bg-cream">
        <AnimatedSection className="container py-24 md:py-32">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:auto-rows-fr [&>*]:min-w-0">
            {/* Featured cell */}
            <div className="col-span-2 flex flex-col justify-center rounded-2xl bg-forest p-8 text-cream md:row-span-2">
              <span className="block h-px w-12 bg-gold" />
              <p className="mt-6 font-serif text-2xl leading-snug">
                {home.stats.featured}
              </p>
            </div>

            {/* Stat cells */}
            {home.stats.items.map((stat) => (
              <div
                key={stat.id}
                className="min-w-0 rounded-2xl border border-stone-200/60 bg-white p-6 text-center transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="font-serif text-4xl font-semibold text-forest [overflow-wrap:anywhere]">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-gray-600 [overflow-wrap:anywhere]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Services preview */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="max-w-2xl">
            <Eyebrow>{home.servicesPreview.eyebrow}</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-forest text-balance md:text-4xl">
              {home.servicesPreview.heading}
            </h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              {home.servicesPreview.intro}
            </p>
          </div>

          <StaggerGroup className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
            {home.servicesPreview.cards.map((card) => (
              <StaggerItem key={card.id}>
                <ServiceCard
                  icon={resolveIcon(card.icon)}
                  title={card.title}
                  description={card.description}
                  href="/services"
                  cta={card.cta}
                />
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="mt-12 flex justify-center">
            <Button asChild variant="outline">
              <Link href="/services">{home.servicesPreview.buttonLabel}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Team preview */}
      <section className="bg-cream-dark/40 py-24 md:py-32">
        <div className="container">
          <div className="max-w-2xl">
            <Eyebrow>{home.teamPreview.eyebrow}</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-forest text-balance md:text-4xl">
              {home.teamPreview.heading}
            </h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              {home.teamPreview.intro}
            </p>
          </div>

          <StaggerGroup className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4 [&>*]:min-w-0">
            {home.teamPreview.members.map((member) => (
              <StaggerItem key={member.id}>
                <div className="group h-full overflow-hidden rounded-2xl border border-stone-200/60 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1">
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <FounderPhoto
                      src={member.image}
                      alt={member.imageAlt}
                      initials={member.initials}
                    />
                  </div>
                  <div className="min-w-0 p-5">
                    <h3 className="font-serif text-base font-semibold text-forest [overflow-wrap:anywhere]">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gold-deep [overflow-wrap:anywhere]">
                      {member.role}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="mt-12 flex justify-center">
            <Button asChild variant="outline">
              <Link href="/about#founder">{home.teamPreview.buttonLabel}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* No Surprises Act / Good Faith Estimate */}
      <section className="bg-cream-dark/40 py-24 md:py-32">
        <div className="container">
          <AnimatedSection>
            <Eyebrow>{home.rights.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-forest text-balance md:text-4xl">
              {home.rights.heading}
            </h2>
            <p className="mt-6 font-serif text-xl leading-relaxed text-forest text-pretty md:text-2xl">
              {home.rights.lead}
            </p>
          </AnimatedSection>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            {/* The law, framed */}
            <AnimatedSection>
              <div className="rounded-2xl border border-stone-200/60 bg-white p-8 shadow-sm md:p-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/5">
                  <ShieldCheck className="h-6 w-6 text-forest" aria-hidden="true" />
                </div>
                <div className="mt-6 space-y-5 leading-relaxed text-gray-600 [overflow-wrap:anywhere]">
                  {home.rights.lawParagraphs.map((paragraph) => (
                    <p key={paragraph.id}>{paragraph.text}</p>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Your rights, numbered */}
            <StaggerGroup className="grid gap-4">
              {home.rights.items.map((item, index) => (
                <StaggerItem key={item.id}>
                  <div className="flex items-start gap-4 rounded-2xl border border-stone-200/60 bg-white p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1 md:p-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest font-serif text-sm text-cream">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <p className="min-w-0 text-sm leading-relaxed text-gray-600 [overflow-wrap:anywhere]">
                      {item.text}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          {/* Questions panel */}
          <AnimatedSection className="mt-6">
            <div className="rounded-2xl bg-forest px-8 py-12 text-center md:px-12 md:py-16">
              <span
                className="mx-auto block h-px w-12 bg-gold"
                aria-hidden="true"
              />
              <p className="mx-auto mt-8 max-w-4xl font-serif text-xl leading-loose text-cream md:text-2xl">
                {home.rights.panel.textBefore}{" "}
                <a
                  href={home.rights.panel.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-1 inline-flex translate-y-[-2px] items-center gap-2 max-w-full break-all rounded-full border border-gold/40 bg-cream/10 px-4 py-1 align-middle text-lg text-gold-light transition-colors hover:border-gold hover:bg-cream/20 hover:text-cream md:text-xl"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  {home.rights.panel.linkLabel}
                </a>{" "}
                {home.rights.panel.textMiddle}{" "}
                <a
                  href={`tel:${home.rights.panel.phoneNumber}`}
                  className="mx-1 inline-flex translate-y-[-2px] items-center gap-2 max-w-full break-all rounded-full border border-gold/40 bg-cream/10 px-4 py-1 align-middle text-lg text-gold-light transition-colors hover:border-gold hover:bg-cream/20 hover:text-cream md:text-xl"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {home.rights.panel.phoneLabel}
                </a>
                {home.rights.panel.textAfter}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA banner — inset panel so it reads as its own moment, clearly
          separated from the footer by the cream page background. */}
      <section className="py-16 md:py-24">
        <AnimatedSection className="container">
          <div className="relative overflow-hidden rounded-3xl bg-forest bg-gradient-to-br from-forest via-forest to-forest-dark px-6 py-16 text-center shadow-sm md:px-12 md:py-20">
            {/* Ripple rings — a stone dropped in still water, bleeding off the right edge */}
            <svg
              aria-hidden="true"
              viewBox="0 0 400 400"
              fill="none"
              className="pointer-events-none absolute -right-36 top-1/2 h-[24rem] w-[24rem] -translate-y-1/2 sm:-right-28 md:-right-16 md:h-[28rem] md:w-[28rem]"
            >
              <circle cx="200" cy="200" r="4" className="fill-gold-light/50" />
              <circle cx="200" cy="200" r="46" className="stroke-gold-light/30" strokeWidth="1.2" />
              <circle cx="200" cy="200" r="92" className="stroke-cream/15" strokeWidth="1.2" />
              <circle cx="200" cy="200" r="140" className="stroke-gold-light/10" strokeWidth="1.2" />
              <circle cx="200" cy="200" r="188" className="stroke-cream/[0.07]" strokeWidth="1.2" />
            </svg>

            <div className="relative z-10">
              <Eyebrow className="text-gold">{home.cta.eyebrow}</Eyebrow>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-cream text-balance md:text-4xl">
                {home.cta.heading}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-cream/80">
                {home.cta.description}
              </p>
              <Button asChild variant="gold" size="lg" className="mt-8">
                <a
                  href={site.links.screeningFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {home.cta.buttonLabel} <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
