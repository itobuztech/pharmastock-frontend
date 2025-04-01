/** @type {import('tailwindcss').Config} */

module.exports = {
  corePlugins: {
    preflight: false
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
