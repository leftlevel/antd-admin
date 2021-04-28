export default {
  namespace: true,
  
  state: {
    collapse: false,
    device: 'desktop',
  },

  getters: {
    device: (state: any) => state.device,
  },

  mutations: {
    /**
     * @description: 显示/隐藏菜单
     * @param {any} state
     * @param {boolean} data
     * @return {*}
     */
    toggleCollapse(state: any, data: boolean): void {
      state.collapse = data
    },
    /**
     * @description: 切换设备
     * @param {any} state
     * @param {string} data
     * @return {*}
     */
    toggleDevice(state: any, data: string): void {
      state.device = data
    }
  },

  actions: {
    /**
     * @description: 显示/隐藏菜单
     * @param {any} { commit }
     * @param {string} data
     * @return {*}
     */
    toggleDevice({ commit }: any, data: string): void {
      commit('toggleDevice', data)
    }
  }
}