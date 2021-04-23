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
    component: () => import('@/components/layout/index.vue'),
    children: [{
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: { title: '首页', icon: '', affix: true },
      redirect: '',
    }]
  },
  {
    path: '/blog',
    component: () => import('@/components/layout/index.vue'),
    redirect: '/blog/test',
    name: 'Blog',
    meta: { title: '博客', icon: ''},
    children: [
      {
        path: 'test',
        name: 'Test',
        component: () => import('@/views/test/index.vue'),
        meta: { title: 'test页面', icon: ''},
        redirect: ''
      },
      {
        path: 'test2',
        name: 'Test',
        component: () => import('@/views/test/index.vue'),
        meta: { title: 'test页面2', icon: ''},
        redirect: ''
      },
      {
        path: 'test3',
        name: 'Test',
        component: () => import('@/views/test/index.vue'),
        meta: { title: 'test页面3', icon: ''},
        redirect: ''
      }
    ]
  }
]

const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes
})

export default router

export { routes }