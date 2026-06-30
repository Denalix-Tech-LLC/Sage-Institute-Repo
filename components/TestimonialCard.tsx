interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  initials: string;
}

export function TestimonialCard({ quote, name, title, initials }: TestimonialCardProps) {
  return (
    <figure className="flex h-full flex-col">
      <span className="font-serif text-6xl leading-none text-gold" aria-hidden="true">
        &ldquo;
      </span>
      <blockquote className="mt-4 flex-grow text-lg leading-relaxed text-ink">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-forest font-serif text-sm font-semibold text-cream">
          {initials}
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-ink">{name}</span>
          <span className="text-sm text-gray-500">{title}</span>
        </div>
      </figcaption>
    </figure>
  );
}
