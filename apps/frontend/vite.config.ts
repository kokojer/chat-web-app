import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  envPrefix: 'API',
  define: {
    __APP_NAME__: JSON.stringify(process.env.npm_package_name),
    __API_BASE_URL__: JSON.stringify(process.env.API_BASE_URL),
  },
  server: {
    port: 4000,
  },
});
