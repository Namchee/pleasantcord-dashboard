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
        background: '#3E3E44',
        depth: '#34343A',
        accent: '#3B82F6',
        content: 'hsla(240, 100%, 100%, 0.931)',
      },
    },
  },
});
