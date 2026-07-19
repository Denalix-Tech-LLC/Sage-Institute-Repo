import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

// Edge runtime is required here: @vercel/og's Node build fails to resolve
// its bundled assets when the project path contains spaces (Windows dev).
export const runtime = "edge";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Brand palette (mirrors tailwind.config.ts — Tailwind classes are not
// available inside next/og, so the hex values are inlined here).
const FOREST = "#365B6B";
const FOREST_DARK = "#22394A";
const CREAM = "#F1ECEC";
const LAVENDER = "#A092BE";
const LAVENDER_LIGHT = "#CFC8E2";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: FOREST,
          backgroundImage: `linear-gradient(135deg, ${FOREST} 0%, ${FOREST_DARK} 100%)`,
        }}
      >
        {/* Simple sprout motif */}
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          style={{ marginBottom: 28 }}
        >
          {/* stem */}
          <path
            d="M36 64 C36 48 36 40 36 30"
            stroke={LAVENDER}
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* left leaf */}
          <path
            d="M36 40 C24 40 14 32 12 20 C24 20 34 28 36 40 Z"
            fill={LAVENDER}
          />
          {/* right leaf */}
          <path
            d="M36 30 C48 30 58 22 60 10 C48 10 38 18 36 30 Z"
            fill={LAVENDER_LIGHT}
          />
        </svg>

        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 700,
            color: CREAM,
            letterSpacing: "-0.02em",
            textAlign: "center",
          }}
        >
          {siteConfig.name}
        </div>

        {/* Thin lavender accent rule */}
        <div
          style={{
            display: "flex",
            width: 120,
            height: 3,
            backgroundColor: LAVENDER,
            borderRadius: 2,
            marginTop: 32,
            marginBottom: 32,
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 500,
            color: LAVENDER_LIGHT,
            letterSpacing: "0.06em",
            textAlign: "center",
          }}
        >
          {siteConfig.tagline}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: CREAM,
            opacity: 0.75,
            marginTop: 36,
            textAlign: "center",
          }}
        >
          Psychiatric care &amp; therapy — telehealth across North Carolina
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
