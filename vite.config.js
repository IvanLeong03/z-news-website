import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/dev": {
        target: "http://api.zonenews.io:8000/", // Flask backend
        //target: "http://localhost:5000/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
