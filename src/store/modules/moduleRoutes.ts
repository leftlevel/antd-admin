import { filterRoutes } from '@/utils/routes'
import { constantRoutes, asyncRoutes } from '@/router'

export default {
  namespace: true,
  
  state: {
    routes: JSON.parse(sessionStorage.getItem('routes') as string)
  },

  getters: {
    routes: (state: any) => state.routes
  },

  mutations: {
    setRoutes(state: any, routes: any) {
      state.routes = routes
    }
  },

  actions: {
    async setRoutes({ commit }: any) {
      const finallyRoutes = filterRoutes([...constantRoutes, ...asyncRoutes])
      commit('setRoutes', finallyRoutes)
      sessionStorage.setItem('routes', JSON.stringify(finallyRoutes))
      return [...asyncRoutes]
    },
  }
}