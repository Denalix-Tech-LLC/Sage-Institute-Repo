import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ClipboardList,
  MessageSquare,
  Mail,
  Video,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Eyebrow } from "@/components/Eyebrow";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Medication management, therapy, holistic psychiatry, groups and classes, and yoga, mindfulness, and meditation at The Sage Institute.",
};

interface Service {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
}

const services: Service[] = [
  {
    title: "Holistic Psychiatry",
    description:
      "Nutritional Psychiatry (ways to enhance and support your mental health through food choices as well as fostering a mindful and joyful relationship to eating), various supplements, sleep hygiene, spending time in nature, light therapy, movement and/or exercise, social connection, creative expression, spirituality, and mind-body activities to ground and calm your nervous system can all be a part of your mental wellness plan.",
    image: "/services/holistic-psychiatry.jpg",
    imageAlt: "A composition of fresh, healthy food on a wooden table",
    featured: true,
  },
  {
    title: "Therapy",
    description:
      "Therapy should be as comfortable and destigmatized as chatting over coffee. Talk therapy creates a safe space in your life to process thoughts, emotions, behavioral patterns, transitions, stressors, losses, challenges, and joys. It is a way to reflect in the moment, while looking back at the past and forward to the future. You are more than a diagnosis. You are a human being with a unique story. Therapy can be the mirror to show you your worth, the classroom to learn and practice new skills, and the healing waters to help you transcend your suffering and cultivate meaning, connection, and growth.",
    image: "/services/therapy.jpg",
    imageAlt: "A woman talking warmly during a video therapy session",
    featured: true,
  },
  {
    title: "Medication Management",
    description:
      "Medication can be an important and foundational tool in supporting your mental health. Our prescribers will partner with you to walk through the process of finding the right medication plan for you. We can also assist you to safely come off of psychiatric medications.",
    image: "/services/medication-management.jpg",
    imageAlt: "A clinician consulting with a client about medication",
  },
  {
    title: "Groups & Classes",
    description:
      "We offer groups and classes to draw on the power of social connection and learning in a group setting and to educate, encourage, and empower each other in mental health and wellness strategies.",
    image: "/services/groups-classes.jpg",
    imageAlt: "A diverse group sitting together around a couch in conversation",
  },
  {
    title: "Yoga, Mindfulness, and Meditation",
    description:
      "Yoga, Mindfulness, and Meditation have a growing body of evidence that they can profoundly bolster our mental health. Join us in giving these practices a try or continue your practice with the support of a wider community.",
    image: "/services/yoga-mindfulness.jpg",
    imageAlt: "Two people practicing yoga together on a beach",
  },
];

const processSteps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Intake",
    description:
      "Complete our secure new client intake form — it takes about 7 minutes and helps us understand where you are and what you're looking for.",
  },
  {
    icon: MessageSquare,
    number: "02",
    title: "Review",
    description:
      "Our team reviews your information, then sends you a text and an invite to our secure messaging app, Spruce Health.",
  },
  {
    icon: Mail,
    number: "03",
    title: "Setup",
    description:
      "You'll receive an email from TherapyPortal on behalf of The Sage Institute — and, depending on billing status, possibly from Headway.co.",
  },
  {
    icon: Video,
    number: "04",
    title: "First Visit",
    description:
      "Meet your clinician virtually. We see clients by telehealth when they are in North Carolina at the time of the visit.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        crumb="Services"
        title="Our Services"
        intro="Support for your mental, physical, and spiritual health — from medication management and therapy to holistic psychiatry, groups, and mind-body practice."
      />

      <section className="py-24 md:py-32">
        <div className="container">
          <StaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-6">
            {services.map((service) => (
              <StaggerItem
                key={service.title}
                className={service.featured ? "md:col-span-3" : "md:col-span-6 lg:col-span-2"}
              >
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/60 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1">
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7 md:p-8">
                    <h2
                      className={
                        service.featured
                          ? "font-serif text-2xl font-semibold text-forest"
                          : "font-serif text-xl font-semibold text-forest"
                      }
                    >
                      {service.title}
                    </h2>
                    <p
                      className={
                        service.featured
                          ? "mt-4 flex-grow leading-relaxed text-gray-600"
                          : "mt-3 flex-grow text-sm leading-relaxed text-gray-600"
                      }
                    >
                      {service.description}
                    </p>
                    <Link
                      href="/contact"
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-forest transition-all hover:gap-2.5"
                    >
                      Learn More
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
            <Eyebrow>Getting started</Eyebrow>
            <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-forest md:text-4xl">
              From intake to first visit
            </h2>
            <p className="mt-4 text-gray-600">
              Becoming a client is simple — here is what to expect.
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
                <StaggerItem
                  key={step.number}
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
                  <div className="rounded-2xl border border-stone-200/60 bg-white p-6 shadow-sm md:flex-1">
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
