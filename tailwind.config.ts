import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {},
      animation: {
        'spin-fast': 'spin 0.5s linear infinite', // Mais rápido
        'spin-slow': 'spin 1s linear infinite', // Mais devagar
      },
    },
  },
  plugins: [require('tailwind-scrollbar'), require('tailwindcss-animated')],
}
export default config
