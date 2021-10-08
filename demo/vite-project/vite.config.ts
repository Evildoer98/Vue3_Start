import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 设置 '@' 指向 'src' 目录
      '@': resolve(__dirname, 'src')
    }
  },
  base: './', // 设置打包路径
  server: {
    port: 4000,  // 设置服务启动端口号
    open: true,  // 设置服务启动时是否自动打开浏览器
    cors: true,  // 允许跨域
    // 设置代理,根据项目情况配置
    proxy: {
      './api': {
        target: 'http:// xxxxx:8080',

        // changeOrigin默认是false：请求头中host仍然是浏览器发送过来的host
        // changeOrigin 如果设置成true：发送请求头中host会设置成target
        changeOrigin: true,

        // 如果是https接口，需要配置这个参数
        secure: false,
        
        // 正则过滤
        rewrite: (path) => path.replace('/api/', '/')
      }
    }
  },
  
})
