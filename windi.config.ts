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
        },
        content: {
          DEFAULT: '#EDEDEF',
          dark: '#7E7D86',
        },
        grass: '#30A46C',
        danger: {
          DEFAULT: '#CD2B31',
          light: '#F16A50',
        },
      },
    },
  },
  plugins: [
    require('windicss/plugin/forms'),
  ],
});
