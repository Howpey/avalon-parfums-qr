import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        noir: "#14110b",
        "noir-soft": "#1d1810",
        gold: "#c9a24b",
        "gold-bright": "#e3c378",
        paper: "#f5f0e6",
        "paper-dim": "#c8c0b0",
        "paper-faint": "#8a8375",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
