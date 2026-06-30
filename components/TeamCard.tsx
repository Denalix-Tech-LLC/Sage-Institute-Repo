import { LinkedinIcon } from "@/components/SocialIcons";

interface TeamCardProps {
  name: string;
  title: string;
  bio: string;
  initials: string;
}

export function TeamCard(props: TeamCardProps) {
  const { name, title, bio, initials } = props;

  return (
    <div className="group flex h-full flex-col items-center rounded-2xl border border-stone-200/60 bg-white p-8 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-forest font-serif text-2xl font-semibold text-cream ring-4 ring-cream">
        {initials}
      </div>
      <h3 className="mt-5 font-serif text-lg font-semibold text-forest">{name}</h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gold-deep">{title}</p>
      <p className="mt-4 text-sm leading-relaxed text-gray-600">{bio}</p>
      <a
        href="#"
        aria-label="LinkedIn profile"
        className="mt-5 text-gray-400 transition-colors hover:text-forest"
      >
        <LinkedinIcon className="h-5 w-5" />
      </a>
    </div>
  );
}
