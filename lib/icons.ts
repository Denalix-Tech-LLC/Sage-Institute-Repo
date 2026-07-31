import {
  Pill,
  Coffee,
  Leaf,
  Sparkles,
  Stethoscope,
  HeartHandshake,
  ClipboardList,
  MessageSquare,
  Mail,
  Video,
  ShieldCheck,
  Users,
  CreditCard,
  CalendarDays,
  type LucideIcon,
} from "lucide-react";

/**
 * Maps the string `icon` keys used in content/site-content.json to Lucide
 * icon components. Content stores a stable key (e.g. "sparkles"); components
 * resolve it here so lists stay data-driven and reorderable.
 */
export const ICONS: Record<string, LucideIcon> = {
  pill: Pill,
  coffee: Coffee,
  leaf: Leaf,
  sparkles: Sparkles,
  stethoscope: Stethoscope,
  heartHandshake: HeartHandshake,
  clipboardList: ClipboardList,
  messageSquare: MessageSquare,
  mail: Mail,
  video: Video,
  shieldCheck: ShieldCheck,
  users: Users,
  creditCard: CreditCard,
  calendarDays: CalendarDays,
};

/** Icon keys offered in the admin editor's icon dropdowns. */
export const ICON_OPTIONS = Object.keys(ICONS);

/** Resolve a content icon key to a Lucide icon; unknown keys fall back safely. */
export function resolveIcon(key: string | undefined): LucideIcon {
  return (key && ICONS[key]) || Sparkles;
}
