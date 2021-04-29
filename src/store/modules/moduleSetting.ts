export default {
  namespace: true,
  
  state: {
    collapse: false,
    device: 'desktop',
    loading: false
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
    },
    /**
     * @description: 是否开启加载中组件
     * @param {any} state
     * @param {boolean} load
     * @return {*}
     */
    showLoading(state: any, load: boolean): void {
      state.loading = load
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
    },
    /**
     * @description: 是否开启加载中组件
     * @param {any} param1
     * @param {boolean} load
     * @return {*}
     */
    showLoading({ commit }: any, load: boolean): void {
      commit('showLoading', load)
    }
  }
}