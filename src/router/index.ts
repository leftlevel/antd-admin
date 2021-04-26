import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router'

export const constantRoutes: Array<any> = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
  }
]

export const asyncRoutes = [
  {
    path: '/',
    component: () => import('@/components/layout/index.vue'),
    redirect: '/dashboard',
    meta: {
      title: '首页',
      icon: '',
      affix: true
    },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: { title: '首页', icon: '', affix: true },
      }
    ]
  },
  {
    path: '/blog',
    component: () => import('@/components/layout/index.vue'),
    redirect: '/blog/test',
    alwaysShow: true,
    meta: { title: '博客', icon: ''},
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
    redirect: '/main/test2',
    alwaysShow: true,
    meta: { title: 'main主页', icon: ''},
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
  routes: constantRoutes
})

export default router