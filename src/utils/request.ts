import axios, { AxiosResponse, AxiosRequestConfig, AxiosPromise } from 'axios'
import store from '@/store'
import qs from 'qs'
import { message } from 'ant-design-vue'
import {
  tokenName,
  contentType,
  messageDuration,
  requestTimeout
} from './setting'

const request = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || '', // url = base url + request url
  timeout: requestTimeout,
  headers: { 'Content-Type': contentType }
})

const err = (error: any): AxiosPromise => {
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

request.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
  if (store.getters['accessToken']) {
    // 请求头携带 token
    config.headers[tokenName] = store.getters['accessToken']
  }
  if (config.data && config.headers['Content-type'] === 'application/x-www-form-urlencoded;charset=UTF-8') {
    config.data = qs.stringify(config.data)
  }
  store.dispatch('showLoading', true)
  return config
}, err)

request.interceptors.response.use((response: AxiosResponse): AxiosResponse | AxiosPromise => {
  const res = response.data
  store.dispatch('showLoading', false)
  if (res.code != 20000) {
    message.error(res.message || 'Error')
    return Promise.reject(new Error(res.message || 'Error'))
  }
  return res
}, err)

export default request