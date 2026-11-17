import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_API_BASE_URL } = loadEnv(mode, process.cwd());
  const target = VITE_API_BASE_URL || 'https://13.209.88.193';
  const proxy = {
    '^/api/v1/jobs(?:/filters)?(?:\\?|$)': { target, changeOrigin: true },
    '/api/v1/recommendations/resume': {
      target,
      changeOrigin: true,
    },
  };
  return {
    plugins: [react(), tailwindcss()],
    server: { proxy },
    preview: { proxy },
  };
});
