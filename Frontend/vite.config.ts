import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "@tailwindcss/vite"
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@globals": path.resolve(__dirname, "./src/components/globals"),
      "@locals": path.resolve(__dirname, "./src/components/locals"),
      "@lib": path.resolve(__dirname, "./src/lib"),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      // Proxy para todas las rutas /api
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }
})
