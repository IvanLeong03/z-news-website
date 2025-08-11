import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/dev": {
        target: "https://api.zonenews.io/", 
        changeOrigin: true,
        secure: false,
      },
    },
  },
})