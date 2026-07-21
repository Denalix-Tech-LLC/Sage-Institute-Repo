import Image from "next/image";

/**
 * The Sage Institute brand mark — the sage plant (green leaves, purple
 * blossom spike) on a transparent background. Height is controlled by the
 * caller via className (use `w-auto` to preserve the plant's tall aspect
 * ratio). Decorative by default; the adjacent wordmark carries the name.
 */
export function LogoMark({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo.png"
      alt=""
      width={324}
      height={798}
      priority={priority}
      className={className}
    />
  );
}
