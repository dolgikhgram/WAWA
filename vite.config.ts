import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const ReactCompilerConfig = {
  target: '19',
  sources: ['src/**/*.{ts,tsx}'],
}


// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [
        ['babel-plugin-react-compiler', ReactCompilerConfig],
      ],
    },
  })],
  base: "./",
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
