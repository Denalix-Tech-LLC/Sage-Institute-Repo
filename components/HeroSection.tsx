"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ClipboardList, LogIn } from "lucide-react";

import type { HomePage } from "@/types/content";
import { framingStyle } from "@/lib/image-display";
import { Button } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

interface HeroSectionProps {
  hero: HomePage["hero"];
  screeningFormUrl: string;
  clientPortalUrl: string;
}

export function HeroSection({
  hero,
  screeningFormUrl,
  clientPortalUrl,
}: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden">
      <Image
        src={hero.image}
        alt={hero.imageAlt}
        fill
        priority
        sizes="100vw"
        style={framingStyle(hero)}
      />
      <div className="absolute inset-0 bg-forest/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/70 via-forest/20 to-forest-dark/40" />

      <div className="container relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-4xl flex-col items-center text-center [text-shadow:0_2px_16px_rgba(18,28,37,0.6)]"
        >
          <motion.h1
            variants={item}
            className="font-serif text-5xl font-semibold leading-tight tracking-tight text-cream text-balance sm:text-6xl md:text-7xl"
          >
            {hero.title}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 font-serif text-xl text-gold-light sm:text-2xl"
          >
            {hero.tagline}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-8 max-w-2xl text-base leading-relaxed text-cream/85 md:text-lg"
          >
            {hero.description}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Button asChild variant="gold" size="lg">
              <a
                href={screeningFormUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ClipboardList className="h-4 w-4" />
                {hero.screeningLabel}
              </a>
            </Button>
            <Button asChild variant="outlineLight" size="lg">
              <a
                href={clientPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LogIn className="h-4 w-4" />
                {hero.portalLabel}
              </a>
            </Button>
            <Button asChild variant="gold" size="lg">
              <Link href="/services">
                {hero.servicesLabel} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
