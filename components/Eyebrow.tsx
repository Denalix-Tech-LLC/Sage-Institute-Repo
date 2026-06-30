import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

/**
 * Small uppercase gold label that sits above a section heading.
 * Colour adapts per-section via the --eyebrow CSS variable:
 * deep gold (AA-compliant) on light backgrounds, bright gold on forest.
 * Pass a `text-*` class to override (e.g. on a custom dark hero overlay).
 */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.2em] text-eyebrow",
        className
      )}
    >
      {children}
    </p>
  );
}
