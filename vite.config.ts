import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

const appDirectory = fileURLToPath(new URL('./app/', import.meta.url))

export default defineConfig({
  plugins: [
    vue({
      template: {
        transformAssetUrls: false,
      },
    }),
  ],
  resolve: {
    alias: {
      '~': appDirectory,
      '@': appDirectory,
    },
  },
  test: {
    environment: 'jsdom',
  },
})
