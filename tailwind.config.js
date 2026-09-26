/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#000000',
          secondary: '#1a1a1a',
          tertiary: '#2a2a2a',
          border: '#333333',
        },
      },
    },
  },
  plugins: [],
}
