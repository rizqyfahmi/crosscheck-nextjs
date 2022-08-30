/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/features/*/presentation/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "crosscheck-dark": "#203A40",
        "crosscheck-grey-border": "#F2F2F2",
        "crosscheck-grey": "#A1A4B2",
        "white": "#ffffff",
        "primary": "#F24B59"
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}
