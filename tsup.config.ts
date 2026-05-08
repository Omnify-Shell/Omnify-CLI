import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: false,             // Generates declaration files
  clean: true,           // Cleans dist folder before build
  minify: true,          // Makes the package smaller
  shims: true,           // Better compatibility
});