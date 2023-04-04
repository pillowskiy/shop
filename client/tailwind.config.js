/** @type {import('tailwindcss').Config} */

const tailWindColors = require('tailwindcss/colors')

const colors = {
  transparent: tailWindColors.transparent,
  black: '#141414',
  primary: '#FFC700',
  background: '#595959',
  white: '#FDFDFD',
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

