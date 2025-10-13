import { defineConfig, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "https://mh11wi.github.io/WatermarbleWitchcraft/",
  plugins: [
    {
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/))  return null

        // Use the exposed transform from vite, instead of directly
        // transforming with esbuild
        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic',
        })
      },
    },
    react(),
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './tests/setup.js',
	pool: 'threads'
  },
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  resolve: {
    alias: {
      src: '/src',
      components: '/src/components',
      helpers: '/src/helpers',
      hooks: '/src/hooks',
    },
  },
})