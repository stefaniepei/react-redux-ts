import * as React from 'react'

import { Observable, of, from, fromEvent, timer } from 'rxjs'
import { map, tap, startWith, switchMap, mapTo, scan, takeWhile, delay, switchMapTo, concatAll, count, withLatestFrom, share } from 'rxjs/operators'

import { create } from 'rxjs-spy'


import _debug from 'debug'
const debug = _debug('app:page:Login')

import './Login.scss'

interface Props {
  history: any
}

class Login extends React.PureComponent<Props, any> {
  constructor(props) {
    super(props)
    debug('Login')
  }
  componentDidMount() {
    const spy = create()

    spy.log('start')
    this.subscription(0)

    const requestOne = of('first').pipe(delay(500))
    const requestTwo = of('second').pipe(delay(800))
    const requestThree = of('third').pipe(delay(1100))
    const requestFour = of('fourth').pipe(delay(1400))
    const requestFive = of('fifth').pipe(delay(1700))

    const loadButton = this.refs['load'] as any

    // 模拟5个不同时长的请求
    const observables: Array<Observable<string>> = [
      requestOne,
      requestTwo,
      requestThree,
      requestFour,
      requestFive,
    ]
    const array$ = from(observables)
    const requests$ = array$.pipe(concatAll())
    const clicks$ = fromEvent(loadButton, 'click')

    const progress$ = clicks$.pipe(switchMapTo(requests$), share())

    const count$ = array$.pipe(count())

    const ratio$ = progress$.pipe(
      scan(current => current as any + 1, 0),
      withLatestFrom(count$, (current, count) => current / count),
    )

    clicks$.pipe(switchMapTo(ratio$)).subscribe(this.updateProgress)

    progress$.subscribe(this.displayData)

  }

  // 计数器开始
  takeUntilFunc = (endRange, currentNumber) => {
    return endRange > currentNumber ? val => val <= endRange : val => val >= endRange
  }

  positiveOrNegative = (endRange, currentNumber) => {
    return endRange > currentNumber ? 1 : -1
  }

  updateHTML = id => val => (this.refs[id] as any).innerHTML = val

  subscription = currentNumber => {
    const input = this.refs['range'] as any
    const btn = this.refs['update'] as any

    return fromEvent(btn, 'click').pipe(
      map(_ => parseInt(input.value)),
      switchMap(endRange => {
        return timer(0, 20).pipe(
          mapTo(this.positiveOrNegative(endRange, currentNumber)),
          startWith(currentNumber),
          scan((acc, curr) => acc + curr),
          takeWhile(this.takeUntilFunc(endRange, currentNumber)),
        )
      }),
      tap(v => (currentNumber = v)),
      startWith(currentNumber),
    ).subscribe(this.updateHTML('display'))
  }

  // 进度条
  // 请求完成后更新进度条
  updateProgress = (progressRatio) => {

    const progressBar = this.refs['progress'] as any
    console.log('Progress Ratio: ', progressRatio)
    progressBar.style.width = 100 * progressRatio + '%'
    if (progressRatio === 1) {
      progressBar.className += ' finished'
    } else {
      progressBar.className = progressBar.className.replace(' finished', '')
    }
  }
  // 通知更新的简单辅助函数
  updateContent = (newContent) => {
    const content = this.refs['data'] as any
    content.innerHTML += newContent
  }

  displayData = (data) => {
    this.updateContent(`<div class="content-item">${data}</div>`)
  }

  render() {

    return (
      <div className='admin-login'>
        <input ref='range' />
        <button ref='update'>Update</button>
        <div ref='display'></div>

        <div ref='progress'></div>
        <button ref='load'>Load Data</button>
        <div ref='data'></div>
      </div>
    )
  }
}


export default Login
