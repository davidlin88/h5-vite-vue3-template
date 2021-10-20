import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import utils from '@/utils/index'

routes.push({
  path: '/',
  redirect: '/home',
})
const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes,
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    utils.setDocumentTitle(to.meta.title)
  } else {
    utils.setDocumentTitle(import.meta.env.VITE_APP_TITLE)
  }
  next()
})

export default router
