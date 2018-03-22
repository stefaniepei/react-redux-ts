import * as React from 'react'

import _debug from 'debug'

const debug = _debug('app:page:Login')

import './Login.scss'

interface Props {
  history: any
}

class Login extends React.Component<Props, any> {
  constructor(props) {
    super(props)
    debug('Login')
  }
  componentDidMount() {

  }
  render() {

    return (
      <div className='admin-login'>
        登录
      </div>
    )
  }
}


export default Login
