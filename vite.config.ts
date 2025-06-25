import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

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
      secure: false
    }
  }
}
,
  build: {
    target: 'esnext',
    outDir: 'dist'
  },
  envPrefix: 'VITE_'
});
