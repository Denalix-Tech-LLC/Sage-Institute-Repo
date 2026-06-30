import type { Metadata } from "next";
import Link from "next/link";
import { Compass, Users, GraduationCap, ArrowRight } from "lucide-react";

import { HeroSection } from "@/components/HeroSection";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Eyebrow } from "@/components/Eyebrow";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { FounderPhoto } from "@/components/FounderPhoto";

export const metadata: Metadata = {
  title: "Cultivating Wisdom. Transforming Lives.",
  description:
    "The Sage Institute offers evidence-based coaching, leadership training, and organizational development for individuals and teams ready to grow.",
};

const stats: { value: string; label: string }[] = [
  { value: "500+", label: "Clients Served" },
  { value: "15", label: "Years of Experience" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "30+", label: "Programmes Delivered" },
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
  { name: "Lindsey Rebollar", role: "Psychiatric Provider", image: "/lindsey-rebollar.png", initials: "LR" },
];

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Stats bento */}
      <section className="bg-cream">
        <AnimatedSection className="container py-24 md:py-32">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:auto-rows-fr">
            {/* Featured cell */}
            <div className="col-span-2 flex flex-col justify-center rounded-2xl bg-forest p-8 text-cream md:row-span-2">
              <span className="block h-px w-12 bg-gold" />
              <p className="mt-6 font-serif text-2xl leading-snug">
                Fifteen years guiding people and teams toward their fullest
                potential.
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
              Practical, evidence-based support for the moments that matter most
              — delivered one-to-one, in teams, and across whole organizations.
            </p>
          </div>

          <StaggerGroup className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <StaggerItem>
              <ServiceCard
                icon={Compass}
                title="Executive Coaching"
                description="One-on-one coaching for senior leaders navigating complexity, transition, and growth. We pair rigorous assessment with confidential, challenging conversation to sharpen judgement and presence."
                href="/services"
                cta="Learn more"
              />
            </StaggerItem>
            <StaggerItem>
              <ServiceCard
                icon={Users}
                title="Team Development"
                description="Workshops and facilitation that turn capable groups into genuinely high-performing teams. We surface the unspoken dynamics and leave teams with practical rituals they actually keep."
                href="/services"
                cta="Learn more"
              />
            </StaggerItem>
            <StaggerItem>
              <ServiceCard
                icon={GraduationCap}
                title="Leadership Training"
                description="Multi-session programmes that develop emerging leaders into confident, values-driven managers through evidence-based content, live practice, and peer coaching."
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

      {/* Testimonials */}
      <section className="bg-cream-dark/40 py-24 md:py-32">
        <div className="container">
          <div className="max-w-2xl">
            <Eyebrow>Testimonials</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-forest text-balance md:text-4xl">
              Trusted by leaders and teams
            </h2>
          </div>

          <StaggerGroup className="mt-14 grid gap-8 md:grid-cols-3">
            <StaggerItem>
              <TestimonialCard
                quote="The coaching I received reshaped how I lead under pressure. Six months on, my team is more candid, more aligned, and noticeably more resilient."
                name="Elena Marsh"
                title="VP of Operations, Northwind Logistics"
                initials="EM"
              />
            </StaggerItem>
            <StaggerItem>
              <TestimonialCard
                quote="Sage didn’t hand us a framework and walk away. They stayed with our hardest questions until the culture work actually took hold."
                name="David Osei"
                title="Chief People Officer, Meridian Health"
                initials="DO"
              />
            </StaggerItem>
            <StaggerItem>
              <TestimonialCard
                quote="Our emerging leaders came back with language for things they’d always felt but couldn’t name. The effect on retention has been real and measurable."
                name="Hannah Whitfield"
                title="Head of Talent, Bright & Co."
                initials="HW"
              />
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>

      {/* Team preview */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="max-w-2xl">
            <Eyebrow>Our team</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-forest text-balance md:text-4xl">
              The people behind your care
            </h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              Led by founder Laurie Arena, our clinicians bring evidence-based,
              compassionate, and deeply individualized mental health care.
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
              <Link href="/about">Meet the team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-forest">
        <AnimatedSection className="container py-24 text-center md:py-32">
          <Eyebrow className="text-gold">Begin</Eyebrow>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-cream text-balance md:text-4xl">
            Ready to begin your journey?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-cream/80">
            Whether you are navigating a transition, building a team, or
            reshaping a culture, we would love to hear where you are and where
            you want to go.
          </p>
          <Button asChild variant="gold" size="lg" className="mt-8">
            <Link href="/contact">
              Get in touch <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </AnimatedSection>
      </section>
    </>
  );
}
