module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts,css}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@themesberg/tailwind-datepicker'),
  ]
}
