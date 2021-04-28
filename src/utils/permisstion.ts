import router from '@/router'
import store from '@/store'
import getPageTitle from '@/utils/pageTitle'

router.beforeEach(async (to, from, next) => {
  console.log(to.path)
  let accessRoutes =  []
  accessRoutes = await store.dispatch('setRoutes')
  accessRoutes.forEach((item: any) => {
    router.addRoute(item)
  })
  console.log(router.getRoutes())
  next()
})

router.afterEach((to) => {
  document.title = getPageTitle(to.meta.title as string)
})