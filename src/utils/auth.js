import { encode, decode } from 'js-base64'

import { localStorageConfig } from '@/settings'
export function getToken() {
  return sessionStorage.getItem(localStorageConfig.tokenKey)
}

export function setToken(token) {
  return sessionStorage.setItem(localStorageConfig.tokenKey, token)
}

export function removeToken() {
  return sessionStorage.removeItem(localStorageConfig.tokenKey)
}
/**
 * 获取本地用户信息
 * @returns {obejct} 用户信息
 */
export function getUserInfo() {
  // const info = Cookies.get(localStorageConfig.infoKey)
  const info = sessionStorage.getItem(localStorageConfig.infoKey)
  return info ? JSON.parse(decode(info)) : {}
}

export function setUserInfo(userInfo) {
  return sessionStorage.setItem(localStorageConfig.infoKey, encode(JSON.stringify(userInfo)))
}

export function removeUserInfo() {
  return sessionStorage.removeItem(localStorageConfig.infoKey)
}
