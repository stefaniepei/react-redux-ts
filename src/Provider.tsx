/* eslint-disable no-unused-vars */
import * as React from 'react'
import * as zhCN from 'antd/lib/locale-provider/zh_CN'
import { LocaleProvider } from 'antd'
import Provider from 'react-redux/es/components/Provider'
// import * as Provider from 'react-redux/es/components/Provider'
import createBrowserHistory from 'history/createBrowserHistory'
import App from './containers/App'
import configureStore from './store/createStore'

import './utils/flexible'
// const FastClick = require('fastclick')
// FastClick.attach(document.body)

const history = createBrowserHistory()
const store = configureStore()
// console.log(store)
export default function Provider() {
  return (
    <Provider store={store}>
      <LocaleProvider locale={zhCN as any}>
        <App history={history} />
      </LocaleProvider>
    </Provider>
  )
}
