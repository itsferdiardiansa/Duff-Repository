const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  important: true,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        default: colors.coolGray['200'],
        primary: colors.blue['600'],
        danger: colors.red['600'],
        warning: colors.yellow['400'],
        success: colors.green['500'],
        dark: colors.coolGray['700'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  variants: {
    extend: {
      opacity: ['disabled'],
    },
    display: ['responsive', 'group-hover', 'group-focus'],
  },
}
