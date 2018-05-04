import * as React from 'react'
import { interval } from 'rxjs'
import { take } from 'rxjs/operators'
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import UtilsR from '../../../utils/ramda'


import _debug from 'debug'
const debug = _debug('app:page:Index')

interface Props {
  history: any,
  actions: any,
  commonStore: any,
}

import { add, sub } from '../../../store/Common/actions'

@connect(
  // state => ({ commonStore: state.commonStore }),
  state => UtilsR.pick(['commonStore'], state),
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
    // let timer1 = interval(1000).pipe(take(10))
    // let timer2 = interval(2000).pipe(take(6))
    // let timer3 = interval(500).pipe(take(10))
    // let concurrent = 2 // the argument
    // let merged = Rx.Observable.merge(timer1, timer2, timer3, concurrent)
    // merged.subscribe(x => console.log(x))


  }
  render() {

    return (
      <div className='admin-login'>
        <div ref='drag'>
          <p><button style={{ width: '210px', height: '25px', margin: '5px' }}>{this.props.commonStore.count}</button></p>
          <button onClick={this.props.actions.add} style={{ width: '100px', height: '25px', margin: '5px' }}>加</button>
          <button onClick={this.props.actions.sub} style={{ width: '100px', height: '25px', margin: '5px' }}>减</button>
        </div>
      </div>
    )
  }
}
