import type { Config } from "tailwindcss";

// Brand palette — matches the LittleLamp logo (public/logo/logo-full.svg):
// amber "flame" as primary, deep navy "lamp base" as secondary/ink, warm cream background.
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFF7E8",
          100: "#FFEBC2",
          200: "#FFDB93",
          300: "#FCC763",
          400: "#F8B540",
          500: "#F5A524", // brand flame
          600: "#DA8A14",
          700: "#C2790C",
          800: "#95590C",
          900: "#6E430D",
        },
        ink: {
          50: "#EEF1F7",
          100: "#D3D9E8",
          200: "#A8B3D0",
          300: "#7C8CB6",
          400: "#4F5F8F",
          500: "#3C4E77",
          600: "#2A3A5C",
          700: "#22304D",
          800: "#1B2740", // brand lamp base
          900: "#131B2E",
        },
        cream: {
          DEFAULT: "#FFF8EC",
          100: "#FFFDF9",
          200: "#FFF8EC",
          300: "#F0E4CC",
        },
        accent: {
          DEFAULT: "#F2673D",
          dark: "#D14E28",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px -4px rgba(27, 39, 64, 0.12)",
        glow: "0 0 40px -8px rgba(245, 165, 36, 0.45)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
