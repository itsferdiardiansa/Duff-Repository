const colors = require('tailwindcss/colors');

module.exports = {
  orange: {
    05: '#ea793a',
    02: '#e86b32',
    01: '#f5a461',
    DEFAULT: '#ea793a',
  },
  blue: {
    05: '#1c4161',
    02: '#113453',
    01: '#1d3976',
  },
  red: {
    50: '#FF0000',
    02: '#ed5a6c',
    01: '#d23043',
  },
  fb: {
    DEFAULT: '#3468af',
    shadow: '#1a4e95',
  },
  twitter: {
    DEFAULT: '#4ec0f0',
    shadow: '#35aadc',
  },
  primary: {
    DEFAULT: colors.blue['600'],
    hover: colors.blue['500'],
  },
  danger: {
    DEFAULT: colors.red['600'],
    hover: colors.red['500'],
  },
  warning: {
    DEFAULT: colors.yellow['600'],
    hover: colors.yellow['500'],
  },
  success: {
    DEFAULT: colors.green['600'],
    hover: colors.green['500'],
  },
  dark: {
    DEFAULT: colors.coolGray['600'],
    hover: colors.coolGray['500'],
  },
  light: {
    DEFAULT: colors.coolGray['100'],
    hover: colors.coolGray['200'],
  },
};
