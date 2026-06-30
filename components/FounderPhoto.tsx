"use client";

import Image from "next/image";
import { useState } from "react";

interface FounderPhotoProps {
  src: string;
  alt: string;
  /** Shown if the image is missing or fails to load. */
  initials: string;
}

/**
 * Founder portrait with a graceful fallback to initials on a forest panel
 * (so the layout never shows a broken image if the photo file is absent).
 */
export function FounderPhoto({ src, alt, initials }: FounderPhotoProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-forest">
        <span className="font-serif text-6xl font-semibold text-cream/90">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 45vw, 100vw"
      className="object-cover"
      onError={() => setErrored(true)}
    />
  );
}
