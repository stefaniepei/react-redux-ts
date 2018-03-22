import CONSTANT from './constant'
import Storage from '../../utils/storage'

let initialState = Storage.getItemJsonZlib('logingUserInfo') || {}
// console.log(initialState)

export default function userInfo(state = initialState, action) {
  // console.log(action.type)
  switch (action.type) {
    case CONSTANT.USER_LOGIN:
      Storage.setItemJsonZlib('logingUserInfo', action.data)
      return Object.assign({}, state, action.data)
    case CONSTANT.USER_LOGIN_OUT:
      Storage.removeItem('logingUserInfo')
      return {}
    default:
      // console.log(state)
      return state
  }
}
