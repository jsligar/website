/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'nerd-red': '#DC2626',
        'nerd-dark': '#0A0A0A',
        'nerd-gray': '#1A1A1A',
        'nerd-light-gray': '#2A2A2A',
      },
    },
  },
  plugins: [],
}
