import type { Config } from 'tailwindcss'

import colors from 'tailwindcss/colors'
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        'old-lace': {
            '50': '#fbf7f1',
            '100': '#f7edde',
            '200': '#eed7ba',
            '300': '#e2bb8f',
            '400': '#d69961',
            '500': '#cd7f42',
            '600': '#bf6a37',
            '700': '#9e5330',
            '800': '#7f432d',
            '900': '#673927',
            '950': '#371c13',
        },

      },
    },
  },
  plugins: [],
}
export default config
