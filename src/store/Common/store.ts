import CONSTANT from './constant'
import UtilsR from '../../utils/ramda'
// import * as objectAssign from 'object-assign'

let initialState = {
  count: 0,
}

export default function(state = initialState, action) {
  console.log(state, action)
  switch (action.type) {
    case CONSTANT.ADD:
      return UtilsR.evolve({ count: UtilsR.R.add(1) }, state)
    // return objectAssign({}, state, {
    //   count: state.count + 1,
    // })
    case CONSTANT.SUB:
      return UtilsR.evolve({ count: UtilsR.R.add(-1) }, state)
    default:
      return state
  }
}
