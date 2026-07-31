import type { Metadata } from "next";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  ClipboardList,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

import { getContent } from "@/lib/content";
import { Eyebrow } from "@/components/Eyebrow";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";

export async function generateMetadata(): Promise<Metadata> {
  const { pages } = await getContent();
  return {
    title: pages.contact.seoTitle,
    description: pages.contact.seoDescription,
  };
}

export default async function ContactPage() {
  const { site, pages } = await getContent();
  const contact = pages.contact;

  return (
    <>
      <PageHeader
        crumb={contact.header.crumb}
        title={contact.header.title}
        intro={contact.header.intro}
      />

      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 [&>*]:min-w-0">
            <AnimatedSection>
              <Eyebrow>{contact.getInTouch.eyebrow}</Eyebrow>

              <p className="mt-4 max-w-2xl leading-relaxed text-gray-600">
                {contact.getInTouch.intro}
              </p>

              <dl className="mt-8 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest/5">
                    <Phone className="h-5 w-5 text-forest" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-ink">
                      {contact.labels.callOrText}
                    </dt>
                    <dd className="text-sm text-gray-600">
                      <a
                        href={`tel:${site.contact.phone.replace(/-/g, "")}`}
                        className="transition-colors hover:text-forest"
                      >
                        {site.contact.phone}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest/5">
                    <Mail className="h-5 w-5 text-forest" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-ink">{contact.labels.email}</dt>
                    <dd className="text-sm text-gray-600">
                      <a
                        href={`mailto:${site.contact.email}`}
                        className="transition-colors hover:text-forest"
                      >
                        {site.contact.email}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest/5">
                    <MapPin className="h-5 w-5 text-forest" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-ink">{contact.labels.where}</dt>
                    <dd className="text-sm text-gray-600">
                      {site.contact.addressLine1}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest/5">
                    <Clock className="h-5 w-5 text-forest" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-ink">{contact.labels.hours}</dt>
                    <dd className="text-sm text-gray-600">
                      {site.contact.hours}
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-10 overflow-hidden rounded-2xl border border-stone-200/60">
                <iframe
                  title={contact.map.title}
                  src={contact.map.embedSrc}
                  width="100%"
                  height="288"
                  loading="lazy"
                  className="w-full"
                  style={{ border: 0 }}
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="flex h-full flex-col justify-center rounded-2xl bg-forest p-8 text-cream md:p-12">
                <span className="block h-px w-12 bg-gold" aria-hidden="true" />
                <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-xl bg-cream/10">
                  <ClipboardList className="h-6 w-6 text-gold" aria-hidden="true" />
                </div>
                <h2 className="mt-6 font-serif text-3xl font-semibold leading-snug text-cream">
                  {contact.cta.heading}
                </h2>
                <p className="mt-4 max-w-md leading-relaxed text-cream/80">
                  {contact.cta.description}
                </p>
                <div className="mt-8">
                  <Button asChild variant="gold" size="lg">
                    <a
                      href={site.links.screeningFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contact.cta.screeningLabel}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                </div>
                <p className="mt-6 text-sm text-cream/70">
                  {contact.cta.ageNote}
                </p>
                <div className="mt-6 border-t border-cream/15 pt-6">
                  <p className="text-sm font-medium text-cream">
                    {contact.cta.establishedHeading}
                  </p>
                  <Button asChild variant="outlineLight" className="mt-4">
                    <a
                      href={site.links.clientPortalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contact.cta.portalLabel}
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
