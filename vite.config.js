import { defineConfig } from 'vite'
import gltf from "vite-plugin-gltf"; // (b) Vite


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    gltf() 
  ]
})