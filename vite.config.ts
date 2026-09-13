import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11', 'Android >= 4.4', 'iOS >= 10'],
    }),
  ],
})
