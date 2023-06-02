const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#4287f5",
        "primary-50": "#eff6ff",
        "primary-100": "#dbeafe",
        "primary-200": "#bfdbfe",
        "primary-300": "#94c6fc",
        "primary-400": "#61a6f9",
        "primary-500": "#4287f5",
        "primary-600": "#2665ea",
        "primary-700": "#1e50d7",
        "primary-800": "#1f42ae",
        "primary-900": "#1f3b89",
        "primary-950": "#172554",

        "gray-50": "#f7f7f7", // light mode background
        "gray-100": "#e3e3e3", // dark mode text
        "gray-200": "#c8c8c8",
        "gray-300": "#a4a4a4",
        "gray-400": "#818181",
        "gray-500": "#666666",
        "gray-600": "#515151",
        "gray-700": "#434343",
        "gray-800": "#383838",
        // "gray-900": "#313131", // light mode text
        "gray-900": "#1E1E1E", // light mode text
        "gray-950": "#121212", // dark mode background

        primary: {
          DEFAULT: "#4287f5",
          hover: "#61a6f9",
          active: "#2665ea",

          dark: {
            DEFAULT: "#7babf8",
            hover: "#4287f5",
            active: "#2665ea",
          },

          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#94c6fc",
          400: "#61a6f9",
          500: "#4287f5",
          600: "#2665ea",
          700: "#1e50d7",
          800: "#1f42ae",
          900: "#1f3b89",
          950: "#172554",
        },

        secondary: {
          DEFAULT: "#f5f5f5",
          hover: "#e3e3e3",
          active: "#c8c8c8",

          dark: {
            DEFAULT: "#1E1E1E",
            hover: "#383838",
            active: "#515151",
          },
        },

        paper: {
          DEFAULT: "#fff",
          dark: "#1E1E1E",
        },
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        tablet: "2rem",
        laptop: "4rem",
        desktop: "5rem",
        "2xl": "6rem",
      },
    },
    screens: {
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
      "2xl": "1536px",
    },
  },
  variants: {
    extend: {
      backgroundColor: [
        "dark",
        "dark-hover",
        "dark-group-hover",
        "dark-even",
        "dark-odd",
      ],
      textColor: [
        "dark",
        "dark-hover",
        "dark-group-hover",
        "dark-even",
        "dark-odd",
      ],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    // plugin(function ({ addBase, addComponents, addUtilities, theme }) {
    //   addComponents({
    //     ".paper": {
    //       backgroundColor: theme.m theme("colors.paper.DEFAULT"),
    //       borderRadius: theme("borderRadius.lg"),
    //       padding: theme("spacing.6"),
    //       boxShadow: theme("boxShadow.xl"),
    //     },
    //   });
    // }),
    // require("tailwindcss-dark-mode"),
  ],
};
