import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from '@/store/index'
import { Toast, ConfigProvider } from 'vant'
import * as filters from '@/utils/filters'
import '@/styles/index.scss'

const app = createApp(App)

app.config.globalProperties.$filters = {}
Object.keys(filters).forEach(item => {
  app.config.globalProperties.$filters[item] = filters[item]
})

app.use(router).use(store).use(Toast).use(ConfigProvider).mount('#app')
