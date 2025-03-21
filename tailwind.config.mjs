/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
        },
        neutral: {
          50: "#f5f5f7",
          100: "#e5e5e5",
          200: "#d1d1d6",
          300: "#b9b9c0",
          400: "#8e8e93",
          500: "#6c6c70",
          600: "#48484a",
          700: "#363638",
          800: "#2c2c2e",
          900: "#1c1c1e",
          950: "#0a0a0a",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      animation: {
        "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
      },
    },
  },
  plugins: [],
} 