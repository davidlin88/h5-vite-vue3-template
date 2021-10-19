import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import utils from '@/utils/index'
// import store from '@/store/index'

routes.push({
  path: '/',
  redirect: '/home',
})
const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    console.log(to.name, savedPosition)
    if (savedPosition) {
      return savedPosition
    } else {
      // if (to.meta.savedPosition) {
      //   // return { x: 0, y: to.meta.savedPosition }
      // }
      return { x: 0, y: 0 }
    }
  },
  routes,
})

router.beforeEach((to, from, next) => {
  // console.log(`${to.name}的keepAlive为${to.meta.keepAlive}`)
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    utils.setDocumentTitle(to.meta.title)
  } else {
    utils.setDocumentTitle(import.meta.env.VITE_APP_TITLE)
  }
  next()
})

export default router
