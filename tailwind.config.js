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

        // light: {
        //   primary: "#4287f5",
        //   accent: "#f542a1",
        //   background: "#ffffff",
        //   text: "#333333",
        //   highlight: "#f5d742",
        //   "subtle-shade": "#e8e8e8",
        // },
        // dark: {
        //   primary: "#7babf8",
        //   accent: "#38A3A5",
        //   background: "#121212",
        //   text: "#C4C4C4",
        //   highlight: "#F9FF4F",
        //   "subtle-shade": "#1E1E1E",
        // },
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    screens: {
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
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
    // require("tailwindcss-dark-mode"),
  ],
};
