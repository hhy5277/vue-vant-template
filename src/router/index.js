import Vue from 'vue'
import Router from 'vue-router'
import config from '@/config'

Vue.use(Router)

/* Router Modules */
import demoRouter from './modules/demo'

export const constantRoutes = [
  {
    path: '/',
    component: () => import('_v/home'),
    name: 'home',
    meta: {
      title: '主页',
      keepAlive: false
    }
  },
  // when your routing map is too long, you can split it into small modules.
  demoRouter
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = []

// add route path
constantRoutes.forEach(route => {
  route.path = route.path || '/' + (route.name || '')
})

const createRouter = () => new Router({
  mode: 'history', // require service support
  base: config.basePath, // 设置根路由
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
