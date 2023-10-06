import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  define: {
    __APP_NAME__: JSON.stringify(process.env.npm_package_name),
    __SERVER_PORT__: JSON.stringify(process.env.npm_package_config_port),
  },
  server: {
    port: 4000,
  },
});
