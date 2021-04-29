import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import store from '@/store'
import { message } from 'ant-design-vue'
import { tokenName } from './setting'

const request = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || '', // url = base url + request url
  timeout: 60 * 1000,
  withCredentials: true
})

const err = (error: any) => {
  if (error.message.includes('timeout')) {
    message.error('请求超时，请刷新页面重试')
  }
  if (error.response) {
    const data = error.response.data
    const token: string = ''
    if (error.response.status === 403) {
      message.error('Forbidden')
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      message.error('Unauthorized')
      if (token) {

      }
    }
  }
  return Promise.reject(error)
}

request.interceptors.request.use((config: AxiosRequestConfig) => {
  if (store.getters['user/accessToken']) {
    config.headers[tokenName] = store.getters['accessToken']
  }
  return config
}, err)

request.interceptors.response.use((response: AxiosResponse) => {
  const res = response.data
  if (res.code != 20000) {
    message.error(res.message || 'Error')
  }
  if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    return Promise.reject(new Error(res.message || 'Error'))
  } else {
    return res
  }
}, err)

export default request