/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        military: '#2E4F24',
        fpt: '#F36F21',
        offwhite: '#F9F8F4',
        charcoal: '#1F2937',
        danger: '#DC2626',
      },
    },
  },
  plugins: [],
}
