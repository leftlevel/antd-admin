export default {
  namespace: true,
  
  state: {
    collapse: false,
    device: 'desktop',
    thisTime: ''
  },

  getters: {
    device: (state: any) => state.device,
    thisTime: (state: any) => {
      const hour = new Date().getHours()
      state.thisTime =
        hour < 8
          ? '早上好'
          : hour <= 11
          ? '上午好'
          : hour <= 13
          ? '中午好'
          : hour < 18
          ? '下午好'
          : '晚上好'
      return state.thisTime
    }
  },

  mutations: {
    toggleCollapse(state: any, data: boolean): void {
      state.collapse = data
    },

    toggleDevice(state: any, data: string): void {
      state.device = data
    }
  },

  actions: {
    toggleDevice({ commit }: any, data: string): void {
      commit('toggleDevice', data)
    }
  }
}