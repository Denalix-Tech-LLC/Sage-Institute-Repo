"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the animation starts. */
  delay?: number;
  id?: string;
}

/**
 * Fades + slides its children up once they scroll into view.
 * Use to wrap a whole section block. Honors prefers-reduced-motion.
 */
export function AnimatedSection({
  children,
  className,
  delay = 0,
  id,
}: AnimatedSectionProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      id={id}
      className={className}
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={reduce ? undefined : { duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

/**
 * Wraps a list of <StaggerItem> children and reveals them one after another
 * as the group scrolls into view. Honors prefers-reduced-motion.
 */
export function StaggerGroup({ children, className, id }: StaggerGroupProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      id={id}
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

/** A single item inside a <StaggerGroup>. Honors prefers-reduced-motion. */
export function StaggerItem({ children, className }: StaggerItemProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
