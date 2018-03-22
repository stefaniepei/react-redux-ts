import * as React from 'react'

// 公用部分css
import 'antd/dist/antd.min.css'
import '../assets/styles/core.scss'
// home组件里面的一些路由
import IndexRouters from '../containers/Admin/router'

// 统一路由方法
import Routers from '../routers/routers'

class App extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props)
  }

  render() {
    const routes = [...IndexRouters]
    return (
      <Routers routes={routes} history={this.props.history}>
      </Routers>
    )
  }
}

export default App
