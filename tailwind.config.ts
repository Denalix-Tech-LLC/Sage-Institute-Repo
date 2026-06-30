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
        forest: {
          DEFAULT: "#1B4332",
          dark: "#123524",
          light: "#2D6A4F",
        },
        gold: {
          DEFAULT: "#D4A853",
          dark: "#B8902F",
          deep: "#8A6E1A",
          light: "#E4C684",
        },
        cream: {
          DEFAULT: "#F9F6F0",
          dark: "#EFE9DC",
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
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
