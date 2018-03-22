import CONSTANT from './constant'

export const userLogin = (data) => ({ type: CONSTANT.USER_LOGIN, data })

export const userLoginOut = () => ({ type: CONSTANT.USER_LOGIN_OUT })