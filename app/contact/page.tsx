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

import { siteConfig } from "@/lib/site";
import { Eyebrow } from "@/components/Eyebrow";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with The Sage Institute — or start your new client intake. Text 336-920-3487 with questions.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumb="Contact"
        title="Contact Us"
        intro={
          <>
            Questions, scheduling, or ready to begin? We&rsquo;re easy to
            reach.
          </>
        }
      />

      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <AnimatedSection>
              <Eyebrow>Get in touch</Eyebrow>

              <p className="mt-4 max-w-2xl leading-relaxed text-gray-600">
                The fastest way to reach us is by text. For new clients, the
                screening form is the best place to start — it takes about 7
                minutes, and our team reviews every submission.
              </p>

              <dl className="mt-8 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest/5">
                    <Phone className="h-5 w-5 text-forest" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-ink">
                      Call or text
                    </dt>
                    <dd className="text-sm text-gray-600">
                      <a
                        href={`tel:${siteConfig.contact.phone.replace(/-/g, "")}`}
                        className="transition-colors hover:text-forest"
                      >
                        {siteConfig.contact.phone}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest/5">
                    <Mail className="h-5 w-5 text-forest" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-ink">Email</dt>
                    <dd className="text-sm text-gray-600">
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="transition-colors hover:text-forest"
                      >
                        {siteConfig.contact.email}
                      </a>
                      {/* TODO: confirm practice email address */}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest/5">
                    <MapPin className="h-5 w-5 text-forest" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-ink">Where</dt>
                    <dd className="text-sm text-gray-600">
                      {siteConfig.contact.address.line1}
                      {/* TODO: confirm office address, if any */}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest/5">
                    <Clock className="h-5 w-5 text-forest" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-ink">Hours</dt>
                    <dd className="text-sm text-gray-600">
                      {siteConfig.contact.hours}
                      {/* TODO: confirm office hours */}
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-10 overflow-hidden rounded-2xl border border-stone-200/60">
                <iframe
                  title="The Sage Institute — North Carolina"
                  src="https://www.google.com/maps?q=North+Carolina&z=7&output=embed"
                  width="100%"
                  height="288"
                  loading="lazy"
                  className="w-full"
                  style={{ border: 0 }}
                />
                {/* TODO: confirm office location for the map pin */}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="flex h-full flex-col justify-center rounded-2xl bg-forest p-8 text-cream md:p-12">
                <span className="block h-px w-12 bg-gold" aria-hidden="true" />
                <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-xl bg-cream/10">
                  <ClipboardList className="h-6 w-6 text-gold" aria-hidden="true" />
                </div>
                <h2 className="mt-6 font-serif text-3xl font-semibold leading-snug text-cream">
                  Ready to become a new client?
                </h2>
                <p className="mt-4 max-w-md leading-relaxed text-cream/80">
                  Complete our secure screening form — it takes about 7
                  minutes and opens in a new tab. Once we review your
                  information, we&rsquo;ll text you with an invite to our
                  secure messaging app, Spruce Health, and guide you through
                  the next steps.
                </p>
                <div className="mt-8">
                  <Button asChild variant="gold" size="lg">
                    <a
                      href={siteConfig.screeningFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      New Client Screening Form
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                </div>
                <p className="mt-6 text-sm text-cream/70">
                  We see clients age 16 and up, virtually, when they are in
                  North Carolina at the time of the visit.
                </p>
                <div className="mt-6 border-t border-cream/15 pt-6">
                  <p className="text-sm font-medium text-cream">
                    Already an established client?
                  </p>
                  <Button asChild variant="outlineLight" className="mt-4">
                    <a
                      href={siteConfig.clientPortalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit the Client Portal
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
