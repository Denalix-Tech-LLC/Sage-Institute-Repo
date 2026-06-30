import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Award,
  Lightbulb,
  Target,
  ChevronRight,
  Sparkles,
  Brain,
  HeartHandshake,
  Pill,
  Check,
} from "lucide-react";

import { Eyebrow } from "@/components/Eyebrow";
import { FounderPhoto } from "@/components/FounderPhoto";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Laurie L. Arena, MSW, PMHNP — founder of The Sage Institute — and learn about her holistic, evidence-based, and trauma-informed approach to psychiatric care.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    description: "We tell the truth with care, and we do what we say we will.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We hold our work to the standard of the best research and the finest craft.",
  },
  {
    icon: Lightbulb,
    title: "Curiosity",
    description:
      "We stay students of human behavior, always asking what else might be true.",
  },
  {
    icon: Target,
    title: "Impact",
    description:
      "We measure success by the lasting healing and growth we help create.",
  },
];

const philosophyAreas = [
  {
    icon: Sparkles,
    title: "Areas of focus",
    items: [
      "Psychopharmacology",
      "Lifestyle & Holistic Psychiatry",
      "Mindfulness & Meditation",
      "Yoga for Mental Health",
      "Psychoeducation & Nutritional Psychiatry",
      "Psychotherapy, coping skills & self-compassion",
    ],
  },
  {
    icon: Brain,
    title: "Conditions I work with",
    items: [
      "Anxiety & Depression",
      "Bipolar Disorder",
      "ADHD",
      "PTSD",
      "Psychotic disorders (Schizophrenia & Schizoaffective), including LAI antipsychotics",
      "Substance use & addiction",
    ],
  },
  {
    icon: HeartHandshake,
    title: "How I work",
    items: [
      "Trauma-informed care",
      "LGBTQIA-allied",
      "Inclusion & social justice",
      "Person-centered & empowerment model",
      "Assertive communication & boundaries",
    ],
  },
];

const influences = [
  "Existential Psychotherapy (Irvin Yalom)",
  "DBT — Dialectical Behavior Therapy (Marsha Linehan)",
  "Internal Family Systems (Richard Schwartz)",
  "Relational Life Therapy (Terry Real)",
  "The Gottman Approach",
  "Solution-Focused Therapy",
  "Cognitive Behavioral Therapy (CBT)",
  "Narrative Therapy",
  "Mindfulness & Buddhist Psychology (Tara Brach)",
  "Motivational Interviewing",
  "Psychodynamic",
  "Person-Centered",
];

const credentials = [
  "Boston College",
  "Boston University",
  "Cambridge Health Alliance",
  "Queens University of Charlotte",
  "Seaside Yoga · RYT-200",
];

const team = [
  {
    name: "Jade Montana, PMHNP, CNM, FNP",
    title: "Psychiatric Nurse Practitioner · Certified Nurse Midwife",
    image: "/jade-montana.png",
    initials: "JM",
    bio: [
      "Jade Montana, PMHNP, CNM, FNP is a Psychiatric Nurse Practitioner and a practicing Certified Nurse Midwife with additional Family Nurse Practitioner training.",
      "Jade provides psychiatric medication management services integrated with supportive therapy. She practices with patience and open-mindedness to help meet you where you are. Visits are tailored toward your needs and goals. Jade can help you decide if psychiatric medication is right for you and work with you to optimize your medication plan, as well as consider a range of interventions to support your mental health. Jade’s goal is to ensure you have a safe place — without stigma or judgement — to be yourself, and to grow.",
    ],
    quotes: [
      "The mind, body, and soul are at the core of each individual. We are all unique and should be treated as such.",
      "Mental health is like the tide of the ocean — as the tide comes in and the waves crash against the sand, it can be difficult to find the seashells. This is comparable to what we can experience during times of anxiety, turmoil, stress, and change. It is my job to help you calm the sea, cultivate peace of mind, and find your shell.",
      "I believe safety is first, then discovery, and eventually moving on to recovery. Taking a holistic approach and prioritizing your mental health is imperative for your wellbeing.",
    ],
  },
  {
    name: "Amy Main, PMHNP, FNP",
    title: "Psychiatric Nurse Practitioner",
    image: "/amy-main.jpg",
    initials: "AM",
    bio: [
      "I believe that no one should be made to feel guilty about their struggles with mental health, and that everyone deserves to have a safe place to talk about these issues. Just as every person is unique, there is no one right way to treat mental illness. I strive to approach each individual with this in mind, knowing that they may have been through many treatment options already.",
      "I know this can be a challenging and frustrating process, but I will listen to your concerns and work with you through the journey. My primary focus is on medication management, while also incorporating lifestyle modifications because of the connection between physical and mental health. My experience includes working with adolescents and adults with a variety of mental health concerns, including depression and anxiety disorders, bipolar disorder, psychotic disorders, and substance use disorders.",
    ],
    quotes: [
      "My goal is to provide a welcoming, comfortable experience, where you will feel seen and heard.",
    ],
  },
  {
    name: "Lindsey Rebollar",
    title: "Psychiatric Provider · Registered Nurse",
    image: "/lindsey-rebollar.png",
    initials: "LR",
    bio: [
      "Life can feel overwhelming at times, and when you’re struggling, it’s easy to feel like you’re carrying the weight of everything on your own. Whether you’re facing anxiety, depression, trauma, burnout, relationship challenges, or a major life transition, you deserve support from someone who will walk alongside you.",
      "As a psychiatric provider and nurse with 13 years of experience in emergency medicine and the operating room, I have cared for people during some of their most vulnerable moments. Those experiences taught me the value of compassion, connection, and truly listening to each person’s story. When you work with me, you’ll find someone who combines years of nursing experience with a trauma-informed, compassionate approach to mental health care — because I understand that healing isn’t linear.",
    ],
    quotes: ["My philosophy is simple: nobody walks alone."],
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page header band */}
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
            <span className="text-cream">About</span>
          </nav>
          <h1 className="mt-4 font-serif text-4xl text-cream md:text-5xl">
            About The Sage Institute
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-cream/80">
            A boutique psychiatric practice bringing scientific rigor and genuine
            humanity to mental health, healing, and the whole person.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 md:py-32">
        <AnimatedSection className="container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow>Our mission</Eyebrow>
              <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-forest text-balance md:text-4xl">
                We exist to help individuals discover their full potential through
                evidence-based, human-centered approaches.
              </h2>
              <p className="mt-6 max-w-2xl leading-relaxed text-gray-600">
                Everything we do — every conversation, session, and care plan — is in
                service of that purpose. We combine the rigor of medicine and
                behavioral science with a genuinely human approach, because lasting
                healing is never purely technical.
              </p>
            </div>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-stone-200/60 shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200&q=80"
                alt="Sunlight through a forest, symbolising growth and healing"
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
      <section className="bg-cream-dark/40 py-24 md:py-32">
        <AnimatedSection className="container">
          <div className="max-w-2xl">
            <Eyebrow>Our founder</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-forest text-balance md:text-4xl">
              Meet Laurie Arena
            </h2>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_1fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-stone-200/60 shadow-sm">
                <FounderPhoto
                  src="/laurie-arena.jpg"
                  alt="Laurie L. Arena, MSW, PMHNP, founder of The Sage Institute"
                  initials="LA"
                />
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-semibold text-forest">
                Laurie L. Arena, MSW, PMHNP
              </h3>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-gold-deep">
                Founder · Psychiatric Nurse Practitioner
              </p>
              <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-gray-700">
                <p>
                  Laurie L. Arena, MSW, PMHNP is the founder of The Sage Institute.
                  She has been a Psychiatric Nurse Practitioner since 2010. She
                  earned her Master’s of Nursing degree from Boston College and then
                  went on to complete a Psychopharmacology Fellowship through
                  Cambridge Health Alliance in 2011. Prior to this, she obtained a
                  Master of Social Work (MSW) from Boston University in 2006 with a
                  concentration in Group Work. Her training as a social worker paved a
                  foundation of therapy skills and was also rooted in the social work
                  tradition of advocating for human rights. Her undergraduate degree
                  is from Queens University of Charlotte as a double major in Music
                  and Psychology. Laurie has also completed a 200-hour level Yoga
                  Teacher Training through Seaside Yoga in Wilmington, NC in 2009.
                </p>
                <p>
                  Laurie has worked in various mental health settings including
                  Inpatient Psychiatric Units, Outpatient Treatment, Detox/Substance
                  Abuse Treatment, Addiction Services, Crisis Stabilization Unit,
                  Psychiatric Emergency Room, Assisted Living Facilities, and Middle
                  and High School school-based therapy programs. In addition to her
                  work with A Path to Wellness, Laurie continues to work with an ACT
                  (Assertive Community Treatment) Team, which entails working with
                  clients with severe and persistent mental illness (primarily
                  psychotic disorders) in the community and utilizes an
                  interdisciplinary, person-centered, and empowerment model.
                </p>
                <p>
                  Personally, Laurie is anchored by her family, yoga, meditation, a
                  vegan diet, nature, and music. She has learned through her travels to
                  appreciate the importance of connecting to each moment, grounded by
                  the ebb and flow of each breath, and to stay connected to one’s
                  heart, emotions, values, and body while facing and interacting with
                  the world. She believes there is intrinsic value and healing
                  potential in all human beings and that science, medical advances,
                  art, therapy, spirituality, and healing traditions can all combine to
                  offer a reprieve from suffering and to support us in living our most
                  meaningful, vibrant, and empowered life.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Philosophy */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="max-w-2xl">
            <Eyebrow>Her approach</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-forest text-balance md:text-4xl">
              Laurie’s Philosophy
            </h2>
            <p className="mt-6 leading-relaxed text-gray-700">
              My approach to supporting people with their mental health needs is
              holistic and comprehensive. I specialize in Psychopharmacology and
              Lifestyle or Holistic Psychiatry. I also offer Mindfulness and
              Meditation techniques, Yoga for Mental Health, Psychoeducation,
              Nutritional Psychiatry, and Psychotherapy — with a focus on coping
              skills, self-compassion, and assertive communication and boundaries. My
              work is trauma-informed, LGBTQIA-allied, and prioritizes inclusion and
              social justice.
            </p>
          </div>

          <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-3">
            {philosophyAreas.map((area) => (
              <StaggerItem key={area.title}>
                <div className="h-full rounded-2xl border border-stone-200/60 bg-white p-7 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest/5">
                    <area.icon className="h-5 w-5 text-forest" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg text-forest">
                    {area.title}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {area.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-gray-600">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* Medication philosophy */}
          <AnimatedSection className="mt-14 grid gap-8 rounded-2xl border border-stone-200/60 bg-white p-8 shadow-sm lg:grid-cols-[auto_1fr] lg:gap-10 lg:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/5">
              <Pill className="h-6 w-6 text-forest" aria-hidden="true" />
            </div>
            <div className="space-y-4 leading-relaxed text-gray-700">
              <h3 className="font-serif text-xl text-forest">
                A thoughtful approach to medication
              </h3>
              <p>
                My philosophy with psychiatric medications is to work with you to find
                the most effective medications, with the fewest risks or adverse
                effects. While for some people numerous psychiatric medications may be
                necessary, with distinct mechanisms of action, I work to avoid or
                reduce polypharmacy.
              </p>
              <p className="border-l-2 border-gold/60 pl-4 text-sm text-gray-600">
                As a disclaimer, I prescribe controlled substances sparingly and only
                for FDA-approved indications. Many supplements and herbal remedies have
                an evidence base for psychiatric conditions, and while I can discuss
                such research and options with you, I do not formally prescribe
                supplements (although most do not require a prescription).
              </p>
            </div>
          </AnimatedSection>

          {/* Therapeutic influences */}
          <AnimatedSection className="mt-14 max-w-3xl">
            <h3 className="font-serif text-xl text-forest">Therapeutic influences</h3>
            <p className="mt-3 leading-relaxed text-gray-700">
              Therapeutic approaches are woven into medication-management sessions as
              needed. The influences that shape my work include:
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {influences.map((influence) => (
                <span
                  key={influence}
                  className="rounded-full border border-stone-200/60 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm"
                >
                  {influence}
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
            <Eyebrow>Our team</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-forest text-balance md:text-4xl">
              Meet the team
            </h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-gray-600">
              Alongside Laurie, our clinicians share a commitment to evidence-based,
              compassionate, and deeply individualized mental health care.
            </p>
          </div>

          <div className="mt-16 space-y-16 md:space-y-24">
            {team.map((member, index) => (
              <AnimatedSection key={member.name}>
                <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
                  <div className={index % 2 === 1 ? "lg:order-last" : ""}>
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-stone-200/60 shadow-sm">
                      <FounderPhoto
                        src={member.image}
                        alt={`${member.name}, clinician at The Sage Institute`}
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
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    <div className="mt-6 max-w-2xl space-y-3">
                      {member.quotes.map((quote) => (
                        <blockquote
                          key={quote}
                          className="border-l-2 border-gold/60 pl-4 text-[15px] italic leading-relaxed text-ink/80"
                        >
                          &ldquo;{quote}&rdquo;
                        </blockquote>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="max-w-2xl">
            <Eyebrow>What we value</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-forest text-balance md:text-4xl">
              The principles behind our work
            </h2>
          </div>
          <StaggerGroup className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-3">
            {/* Feature cell */}
            <StaggerItem className="col-span-2 lg:col-span-2">
              <div className="flex h-full flex-col justify-center rounded-2xl bg-forest p-8 text-cream">
                <span className="h-px w-12 bg-gold" aria-hidden="true" />
                <p className="mt-6 font-serif text-2xl leading-snug">
                  Principles we will not compromise on.
                </p>
                <p className="mt-4 text-cream/80">
                  Four commitments that guide every conversation, session, and care
                  plan at The Sage Institute.
                </p>
              </div>
            </StaggerItem>

            {/* Value cells */}
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="h-full rounded-2xl border border-stone-200/60 bg-white p-6 transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest/5">
                    <value.icon className="h-5 w-5 text-forest" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg text-forest">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Credentials & training */}
      <section className="border-t border-stone-200/60 py-16">
        <div className="container">
          <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-gray-500">
            Credentials & training
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {credentials.map((label) => (
              <div
                key={label}
                className="flex h-16 w-48 items-center justify-center rounded-lg border border-stone-200/60 bg-ink/[0.03] px-4 text-center text-sm font-medium text-gray-500"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
