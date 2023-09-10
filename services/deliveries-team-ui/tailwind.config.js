/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  plugins: [require('flowbite/plugin')],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#3c6fac',
          100: '#3c6fac',
          200: '#3c6fac',
          300: '#3c6fac',
          400: '#3c6fac',
          500: '#3c6fac',
          600: '#3c6fac',
          700: '#3c6fac',
          800: '#3c6fac',
          900: '#0e325b'
        }
      }
    }
  }
}

