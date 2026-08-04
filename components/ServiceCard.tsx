import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tags?: string[];
  href?: string;
  cta?: string;
  featured?: boolean;
}

export function ServiceCard({
  icon,
  title,
  description,
  tags,
  href,
  cta,
  featured = false,
}: ServiceCardProps) {
  const Icon = icon;

  return (
    <div className="group flex h-full min-w-0 flex-col rounded-2xl border border-stone-200/60 bg-white p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1">
      {featured ? (
        <span className="inline-flex w-fit items-center rounded-full border border-stone-200/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-deep">
          Flagship
        </span>
      ) : null}

      <div
        className={cn(
          "flex items-center justify-center rounded-xl bg-forest/5 transition-colors group-hover:bg-gold/10",
          featured ? "h-14 w-14" : "h-12 w-12",
          featured ? "mt-6" : ""
        )}
      >
        <Icon
          className={cn(
            "text-forest transition-colors group-hover:text-gold",
            featured ? "h-7 w-7" : "h-6 w-6"
          )}
        />
      </div>

      <h3
        className={cn(
          "mt-6 min-w-0 font-serif font-semibold text-forest [overflow-wrap:anywhere]",
          featured ? "text-2xl md:text-3xl" : "text-xl"
        )}
      >
        {title}
      </h3>

      <p
        className={cn(
          "mt-3 min-w-0 leading-relaxed text-gray-600 [overflow-wrap:anywhere]",
          featured ? "text-base" : "text-sm"
        )}
      >
        {description}
      </p>

      {tags?.length ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-stone-200/60 px-3 py-1 text-xs text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      {href ? (
        <Link
          href={href}
          className={cn(
            "mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-forest transition-all hover:gap-2.5"
          )}
        >
          {cta ?? "Enquire"}
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}
