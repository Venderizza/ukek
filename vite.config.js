import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [tailwindcss(), vue()],
    server: {
      proxy: {
        '/message': {
          target: env.VITE_API_PROXY_TARGET,
          changeOrigin: true,
        }
      }
    }
  }
})
