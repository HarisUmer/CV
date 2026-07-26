import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GITHUB_PAGES=true → project site at https://harisumer.github.io/CV/
// Vercel / local → root path
const base = process.env.GITHUB_PAGES === 'true' ? '/CV/' : '/';

export default defineConfig({
  base,
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
