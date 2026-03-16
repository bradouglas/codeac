import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          primary: "#1DB954",
          dark: "#0D7A3A",
        },
        orange: "#F27A1A",
        dark: "#111111",
        charcoal: "#2A2A2A",
        grey: "#6B7280",
        "light-grey": "#E5E7EB",
        cream: "#FAFAF7",
      },
      fontFamily: {
        heading: ["var(--font-dm-sans)", "sans-serif"],
        body: ["var(--font-plus-jakarta)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      borderRadius: {
        card: "14px",
        "card-lg": "20px",
      },
      boxShadow: {
        card: "0 2px 16px 0 rgba(0,0,0,0.07)",
        "card-hover": "0 8px 32px 0 rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
