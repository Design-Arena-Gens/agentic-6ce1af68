import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef6ff",
          100: "#d9ebff",
          200: "#b5d6ff",
          300: "#84bbff",
          400: "#519aff",
          500: "#2d79ff",
          600: "#195ceb",
          700: "#1448be",
          800: "#123f98",
          900: "#123674"
        }
      }
    }
  },
  plugins: []
};

export default config;

