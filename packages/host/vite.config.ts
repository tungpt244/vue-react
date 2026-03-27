import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue(), react({ include: /\.(tsx|jsx)$/ }), tailwindcss()],
  resolve: {
    alias: {
      '@vibe/shared': resolve(__dirname, '../shared/src'),
      '@vibe/vue-app': resolve(__dirname, '../vue-app/src'),
      '@vibe/react-app': resolve(__dirname, '../react-app/src'),
    },
  },
})
