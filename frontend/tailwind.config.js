/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#1E40AF',
        'brand-green': '#10B981',
      },
    },
  },
  plugins: [],
}