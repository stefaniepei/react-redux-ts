import axios from '../axios'
import Storage from '../../utils/storage'

// 获取登录sign
export function getLoginSign(params: any) {
  return axios.post('/login/loginSign', params)
}

// 登录
export function userLogin(params: any) {
  return axios.post('/user/login', params, { 'withCredentials': true })
}

// 登录信息校验
export function checkLoginST(params: any) {
  return axios.post('/login/checkLoginST', params)
}

// 获取登出sign
export function getLogoutSign(params: any) {
  return axios.post('/sign/createSign', params, { headers: { 'Authorization': 'Bearer ' + Storage.getItem('userToken') } })
}
// 登出 sso
export function userLogout(params: any) {
  return axios.post('/user/logout', params, { 'withCredentials': true })
}

// 登出 token
export function userLogoutToken(params: any) {
  return axios.post('/login/logout', params, { headers: { 'Authorization': 'Bearer ' + Storage.getItem('userToken') } })
}
