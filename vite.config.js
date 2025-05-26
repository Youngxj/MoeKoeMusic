// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      devOptions: {
        enabled: true,
        type: 'module'
      },
      workbox: {
        // 缓存策略配置
        runtimeCaching: [
          {
            // 匹配所有API请求
            urlPattern: /^\/api\/.*$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7天
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // 匹配所有静态资源
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|js|css|woff2)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'assets-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30天
              }
            }
          },
          {
            // 匹配导航请求（HTML）
            urlPattern: /\/$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 // 1天
              }
            }
          }
        ]
      },
      manifest: {
        name: 'MoeKoe 萌音',
        short_name: 'MoeKoe',
        description: '一个高颜值的kugou第三方播放器',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/assets/images/logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/assets/images/logo.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/assets/images/logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  base: '',
  server: {
    host: true,
    port: 8080, // 将开发服务器端口设置为8080，确保与其他服务兼容
  },
  resolve: {
    alias: {
      '@': '/src', // 设置路径别名
    },
  }
});