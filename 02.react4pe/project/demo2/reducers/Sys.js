import Constants from '../constants/ActionTypes'

import objectAssign from 'object-assign'

const initialState = {
	modelVisible: false,
	tokenBol: false,
	canSubmit: false,
	success: false,
	orderFields: [],
	pcIsOpen: false,
	mobileIsOpen: false,
	loading: false,
	isJoin: false
}
export default function task(state = initialState, action) {
  // console.log("action:",action);
  switch (action.type) {
  	case Constants.SET_LOADING:
        return objectAssign({}, state, {loading:action.data})
  	case Constants.SET_PCISOPEN:
        return objectAssign({}, state, {pcIsOpen:action.data})
    case Constants.SET_MOBILEISOPEN:
        return objectAssign({}, state, {mobileIsOpen:action.data})
  	case Constants.SET_SUCCESS:
        return objectAssign({}, state, {success:action.data})
    case Constants.SET_ISJOIN:
        return objectAssign({}, state, {isJoin: !!action.data.mail.value && !!action.data.mobile.value})
  	case Constants.SAVE_APPFIELDS:
        return objectAssign({}, state, {orderFields:action.data})
  	case Constants.SET_CANSUBMIT:
        return objectAssign({}, state, {canSubmit:action.data})
  	case Constants.SET_MODEL_VISIBLE:
        return objectAssign({}, state, {modelVisible:action.data})
    //获取基础组件版本号：
    case Constants.GETVERSION:
        return objectAssign({}, state, {version:action.version})
    case Constants.GETTOKENBINDING:
        return objectAssign({}, state, {tokenBol:action.tokenBol})
    default:
      return state
  }
}