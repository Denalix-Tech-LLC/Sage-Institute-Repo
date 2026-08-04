import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { Eyebrow } from "@/components/Eyebrow";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/AnimatedSection";
import { getContent } from "@/lib/content";
import { resolveIcon } from "@/lib/icons";

export async function generateMetadata(): Promise<Metadata> {
  const { pages } = await getContent();
  return {
    title: pages.services.seoTitle,
    description: pages.services.seoDescription,
  };
}

export default async function ServicesPage() {
  const { pages } = await getContent();
  const services = pages.services;

  return (
    <>
      <PageHeader
        crumb={services.header.crumb}
        title={services.header.title}
        intro={services.header.intro}
      />

      <section className="py-24 md:py-32">
        <div className="container">
          <StaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-6 [&>*]:min-w-0">
            {services.list.map((service) => (
              <StaggerItem
                key={service.id}
                className={service.featured ? "md:col-span-3" : "md:col-span-6 lg:col-span-2"}
              >
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/60 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1">
                  {/* Only render the image area when a picture is set, so a
                      newly added service doesn't show a broken-image box. */}
                  {service.image ? (
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  {/* min-w-0 + overflow-wrap:anywhere so a long unbroken word
                      can't push past the card edge and get clipped. */}
                  <div className="flex min-w-0 flex-1 flex-col p-7 md:p-8">
                    <h2
                      className={
                        service.featured
                          ? "min-w-0 font-serif text-2xl font-semibold text-forest [overflow-wrap:anywhere]"
                          : "min-w-0 font-serif text-xl font-semibold text-forest [overflow-wrap:anywhere]"
                      }
                    >
                      {service.title}
                    </h2>
                    <p
                      className={
                        service.featured
                          ? "mt-4 min-w-0 flex-grow leading-relaxed text-gray-600 [overflow-wrap:anywhere]"
                          : "mt-3 min-w-0 flex-grow text-sm leading-relaxed text-gray-600 [overflow-wrap:anywhere]"
                      }
                    >
                      {service.description}
                    </p>
                    <Link
                      href="/contact"
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-forest transition-all hover:gap-2.5"
                    >
                      {services.learnMoreLabel}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="bg-cream-dark/40 py-24 md:py-32">
        <div className="container">
          <AnimatedSection className="max-w-2xl">
            <Eyebrow>{services.process.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-forest md:text-4xl">
              {services.process.heading}
            </h2>
            <p className="mt-4 text-gray-600">
              {services.process.intro}
            </p>
          </AnimatedSection>

          <StaggerGroup className="relative mt-16 grid gap-8 md:mt-20 md:grid-cols-4 md:gap-6 [&>*]:min-w-0">
            <div
              className="absolute left-0 right-0 top-7 hidden border-t border-stone-200/60 md:block"
              aria-hidden="true"
            />
            {services.process.steps.map((step, index) => {
              const Icon = resolveIcon(step.icon);
              const isLast = index === services.process.steps.length - 1;
              return (
                <StaggerItem
                  key={step.id}
                  className="relative pl-16 md:flex md:h-full md:flex-col md:pl-0"
                >
                  {!isLast && (
                    <div
                      className="absolute left-7 top-7 bottom-[-3.75rem] w-px -translate-x-1/2 bg-stone-200/60 md:hidden"
                      aria-hidden="true"
                    />
                  )}
                  <div className="absolute left-0 top-0 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-stone-200/60 bg-forest font-serif text-lg text-cream md:relative md:mb-6">
                    {step.number}
                  </div>
                  <div className="min-w-0 rounded-2xl border border-stone-200/60 bg-white p-6 shadow-sm md:flex-1">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                      <h3 className="min-w-0 font-serif text-lg text-forest [overflow-wrap:anywhere]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600 [overflow-wrap:anywhere]">
                      {step.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
