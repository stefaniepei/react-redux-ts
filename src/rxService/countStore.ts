import { BehaviorSubject } from 'rxjs'

export class Count {
  constructor(private count: number) {

  }

  getCount = () => (this.count)
}

const initCount = new Count(0)
export default class countStore {
  private store: BehaviorSubject<Count> = new BehaviorSubject(initCount)
  getCountObservable = () => (this.store)
  addCount = () => {
    const currentCount = this.store.getValue()
    const nextCount = new Count(currentCount.getCount() + 1)
    console.log(currentCount, nextCount)
    this.store.next(nextCount)
  }

  subCount = () => {
    const currentCount = this.store.getValue()
    const nextCount = new Count(currentCount.getCount() - 1)
    this.store.next(nextCount)
  }
}