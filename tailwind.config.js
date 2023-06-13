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

        dark: "#121212",

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
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addUtilities(
        {
          ".w-xs": { width: theme("space.12") },
          ".w-sm": { width: theme("space.14") },
          ".w-md": { width: theme("space.16") },
          ".w-lg": { width: theme("space.18") },
          ".w-xl": { width: theme("space.20") },
          ".w-2xl": { width: theme("space.24") },
          ".w-3xl": { width: theme("space.28") },

          ".h-xs": { height: theme("space.12") },
          ".h-sm": { height: theme("space.14") },
          ".h-md": { height: theme("space.16") },
          ".h-lg": { height: theme("space.18") },
          ".h-xl": { height: theme("space.20") },
          ".h-2xl": { height: theme("space.24") },
          ".h-3xl": { height: theme("space.28") },

          ".size-xs": {
            width: "16px",
            height: "16px",
          },
          ".size-sm": {
            width: "20px",
            height: "20px",
          },
          ".size-md": {
            width: "40px",
            height: "40px",
          },
          ".size-lg": {
            width: "60px",
            height: "60px",
          },
          ".size-xl": {
            width: "80px",
            height: "80px",
          },
          ".size-2xl": {
            width: "100px",
            height: "100px",
          },
          ".size-3xl": {
            width: "120px",
            height: "120px",
          },
        },
        ["responsive", "dark", "hover"]
      );
      addComponents({
        // ".paper": {
        //   backgroundColor: theme("colors.paper.dark"),
        //   boxShadow: theme("boxShadow.xl"),
        // },
      });
    }),
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
