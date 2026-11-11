import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  // Tailwind via CLI → src/generated.css (see npm run css).
  // @tailwindcss/vite left unused: on this host it emitted empty @layer utilities.
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/catalogue': { target: 'http://127.0.0.1:8079', changeOrigin: true },
      '/tags': { target: 'http://127.0.0.1:8079', changeOrigin: true },
      '/cart': { target: 'http://127.0.0.1:8079', changeOrigin: true },
      '/orders': { target: 'http://127.0.0.1:8079', changeOrigin: true },
      '/login': { target: 'http://127.0.0.1:8079', changeOrigin: true },
      '/register': { target: 'http://127.0.0.1:8079', changeOrigin: true },
      '/customers': { target: 'http://127.0.0.1:8079', changeOrigin: true },
      '/addresses': { target: 'http://127.0.0.1:8079', changeOrigin: true },
      '/cards': { target: 'http://127.0.0.1:8079', changeOrigin: true },
      '/address': { target: 'http://127.0.0.1:8079', changeOrigin: true },
      '/card': { target: 'http://127.0.0.1:8079', changeOrigin: true },
      '/metrics': { target: 'http://127.0.0.1:8079', changeOrigin: true },
      '/img': { target: 'http://127.0.0.1:8079', changeOrigin: true },
      '/legacy': { target: 'http://127.0.0.1:8079', changeOrigin: true },
      '/favicon.png': { target: 'http://127.0.0.1:8079', changeOrigin: true },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
