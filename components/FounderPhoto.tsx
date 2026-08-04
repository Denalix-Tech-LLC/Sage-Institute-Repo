"use client";

import Image from "next/image";
import { useState } from "react";

import { framingStyle, type ImageFraming } from "@/lib/image-display";

interface FounderPhotoProps extends ImageFraming {
  src: string;
  alt: string;
  /** Shown if the image is missing or fails to load. */
  initials: string;
}

/**
 * Founder portrait with a graceful fallback to initials on a forest panel
 * (so the layout never shows a broken image if the photo file is absent).
 * Framing (crop focus / fit) is owner-controlled from the admin editor.
 */
export function FounderPhoto({
  src,
  alt,
  initials,
  imagePosition,
  imageFit,
}: FounderPhotoProps) {
  const [errored, setErrored] = useState(false);

  // An empty path (e.g. a newly added team member with no photo yet) would
  // make next/image error, so fall straight through to the initials panel.
  if (!src || errored) {
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
      style={framingStyle({ imagePosition, imageFit })}
      onError={() => setErrored(true)}
    />
  );
}
