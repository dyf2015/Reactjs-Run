import {message} from 'antd';
//import message from '../_antd1.11.2/message'
//import  GetParams from './GetParams'
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
    message.error("接口发生异常，错误代码asdf["+datas.error+"]，错误信息["+datas.msg+"]！",3);
}
const datas4false = {status:"false",msg:"接口程序异常",error:"000"};



export const doAppListGet = () =>{
    return new Promise((resolve,reject) => {
//      $.ajax({
//          type:"POST",
//          url:"/cloudstore/system/ControlServlet.jsp?action=Action_GetAppList",
//          success(edatas) {
//              // console.log("success ?",edatas)
//             
//              resolve(edatas);
//          },
//          error(edatas) {
//              // console.log("error?")
//              reject(edatas);
//          },
//          dataType: "json"
//      });
        fetch(server+'/cloudstore/system/ControlServlet.jsp?action=Action_GetAppList',
        getFetchParams("get",""))
        .then(function(response) {
//     			alert("auth1",response);
             const edatas = response.json();
	   		 resolve(edatas);
       }).catch(function(edatas) {
//     	alert("auth",edatas);
			 fliter4error(edatas);
             reject(edatas);
        });
    });
}

export const doKeySave = (code,keyStr) =>{
    return new Promise((resolve,reject) => {
//      $.ajax({
//          type:"POST",
//          url:"/cloudstore/system/ControlServlet.jsp?action=Action_SaveAppKey&code="+code+"&keyStr="+keyStr,
//          success(edatas) {
//              resolve(edatas);
//          },
//          error(edatas) {
//              reject(edatas);
//          },
//          dataType: "json"
//      });
        fetch(server+"/cloudstore/system/ControlServlet.jsp?action=Action_SaveAppKey&code="+code+"&keyStr="+keyStr,
        getFetchParams("get",''))
        .then(function(response) {
             const edatas = response.json();
	   		 resolve(edatas);
       }).catch(function(edatas) {
//			 fliter4error(edatas);
            reject(edatas);
        });
    });

}







//let count = 0;
//let appinfo = {};
////逻辑处理start
//export const getCount = () =>{
//  return new Promise((resolve,reject) => {
////      $.ajax({
////          type:"POST",
////          url:"/cloudstore/system/ControlServlet.jsp?action=Action_GetAppCount",
////          // data:"pathname="+window.location.pathname,
////          success(datas) {
////              // console.log("datas",datas);
////              count=datas;
////              changeLoading(false);
////              // resolve(datas);
////          },
////          error(datas) {
////              message.destroy();
////              message.error('执行失败');
////               // console.log("error:",datas);
////               // resolve([]);
////          },
////          dataType: "json"
////      }); 
//      
//      fetch(server+"/cloudstore/system/ControlServlet.jsp?action=Action_GetAppCount",getFetchParams("get",''))
//      .then(function(response) {
//           const edatas = response.json();
//	   		  // console.log("edatas",edatas);
//           count=edatas;
//           changeLoading(false);
//              // resolve(edatas);
//     }).catch(function(edatas) {
//			 message.destroy();
//           message.error('执行失败');
//      });
//  });
//}
//function getAppInfo(action){
//  const min = action.min;
//  const max = action.max;
//  console.log("min"+min,"max"+max);
////  $.ajax({
////      type:"POST",
////      url:"/cloudstore/system/ControlServlet.jsp?action=Action_GetPartApp",
////      data:"min="+min+"&max="+max,
////      success(datas) {
////          // console.log("datas",datas);
////          getCount();
////          appinfo=datas;
////          changeLoading(false);
////          // resolve(datas);
////
////      },
////      error(datas) {
////          message.destroy();
////          message.error('执行失败');
////           // console.log("error:",datas);
////           // resolve([]);
////      },
////      dataType: "json"
////  }); 
//	   fetch(server+"/cloudstore/system/ControlServlet.jsp?action=Action_GetPartApp",getFetchParams("get",{"min":min,"max":max}))
//	   .then(function(response) {
//           const edatas = response.json();
//	   		 // console.log("edatas",edatas);
//          getCount();
//          appinfo=edatas;
//          changeLoading(false);
//          // resolve(edatas);
//     }).catch(function(edatas) {
//			 message.destroy();
//           message.error('执行失败');
//      });
//}
//
//let partapp = {};
//let url = "";
//let defaultkey = "";
//let length = 0;
//function getPartApp(action){
//  const appCode = action.appCode;
//  const key = action.key;
//  // console.log("appcode",appCode);
//  
////  $.ajax({
////      type:"POST",
////      url:"/cloudstore/system/ControlServlet.jsp?action=Action_GetAppInfo",
////      data:"appCode="+appCode,
////      success(datas) {
////          partapp=datas;
////          if(undefined == key){
////              url = datas.pl[0].url;
////              defaultkey = datas.pl[0].key;
////          }else{
////              url = datas.pl[parseInt(key)].url;
////              defaultkey = action.defaultkey;   
////          }
////          length = datas.pl.length;
////          changeLoading(false);
////          // resolve(datas);
////
////      },
////      error(datas) {
////          message.destroy();
////          message.error('执行失败');
////           // console.log("error:",datas);
////           // resolve([]);
////      },
////      dataType: "json"
////  }); 
//  
//    fetch(server+"/cloudstore/system/ControlServlet.jsp?action=Action_GetAppInfo",{
//          method: 'POST',
//          mode: "no-cors",
//          headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'},
//          body:"appCode="+appCode,
//          credentials: 'include'
//     }).then(function(response) {
//           const edatas = response.json();
//	   		 partapp=edatas;
//          if(undefined == key){
//              url = edatas.pl[0].url;
//              defaultkey = edatas.pl[0].key;
//          }else{
//              url = edatas.pl[parseInt(key)].url;
//              defaultkey = action.defaultkey;   
//          }
//          length = edatas.pl.length;
//          changeLoading(false);
//          // resolve(datas);
//     }).catch(function(edatas) {
//			 message.destroy();
//           message.error('执行失败');
//      });
//}
//
//
//
//
//
//let appList = [];
//
//
//
//function receivePosts(applist,loding) {
//return {
//  type: "AUTH",
//  applist:applist,
//  loding:loding
//}
//}










