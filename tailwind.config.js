/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        petrol: {
          50: "#f0f7fb",
          100: "#dcecf4",
          200: "#bcdaea",
          300: "#8ec0da",
          400: "#589fc3",
          500: "#3383a9",
          600: "#14688f",
          700: "#125575",
          800: "#134761",
          900: "#143c52",
          950: "#0d2636"
        }
      }
    }
  },
  plugins: []
};
