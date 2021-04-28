import { storage, tokenTableName } from '@/utils/setting'
const cookie = require('js-cookie')

/**
 * @description: 获取 accessToken
 * @param {string} accessToken
 * @return {*}
 */
export function getAccessToken() {
  if (storage) {
    if (storage === 'localStorage') {
      return localStorage.getItem(tokenTableName)
    } else if (storage === 'sessionStorage') {
      return sessionStorage.getItem(tokenTableName)
    } else if (storage === 'cookie') {
      return cookie.get(tokenTableName)
    } else {
      return localStorage.getItem(tokenTableName)
    }
  } else {
    return localStorage.getItem(tokenTableName)
  }
}
/**
 * @description: 存储 accessToken
 * @param {string} accessToken
 * @return {*}
 */
export function setAccessToken(accessToken: string) {
  if (storage) {
    if (storage === 'localStorage') {
      return localStorage.setItem(tokenTableName, accessToken)
    } else if (storage === 'sessionStorage') {
      return sessionStorage.setItem(tokenTableName, accessToken)
    } else if (storage === 'cookie') {
      return cookie.set(tokenTableName, accessToken)
    } else {
      return localStorage.setItem(tokenTableName, accessToken)
    }
  } else {
    return localStorage.setItem(tokenTableName, accessToken)
  }
}
/** 
 * @description: 移除 accessToken
 * @param {*}
 * @return {*}
 */
export function removeAccessToken() {
  if (storage) {
    if (storage === 'localStorage') {
      return localStorage.removeItem(tokenTableName)
    } else if (storage === 'sessionStorage') {
      return sessionStorage.clear()
    } else if (storage === 'cookie') {
      return cookie.remove(tokenTableName)
    } else {
      return localStorage.removeItem(tokenTableName)
    }
  } else {
    return localStorage.removeItem(tokenTableName)
  }
}