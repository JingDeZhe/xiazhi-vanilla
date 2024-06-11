import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { globSync } from 'glob'
import cdn from 'vite-plugin-cdn-import'

const pages = globSync('./*.html').map((v) => v.replace(/^(.*)\.html/, '$1'))
export default defineConfig({
  base: '/xiazhi-vanilla/',
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
  plugins: [cdn({})],
})
