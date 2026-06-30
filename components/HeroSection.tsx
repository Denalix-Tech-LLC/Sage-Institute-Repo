"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1600&q=80"
        alt="Sunlight streaming through a tall tree, symbolising growth and wisdom"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-forest/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/60 to-transparent" />

      <div className="container relative z-10">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.p
            variants={item}
            className="text-gold text-xs font-semibold uppercase tracking-[0.2em]"
          >
            The Sage Institute
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-6 max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight text-cream text-balance sm:text-5xl md:text-6xl"
          >
            Cultivating Wisdom. Transforming Lives.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/85"
          >
            Evidence-based coaching, training, and organizational development
            for individuals and teams ready to grow.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Button asChild variant="gold" size="lg">
              <Link href="/services">
                Explore Services <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outlineLight" size="lg">
              <Link href="/about">Meet Our Team</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
