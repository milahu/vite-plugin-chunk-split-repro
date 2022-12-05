import { defineConfig } from "vite"
import path from 'path'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'

const assetsDir = '';
const outputDefaults = {
  // remove hashes from filenames
  entryFileNames: `${assetsDir}[name].js`,

  // import from parent folder
  // Invalid substitution "../shell" for placeholder "[name]" in "output.chunkFileNames" pattern, can be neither absolute nor relative path.
  chunkFileNames: `${assetsDir}[name].js`,

  /*
  // workarounds ...
  chunkFileNames: (file) => {
    //console.dir(file.name); throw new Error("x");
    // Invalid pattern ".._index.js" for "output.chunkFileNames", patterns can be neither absolute nor relative paths. If you want your files to be stored in a subdirectory, write its name without a leading slash like this: subdirectory/pattern.
    //return file.name.replace(/\//g, "_") + ".js" // docs/.._index.js
    //return file.name.replace(/\//g, "_").replace(/^\./, "+") + ".js" // docs/+._index.js
    //return file.name.replace(/\.\.\//g, "_") + ".js" // docs/_index.js
    return file.name.replace(/\.\.\//g, ".parent/") + ".js" // docs/.parent/index.js
  },
  */

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
