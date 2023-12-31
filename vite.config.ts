/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    clearMocks: true,
    environment: 'jsdom',
    // setupFiles: './vitest.setup.ts',
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
  },
});
