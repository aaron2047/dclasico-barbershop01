import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        espresso: "#15110e",
        walnut: "#241912",
        wood: "#3a2a1d",
        brass: "#b8935a",
        "brass-light": "#d3b27a",
        cream: "#f6efe4",
        paper: "#fbf7f0",
        stone: "#6b5f52",
      },
      fontFamily: {
        sans: ["Karla", "system-ui", "sans-serif"],
        serif: ["Cormorant Garamond", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
