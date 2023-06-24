const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  mode: "jit",
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
          DEFAULT: "#00cf92",
          hover: "#00a979",
          active: "#008764",

          dark: {
            DEFAULT: "#00cf92",
            hover: "#00a979",
            active: "#008764",
          },

          50: "#eafff6",
          100: "#ccffe8",
          200: "#9dfdd6",
          300: "#42f5b7",
          400: "#20e7a9",
          500: "#00cf92",
          600: "#00a979",
          700: "#008764",
          800: "#006a50",
          900: "#005743",
          950: "#003127",
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
      addUtilities({
        ".size-xs": {
          width: "20px",
          height: "20px",
        },
        ".size-sm": {
          width: "30px",
          height: "30px",
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
      });
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
