import { defineConfig } from 'vite'
import { reactRouter } from '@react-router/dev/vite'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  clearScreen: false,
  plugins: [reactRouter(), tsconfigPaths()],
  server: {
    proxy: {
      '/connect': 'http://localhost:5174',
    },
  },
})
