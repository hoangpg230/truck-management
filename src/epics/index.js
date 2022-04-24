import { combineEpics } from 'redux-observable'
import truckEpics from './truckEpic'

const rootEpic = combineEpics(...truckEpics)

export default rootEpic
