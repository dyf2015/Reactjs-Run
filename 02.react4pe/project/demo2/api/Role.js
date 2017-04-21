import {message} from 'antd';
//import message from '../_antd1.11.2/message'
import assign from 'object-assign';

const server = window.server||"";

const getFd = (values) => {
    let fd = "";
    //var data = new FormData();
    for(let p in values) {
        fd += p+"="+encodeURIComponent(values[p])+"&";
        //data.append(p,values[p]);
    }
    if(fd!="") {
        fd = fd.substring(0,fd.length-1);
    }
    return fd;
}

const getFetchParams = (method,params)=>{
    let obj = {
        method:method,
        headers: {
            	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            	'X-Requested-With':'XMLHttpRequest'
            },
    };
    if(server=="") {
        obj.credentials = "include";
    }
    // else {
    //     obj.mode = "no-cors";
    // }
    if(params) {
        obj.body = getFd(params);
    }
    //console.log("obj:",obj);
    return obj;
}



function fliter4error(datas) {
    message.error("接口发生异常，错误代码["+datas.error+"]，错误信息["+datas.msg+"]！",3);
}

const datas4false = {status:"false",msg:"接口程序异常",error:"000"};

export const doDataGet = (id) =>{
    return new Promise((resolve,reject) => {
//    changeLoading(true);
//      $.ajax({
//          type:"POST",
//          url:"/cloudstore/system/ControlServlet.jsp?action=Action_GetRole&id="+id,
//          success(edatas) {
//          	console.log("doDataGet",edatas);
//              resolve(edatas);
//          },
//          error(edatas) {
//              fliter4error(datas4false);
//          },
//          dataType: "json"
//      });
		fetch(server+'/cloudstore/system/ControlServlet.jsp?action=Action_GetRole&id='+id,
		getFetchParams("get",''))
		.then(function(response) {
//            console.log("Roldatas:",response);
             const datas = response.json();
//            console.log("Roldatas:",datas);
	        	resolve(datas);
        }).catch(function(ex) {
//      	console.log('ex',ex);
           	reject(ex);
        });
    });
}


export const doAppListGet = () =>{
    return new Promise((resolve,reject) => {
//      $.ajax({
//          type:"POST",
//          url:"/cloudstore/system/ControlServlet.jsp?action=Action_GetAppList",
//          success(edatas) {
//              resolve(edatas);
//          },
//          error(edatas) {
//              fliter4error(datas4false);
//          },
//          dataType: "json"
//      });
        fetch(server+'/cloudstore/system/ControlServlet.jsp?action=Action_GetAppList',
        getFetchParams("get",""))
        .then(function(response) {
//            console.log("Roleresponse:",response);
       	
             const datas = response.json();
//            console.log("RoleDatas:",datas);
	        	resolve(datas);
        }).catch(function(ex) {
//      	console.log('ex',ex);
			fliter4error(datas4false);
           	reject(ex);
        });
    });
}




export const doRoleSave = (answerStr,formId,roleId,opType,appCode) => {
    return new Promise((resolve,reject) => {
        // console.log("answerStr",answerStr,"formId",formId,"roleId",roleId,"opType",opType)
        let see = $("#"+formId).serialize();
        let url = "";
        if(see.indexOf("appCode=&")==-1){
            url = "/cloudstore/system/ControlServlet.jsp?action=Action_SaveRole&"+see+"&id="+roleId+"&opType="+opType+"&detail="+answerStr
        }else{
            url = "/cloudstore/system/ControlServlet.jsp?action=Action_SaveRole&"+see.replace("appCode=","appCode="+appCode)+"&id="+roleId+"&opType="+opType+"&detail="+answerStr;
            
        }
//      $.ajax({
//          type:"POST", //encoding:"GBK",
//          url:url,
//          success(edatas) {
//              resolve(edatas);
//          },
//          error(edatas) {
//              reject(edatas);
//              fliter4error(datas4false);
//          },
//          dataType: "json"
//      });
		fetch(server+url,getFetchParams("get",""))
		.then(function(response) {
             const datas = response.json();
//            console.log("datas:",datas);
	        	resolve(datas);
        }).catch(function(ex) {
//      	console.log('ex',ex);
			fliter4error(datas4false);
           	reject(ex);
        });
    });
}



export const doRoleMemberEdit = () =>{
    return new Promise((resolve,reject) => {
    const field = action.field;
    const key = action.key;
    const id = action.id;
    const name = action.name;
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
    changeLoading(false);
    });
}


export const doRoleDel = (id) => {
    // console.log("id",id);
    return new Promise((resolve,reject) => {
//       $.ajax({
//          type:"POST",
//          url:"/cloudstore/system/ControlServlet.jsp?action=Action_DelRole&id="+id,
//          success(edatas) {
//              resolve(edatas);  
//          },
//          error(edatas) {
//              fliter4error(edatas);
//              reject(edatas);
//          },
//          dataType: "json"
//      });
		fetch(server+"/cloudstore/system/ControlServlet.jsp?action=Action_DelRole&id="+id,
		getFetchParams("get",""))
		.then(function(response) {
             const datas = response.json();
//            console.log("datas:",datas);
	        	resolve(datas);
        }).catch(function(ex) {
//      	console.log('ex',ex);
            fliter4error(datas4false);		
           	reject(ex);
        });
    });
}


