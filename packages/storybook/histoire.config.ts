import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [HstVue()],
  setupFile: './histoire.setup.ts',

  theme: {
    title: 'VeroUI',
    defaultColorScheme: 'auto',
    storeColorScheme: true,
  },

  tree: {
    groups: [
      {
        id: 'components',
        title: 'Components',
      },
      {
        id: 'composables',
        title: 'Composables',
      },
    ],
  },

  vite: {
    plugins: [
      tsconfigPaths(),
      vue(),
      tailwindcss(),
    ],
    server: {
      port: 6007,
    },
    optimizeDeps: {
      include: ['deepmerge'],
      exclude: ['@vue/compiler-core'],
    },
    ssr: {
      noExternal: ['deepmerge'],
    },
  },
})
