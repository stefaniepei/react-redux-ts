import CONSTANT from './constant'
import * as objectAssign from 'object-assign'

let initialState = {
  count: 0,
}

export default function(state = initialState, action) {
  console.log(state, action)
  switch (action.type) {
    case CONSTANT.ADD:
      return objectAssign({}, state, {
        count: state.count + 1,
      })
    case CONSTANT.SUB:
      return objectAssign({}, state, {
        count: state.count - 1,
      })
    default:
      return objectAssign({}, state, {
        count: state.count,
      })
  }
}
