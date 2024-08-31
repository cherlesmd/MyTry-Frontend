/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      text: "#040316",
      background: "#fbfbfe",
      primary: "#a3ee59",
      secondary: "#9e95e9",
      accent: "#e46955",
    },

    extend: { fontFamily: { 'inter': ["Inter", "sans-serif"] } },
  },
  plugins: [],
};
