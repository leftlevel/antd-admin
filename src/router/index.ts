import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router'

export const constantRoutes: Array<any> = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue'),
    hidden: true
  }
]

export const asyncRoutes: Array<any> = [
  {
    path: '/',
    component: () => import('@/components/layout/index.vue'),
    redirect: '/dashboard',
    meta: {
      title: '首页',
      icon: 'home-4-line',
      affix: true
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: { title: '首页', icon: 'home-4-line', affix: true },
      }
    ]
  },
  {
    path: '/webComponent',
    component: () => import('@/components/layout/index.vue'),
    redirect: '/webComponent/table',
    alwaysShow: true,
    meta: { title: '组件', icon: 'apps-line'},
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/webComponent/table/index.vue'),
        meta: { title: '表格', icon: 'table-2'},
      },
      {
        path: 'icon',
        name: 'Icon',
        component: () => import('@/views/webComponent/icon/index.vue'),
        meta: { title: '图标', icon: 'remixicon-line'},
      },
      {
        path: 'map',
        name: 'Map',
        component: () => import('@/views/webComponent/map/index.vue'),
        meta: { title: '高德地图', icon: 'map-pin-line'},
      }
    ]
  },
  {
    path: '/error',
    component: () => import('@/components/layout/index.vue'),
    redirect: '/error/404',
    alwaysShow: true,
    meta: { title: '错误页', icon: 'bug-line'},
    children: [
      {
        path: '404',
        name: 'Error404',
        component: () => import('@/views/404.vue'),
        meta: { title: '404', icon: 'pages-line'},
      },
    ]
  },
  {
    path: '/*',
    redirect: '/404',
    hidden: true,
  }
]

const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router