/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2e7d32",
          50: "#f1f8f2",
          100: "#dceddf",
          200: "#c0dfc5",
          300: "#9fceaa",
          400: "#64b37d",
          500: "#2e7d32",
          600: "#256528",
          700: "#1f5222",
          800: "#1a431c",
          900: "#0e2510",
        }
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,0.08)"
      }
    },
  },
  plugins: [],
}
