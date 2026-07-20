"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ClipboardList, LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

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

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden">
      <Image
        src="/home-hero.jpg"
        alt="A stack of balancing stones in a sunlit meadow, symbolising calm and balance"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-forest/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/60 to-transparent" />

      <div className="container relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <motion.h1
            variants={item}
            className="font-serif text-5xl font-semibold leading-tight tracking-tight text-cream text-balance sm:text-6xl md:text-7xl"
          >
            The Sage Institute
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 font-serif text-xl text-gold-light sm:text-2xl"
          >
            Learn, Heal, Grow
          </motion.p>

          <motion.p
            variants={item}
            className="mt-8 max-w-2xl text-base leading-relaxed text-cream/85 md:text-lg"
          >
            Our mission is to help people learn skills to support their mental,
            physical, and spiritual health; to facilitate a therapeutic space
            that allows for healing and inspiration; and to promote resilience,
            vitality, and growth in individuals and in our community.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Button asChild variant="gold" size="lg">
              <a
                href={siteConfig.screeningFormUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ClipboardList className="h-4 w-4" />
                New Client Screening
              </a>
            </Button>
            <Button asChild variant="outlineLight" size="lg">
              <a
                href={siteConfig.clientPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LogIn className="h-4 w-4" />
                Established Client Portal
              </a>
            </Button>
            <Button asChild variant="outlineLight" size="lg">
              <Link href="/services">
                Explore Services <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
