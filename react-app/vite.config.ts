/// <reference types="vitest" />
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  // plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  plugins: [tailwindcss(), tsconfigPaths()], // reactRouter() temporarily removed for testing
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    css: true,
  },
})
