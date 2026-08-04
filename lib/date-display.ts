/**
 * Dates are stored as ISO `YYYY-MM-DD` (what the admin editor's calendar
 * picker produces) and rendered in a friendly long form, e.g. "August 1, 2026".
 *
 * Anything that isn't an ISO date is passed through untouched, so dates typed
 * as free text before the calendar picker existed keep displaying as written.
 */

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

const FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  // Format in UTC so a date never shifts a day in negative-offset timezones.
  timeZone: "UTC",
});

/** True when the value is an ISO calendar date. */
export function isIsoDate(value: string): boolean {
  return ISO_DATE.test(value.trim());
}

/** "2026-08-01" -> "August 1, 2026"; free text -> unchanged. */
export function formatDisplayDate(value: string): string {
  if (!value) return "";
  const match = ISO_DATE.exec(value.trim());
  if (!match) return value;
  const [, year, month, day] = match;
  return FORMATTER.format(
    new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))
  );
}

/** Machine-readable value for <time dateTime>, or undefined for free text. */
export function machineDate(value: string): string | undefined {
  return isIsoDate(value) ? value.trim() : undefined;
}
