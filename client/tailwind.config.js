/** @type {import('tailwindcss').Config} */

const tailWindColors = require('tailwindcss/colors')

const colors = {
  transparent: tailWindColors.transparent,
  black: '#141414',
  primary: '#FCC700',
  red: '#D13237',
  blue: '#046F90',
  background: '#F4F4F4',
  white: '#FFFFFF',
  light: '#F4F4F4',
}

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors,
    extend: {},
  },
  plugins: [],
}

