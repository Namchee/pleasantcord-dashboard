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
  },
});
