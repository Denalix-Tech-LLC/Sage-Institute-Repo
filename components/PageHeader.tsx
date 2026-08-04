import Link from "next/link";
import type { ReactNode } from "react";

type PageHeaderProps = {
  crumb: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
};

/**
 * Compact botanical page header used on Services, About, and Contact.
 * Server component — the sage-branch etching is inline SVG line art,
 * the only motion is a slow CSS sway (disabled globally by the
 * prefers-reduced-motion rule).
 */
export function PageHeader({ crumb, title, intro, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-forest via-forest to-forest-dark">
      {/* Soft light falling from the upper right, where the branch sits */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(110%_170%_at_82%_-30%,theme(colors.forest.light/45%),transparent_58%)]"
      />
      {/* Gentle anchor darkening behind the text column for contrast headroom */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-forest-dark/40 via-transparent to-transparent"
      />

      {/* Sage branch etching — long opposite leaf pairs, whorled flower spike */}
      <svg
        aria-hidden="true"
        viewBox="0 0 300 420"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute -top-6 right-[-76px] h-[260px] w-auto origin-bottom animate-sway opacity-30 sm:right-[-20px] sm:opacity-100 md:right-8 md:h-[300px] lg:right-20"
      >
        <defs>
          {/* One sage leaf pointing +x from its node: outline, midrib, two faint veins */}
          <g id="sage-ph-leaf">
            <path d="M7 0 C22 -9 48 -12 68 -4 C73 -2 73 2 68 4 C48 12 22 9 7 0 Z" />
            <path d="M1 0 C18 1.5 44 1.5 66 0" />
            <path d="M24 -1 C31 -3.5 40 -5.5 48 -6.5" strokeWidth="1" />
            <path d="M28 1 C35 3 44 4.5 52 5" strokeWidth="1" />
          </g>
        </defs>

        {/* Stem and leaves — cream etching */}
        <g stroke="currentColor" strokeWidth="1.5" className="text-cream" opacity="0.34">
          <path d="M190 412 C185 382 179 354 180 330 C181 308 189 290 188 268 C187 246 177 230 176 208 C175 186 185 172 184 150 C183 130 177 122 176 104 C174 74 172 46 170 16" />
          <use href="#sage-ph-leaf" transform="translate(180 330) rotate(162) scale(1.05)" />
          <use href="#sage-ph-leaf" transform="translate(180 330) rotate(24)" />
          <use href="#sage-ph-leaf" transform="translate(188 268) rotate(191) scale(0.95)" />
          <use href="#sage-ph-leaf" transform="translate(188 268) rotate(-4) scale(0.9)" />
          <use href="#sage-ph-leaf" transform="translate(176 208) rotate(170) scale(0.8)" />
          <use href="#sage-ph-leaf" transform="translate(176 208) rotate(-18) scale(0.82)" />
          <use href="#sage-ph-leaf" transform="translate(184 150) rotate(196) scale(0.6)" />
          <use href="#sage-ph-leaf" transform="translate(184 150) rotate(-10) scale(0.58)" />
          {/* small bracts where the flower spike begins */}
          <use href="#sage-ph-leaf" transform="translate(176 104) rotate(152) scale(0.3)" />
          <use href="#sage-ph-leaf" transform="translate(176 104) rotate(28) scale(0.3)" />
        </g>

        {/* Flower whorls up the spike — lavender, a shade brighter than the leaves */}
        <g stroke="currentColor" strokeWidth="1.2" className="text-gold-light" opacity="0.55">
          {/* whorl 1 */}
          <circle cx="166" cy="96" r="3" />
          <circle cx="185" cy="96" r="3" />
          <circle cx="170" cy="90" r="1.8" fill="currentColor" stroke="none" />
          <circle cx="181.5" cy="90" r="1.8" fill="currentColor" stroke="none" />
          <path d="M163.5 95 C160 92.5 158.5 88.5 158.8 84.5" strokeWidth="1" />
          <path d="M187.5 95 C191 92.5 192.5 88.5 192.2 84.5" strokeWidth="1" />
          {/* whorl 2 */}
          <circle cx="166.5" cy="77" r="2.7" />
          <circle cx="183.5" cy="77" r="2.7" />
          <circle cx="170" cy="71.5" r="1.7" fill="currentColor" stroke="none" />
          <circle cx="180.5" cy="71.5" r="1.7" fill="currentColor" stroke="none" />
          <path d="M164 76 C161 74 160 70.5 160.3 67" strokeWidth="1" />
          {/* whorl 3 */}
          <circle cx="166.5" cy="59" r="2.5" />
          <circle cx="181.5" cy="59" r="2.5" />
          <circle cx="169.5" cy="53.5" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="178.5" cy="53.5" r="1.5" fill="currentColor" stroke="none" />
          {/* whorl 4 */}
          <circle cx="166" cy="42" r="2.2" />
          <circle cx="179.5" cy="42" r="2.2" />
          <circle cx="168.5" cy="37" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="177" cy="37" r="1.4" fill="currentColor" stroke="none" />
          {/* whorl 5 */}
          <circle cx="165.5" cy="27" r="2" />
          <circle cx="177.5" cy="27" r="2" />
          <circle cx="167.5" cy="22" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="175.5" cy="22" r="1.2" fill="currentColor" stroke="none" />
          {/* terminal buds */}
          <circle cx="170.5" cy="13" r="2" />
          <circle cx="170" cy="7" r="1.3" fill="currentColor" stroke="none" />
        </g>
      </svg>

      {/* Faint echo sprig, lower left, behind the text */}
      <svg
        aria-hidden="true"
        viewBox="0 0 120 170"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute -bottom-8 left-[-14px] hidden h-40 w-auto -rotate-12 text-cream opacity-[0.13] lg:block"
      >
        <path d="M62 166 C58 136 66 112 60 84 C57 64 60 44 58 12" />
        <path d="M60 118 C48 110 30 108 16 116 C13 118 13 121 16 122 C30 128 48 126 60 118 Z" />
        <path d="M60 118 C50 117 34 116.5 20 118" strokeWidth="1" />
        <path d="M62 132 C74 124 92 122 104 130 C107 132 107 135 104 136 C90 142 72 140 62 132 Z" />
        <path d="M62 132 C72 133 88 133.5 100 132" strokeWidth="1" />
        <circle cx="52" cy="41" r="2.4" />
        <circle cx="67" cy="41" r="2.4" />
        <circle cx="55" cy="33" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="64" cy="33" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="58.8" cy="20" r="1.8" />
        <circle cx="58.4" cy="10" r="1.2" fill="currentColor" stroke="none" />
      </svg>

      {/* Hairline seam where the band meets the cream page */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gold-light/30" />

      <div className="container relative z-10 py-10">
        <nav aria-label="Breadcrumb" className="mb-3">
          <ol className="flex items-center gap-2 font-sans text-[0.7rem] uppercase tracking-[0.22em] text-cream/70">
            <li>
              <Link href="/" className="transition-colors hover:text-cream">
                Home
              </Link>
            </li>
            <li aria-hidden="true" role="presentation" className="flex items-center">
              <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-gold-light/80" fill="currentColor">
                <path d="M1.5 10.5 C1.5 5.5 5.5 1.5 10.5 1.5 C10.5 6.5 6.5 10.5 1.5 10.5 Z" />
              </svg>
            </li>
            <li className="min-w-0">
              <span
                aria-current="page"
                className="text-gold-light [overflow-wrap:anywhere]"
              >
                {crumb}
              </span>
            </li>
            <li aria-hidden="true" role="presentation" className="flex items-center">
              <span className="ml-2 h-px w-14 bg-gradient-to-r from-gold-light/50 to-transparent md:w-24" />
            </li>
          </ol>
        </nav>

        {/* overflow-wrap:anywhere so a long unbroken word in an editable
            title (e.g. a blog post) wraps instead of being clipped. */}
        <h1 className="max-w-3xl min-w-0 font-serif text-3xl leading-[1.12] text-cream [overflow-wrap:anywhere] [text-wrap:balance] sm:text-4xl md:text-[2.75rem]">
          {title}
        </h1>

        {intro ? (
          <div className="mt-3 min-w-0 max-w-2xl font-sans text-[0.95rem] leading-relaxed text-cream/80 [overflow-wrap:anywhere] md:text-base">
            {intro}
          </div>
        ) : null}

        {children ? <div className="mt-5">{children}</div> : null}
      </div>
    </section>
  );
}

export default PageHeader;
