import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import gltf from "vite-plugin-gltf"; // (b) Vite


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    gltf({
/*       transforms: [ textureResize({ size: [ 1024, 1024 ] }) ] */
    }) 
  ]
})