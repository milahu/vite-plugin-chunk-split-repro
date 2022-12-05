import { defineConfig } from "vite"
import path from 'path'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'

const assetsDir = '';
const outputDefaults = {
  // remove hashes from filenames
  entryFileNames: `${assetsDir}[name].js`,
  // Invalid substitution "../shell" for placeholder "[name]" in "output.chunkFileNames" pattern, can be neither absolute nor relative path.
  chunkFileNames: `${assetsDir}[name].js`,
  //chunkFileNames: (file) => { console.dir(file.name); throw new Error("x"); },
  assetFileNames: `${assetsDir}[name].[ext]`,
}

export default defineConfig({
  base: "./",
  clearScreen: false,
  build: {
    outDir: path.resolve('../docs'),
    emptyOutDir: true,
    target: 'esnext',
    minify: false,
    rollupOptions: {
      output: {
        ...outputDefaults,
      }
    },
  },
  plugins: [
    chunkSplitPlugin({
      strategy: 'unbundle',
      customSplitting: {
        'codemirror': [/^@codemirror\//],
      }
    })
  ],
})
