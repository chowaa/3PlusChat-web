import { defineConfig } from 'vite'
import { loadEnv, UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';

// https://cn.vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: './',
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue'],
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      })
    ],
    server: {
      open: false,//启动项目自动弹出浏览器
      hmr: false, //开启热加载
      host: true,//监听所有地址
      port: 8080,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8880',//'http://127.0.0.1:8880',// 后端服务实际地址
          changeOrigin: true,//开启代理
          rewrite: path => path.replace(/^\/api/, '') // 将请求中/api用空值替换重写
        },
      }
    },
    resolve: {
      alias: {
        '@': path.join(__dirname, './src'),
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      publicPath: './',
      minify: true,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/mixin.scss" as *;`
        }
      }
    },
  }
})
