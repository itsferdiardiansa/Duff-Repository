module.exports = {
  purge: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  variants: {
    extend: {
      opacity: ['disabled'],
    },
    display: [
      'responsive', 
      'group-hover', 
      'group-focus'
    ],
   }
}
