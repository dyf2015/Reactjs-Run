import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
//import createLogger from 'redux-logger'
//import rootReducer1 from '../reducers'

export default function configureStore(rootReducer,preloadedState) {

  const store = createStore(
    rootReducer,
    preloadedState,
    // applyMiddleware(thunkMiddleware, createLogger())
    applyMiddleware(thunkMiddleware)
  )
  //window.store = store;

  // if (module.hot) {
  //   module.hot.accept('../reducers', () => {
  //     const nextReducer = require('../reducers').default
  //     store.replaceReducer(nextReducer)
  //   })
  // }

  return store
}
