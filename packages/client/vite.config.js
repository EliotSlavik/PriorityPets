// import "dotenv/config"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
//   proxy:{
//     [import.meta.env.VITE_APP_URL]:{
//         target: import.meta.env.VITE_APP_DOMAIN,
//         changeOriginal: true,
//         rewrite: path => path.replace()
//     }
//   }
})