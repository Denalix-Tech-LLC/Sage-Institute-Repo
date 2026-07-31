import type { Metadata } from "next";
import Image from "next/image";
import { Check, Users, ShieldCheck, CreditCard } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Eyebrow } from "@/components/Eyebrow";
import { FounderPhoto } from "@/components/FounderPhoto";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/AnimatedSection";
import { PageHeader } from "@/components/PageHeader";
import { getContent } from "@/lib/content";
import { resolveIcon } from "@/lib/icons";
import type { PracticalPanel as PracticalPanelData, TextItem } from "@/types/content";

export async function generateMetadata(): Promise<Metadata> {
  const { pages } = await getContent();
  return {
    title: pages.about.seoTitle,
    description: pages.about.seoDescription,
  };
}

function DetailCard({
  icon: Icon,
  title,
  items,
}: {
  icon: LucideIcon;
  title: string;
  items: TextItem[];
}) {
  return (
    <div className="h-full rounded-2xl border border-stone-200/60 bg-white p-7 shadow-sm transition-transform duration-300 hover:-translate-y-1">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest/5">
        <Icon className="h-5 w-5 text-forest" aria-hidden="true" />
      </div>
      <h3 className="mt-4 font-serif text-lg text-forest">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex gap-2.5 text-sm leading-relaxed text-gray-600"
          >
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PracticalPanel({
  ages,
  selfPay,
  insurance,
  labels,
}: PracticalPanelData & {
  labels: { ages: string; selfPay: string; insurance: string };
}) {
  return (
    <div className="grid divide-y divide-stone-200/60 rounded-2xl border border-stone-200/60 bg-white shadow-sm md:grid-cols-3 md:divide-x md:divide-y-0">
      <div className="p-7">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest/5">
          <Users className="h-5 w-5 text-forest" aria-hidden="true" />
        </div>
        <h3 className="mt-4 font-serif text-lg text-forest">{labels.ages}</h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">{ages}</p>
      </div>

      <div className="p-7">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest/5">
          <CreditCard className="h-5 w-5 text-forest" aria-hidden="true" />
        </div>
        <h3 className="mt-4 font-serif text-lg text-forest">{labels.selfPay}</h3>
        <ul className="mt-3 space-y-2.5">
          {selfPay.map((rate) => (
            <li
              key={rate.id}
              className="flex gap-2.5 text-sm leading-relaxed text-gray-600"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <span>{rate.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-7">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest/5">
          <ShieldCheck className="h-5 w-5 text-forest" aria-hidden="true" />
        </div>
        <h3 className="mt-4 font-serif text-lg text-forest">
          {labels.insurance}
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {insurance.carriers.map((carrier) => (
            <span
              key={carrier.id}
              className="rounded-full border border-stone-200/60 bg-cream px-3 py-1 text-xs text-gray-700"
            >
              {carrier.text}
            </span>
          ))}
        </div>
        <ul className="mt-4 space-y-1.5">
          {insurance.notes.map((note) => (
            <li key={note.id} className="text-xs leading-relaxed text-gray-500">
              {note.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default async function AboutPage() {
  const { pages } = await getContent();
  const about = pages.about;
  const MedicationIcon = resolveIcon(about.philosophy.medication.icon);

  return (
    <>
      {/* Page header band */}
      <PageHeader
        crumb={about.header.crumb}
        title={about.header.title}
        intro={about.header.intro}
      />

      {/* Mission */}
      <section className="py-24 md:py-32">
        <AnimatedSection className="container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow>{about.mission.eyebrow}</Eyebrow>
              <h2 className="mt-4 font-serif text-2xl font-medium leading-snug tracking-tight text-forest text-balance md:text-3xl">
                {about.mission.heading}
              </h2>
            </div>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-stone-200/60 shadow-sm">
              <Image
                src={about.mission.image}
                alt={about.mission.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Founder */}
      <section id="founder" className="bg-cream-dark/40 py-24 md:py-32">
        <AnimatedSection className="container">
          <div className="max-w-2xl">
            <Eyebrow>{about.founder.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-forest text-balance md:text-4xl">
              {about.founder.sectionHeading}
            </h2>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_1fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-stone-200/60 shadow-sm">
                <FounderPhoto
                  src={about.founder.image}
                  alt={about.founder.imageAlt}
                  initials={about.founder.initials}
                />
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-semibold text-forest">
                {about.founder.name}
              </h3>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-gold-deep">
                {about.founder.role}
              </p>
              <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-gray-700">
                {about.founder.paragraphs.map((paragraph) => (
                  <p key={paragraph.id}>{paragraph.text}</p>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Philosophy */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="max-w-2xl">
            <Eyebrow>{about.philosophy.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-forest text-balance md:text-4xl">
              {about.philosophy.heading}
            </h2>
            <p className="mt-6 leading-relaxed text-gray-700">
              {about.philosophy.intro}
            </p>
          </div>

          <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-3">
            {about.philosophy.cards.map((card) => (
              <StaggerItem key={card.id}>
                <DetailCard icon={resolveIcon(card.icon)} title={card.title} items={card.items} />
              </StaggerItem>
            ))}
          </StaggerGroup>

          <AnimatedSection className="mt-6">
            <PracticalPanel
              ages={about.philosophy.practical.ages}
              selfPay={about.philosophy.practical.selfPay}
              insurance={about.philosophy.practical.insurance}
              labels={about.practicalLabels}
            />
          </AnimatedSection>

          {/* Medication philosophy */}
          <AnimatedSection className="mt-14 grid gap-8 rounded-2xl border border-stone-200/60 bg-white p-8 shadow-sm lg:grid-cols-[auto_1fr] lg:gap-10 lg:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/5">
              <MedicationIcon className="h-6 w-6 text-forest" aria-hidden="true" />
            </div>
            <div className="space-y-4 leading-relaxed text-gray-700">
              <h3 className="font-serif text-xl text-forest">
                {about.philosophy.medication.heading}
              </h3>
              <p>{about.philosophy.medication.body}</p>
              <p className="border-l-2 border-gold/60 pl-4 text-sm text-gray-600">
                {about.philosophy.medication.disclaimer}
              </p>
            </div>
          </AnimatedSection>

          {/* Therapeutic influences */}
          <AnimatedSection className="mt-14 max-w-3xl">
            <h3 className="font-serif text-xl text-forest">
              {about.philosophy.influences.heading}
            </h3>
            <p className="mt-3 leading-relaxed text-gray-700">
              {about.philosophy.influences.intro}
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {about.philosophy.influences.chips.map((influence) => (
                <span
                  key={influence.id}
                  className="rounded-full border border-stone-200/60 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm"
                >
                  {influence.text}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Team */}
      <section className="bg-cream-dark/40 py-24 md:py-32">
        <div className="container">
          <div className="max-w-2xl">
            <Eyebrow>{about.team.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-forest text-balance md:text-4xl">
              {about.team.heading}
            </h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-gray-600">
              {about.team.intro}
            </p>
          </div>

          <div className="mt-16 space-y-16 md:space-y-24">
            {about.team.members.map((member, index) => (
              <AnimatedSection key={member.id}>
                <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
                  <div className={index % 2 === 1 ? "lg:order-last" : ""}>
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-stone-200/60 shadow-sm">
                      <FounderPhoto
                        src={member.image}
                        alt={member.imageAlt}
                        initials={member.initials}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-forest">
                      {member.name}
                    </h3>
                    <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-gold-deep">
                      {member.title}
                    </p>
                    <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-gray-700">
                      {member.bio.map((paragraph) => (
                        <p key={paragraph.id}>{paragraph.text}</p>
                      ))}
                    </div>
                    <div className="mt-6 max-w-2xl space-y-3">
                      {member.quotes.map((quote) => (
                        <blockquote
                          key={quote.id}
                          className="border-l-2 border-gold/60 pl-4 text-[15px] italic leading-relaxed text-ink/80"
                        >
                          &ldquo;{quote.text}&rdquo;
                        </blockquote>
                      ))}
                    </div>
                  </div>
                </div>

                <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-3">
                  {member.sections.map((section) => (
                    <StaggerItem key={section.id}>
                      <DetailCard
                        icon={resolveIcon(section.icon)}
                        title={section.title}
                        items={section.items}
                      />
                    </StaggerItem>
                  ))}
                </StaggerGroup>

                <div className="mt-6">
                  <PracticalPanel
                    ages={member.practical.ages}
                    selfPay={member.practical.selfPay}
                    insurance={member.practical.insurance}
                    labels={about.practicalLabels}
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
