import type { Metadata } from "next";
import Link from "next/link";
import {
  Compass,
  Users,
  GraduationCap,
  Building2,
  Leaf,
  Mic,
  Search,
  PenLine,
  Sparkles,
  LineChart,
  ChevronRight,
} from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import { Eyebrow } from "@/components/Eyebrow";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Executive coaching, team development, leadership training, organizational consulting, mindfulness programmes, and keynote speaking from The Sage Institute.",
};

const services = [
  {
    icon: Compass,
    title: "Executive Coaching",
    description:
      "One-on-one coaching for senior leaders navigating complexity, transition, and growth. We pair rigorous assessment with confidential, challenging conversation to sharpen judgement, presence, and decision-making.",
    tags: ["Individual", "Senior Leaders"],
    featured: true,
  },
  {
    icon: Users,
    title: "Team Development",
    description:
      "Workshops and facilitation that turn capable groups into genuinely high-performing teams. We surface the unspoken dynamics, rebuild trust where it has frayed, and leave teams with practical rituals they actually keep.",
    tags: ["Group", "Facilitation"],
  },
  {
    icon: Building2,
    title: "Organizational Consulting",
    description:
      "Strategic alignment and culture change for organizations in transition. We diagnose what is really getting in the way, co-design the path forward with your people, and stay close through implementation.",
    tags: ["Organization", "Strategy"],
  },
  {
    icon: GraduationCap,
    title: "Leadership Training",
    description:
      "Multi-session programmes that develop emerging leaders into confident, values-driven managers. Cohorts learn together through evidence-based content, live practice, and peer coaching.",
    tags: ["Cohort", "Multi-session"],
    featured: true,
  },
  {
    icon: Leaf,
    title: "Mindfulness Programs",
    description:
      "Evidence-based mindfulness for workplace wellbeing and sustained attention. Our programmes draw on clinical research rather than wellness trends, translating practice into the real demands of a working week.",
    tags: ["Wellbeing", "Group"],
  },
  {
    icon: Mic,
    title: "Keynote Speaking",
    description:
      "Inspiring, substantive talks for conferences and corporate events. Our speakers blend research with story to leave audiences with ideas they can act on the very next morning.",
    tags: ["Events", "Keynote"],
  },
];

const processSteps = [
  {
    icon: Search,
    number: "01",
    title: "Discovery",
    description:
      "We listen first. Through interviews, assessment, and honest conversation, we map where you are today and where you want to be.",
  },
  {
    icon: PenLine,
    number: "02",
    title: "Design",
    description:
      "We co-create a tailored approach — never a template — grounded in evidence and shaped around your context.",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "Deliver",
    description:
      "We bring the work to life through coaching, facilitation, and programmes that build real, durable capability.",
  },
  {
    icon: LineChart,
    number: "04",
    title: "Debrief",
    description:
      "We measure what changed, capture the learning, and ensure the impact outlasts our engagement.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-forest">
        <div className="container py-24 md:py-28">
          <nav className="text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-cream/60 transition-colors hover:text-gold">
              Home
            </Link>
            <ChevronRight className="mx-1 inline h-4 w-4 text-cream/40" aria-hidden="true" />
            <span className="text-cream">Services</span>
          </nav>
          <h1 className="mt-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Our Services
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cream/80">
            We offer a focused set of services for individuals, teams, and organizations. Each
            engagement is tailored, evidence-based, and designed to create change that lasts well
            beyond our involvement.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container">
          <StaggerGroup className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:auto-rows-fr lg:grid-cols-3">
            {services.map((service) => (
              <StaggerItem
                key={service.title}
                className={service.featured ? "md:col-span-2 lg:col-span-2 lg:row-span-2" : undefined}
              >
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  tags={service.tags}
                  href="/contact"
                  cta="Enquire"
                  featured={service.featured}
                />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="bg-cream-dark/40 py-24 md:py-32">
        <div className="container">
          <AnimatedSection className="max-w-2xl">
            <Eyebrow>How we work</Eyebrow>
            <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-forest md:text-4xl">
              A simple, rigorous process
            </h2>
            <p className="mt-4 text-gray-600">
              Every engagement follows the same disciplined arc — adapted entirely to your context.
            </p>
          </AnimatedSection>

          <StaggerGroup className="relative mt-16 grid gap-8 md:mt-20 md:grid-cols-4 md:gap-6">
            <div
              className="absolute left-0 right-0 top-7 hidden border-t border-stone-200/60 md:block"
              aria-hidden="true"
            />
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === processSteps.length - 1;
              return (
                <StaggerItem key={step.number} className="relative pl-16 md:pl-0">
                  {!isLast && (
                    <div
                      className="absolute left-7 top-7 bottom-[-3.75rem] w-px -translate-x-1/2 bg-stone-200/60 md:hidden"
                      aria-hidden="true"
                    />
                  )}
                  <div className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full border border-stone-200/60 bg-forest font-serif text-lg text-cream md:relative md:mb-6">
                    {step.number}
                  </div>
                  <div className="rounded-2xl border border-stone-200/60 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                      <h3 className="font-serif text-lg text-forest">{step.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{step.description}</p>
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
