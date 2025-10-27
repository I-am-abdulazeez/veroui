import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      copyDtsFiles: true,
      staticImport: true,
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VeroUIButton',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        'vue',
        '@veroui/spinner',
        '@veroui/ripple',
        '@veroui/theme',
        '@veroui/shared-utils',
        '@veroui/vue-utils',
        '@veroui/composables',
        '@iconify/vue',
      ],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
