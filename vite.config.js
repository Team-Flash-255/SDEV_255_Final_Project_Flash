import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/SDEV_255_Final_Project_Flash/',
  server: {
    allowedHosts: ['.onrender.com'],
  }
})
