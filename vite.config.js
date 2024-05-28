import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

const pages = ['index', 'mini-vue3']
export default defineConfig({
  server: {
    port: 5181,
  },
  build: {
    rollupOptions: {
      input: pages.reduce((pv, cv) => {
        pv[cv] = fileURLToPath(new URL(`${cv}.html`, import.meta.url))
        return pv
      }, {}),
    },
  },
})
