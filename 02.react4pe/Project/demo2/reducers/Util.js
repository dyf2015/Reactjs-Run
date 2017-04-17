import Constants from '../constants/ActionTypes'

import objectAssign from 'object-assign'

const initialState = {
    loading: false
}

export default function task(state = initialState, action) {
  switch (action.type) {
    case Constants.RLOADING:
      return objectAssign({}, state, {
        loading: true
      })
    case Constants.RLOADED:
      return objectAssign({}, state, {
        loading: false
      })
    default:
      return state
  }
}