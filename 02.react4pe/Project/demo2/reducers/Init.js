import Constants from '../constants/ActionTypes'

import objectAssign from 'object-assign'

const initialState = {
    // id: 0,
    msgsArr:[],
    msgsBtn:false,

}
//init初始化值要和return值格式相同，否则assign后变成空了


export default function task(state = initialState, action) {
  switch (action.type) {
    case Constants.INIT:
        return objectAssign({}, state, {
            // id: state.init.reduce((maxId,todo) => Math.max(todo.id, maxId),0)+1,
            msgsArr:action.msgsArr,
            msgsBtn:action.msgsBtn
        })

    default:
      return state
  }
}