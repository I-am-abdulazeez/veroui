import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      outDir: 'dist',
      copyDtsFiles: false,
      staticImport: true,
      rollupTypes: true,
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VeroUIRipple',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        'vue',
        '@veroui/ripple',
        '@veroui/spinner',
        '@veroui/theme',
        '@veroui/shared-utils',
        '@veroui/vue-utils',
        '@veroui/composables',
      ],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
