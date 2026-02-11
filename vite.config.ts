import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['6baa-2605-59c8-70c2-3b08-ec39-417-6fe0-6833.ngrok-free.app'],
  },
})
