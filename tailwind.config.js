/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
      },
      colors: {
        ink: "#0A0400",
        coal: "#161009",
        flame: "#F4620A",
        paper: "#FAF9F7",
        accent: "#D8480F",
        muted: "#716C66",
        line: "#EBE7E1",
        pill: "rgba(20, 11, 8, 0.55)",
      },
      backdropBlur: {
        xs: "2px",
      },
      screens: {
        xs: "420px",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
