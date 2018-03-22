import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux/lib/reducer'
import reducers from './reducers'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const middlewares: any = [thunk]

export default function configureStore() {
  const store = createStore(
    combineReducers({ routing: routerReducer, ...reducers }),
    composeWithDevTools(applyMiddleware(...middlewares)),
  )
  return store
}