import * as React from 'react'
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'

import _debug from 'debug'
const debug = _debug('app:page:Index')

interface Props {
  history: any,
  actions: any,
  commonStore: any,
}

import { add, sub } from '../../../store/Common/actions'

@connect(
  state => ({ commonStore: state.commonStore }),
  dispatch => ({ actions: bindActionCreators({ add, sub }, dispatch) }),
)
export default class Index extends React.PureComponent<Props, any> {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
  }
  componentDidMount() {
    debug('Index', this.props, this.state)
  }
  render() {

    return (
      <div className='admin-login'>
        <p><button style={{ width: '210px', height: '25px', margin: '5px' }}>{this.props.commonStore.count}</button></p>
        <button onClick={this.props.actions.add} style={{ width: '100px', height: '25px', margin: '5px' }}>加</button>
        <button onClick={this.props.actions.sub} style={{ width: '100px', height: '25px', margin: '5px' }}>减</button>
      </div>
    )
  }
}
