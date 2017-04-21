import Constants from '../constants/ActionTypes'

import objectAssign from 'object-assign'

const initialState = {
    partapp:[],
    count:0,
    appinfo:{},
    params:{},
    appMenuKey: '1'
}
//init初始化值要和return值格式相同，否则assign后变成空了
export default function task(state = initialState, action) {
  // console.log("action:",action);
  switch (action.type) {
  	case Constants.SET_APP_MENU_KEY:
  	 	return objectAssign({}, state, {
            appMenuKey:action.data,
        })
    case Constants.GETPARTAPP:
        return objectAssign({}, state, {
            partapp:action.partapp,
        })
    case Constants.GETCOUNT:
        return objectAssign({}, state, {
            count:action.count,
            params:action.params,
        })
    case Constants.GETAPPINFO:
        return objectAssign({}, state, {
            appinfo:action.appinfo,
        })
    case Constants.CHANGETHEME:
        return objectAssign({}, state, {
            theme:theme,
            foottheme:foottheme,
        })
        
    default:
      return state
  }
}