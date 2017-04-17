import {message} from 'antd';
//import message from '../_antd1.11.2/message'


const datas4false = {status:"false",msg:"接口程序异常",error:"000"};

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
//  console.log("fd",fd)
    return fd;
}

const getFetchParams = (method,params)=>{
//	console.log("App",params);
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
//    console.log("obj:",obj);
    return obj;
}

export const getCount = () =>{
    return new Promise((resolve,reject) => {
//      $.ajax({
//          type:"POST",
//          url:"/cloudstore/system/ControlServlet.jsp?action=Action_GetAppCount",
//          // data:"pathname="+window.location.pathname,
//          success(datas) {
//              resolve(datas);
//          },
//          error(datas) {
//              reject(datas);
//          },
//          dataType: "json"
//      }); 
        fetch(server+'/cloudstore/system/ControlServlet.jsp?action=Action_GetAppCount',
        getFetchParams("get",""))
        .then(function(response) {
             const edatas = response.json();      
	   		 resolve(edatas);
       }).catch(function(edatas) {
             reject(edatas);
       });
    });
}

export const getPartApp = (min,max) =>{
    return new Promise((resolve,reject) => {
//      $.ajax({
//          type:"POST",
//          url:"/cloudstore/system/ControlServlet.jsp?action=Action_GetPartApp",
//          data:"min="+min+"&max="+max,
//          success(datas) {
//              resolve(datas);
//          },
//          error(datas) {
//              reject(datas); 
//          },
//          dataType: "json"
//      }); 
        fetch(server+'/cloudstore/system/ControlServlet.jsp?action=Action_GetPartApp',
        getFetchParams("post",{"min":min,"max":max}))
        .then(function(response) {
             const edatas = response.json();
//          		console.log("Action_GetPartApp2",edatas);
	   		 resolve(edatas);
       }).catch(function(edatas) {
             reject(edatas);
       });
    });
}


export const getAppInfo = (code,key,defaultkey) =>{
    return new Promise((resolve,reject) => {
//      $.ajax({
//          type:"POST",
//          url:"/cloudstore/system/ControlServlet.jsp?action=Action_GetAppInfo",
//          data:"appCode="+code,
//          success(datas) {
//          
//              resolve(datas);
//          },
//          error(datas) {
//              reject(datas);
//          },
//          dataType: "json"
//      }); 
        fetch(server+'/cloudstore/system/ControlServlet.jsp?action=Action_GetAppInfo',
        getFetchParams("post",{"appCode":code}))
        .then(function(response) {
             const edatas = response.json();
	   		 resolve(edatas);
       }).catch(function(edatas) {
             reject(edatas);
       });
    });
}


