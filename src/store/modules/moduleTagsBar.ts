interface TagesBarState {
  visitedRoutes: Array<{ fullPath?: string }>
}

export default {
  namespace: true,
  
  state: {
    visitedRoutes: []
  } as TagesBarState,

  getters: {
    visitedRoutes: (state: TagesBarState) => state.visitedRoutes
  },

  mutations: {
    /**
     * @description: 添加标签页
     * @param {TagesBarState} state
     * @param {any} route
     * @return {*}
     */
    addVisitedRoute(state: TagesBarState, route: any) {
      let target = state.visitedRoutes.find((item: any) => item.path === route.path)
      if (target) {
        if (route.fullPath !== target.fullPath) {
          Object.assign(target, route)
        }
        return
      }
      state.visitedRoutes.push(Object.assign({}, route))
    },
    /**
     * @description: 删除当前标签页
     * @param {TagesBarState} state
     * @param {any} route
     * @return {*}
     */
    delVisitedRoute(state: TagesBarState, route: any) {
      state.visitedRoutes.forEach((item: any, index: number) => {
        if (item.path === route.path) state.visitedRoutes.splice(index, 1)
      })
    },
    /**
     * @description: 删除当前标签以外其它全部多标签页
     * @param {TagesBarState} state
     * @param {any} route
     * @return {*}
     */
    delOthersVisitedRoutes(state: TagesBarState, route: any) {
      state.visitedRoutes = state.visitedRoutes.filter((item: any) => item.meta.affix || item.path === route.path)
    },
    /**
     * @description: 删除当前标签页左边全部多标签页
     * @param {TagesBarState} state
     * @param {any} route
     * @return {*}
     */
    delLeftVisitedRoutes(state: TagesBarState, route: any) {
      let index: number = state.visitedRoutes.length
      state.visitedRoutes = state.visitedRoutes.filter((item: any) => {
        if (item.name === route.name) {
          index = state.visitedRoutes.indexOf(item)
        }
        return item.meta.affix || index <= state.visitedRoutes.indexOf(item)
      })
    },
    /**
     * @description: 删除当前标签页右边全部多标签页
     * @param {TagesBarState} state
     * @param {any} route
     * @return {*}
     */
    delRightVisitedRoutes(state: TagesBarState, route: any) {
      let index: number = state.visitedRoutes.length
      state.visitedRoutes = state.visitedRoutes.filter((item: any) => {
        if (item.name === route.name) {
          index = state.visitedRoutes.indexOf(item)
        }
        return item.meta.affix || index >= state.visitedRoutes.indexOf(item)
      })
    },
    /**
     * @description: 删除全部多标签页
     * @param {TagesBarState} state
     * @return {*}
     */
    delAllVisitedRoutes(state: TagesBarState) {
      state.visitedRoutes = state.visitedRoutes.filter((item: any) => item.meta.affix)
    }
  },

  actions: {
    /**
     * @description: 添加标签页
     * @param {any} { commit }
     * @param {any} route
     * @return {*}
     */
    addVisitedRoute({ commit }: any, route: any) {
      commit('addVisitedRoute', route)
    },
    /**
     * @description: 删除当前标签页
     * @param {any} { commit }
     * @param {any} route
     * @return {*}
     */
    delVisitedRoute({ commit }: any, route: any) {
      commit('delVisitedRoute', route)
    },
    /**
     * @description: 删除当前标签以外其它全部多标签页
     * @param {any} { commit }
     * @param {any} route
     * @return {*}
     */
    delOthersVisitedRoutes({ commit }: any, route: any) {
      commit('delOthersVisitedRoutes', route)
    },
    /**
     * @description: 删除当前标签页左部全部多标签页
     * @param {any} { commit }
     * @param {any} route
     * @return {*}
     */
    delLeftVisitedRoutes({ commit }: any, route: any) {
      commit('delLeftVisitedRoutes', route)
    },
    /**
     * @description: 删除当前标签页右边全部多标签页
     * @param {any} { commit }
     * @param {any} route
     * @return {*}
     */
    delRightVisitedRoutes({ commit }: any, route: any) {
      commit('delRightVisitedRoutes', route)
    },
    /**
     * @description: 删除全部多标签页
     * @param {any} { commit }
     * @return {*}
     */
    delAllVisitedRoutes({ commit }: any) {
      commit('delAllVisitedRoutes')
    }
  }
}