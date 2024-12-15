import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/JMP-Tools/', // Replace <repository-name> with your GitHub repository name
  plugins: [react()],
})
