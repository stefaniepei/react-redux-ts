import * as React from 'react'
import axios from 'axios'
import createBrowserHistory from 'history/createBrowserHistory'
import _debug from 'debug'
import { message, Modal } from 'antd'
import { UNAUTHORIZED, TIMEOUT, NEW_API_SUCESS, API_SUCESS } from '../utils/constant'
import Configs from '../common/Configs'
import ErrorMsg from '../utils/errorCode'
import Utils from '../utils'

const debug = _debug('promise:Axios')
const history = createBrowserHistory()

axios.defaults.timeout = TIMEOUT //tslint:disable-line

axios.defaults.baseURL = Configs.DEFAULT.SERVER

axios.defaults.headers.get['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'

//request to show loading
axios.interceptors.request.use((config) => {
  debug('[AxiosRequest]', config)
  const apiType = config.data && config.data.apiType ? config.data.apiType : ''
  switch (apiType) {
    case 'sso':
      config.baseURL = Configs.DEFAULT.SSO_SERVER
      break
    case 'token':
      config.baseURL = Configs.DEFAULT.TOKEN_SERVER
      break
    default:
      break
  }
  delete config.data.apiType
  return config
}, (error) => {

  return Promise.reject(error)
})

//response to hide loading
axios.interceptors.response.use((response) => {
  debug('[AxiosResponse]', response)
  if (typeof response.data === 'string') {
    return response.data
  }
  let code = response.data && response.data.code ? response.data.code : 0
  let msg = ErrorMsg(response.data)

  if (code === UNAUTHORIZED) {
    Utils.logOutClearStorage()
    const params = {
      iconType: 'info-circle',
      zIndex: 9999,
      content: <div>
        <p>警告</p>
        <p className='error'>{response.data.message || '请重新登录'}</p>
      </div>,
      okText: '确定',
      onOk: () => {
        history.replace('/login')
        location.reload()
      },
    }
    Modal.warning(params)
  } else if (code === API_SUCESS || code === NEW_API_SUCESS) {
    debug('[API_SUCESS]')
    return response.data
  } else {
    debug('[API_FAILED]', code, msg)
    response.data.errorMsg = msg
    return response.data
  }
}, (error) => {
  debug('[AxiosError]', error, error.response)
  let code = error.response && error.response.status ? error.response.status : 500
  let msg = ErrorMsg(error.response)
  message.error(msg)
  if (code === UNAUTHORIZED) {
    Utils.logOutClearStorage()
    history.replace('/login')
    location.reload()
  }
})

// debug(axios.defaults)
export default axios
