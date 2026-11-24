/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: { 50: '#fff7ed', 500: '#f97316', 600: '#ea580c', 700: '#c2410c' },
        navy: { 800: '#1e293b', 900: '#0f172a', 950: '#0b1220' },
      },
    },
  },
  plugins: [],
};
