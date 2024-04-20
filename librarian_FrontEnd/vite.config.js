import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    post: 3002,
    /*
       Để không cần phải gán cứng hostname/ip của API server trong dự án thì cần phải hiệu chỉnh lại tệp tin này,
      cấu hình proxy chuyển yêu cầu có URL chứa /api xuất phát từ ứng dụng VUE.
    */
   proxy:{
    "/api":{
      target: "http://localhost:3001/",
      changeOrigin: true,
    }
   }
  },
});

