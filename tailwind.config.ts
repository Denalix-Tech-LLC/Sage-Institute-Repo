import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // Primary: deep teal-slate (token name kept as `forest`).
        forest: {
          DEFAULT: "#365B6B",
          dark: "#22394A",
          light: "#47758C",
        },
        // Accent: muted lavender #A092BE (token name kept as `gold`).
        gold: {
          DEFAULT: "#A092BE",
          dark: "#685C81",
          deep: "#5F5378",
          light: "#CFC8E2",
        },
        // Backgrounds: warm light gray + soft mint (token name kept as `cream`).
        cream: {
          DEFAULT: "#F1ECEC",
          dark: "#E1F6F3",
        },
        ink: "#1C1917",
        // Adapts per-section via CSS vars (deep gold on light, bright gold on forest)
        eyebrow: "var(--eyebrow)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        serif: ["var(--font-playfair)", ...defaultTheme.fontFamily.serif],
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        sway: {
          from: { transform: "rotate(-0.4deg)" },
          to: { transform: "rotate(0.7deg)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out both",
        sway: "sway 18s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
