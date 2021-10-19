import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default ({ command }) => {
  return defineConfig({
    base: command === 'serve' ? '/' : 'https://img.cdn.dwhub.com.cn/mall/dist/',
    server: {
      proxy: {
        '/proxy_api': {
          // target: 'http://192.168.2.18:9098/okpay/api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/proxy_api/, ''),
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
        importMode(path) {
          return path.includes('search') ? 'sync' : 'async'
        },
        pagesDir: './src/pages',
      }),
      Components({
        resolvers: [VantResolver()],
      }),
      styleImport({
        libs: [
          {
            libraryName: 'vant',
            esModule: true,
            resolveStyle: (name) => {
              return `vant/es/${name}/style`
            },
          },
        ],
      }),
    ],
    css: {
      postcss: {
        plugins: [
          require('postcss-px2vp')({
            unitToConvert: 'px',
            viewportWidth: 750,
            unitPrecision: 3,
            propList: ['*'],
            viewportUnit: 'vw',
            fontViewportUnit: 'vw',
            selectorBlackList: ['ignore-'],
            minPixelValue: 1,
            mediaQuery: false,
            replace: true,
            exclude: [],
            landscape: true,
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
