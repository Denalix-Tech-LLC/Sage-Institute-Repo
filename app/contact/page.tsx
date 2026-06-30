import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Mail, Phone, Clock, ChevronRight } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Eyebrow } from "@/components/Eyebrow";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with The Sage Institute. Tell us about your situation and a member of our team will be in touch within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-forest">
        <div className="container py-24 md:py-28">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-cream/70"
          >
            <Link href="/" className="transition-colors hover:text-cream">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-cream/50" aria-hidden="true" />
            <span className="text-cream">Contact</span>
          </nav>

          <h1 className="mt-4 font-serif text-4xl text-cream md:text-5xl">
            Contact Us
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-cream/80">
            Tell us where you are and where you want to go. We read every
            message.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <AnimatedSection>
              <Eyebrow>Get in touch</Eyebrow>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-forest text-balance md:text-4xl">
                Let&rsquo;s start a conversation
              </h2>

              <p className="mt-4 max-w-2xl leading-relaxed text-gray-600">
                Whether you have a specific brief in mind or you are simply
                exploring what is possible, we would be glad to talk. A member
                of our team will be in touch within one business day.
              </p>

              <dl className="mt-8 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest/5">
                    <MapPin className="h-5 w-5 text-forest" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-ink">Office</dt>
                    <dd className="text-sm text-gray-600">
                      {siteConfig.contact.address.line1},{" "}
                      {siteConfig.contact.address.line2},{" "}
                      {siteConfig.contact.address.country}
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
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest/5">
                    <Phone className="h-5 w-5 text-forest" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-ink">Phone</dt>
                    <dd className="text-sm text-gray-600">
                      <a
                        href={`tel:${siteConfig.contact.phone}`}
                        className="transition-colors hover:text-forest"
                      >
                        {siteConfig.contact.phone}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest/5">
                    <Clock className="h-5 w-5 text-forest" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-ink">
                      Office hours
                    </dt>
                    <dd className="text-sm text-gray-600">
                      {siteConfig.contact.hours}
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-10 overflow-hidden rounded-2xl border border-stone-200/60">
                <iframe
                  title="The Sage Institute location"
                  src="https://www.google.com/maps?q=Bloomsbury+Square,+London,+WC1A+2PJ&output=embed"
                  width="100%"
                  height="288"
                  loading="lazy"
                  className="w-full"
                  style={{ border: 0 }}
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    We typically reply within one business day.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
