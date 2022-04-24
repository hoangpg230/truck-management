import { combineReducers } from 'redux'
import truckReducer from './truck'

const rootReducer = combineReducers({
  truck: truckReducer,
})

export default rootReducer
