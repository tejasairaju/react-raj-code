module.exports = {
  purge: ['./src/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  variants: {
    extend: {},
  },
  plugins: [],
}
