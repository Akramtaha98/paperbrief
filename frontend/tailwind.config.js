/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          50: "#f0faf5",
          100: "#d8f3e6",
          200: "#b3e8ce",
          300: "#7dd5ae",
          400: "#45bb8a",
          500: "#178C5E",
          600: "#136e4b",
          700: "#0f5539",
          800: "#0b3f2a",
          900: "#082b1c",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
