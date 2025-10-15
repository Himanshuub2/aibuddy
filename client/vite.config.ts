import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  envDir: '../', // Look for .env files in the parent directory (project root)
  plugins: [react()],
})
