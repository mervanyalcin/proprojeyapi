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
        background: "var(--background)",
        foreground: "var(--foreground)",
        themeColorOne: "#cfa23a ",
        themeColorSec: "#032731",
        themeColorThird: "#fff6bb",
      },
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      'cabin': ["Cabin", 'Arial', 'sans-serif'],
    },
  },
  plugins: [],
};
export default config;
