import type { CSSProperties } from "react";

/**
 * Owner-controlled image framing.
 *
 * Cropping is non-destructive: the uploaded file is never re-encoded. Instead
 * each image carries how it should be framed inside its fixed-aspect slot:
 *
 *  - `imageFit`      "cover" fills the frame and crops (default), "contain"
 *                    shows the whole picture with breathing room around it.
 *  - `imagePosition` a CSS object-position value ("50% 30%") saying which part
 *                    of the picture to keep centred when it is cropped. Set in
 *                    the admin editor by clicking the spot to keep in view.
 */

export interface ImageFraming {
  imagePosition?: string;
  imageFit?: string;
}

export const DEFAULT_POSITION = "50% 50%";
export const DEFAULT_FIT = "cover";

/** Inline style applied to <Image>; overrides any object-fit utility class. */
export function framingStyle(framing: ImageFraming | undefined): CSSProperties {
  const fit = framing?.imageFit === "contain" ? "contain" : "cover";
  return {
    objectFit: fit,
    objectPosition: framing?.imagePosition || DEFAULT_POSITION,
  };
}
