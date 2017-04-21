import {message} from 'antd';
//import message from '../_antd1.11.2/message'
import * as API from '../api/Role';
import assign from 'object-assign';
import RoleList from '../components/RoleList'

import { gloading, gloaded } from './Util'
// dispatch(gloading())
// dispatch(gloaded());


function fliter4error(datas) {
    message.error("接口发生异常，错误代码["+datas.error+"]，错误信息["+datas.msg+"]！",3);
}

const datas4false = {status:"false",msg:"接口程序异常",error:"000"};
export const saveMemberTypeMsg = "";
export const saveMemberObjMsg = "";
export const saveRoleMsg = "";
export const saveMemberObjMsgids = ""
function deepCopy(source) { 
    let result={};
    for(let key in source) {
        result[key] = typeof source[key]==='object'? deepCopy(source[key]): source[key];
    } 
    return result; 
}


let Deldispatch
export const putDispatch = (params) => {
    return (dispatch,getState) => {
        Deldispatch = dispatch;
    }
}



export const gClean = (params) => {
    return (dispatch,getState) => {
        dispatch({type:"GCLEAN"})
    }
}


let showform = true;
export const showForm = (showForm) => {
    return (dispatch,getState) => {
        showform = !showform;
        dispatch({type:"SHOWFORM",showForm:!showform})
    }
}

let roleSaveMsg = "-1";
let isRoleSave = false;
export const doRoleSave = (formId,optype,roleMemberDatas,appCode) => {
    return (dispatch,getState) => {
    // console.log("roleMemberDatas",roleMemberDatas)
    let tmpRml = [];
    for(let i=0;i<roleMemberDatas.length;i++) {
        let rmd = deepCopy(roleMemberDatas[i]);
        rmd.memberTypeName = "";
        rmd.memberObjName = "";
        rmd.roleLevelName = "";
        rmd.roleObjName = "";
        tmpRml[tmpRml.length] = rmd;
    }
    const answerStr = JSON.stringify(tmpRml);
    // changeLoading(true);
    roleSaveMsg = "-1";
    isRoleSave = true;
    // console.log("opType",optype);
    // console.log("answerStr",answerStr,"formId",formId,"roleId",roleId)
    API.doRoleSave(answerStr,formId,roleId,optype,appCode).then((datas)=>{
        // console.log("appcode",appCode)
        // console.log("datas",datas)
        if(datas.status!="false") {
                roleSaveMsg = datas;
                isRoleSave = false;
                message.success('保存成功！');
                dispatch({type:"SAVEBASICFORM",roleMemberDatas:roleMemberDatas})
        }
        else {
            fliter4error(datas);
        }
    }).catch((msg)=>{
        fliter4error(datas);
    })
    }
}

export const cleanMemberObj = (roles) => {
    return (dispatch,getState) => {
        roles.memberObj = "",
        dispatch({type:"CLEANOBJ",roles:roles})
    }
}



//添加权限
export const doRoleMemberAdd = (roleMember,roleMemberDatas) => {
    return (dispatch,getState) => {

    const moIds = roleMember.memberObj.ids.split(",");
    const moNames = roleMember.memberObj.names.split(",");
    const roIds = roleMember.roleObj.ids.split(",");
    const roNames = roleMember.roleObj.names.split(",");
    for(let i=0;i<moIds.length;i++) {
        for(let j=0;j<roIds.length;j++) {
            const roleMemberObj = {
                key:0,
                memberType:roleMember.memberType.id,
                memberTypeName:roleMember.memberType.name,
                memberObj:moIds[i],
                memberObjName:moNames[i],
                roleLevel:roleMember.roleLevel.id,
                roleLevelName:roleMember.roleLevel.name,
                roleObj:roIds[j],
                roleObjName:roNames[j],
            };
            //console.log(roleMemberObj);
            let find = false;
            for(let k=0;k<roleMemberDatas.length&&!find;k++) {
                const rmd = roleMemberDatas[k];
                if(rmd.memberType==roleMemberObj.memberType&&
                   rmd.memberObj==roleMemberObj.memberObj&&
                   rmd.roleLevel==roleMemberObj.roleLevel&&
                   rmd.roleObj==roleMemberObj.roleObj) {
                    find = true;
                }
            }
            // console.log("find",find)
            if(!find) {
                roleMemberObj.key = roleMemberDatas.length;
                roleMemberDatas[roleMemberDatas.length] = roleMemberObj;
            }
        }
    }
    // console.log("roleMemberDatas1",roleMemberDatas);
    dispatch({type:"ROLE_MEMBERADD",roleMemberDatas:roleMemberDatas})
    
  }
}

export const doRoleMemberDel = (actions) => {
    return (dispatch,getState) => {
        // console.log("actions",actions)
        let tmpRoleMemberkeys = [];
        actions.map(action=>{tmpRoleMemberkeys.push(action.key)});
        // console.log("tmpRoleMemberkeys",tmpRoleMemberkeys)
        dispatch({type:"ROLE_MEMBERDEL",tmpRoleMemberkeys:tmpRoleMemberkeys})
    }
}

export const setSelectDatas = (selectDatas) => {
    return (dispatch,getState) => {
       dispatch({type:"ROLE_SELECTDATAS",selectDatas:selectDatas})
    }
}

export const cleanRoleMember = (roleMemberDatas) => {
    return (dispatch,getState) => {
        dispatch({type:"ROLE_MEMBERDEL",tmpRoleMemberkeys:tmpRoleMemberkeys})
    }
}

let haveNoSaveDetail = false;
  //field:memberType key:1 id:1 name:部门
export const doRoleMemberEdit = (field,key,id,name) => {
    return (dispatch,getState) => {
    let find = false;
    for(let i=0;i<roleMemberDatas.length&&!find;i++) {
        // console.log(key+"=="+roleMemberDatas[i].key);
        if(key==roleMemberDatas[i].key) {
            //console.log("roleMemberDatas[i]."+field+"='"+id+"'");
            //console.log("roleMemberDatas[i]."+field+"Name='"+name+"'");
            eval("roleMemberDatas[i]."+field+"='"+id+"'");
            eval("roleMemberDatas[i]."+field+"Name='"+name+"'");
            if(field=="memberType") {
                roleMemberDatas[i].memberObj = "";
                roleMemberDatas[i].memberObjName = "";
            }
            if(field=="roleLevel") {
                if("1"==id||"2"==id||"3"==id) {
                    roleMemberDatas[i].roleObj = "0";
                    roleMemberDatas[i].roleObjName = "全部";
                }
                else {
                    roleMemberDatas[i].roleObj = "";
                    roleMemberDatas[i].roleObjName = "";
                }
            }
            find = true;
        }
    }
    haveNoSaveDetail = false;
    for(let i=0;i<roleMemberDatas.length&&!haveNoSaveDetail;i++) {
        if(roleMemberDatas[i].memberObj==""||roleMemberDatas[i].roleObj=="") {
            haveNoSaveDetail = true;
        }
    }
    // changeLoading(false);
    dispatch({type:"ROLE_PUTHAVENOSAVE",haveNoSaveDetail:haveNoSaveDetail})
    }
}

let opType = "";
let roleId = "";
let roleMemberDatas = [];
let role = {};
let appList = [];



export const doInit = (id,opType) => {
    return (dispatch,getState) => {
        //console.log("id:",id,"opType",opType)//0 add
        opType = opType;
        roleId = id;
        roleMemberDatas = [];
        dispatch(gloading())
        if(roleId!="0"){
        API.doDataGet(id).then((datas)=>{
                dispatch(gloaded());
                if(datas.status!="false") {
                    role = datas;
                    roleMemberDatas = datas.rml;
                    for(let i=0;i<roleMemberDatas.length;i++) {
                        roleMemberDatas[i].key = i;
                    }
                    // console.log("rolelll",role)
                    dispatch({type:"ROLE_DATEGET",roleMemberDatas:roleMemberDatas,roles:role})
                    // dispatch({type:"ROLE_GET",role:role})
                }
                else {
                    fliter4error(edatas);
                }
            }).catch((msg)=>{
                fliter4error(datas4false);
            })
        }
        API.doAppListGet().then((datas)=>{
            dispatch(gloaded());
            if(datas.status!="false") {
                appList = [];
                const defaultAppData = {
                    name:"云商店ECOLOGY端",
                    value:"0",
                };
                appList[appList.length] = defaultAppData;
                let tmpAppDatas = datas;
                for(let i=0;i<tmpAppDatas.length;i++) {
                    const tmpAppData = tmpAppDatas[i];
                    const appData = {
                        name:"["+tmpAppData.code+"] "+tmpAppData.name,
                        value:tmpAppData.code,
                    };
                    appList[appList.length] = appData;
                }
                // console.dir(appList)
                dispatch({type:"ROLE_INIT",appList:appList,opType:opType})
            }else{
                fliter4error(datas4false);
            }
        }).catch((msg)=>{
            fliter4error(datas4false);
        })
    }
}



let roleDelMsg = "-1";
let isRoleDel = false;

function receivedoRoleDel(isRoleDel,roleDelMsg) {
  return {
    type: "ROLE_DEL",
    isRoleDel:isRoleDel,
    roleDelMsg:roleDelMsg
  }
}
export const doRoleDel = (id,fun) => {
        isRoleDel = true;
        roleDelMsg = "-1";
        API.doRoleDel(id).then((datas)=>{
            // console.log("datas",datas)
            if(datas.status!="false") {
                message.success('删除成功！');

                // console.dir(Deldispatch)
                Deldispatch(receivedoRoleDel(true,datas));
                //未完成，删除完后重新刷新
            }
            else {
                message.error('删除失败，请联系管理员！');
            }
        }).catch((msg)=>{
            message.error('删除失败，请联系管理员！');
        }).then(()=>{
            fun();
        })
}

