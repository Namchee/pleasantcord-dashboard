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
        surface: '#504F57',
        background: '#3E3E44',
        depth: '#34343A',
        dark: '#232326',
        accent: '#3B82F6',
        content: 'hsla(240, 100%, 100%, 0.931)',
        grass: '#30A46C',
        danger: '#CD2B31',
      },
    },
  },
});
