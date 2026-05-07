import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'),
      '@lib': path.resolve(__dirname, './lib'),
      '@constants': path.resolve(__dirname, './constants'),
      '@shared-types': path.resolve(__dirname, './types/index.ts'),
      '@shared-types/': `${path.resolve(__dirname, './types')}/`,
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
  },
})
