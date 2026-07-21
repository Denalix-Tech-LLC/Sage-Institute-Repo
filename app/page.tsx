import type { Metadata } from "next";
import Link from "next/link";
import {
  Pill,
  Coffee,
  Leaf,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  Phone,
} from "lucide-react";

import { HeroSection } from "@/components/HeroSection";
import { ServiceCard } from "@/components/ServiceCard";
import { Eyebrow } from "@/components/Eyebrow";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { FounderPhoto } from "@/components/FounderPhoto";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Learn, Heal, Grow",
  description:
    "The Sage Institute was founded on the principle that health is a holistic experience — helping people learn skills to support their mental, physical, and spiritual health.",
};

const stats: { value: string; label: string }[] = [
  { value: "4", label: "Psychiatric Clinicians" },
  { value: "16+", label: "Ages We Serve" },
  { value: "NC", label: "Statewide Telehealth" },
  { value: "7+", label: "In-Network Insurance Plans" },
];

const team: {
  name: string;
  role: string;
  image: string;
  initials: string;
}[] = [
  { name: "Laurie L. Arena", role: "Founder · PMHNP", image: "/laurie-arena.jpg", initials: "LA" },
  { name: "Jade Montana", role: "Psychiatric NP · CNM", image: "/jade-montana.png", initials: "JM" },
  { name: "Amy Main", role: "Psychiatric NP", image: "/amy-main.jpg", initials: "AM" },
  { name: "Lindsey Rebollar", role: "Psychiatric NP", image: "/lindsey-rebollar.png", initials: "LR" },
];

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Mission statement */}
      <section className="border-b border-stone-200/60 bg-cream">
        <AnimatedSection className="container py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mx-auto block h-px w-12 bg-gold" />
            <p className="mt-8 font-serif text-xl leading-relaxed text-forest text-balance md:text-2xl">
              The Sage Institute was founded on the principle that health is a
              holistic experience. You can be empowered to nurture patterns in
              your life that support your physical and mental health and well
              being.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Stats bento */}
      <section className="bg-cream">
        <AnimatedSection className="container py-24 md:py-32">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:auto-rows-fr">
            {/* Featured cell */}
            <div className="col-span-2 flex flex-col justify-center rounded-2xl bg-forest p-8 text-cream md:row-span-2">
              <span className="block h-px w-12 bg-gold" />
              <p className="mt-6 font-serif text-2xl leading-snug">
                Health is a holistic experience. We are here to collaborate
                with you.
              </p>
            </div>

            {/* Stat cells */}
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-stone-200/60 bg-white p-6 text-center transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="font-serif text-4xl font-semibold text-forest">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Services preview */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="max-w-2xl">
            <Eyebrow>What we do</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-forest text-balance md:text-4xl">
              Services that meet you where you are
            </h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              Evidence-based, compassionate support for your mental, physical,
              and spiritual health — delivered with genuine humanity.
            </p>
          </div>

          <StaggerGroup className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <StaggerItem>
              <ServiceCard
                icon={Pill}
                title="Medication Management"
                description="Medication can be an important and foundational tool in supporting your mental health. Our prescribers will partner with you to walk through the process of finding the right medication plan for you."
                href="/services"
                cta="Learn more"
              />
            </StaggerItem>
            <StaggerItem>
              <ServiceCard
                icon={Coffee}
                title="Therapy"
                description="Therapy should be as comfortable and destigmatized as chatting over coffee. Talk therapy creates a safe space in your life to process thoughts, emotions, behavioral patterns, transitions, stressors, losses, challenges, and joys."
                href="/services"
                cta="Learn more"
              />
            </StaggerItem>
            <StaggerItem>
              <ServiceCard
                icon={Leaf}
                title="Holistic Psychiatry"
                description="From Nutritional Psychiatry to sleep hygiene, time in nature, movement, creative expression, and mind-body activities to ground and calm your nervous system."
                href="/services"
                cta="Learn more"
              />
            </StaggerItem>
          </StaggerGroup>

          <div className="mt-12 flex justify-center">
            <Button asChild variant="outline">
              <Link href="/services">View all services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Team preview */}
      <section className="bg-cream-dark/40 py-24 md:py-32">
        <div className="container">
          <div className="max-w-2xl">
            <Eyebrow>Our team</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-forest text-balance md:text-4xl">
              The people behind your care
            </h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              Led by founder Laurie Arena, our clinicians bring evidence-based,
              compassionate, and individualized mental health care.
            </p>
          </div>

          <StaggerGroup className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
            {team.map((member) => (
              <StaggerItem key={member.name}>
                <div className="group h-full overflow-hidden rounded-2xl border border-stone-200/60 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1">
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <FounderPhoto
                      src={member.image}
                      alt={`${member.name}, clinician at The Sage Institute`}
                      initials={member.initials}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-base font-semibold text-forest">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gold-deep">
                      {member.role}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="mt-12 flex justify-center">
            <Button asChild variant="outline">
              <Link href="/about#founder">Meet the team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* No Surprises Act / Good Faith Estimate */}
      <section className="bg-cream-dark/40 py-24 md:py-32">
        <div className="container">
          <AnimatedSection>
            <Eyebrow>Your rights</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-forest text-balance md:text-4xl">
              No Surprises Act/Good Faith Estimate
            </h2>
            <p className="mt-6 font-serif text-xl leading-relaxed text-forest text-pretty md:text-2xl">
              You have the right to receive a &ldquo;Good Faith Estimate&rdquo;
              explaining how much your medical and mental health care will
              cost.
            </p>
          </AnimatedSection>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            {/* The law, framed */}
            <AnimatedSection>
              <div className="rounded-2xl border border-stone-200/60 bg-white p-8 shadow-sm md:p-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/5">
                  <ShieldCheck className="h-6 w-6 text-forest" aria-hidden="true" />
                </div>
                <div className="mt-6 space-y-5 leading-relaxed text-gray-600">
                  <p>
                    Under Section 2799B-6 of the Public Health Service Act,
                    health care providers and health care facilities are
                    required to inform individuals who are not enrolled in a
                    plan or coverage or a Federal health care program, or not
                    seeking to file a claim with their plan or coverage both
                    orally and in writing of their ability, upon request or at
                    the time of scheduling health care items and services, to
                    receive a &ldquo;Good Faith Estimate&rdquo; of expected
                    charges.
                  </p>
                  <p>
                    Under the law, health care providers need to give clients
                    who don&rsquo;t have insurance or who are not using
                    insurance an estimate of the expected charges for medical
                    services, including psychotherapy services.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Your rights, numbered */}
            <StaggerGroup className="grid gap-4">
              {[
                "You have the right to receive a Good Faith Estimate for the total expected cost of any non-emergency items or services.",
                "You can ask your health care provider, and any other provider you choose, for a Good Faith Estimate before you schedule a service.",
                "If you receive a bill that is at least $400 more than your Good Faith Estimate, you can dispute the bill.",
                "Make sure to save a copy or picture of your Good Faith Estimate.",
              ].map((item, index) => (
                <StaggerItem key={item}>
                  <div className="flex items-start gap-4 rounded-2xl border border-stone-200/60 bg-white p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1 md:p-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest font-serif text-sm text-cream">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {item}
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
                For questions or more information about your right to a Good
                Faith Estimate, visit{" "}
                <a
                  href="https://www.cms.gov/nosurprises"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-1 inline-flex translate-y-[-2px] items-center gap-2 max-w-full break-all rounded-full border border-gold/40 bg-cream/10 px-4 py-1 align-middle text-lg text-gold-light transition-colors hover:border-gold hover:bg-cream/20 hover:text-cream md:text-xl"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  www.cms.gov/nosurprises
                </a>{" "}
                or call{" "}
                <a
                  href="tel:8003681019"
                  className="mx-1 inline-flex translate-y-[-2px] items-center gap-2 max-w-full break-all rounded-full border border-gold/40 bg-cream/10 px-4 py-1 align-middle text-lg text-gold-light transition-colors hover:border-gold hover:bg-cream/20 hover:text-cream md:text-xl"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  (800) 368-1019
                </a>
                .
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
              <Eyebrow className="text-gold">Begin</Eyebrow>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-cream text-balance md:text-4xl">
                Ready to begin your journey?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-cream/80">
                Whether you are starting medication, seeking therapy, or
                exploring a more holistic approach to your mental health, we
                would love to hear where you are and where you want to go.
              </p>
              <Button asChild variant="gold" size="lg" className="mt-8">
                <a
                  href={siteConfig.screeningFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  New Client Screening Form <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
