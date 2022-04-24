import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import rootEpic from './epics'
import rootReducer from './reducers'

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    get store() {
      return store
    },
  },
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(epicMiddleware))
)
epicMiddleware.run(rootEpic)

export default store
