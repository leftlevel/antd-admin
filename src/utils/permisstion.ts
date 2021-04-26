import router from '@/router'
import store from '@/store'

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