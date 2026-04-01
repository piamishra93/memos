import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "Courier New", "monospace"],
      },
      colors: {
        ink: "#1a1a1a",
        paper: "#f7f5f0",
        muted: "#8a8a8a",
        accent: "#2a2a2a",
      },
    },
  },
  plugins: [],
};

export default config;
