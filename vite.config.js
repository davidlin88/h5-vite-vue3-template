import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import Pages from 'vite-plugin-pages'
import px2vp from 'postcss-px2vp'

// https://vitejs.dev/config/
export default ({ command }) => {
  return defineConfig({
    // 用于cdn静态部署，
    // base: command === 'serve' ? '/' : 'https://cdn.example.com/dist/',
    server: {
      proxy: {
        '/proxy_api': {
          target: 'http://example.com:8080/api',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/proxy_api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      vue(),
      Pages({
        // 可自定义路由组件是否懒加载
        importMode(path) {
          return path.includes('immediate') ? 'sync' : 'async'
        },
        pagesDir: './src/pages',
      }),
      Components({
        // 按需载入UI插件的组件
        resolvers: [VantResolver()],
      }),
      // 按需载入UI插件的样式
      styleImport({
        libs: [
          {
            libraryName: 'vant',
            esModule: true,
            resolveStyle: name => {
              return `vant/es/${name}/style`
            },
          },
        ],
      }),
    ],
    css: {
      postcss: {
        plugins: [
          px2vp({
            viewportWidth(rule) {
              const file = rule.source && rule.source?.input.file
              // 根据文件名动态配置viewport width
              if (file && file?.includes('vant')) return 375
              return 750
            },
            unitToConvert: 'px',
            unitPrecision: 3,
            propList: ['*'],
            viewportUnit: 'vw',
            fontViewportUnit: 'vw',
            selectorBlackList: ['ignore-'],
            minPixelValue: 1,
            mediaQuery: false,
            replace: true,
            exclude: [],
            landscape: false,
            landscapeUnit: 'vw',
            landscapeWidth: 750,
          }),
        ],
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/vars.scss";@import "./src/styles/mixins.scss";`,
        },
      },
    },
  })
}
