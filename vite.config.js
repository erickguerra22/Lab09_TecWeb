/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://uvgenios.online/21781/Lab9',
  server: {
    host: '0.0.0.0',
    port: '3000',
  },
  resolve: {
    alias: [
      {
        find: '@components',
        replacement: resolve(__dirname, './src/components'),
      },
    ],
  },
})
