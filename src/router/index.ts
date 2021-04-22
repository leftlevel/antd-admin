import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/components/layout/index.vue')
  }
]

const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes
})

export default router

export { routes }