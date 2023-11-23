/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        'inter' : ['Inter','sans-serif'],
        'jet' : ['JetBrains Mono', 'monospace'],
        'lato' : ['Lato','sans-serif'],
        'Montserrat' : ['Montserrat','sans-serif'],
        'poppins':['Poppins','sans-serif'],
        'roboto' : ['Roboto','sans-serif'],
        'ubuntu' : ['Ubuntu','sans-serif']
      }
    },
  },
  plugins: [],
}