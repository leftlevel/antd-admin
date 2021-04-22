export default {
  namespace: true,
  
  state: {
    collapse: false,
  },

  getters: {

  },

  mutations: {
    toggleCollapse(state: any, data: boolean) {
      state.collapse = data
    }
  },

  actions: {

  }
}