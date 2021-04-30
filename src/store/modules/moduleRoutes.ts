import { filterRoutes } from '@/utils/routes'
import { constantRoutes, asyncRoutes } from '@/router'
import router from "@/router"

interface RouteState {
  routes?: Array<Object>,
}

export default {
  namespace: true,

  state: {
    // routes: JSON.parse(sessionStorage.getItem('routes') as string)
    routes: [],
  } as RouteState,

  getters: {
    routes: (state: RouteState) => state.routes
  },

  mutations: {
    /**
     * @description: 设置路由
     * @param {RouteState} state
     * @param {any} routes
     * @return {*}
     */
    setRoutes(state: RouteState, routes: any) {
      state.routes = routes
    }
  },

  actions: {
    /**
     * @description: 设置路由
     * @param {any} { commit }
     * @return {*}
     */
    async setRoutes({ commit }: any) {
      const finallyRoutes = filterRoutes([...constantRoutes, ...asyncRoutes])
      commit('setRoutes', finallyRoutes)
      // sessionStorage.setItem('routes', JSON.stringify(finallyRoutes))
      return [...asyncRoutes]
    },

    /**
     * @description: 添加路由
     * @param {any} { dispatch }
     * @return {*}
     */
    async addRoutes({ dispatch }: any) {
      let accessRoutes = []
      accessRoutes = await dispatch('setRoutes')
      accessRoutes.forEach((item: any) => {
        router.addRoute(item)
      })
    }
  }
}