import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    component: () => import('@/components/layout/index.vue'),
    redirect: '/dashboard',
    children: [{
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: { title: '首页', icon: '', affix: true },
    }]
  },
  {
    path: '/blog',
    component: () => import('@/components/layout/index.vue'),
    name: 'Blog',
    meta: { title: '博客', icon: ''},
    redirect: '/blog/test',
    children: [
      {
        path: 'test',
        name: 'Test',
        component: () => import('@/views/test/index.vue'),
        meta: { title: 'test页面', icon: ''},
      }
    ]
  },
  {
    path: '/main',
    component: () => import('@/components/layout/index.vue'),
    name: 'Main',
    meta: { title: 'main主页', icon: ''},
    redirect: '/main/test2',
    children: [
      {
        path: 'test2',
        name: 'Test2',
        component: () => import('@/views/test2/index.vue'),
        meta: { title: 'main的test2页面', icon: ''},
      },
    ]
  }
]

const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes
})

export default router