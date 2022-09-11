import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  extract: {
    include: ['**/*.{jsx,tsx,css}'],
    exclude: ['node_modules', '.git', '.next'],
  },
  theme: {
    fontFamily: {
      sans: ['Public Sans', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#EDEDEF',
            h1: {
              color: '#EDEDEF',
            },
            h2: {
              color: '#EDEDEF',
            },
            h3: {
              color: '#EDEDEF',
            },
            h4: {
              color: '#EDEDEF',
            },
            strong: {
              color: '#EDEDEF',
            },
            a: {
              'color': '#3B82F6',
              '&:hover': {
                color: '#2776F5',
              },
            },
          },
        },
      },
      colors: {
        background: {
          DEFAULT: '#3E3E44',
          light: '#504F57',
          dark: '#34343A',
          deep: '#232326',
        },
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#2776F5',
        },
        accent: {
          DEFAULT: '#FFA31A',
          dark: '#F09000',
        },
        content: {
          DEFAULT: '#EDEDEF',
          dark: '#7E7D86',
        },
        grass: '#30A46C',
        danger: {
          DEFAULT: '#E54D2E',
          dark: '#CA3214',
        },
      },
    },
  },
  plugins: [
    require('windicss/plugin/forms'),
    require('windicss/plugin/typography'),
  ],
});
