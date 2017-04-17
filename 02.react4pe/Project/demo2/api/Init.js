import {message} from 'antd';
//import message from '../_antd1.11.2/message'

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
//
function fliter4error(datas) {
    message.error("接口发生异常，错误代码["+datas.error+"]，错误信息["+datas.msg+"]！",3);
}
const datas4false = {status:"false",msg:"接口程序异常",error:"000"};

// let change = false;



export const  checkJarAndClass= () =>{
    return new Promise((resolve,reject) => { 
        fetch(server+'/cloudstore/system/ControlServlet.jsp?action=Action_CheckJarAndClass',
        getFetchParams("get",""))
        .then(function(res){
             return res.text();
           }
       ).then(edatas => {
                edatas = edatas.replace(/(^\s*)|(\s*$)/g, "");//返回值有一片空白需要处理   
                    
                    var dataInt=parseInt(edatas);
                    if(dataInt>0){ 
                        reject({"edatas":dataInt,type:"checkJarAndClass"});
                    }
                    resolve(edatas);
                
            }
       ).catch(function(edatas) {
            fliter4error(datas4false);
            reject({edatas,type:"checkJarAndClass"});
        });
    });
}

// function Init(dispatch) {
export const checkWebXml = () =>{
    return new Promise((resolve,reject) => {
//      $.ajax({
//          type:"POST",
//          url:"/cloudstore/system/ControlServlet.jsp?action=Action_CheckWebXml",
//          success(edatas) {
//                  console.log("ajaxedatas",edatas)
//              if(edatas.status!="false") {
//                  // if(change==false){//测试
//                  //     console.log("---")
//                  //     change=true
//                  //     reject({"edatas":1,type:"init"});
//                  // }
//                  if(edatas==1){
//                      reject({"edatas":1,type:"init"});
//                  }
//                  resolve(edatas);
//              }
//              else {
//                  fliter4error(edatas);
//                  reject({edatas,type:"init"});
//              }
//          },
//          error(edatas) {
//              fliter4error(datas4false);
//              reject({edatas,type:"init"});
//          },
//          dataType: "json"
//      });
//      
        fetch(server+'/cloudstore/system/ControlServlet.jsp?action=Action_CheckWebXml',
        getFetchParams("get",""))
        .then(function(res){
             return res.text();
           }
       ).then(edatas => {
//              console.log('fetchedatas1',typeof(edatas));
                edatas = edatas.replace(/(^\s*)|(\s*$)/g, "");//返回值有一片空白需要处理
                if(edatas.status!="false") {
                    // if(change==false){//测试
                    //     console.log("---")
                    //     change=true
                    //     reject({"edatas":1,type:"init"});
                    // }
                    if(edatas==1){
                        reject({"edatas":1,type:"checkWebXml"});
                    }
                    resolve(edatas);
                }
                else {
                    fliter4error(edatas);
                    reject({edatas,type:"checkWebXml"});
                }
            }
       ).catch(function(edatas) {
//          console.log('ex',ex);
            fliter4error(datas4false);
            reject({edatas,type:"checkWebXml"});
        });
    });
}


export const doXmlConfig = () => {
    return new Promise((resolve,reject) => {
//  $.ajax({
//      type:"POST",
//      url:"/cloudstore/system/ControlServlet.jsp?action=Action_ConfigWebXml",
//      success(edatas) {
//
//          if(edatas.status!="false") {
//              // reject({edatas,type:"doXmlConfig"});
//              resolve(edatas);
//          }
//          else {
//              fliter4error(edatas);
//              reject({edatas,type:"doXmlConfig"});
//          }
//      },
//      error(edatas) {
//          fliter4error(datas4false);
//          reject({edatas,type:"doXmlConfig"});      
//      },
//      dataType: "json"
//  });
    	fetch(server+'/cloudstore/system/ControlServlet.jsp?action=Action_ConfigWebXml',
    	getFetchParams("get",""))
    	.then(function(response) {
             return response.text();
             
       }).then(edatas => {
				edatas = edatas.replace(/(^\s*)|(\s*$)/g, ""); //返回值有一片空白需要处理
       		   if(edatas.status!="false") {
                    resolve(edatas);
                }
                else {
                    fliter4error(edatas);
                    reject({edatas,type:"doXmlConfig"});
                }
       }).catch(function(edatas) {
			fliter4error(datas4false);
           	reject({edatas,type:"doXmlConfig"});   
        });
    });
}

export const doSqlConfig = () =>{
    // console.log("action3")
    return new Promise((resolve,reject) => {
//      $.ajax({
//          type:"POST",
//          url:"/cloudstore/system/ControlServlet.jsp?action=Action_ConfigSql",
//          success(edatas) {
//              if(edatas.status!="false") {
//                  resolve(edatas);                                                
//              }
//              else {
//                  fliter4error(edatas);
//                  reject({edatas,type:"doSqlConfig"});   
//              }
//          },
//          error(edatas) {
//              fliter4error(datas4false);
//              reject({edatas,type:"doSqlConfig"});   
//          },
//          dataType: "json"
//      });
        fetch(server+'/cloudstore/system/ControlServlet.jsp?action=Action_ConfigSql',
        getFetchParams("get",""))
        .then(function(response) {
//     		console.log("Action_ConfigSql",response);
             return response.json();  
       }).then(edatas=>{
       		 if(edatas.status!="false") {
//     		console.log("Action_ConfigSql2",edatas);
       		 	
                    resolve(edatas);                                                
                }
                else {
                    fliter4error(edatas);
                    reject({edatas,type:"doSqlConfig"});   
                }
       }).catch(function(edatas) {
			  fliter4error(datas4false);
               reject({edatas,type:"doSqlConfig"});    
        });
    });
}

export const doAppKeyCheck = () => {
    // console.log("action4")
    return new Promise((resolve,reject) => {
//      $.ajax({
//          type:"POST",
//          url:"/cloudstore/system/ControlServlet.jsp?action=Action_GetAppList",
//          success(edatas) {
//              if(edatas.status!="false") {
//                  resolve(edatas);
//                  // reject({edatas,type:"doAppKeyCheck"});        
//              }
//              else {
//                  fliter4error(edatas);
//                  reject({edatas,type:"doAppKeyCheck"}); 
//              }
//          },
//          error(edatas) {
//              reject({edatas,type:"doAppKeyCheck"}); 
//              reject(edatas);      
//           },
//          dataType: "json"
//      });
        
        fetch(server+'/cloudstore/system/ControlServlet.jsp?action=Action_GetAppList',
        getFetchParams("get",""))
        .then(function(response) {
//     	console.log("Action_GetAppList",response)
             const edatas = response.json();
              if(edatas.status!="false") {
                    resolve(edatas);
                    // reject({edatas,type:"doAppKeyCheck"});        
                }
                else {
                    fliter4error(edatas);
                    reject({edatas,type:"doAppKeyCheck"}); 
                }
              
       }).catch(function(edatas) {
			reject({edatas,type:"doAppKeyCheck"}); 
            reject(edatas);        
        });
    });
}

function sleep(numberMillis) { 
    var now = new Date(); 
    var exitTime = now.getTime() + numberMillis; 
    while (true) { 
    now = new Date(); 
    if (now.getTime() > exitTime) 
    return; 
    } 
}