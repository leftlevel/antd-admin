import { login, logout } from '@/api/user'
import { getAccessToken, removeAccessToken, setAccessToken } from '@/utils/accessToken'
import { title, tokenName } from '@/utils/setting'
import { message, notification } from 'ant-design-vue'

interface UserState {
  accessToken: string,
  avatar: string,
  username: string
}

export default {
  namespace: true,
  
  state: {
    accessToken: getAccessToken(),
    avatar: require('@/assets/avatar/admin.gif'),
    username: ''
  } as UserState,

  getters: {
    accessToken: (state: UserState) => state.accessToken,
    avatar: (state: UserState) => state.avatar,
    username: (state: UserState) => state.username
  },

  mutations: {
    /**
     * @description: 设置头像
     * @param {UserState} state
     * @param {string} avatar
     * @return {*}
     */
    setAvatar(state: UserState, avatar: string): void {
      state.avatar = avatar
    },
    /**
     * @description: 设置用户名
     * @param {UserState} state
     * @param {string} username
     * @return {*}
     */
    setUsername(state: UserState, username: string): void {
      state.username = username
    },
    /**
     * @description: 设置 accessToken
     * @param {UserState} state
     * @param {string} accessToken
     * @return {*}
     */
    setAccessToken(state: UserState, accessToken: string) {
      state.accessToken = accessToken
      setAccessToken(accessToken)
    }
  },

  actions: {
    /**
     * @description: 登录
     * @param {any} { commit }
     * @param {any} userInfo
     * @return {*}
     */
    async login({ commit }: any, userInfo: any) {
      const { data } = await login(userInfo)
      const accessToken = data[tokenName]
      if (accessToken) {
        commit('setAccessToken', accessToken)
        const hour = new Date().getHours()
        const thisTime = 
          hour < 8
            ? '早上好'
            : hour <= 11
            ? '上午好'
            : hour <= 13
            ? '中午好'
            : hour < 18
            ? '下午好'
            : '晚上好'
        notification.open({
          message: `欢迎登录 ${title}`,
          description: `${thisTime}！`,
        })
      } else {
        message.error(`登录接口异常，未正确返回${tokenName}...`)
      }
    },
    /**
     * @description: 退出登录
     * @param {any} { dispatch }
     * @return {*}
     */
    async logout({ dispatch }: any) {
      await logout()
      await dispatch('resetAll')
    },
    /**
     * @description: 重置 token
     * @param {any} { dispatch }
     * @return {*}
     */
    async resetAll({ dispatch }: any) {
      await dispatch('setAccessToken', '')
      removeAccessToken()
    },
    /**
     * @description: 设置 token
     * @param {any} { commit }
     * @param {string} accessToken
     * @return {*}
     */
    setAccessToken({ commit }: any, accessToken: string) {
      commit('setAccessToken', accessToken)
    }
  }
}