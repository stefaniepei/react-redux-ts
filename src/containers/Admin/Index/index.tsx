import * as React from 'react'
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import UtilsR from '../../../utils/ramda'

import { Observable, of, from, fromEvent, timer, Subject, Subscription } from 'rxjs'
import { map, tap, startWith, switchMap, mapTo, scan, takeWhile, delay, switchMapTo, concatAll, count, withLatestFrom, share, pluck } from 'rxjs/operators'
import CountStore from '../../../rxService/countStore'

import _debug from 'debug'
const debug = _debug('app:page:Index')


interface IProps {
  history: any,
  actions: any,
  commonStore: any,
}

interface IState {
  count: number,
}

import { add, sub } from '../../../store/Common/actions'

@connect(
  // state => ({ commonStore: state.commonStore }),
  state => UtilsR.pick(['commonStore'], state),
  dispatch => ({ actions: bindActionCreators({ add, sub }, dispatch) }),
)
export default class Index extends React.PureComponent<IProps, IState> {
  private countStore = new CountStore()
  private countObservable$ = this.countStore.getCountObservable()

  constructor(props: IProps) {
    super(props)
    this.state = {
      count: 0,
    }
    this.subscribeState()
  }

  setState(newState: IState) {
    super.setState(newState)
  }

  subscribeState = () => {
    this.countObservable$.subscribe(
      state => {
        this.setState({ count: state.getCount() })
      },
      err => console.log(err),
      () => console.log('complete'),
    )
  }


  componentWillMount() {
    // CountService.init()
  }

  componentDidMount() {
    debug('Index', this.props, this.state)

    // CountService.subscription(v => this.setState({ count: v }))

  }

  componentWillUnmount() {
    // CountService.unsubscribe()
  }

  render() {

    const addHandle = () => {
      // CountService.addRx()
      this.countStore.addCount()
    }
    const subHandle = () => {
      // CountService.subRx()
      this.countStore.subCount()
    }

    return (
      <div className='admin-login'>
        <div ref='drag'>
          <p><button style={{ width: '210px', height: '25px', margin: '5px' }}>{this.props.commonStore.count}</button></p>
          <button onClick={this.props.actions.add} style={{ width: '100px', height: '25px', margin: '5px' }}>加</button>
          <button onClick={this.props.actions.sub} style={{ width: '100px', height: '25px', margin: '5px' }}>减</button>
        </div>

        <div>
          <p><button style={{ width: '210px', height: '25px', margin: '5px' }}>{this.countObservable$.getValue().getCount()}</button></p>
          <button onClick={addHandle} style={{ width: '100px', height: '25px', margin: '5px' }}>加</button>
          <button onClick={subHandle} style={{ width: '100px', height: '25px', margin: '5px' }}>减</button>
        </div>
      </div>
    )
  }
}
