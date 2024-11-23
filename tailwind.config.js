/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { poppins: ["Poppins", "sans-serif"] },
      screens: {
        resp: { min: "320px", max: "768px" },
        mobile: { max: "340px" },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light", // Default light theme
      "dark", // Default dark theme
      "cupcake", // A pastel theme
      "bumblebee", // A yellow-black theme
      "emerald", // A green theme
      "synthwave",
    ],
  },
};
