import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'https://keepbara.duckdns.org',
        changeOrigin: true,
        secure: false // self-signed 인증서일 경우 false, 아니면 true로 변경 가능
      }
    }
  },
  build: {
    target: 'esnext',
    outDir: 'dist'
  },
  envPrefix: 'VITE_'
})
