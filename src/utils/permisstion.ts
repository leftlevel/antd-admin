import router from '@/router'
import store from '@/store'
import getPageTitle from '@/utils/pageTitle'
import { loginInterception, routesWhiteList } from '@/utils/setting'

router.beforeEach(async (to, from, next) => {
  let hasToken = store.getters['accessToken']

  if (!loginInterception) {
    hasToken = true
  }

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    }
    if (store.getters['routes'].length === 0) {
      await store.dispatch('addRoutes').then(() => {
        next({ path: to.path })
      })
    } else {
      await store.dispatch('addRoutes')
      next()
    }
  } else {
    if (routesWhiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach((to) => {
  document.title = getPageTitle(to.meta.title as string)
})