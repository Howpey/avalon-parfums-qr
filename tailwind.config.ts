import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Surfaces (design.md)
        obsidian: "#0f1011",
        abyss: "#090a0b",
        graphite: "#2e2e2e",
        steel: "#3f4041",
        silver: "#cacaca",
        // Text (design.md)
        cloud: "#f5f5f7",
        ash: "#9f9fa0",
        fog: "#6a6b6b",
        // Primary action (Avalon gold, retained)
        gold: "#c9a24b",
        "gold-bright": "#e3c378",
        // Warm category tiles (replacing the Origin iris/cyan set)
        amber: "#c9962f",
        copper: "#b46a3c",
        rose: "#c98a86",
        bronze: "#8a5a2c",
        sand: "#cdb48a",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
