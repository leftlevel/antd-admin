export default {
  namespace: true,
  
  state: {
    avatar: require('@/assets/avatar/admin.gif')
  },

  getters: {
    avatar: (state: any) => state.avatar
  },

  mutations: {
    /**
     * @description: 设置头像
     * @param {any} state
     * @param {string} avatar
     * @return {*}
     */
    setAvatar(state: any, avatar: string): void {
      state.avatar = avatar
    }
  },

  actions: {
    
  }
}