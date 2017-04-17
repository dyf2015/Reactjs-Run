import Constants from '../constants/ActionTypes'

import objectAssign from 'object-assign'

const initialState = {
    // id: 0,
    isRoleDel:false,
    roleDelMsg:"",
    //ROLE_INIT
    appList:[],

    //ROLE_DATEGET
    roleMemberDatas:[],
    // SAVEBASICFORM
    opType:"",
    // id:0,
    roles:{},
    haveNoSaveDetail:false,
    selectDatas:[],
    showForm:false,
}



//init初始化值要和return值格式相同，否则assign后变成空了
export default function task(state = window.deepClone(initialState), action) {
  // console.log("action:",action);
  // console.dir(state)
  // console.log(Constants.INIT);
  switch (action.type) {
    case Constants.GCLEAN:
        return window.deepClone(initialState)
    case Constants.ROLE_DEL:
        return objectAssign({}, state, {
            // id: state.init.reduce((maxId,todo) => Math.max(todo.id, maxId),0)+1,
            isRoleDel:action.isRoleDel,
            roleDelMsg:action.roleDelMsg
        })
    case Constants.ROLE_INIT:
        return objectAssign({}, state, {
            // id: state.init.reduce((maxId,todo) => Math.max(todo.id, maxId),0)+1,
            appList:action.appList,
            opType:action.opType,
        })
    case Constants.ROLE_DATEGET:
        // console.log("rolessaa",action)
        return objectAssign({}, state, {
            roleMemberDatas:action.roleMemberDatas,
            roles:action.roles,
          
        })
    case Constants.ROLE_MEMBERADD:
        return objectAssign({}, state, {
          roleMemberDatas: action.roleMemberDatas,
          // selectDatas:action.selectDatas
        })
    case Constants.ROLE_MEMBERDEL:
    let vv = true;
        return objectAssign({}, state, {
          roleMemberDatas: state.roleMemberDatas.filter(function(roleMember){
              return !action.tmpRoleMemberkeys.some(function(el) {
                return roleMember.key == el
              })
          })
        })
    case Constants.ROLE_GET:
        return objectAssign({}, state, {
          role: action.role
        })
    case Constants.ROLE_PUTHAVENOSAVE:
        return objectAssign({}, state, {
          haveNoSaveDetail: action.haveNoSaveDetail
        })
    case Constants.ROLE_SELECTDATAS:
        return objectAssign({}, state, {
          selectDatas: action.selectDatas
        })
    case Constants.SAVEBASICFORM:
        return objectAssign({}, state, {
          roleMemberDatas: action.roleMemberDatas
        })
    case Constants.SHOWFORM:
        return objectAssign({}, state, {
          showForm: action.showForm
        })
    case Constants.CLEANOBJ:
        return objectAssign({}, state, {
          roles: action.roles
        })
        
    case Constants.ROLE_CLEAN:
        return window.deepClone(initialState)
    default:
      return state
  }
}