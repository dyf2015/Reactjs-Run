import Constants from '../constants/ActionTypes'

import objectAssign from 'object-assign'

const initialState = {
    // id: 0,
    applist:[],
    loding:false,
    value:"",
}
//init初始化值要和return值格式相同，否则assign后变成空了
export default function task(state = initialState, action) {
  // console.log("action:",action);
  // console.dir(state)
  // console.log(Constants.AUTH);
  switch (action.type) {
    case Constants.AUTH:
        return objectAssign({}, state, {
            // id: state.init.reduce((maxId,todo) => Math.max(todo.id, maxId),0)+1,
            applist:action.applist,
            loding:action.loding
        })
    case Constants.CHANGEVALUE:
        return objectAssign({}, state, {
            // id: state.init.reduce((maxId,todo) => Math.max(todo.id, maxId),0)+1,
            value:action.value
        })
    default:
      return state
  }
}