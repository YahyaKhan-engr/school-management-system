import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // All /api requests get forwarded to XAMPP — no CORS issues
      '/api': {
        target: 'http://localhost/school-backend',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
