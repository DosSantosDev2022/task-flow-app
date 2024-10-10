import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#222831', // cor primária
        primary_hover: '#323c48', // hover da cor primaria
        secondary: '#31363F', // cor secundária
        secondary_hover: '#3c4350', // hover da cor secundária
        accent: '#76ABAE', // cor de destaque
        accent_hover: '#4e888c', // hover da cor de destaque
        neutral: '#EEEEEE', // cor neutra (normalmente usada para textos simples)
        neutral_hover: '#dcdcdc',
        light: '#fff',
      },
      animation: {
        'spin-fast': 'spin 0.5s linear infinite', // Mais rápido
        'spin-slow': 'spin 1s linear infinite', // Mais devagar
      },
    },
  },
  plugins: [require('tailwind-scrollbar'), require('tailwindcss-animated')],
}
export default config
