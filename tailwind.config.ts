import type { Config } from 'tailwindcss';
const flowbite = require('flowbite-react/tailwind');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite/**/*.js',
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Poppins', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        dark: {
          gold: '#E6A92F',
          goldLight: '#D99D29',
          yellow: '#FFC107',
          yellowLight: '#FFFB95',
          navy: '#193442',
          darkGray: '#374952',
          brownLight: '#AE7A19',
          green: '#2D9D47',
          greenLight: '#ACFFC8',
          greenBright: '#28A745',
          greenGlow: '#15DD43',
          red: '#BD2F3D',
          redDark: '#CB1627',
          redLight: '#FFCACA',
          redGlow: '#FF4040',
          blue: '#1976D2',
        },
        light: {
          white: '#ECF2F3',
          grayBright: '#B8CCCF',

          green: '#3AA152',
          greenLight: '#ACFFC8',
          greenBright: '#B8FED0',
          brownLight: '#AE7A19',
          yellowLight: '#FFFB95',
          gold: '#FFBD39',
          redLight: '#BD2F3D',
        },
        font: {
          brown: '#542D0A',
          white: '#FDFDFD',
          light: '#D9D9D9',
          gray: '#A1A1A1',
          grayLight: '#8B8B8B',
          black: '#1A1A1A',
          green: '#26BE54',
        },
        dropdown: {
          gold: '#B67E17',
          lightYellow: '#FFE495',
          navy: '#132934',
          gray: '#ECECEC',
          darkBlue: '#112D3A',
          darkGray: '#56646A',
          lightGreen: '#C5F9D7',
        },
      },
    },
  },

  // plugins: [],

  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('flowbite/plugin'),
    flowbite.plugin(),
  ],
  darkMode: 'class',
};
export default config;
