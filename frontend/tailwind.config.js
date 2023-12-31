/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  safelist: [],
  darkMode: "class",
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        gray: colors.gray,
        blue: colors.blue,
        green: colors.emerald,
        yellow: colors.amber,
        purple: colors.violet,
        white: colors.white,
        black: colors.black,
      },
      fontName: {
        sans: ["Inter Var", ...defaultTheme.fontFamily.sans],
      },
      height: {
        '120': '26rem',
      },
      spacing: {
        '100': '-100%',
      },
      inset: {
        '100': '-100%',
      }
    },
    transitionProperty: {
      'right': 'right'
    }
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
      keyframes: {
        outbox: {
          "0%, 70%": { right: "0" },
          "100%": { right: "-100%" }
        },
        inbox: {
          "0%, 30%": { right: "-100%" },
          "100%": { right: "0" }
        }
      },
      animation: {
        outbox: "outbox 300ms ease",
        inbox: "inbox 300ms ease",
      },
    }
  },
  plugins: [require("@tailwindcss/forms")],
}

