interface SettingState {
  collapse: boolean,
  device: string,
  loading: boolean
}

export default {
  namespace: true,
  
  state: {
    collapse: false,
    device: 'desktop',
    loading: false
  } as SettingState,

  getters: {
    device: (state: SettingState) => state.device,
  },

  mutations: {
    /**
     * @description: 显示/隐藏菜单
     * @param {SettingState} state
     * @param {boolean} data
     * @return {*}
     */
    toggleCollapse(state: SettingState, data: boolean): void {
      state.collapse = data
    },
    /**
     * @description: 切换设备
     * @param {SettingState} state
     * @param {string} data
     * @return {*}
     */
    toggleDevice(state: SettingState, data: string): void {
      state.device = data
    },
    /**
     * @description: 是否开启加载中组件
     * @param {SettingState} state
     * @param {boolean} load
     * @return {*}
     */
    showLoading(state: SettingState, load: boolean): void {
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