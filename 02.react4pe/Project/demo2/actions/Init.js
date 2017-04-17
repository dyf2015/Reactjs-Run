import {message} from 'antd';
//import message from '../_antd1.11.2/message'
import * as API from '../api/Init'
import assign from 'object-assign';

let configMsgBtn = false;
let configMsgDatas = [];

function receivePosts(configMsgDatas,configMsgBtn) {
  return {
    type: "INIT",
    msgsArr:configMsgDatas,
    msgsBtn:configMsgBtn
  }
}

function changeValue1(datas){   
    let configMsgData = {
    title:"步骤一：jar包、class文件自动检测",
    value:"",
    type:""
    };
    var dataInt=parseInt(datas);
    if(dataInt==0) {
        configMsgData.value = "经过检测jar包、class文件已初始化，将自动进入下一步！";
        configMsgData.type = "success";
    }
    else if(dataInt>0 && dataInt<10) {
        configMsgData.value = "经过检测jar包、class文件未进行初始化，点击确认后系统将自动为您初始化，初始化之后系统将会自动重启，请您先做好保存工作再点击确认！";
        configMsgData.type = "warning";
        configMsgBtn = true;
    }else if(dataInt==10) {
        configMsgData.value = "经过检测系统中存在jsr-311.jar，请您手动删除系统会自动重启，先做好保存工作再删除！";
        configMsgData.type = "warning";
        configMsgBtn = true;
    }else if(dataInt>10) {
        configMsgData.value = "经过检测 1、系统中存在jsr-311.jar，请您手动删除！2、jar包、class文件未进行初始化，点击确认后系统将自动为您初始化，初始化之后系统将会自动重启，请您先做好保存工作再点击确认！";
        configMsgData.type = "warning";
        configMsgBtn = true;
    }else {
        configMsgData.value = "jar包、class文件检测程序出现问题，请联系管理员！";
        configMsgData.type = "error";
    }  
    configMsgDatas[0] = configMsgData; 
    configMsgBtn = false;
}


function changeValue2(datas){   
    let configMsgData = {
    title:"步骤二：web.xml文件自动检测",
    value:"",
    type:""
    };    
    datas=JSON.parse(datas);
    //console.log("changeValue2",datas);
    if(datas=="0") {
        configMsgData.value = "经过检测web.xml已初始化，将自动进入下一步！";
        configMsgData.type = "success";
    }
    else if(datas=="1") {
        configMsgData.value = "经过检测web.xml未进行初始化，点击确认后系统将自动为您初始化，初始化之后系统将会自动重启，请您先做好保存工作再点击确认！";
        configMsgData.type = "warning";
        configMsgBtn = true;
    }
    else if(datas.error=="402"){
        configMsgData.value = "没有权限，请登录系统管理员账号！";
        configMsgData.type = "error";
    }
    else {
        configMsgData.value = "web.xml检测程序出现问题，请联系管理员！";
        configMsgData.type = "error";
    }  
    configMsgDatas[1] = configMsgData; 
    configMsgBtn = false;
  
}
    
function changeValue3(datas){
	// console.log("changeValue3")
    let configMsgData = {
    title:"步骤三：web.xml自动配置和备份",
    value:"",
    type:""
    };
     datas=JSON.parse(datas);
    if(datas=="0") {
        configMsgData.value = "经过检测web.xml已完成配置！";
        configMsgData.type = "success";
    }
    else if(datas=="1") {
        configMsgData.value = "web.xml已初始化，系统已经重启，重启后请再次进入此界面，如果遇到问题请恢复ecology/WEB-INF/backup/web.xml至ecology/WEB-INF/web.xml，并联系管理员！";   
        configMsgData.type = "info";
    }
    else if(datas.error=="402"){
        configMsgData.value = "没有权限，请登录系统管理员账号！";
        configMsgData.type = "error";
    }
    else {
        configMsgData.value = "web.xml配置程序出现问题，请联系管理员！";
        configMsgData.type = "error";
    }
    configMsgDatas[2] = configMsgData;
    configMsgBtn = false;
}

function changeValue4(datas){
   
    let configMsgData = {
    title:"步骤一：jar包、class文件自动检测",
    value:"",
    type:""
    };
    configMsgData.title = "步骤四：应用数据库脚本执行及检测";
    console.log("changeValue4",datas);
    const returnMsg = datas.msg;
    const returnError = datas.errorList;
    if(returnMsg=="0") {
        configMsgData.value = "数据库脚本执行程序执行成功！";
        configMsgData.type = "success";
    }
    else if(returnMsg=="1") {
        configMsgData.value = "数据库脚本执行执行异常，请联系管理员处理！具体错误的应用如下：";
        for(let i=0;i<returnError.length;i++) {
            configMsgData.value += returnError[i];
            if(i!=returnError.length-1) {
                configMsgData.value += "、";
            }
        }
        configMsgData.type = "error";
    }
    else {
        configMsgData.value = "数据库执行程序出现问题，请联系管理员！";
        configMsgData.type = "error";
    }
    configMsgDatas[3] = configMsgData;
 
}

function changeValue5(datas){
 
    let configMsgData = {
    title:"步骤一：jar包、class文件自动检测",
    value:"",
    type:""
    };
    configMsgData.title = "步骤五：完成初始化并进行授权状态检测";
    let noKeyStr = "";
    for(let i=0;i<datas.length;i++) {
        const data = datas[i];
        if(data.canUse=="0") {
            noKeyStr += data.name+"["+data.code+"]"+(data.errorInfo!=""?("（"+data.errorInfo+"）"):"")+"、";
        }
    }
    if(""!=noKeyStr) {
        configMsgData.value = "经过检测，您还有以下应用未申请授权："+noKeyStr.substring(0,noKeyStr.length-1)+"！";
        configMsgData.type = "info";
    }
    else {
        configMsgData.value = "经过检测，您的应用都已授权！";
        configMsgData.type = "success";
    }
    configMsgDatas[4] = configMsgData;
   
}
//修改方法，reject不同的值，再进行处理
export const doInit = (params) => {
    return (dispatch,getState) => {
        API.checkJarAndClass().then((datas)=>{  
            changeValue1(datas,dispatch);  
            if(datas==0){    
                return API.checkWebXml();
            }else{
                dispatch(receivePosts(configMsgDatas,configMsgBtn));
            }
        }).then((datas)=>{            
            changeValue2(datas,dispatch);
            if(datas==0){           
                return  API.doXmlConfig();
            }else{
                dispatch(receivePosts(configMsgDatas,configMsgBtn));
            }
        }).then((datas)=>{
            changeValue3(datas,dispatch);
            if(datas==0){             
                return API.doSqlConfig();
            }else{
                dispatch(receivePosts(configMsgDatas,configMsgBtn));
            }
        }).then((datas)=> { 
            changeValue4(datas);
            if(datas.msg=="0") { 
                return API.doAppKeyCheck();               
            }else{
                dispatch(receivePosts(configMsgDatas,configMsgBtn));
            }
        }).then((datas)=> {                  
            changeValue5(datas);
            dispatch(receivePosts(configMsgDatas,configMsgBtn));
        }).catch((msg)=>{
            handleCatch(msg,dispatch);
        })
    }
}

export const doXmlConfig = (params) => {
    return (dispatch,getState) => {
        API.doXmlConfig().then((datas)=> { 
            changeValue3(datas);
            if(datas==0){      
                return API.doSqlConfig();                
            }else{
                // console.log("else2")
                dispatch(receivePosts(configMsgDatas,configMsgBtn));
            }
            // dispatch(receivePosts(configMsgDatas,configMsgBtn));
        }).then((datas)=> {   
        // console.log("else30")       
            changeValue4(datas);
            if(datas.msg=="0") {  
                return API.doAppKeyCheck();               
            }else{
                // console.log("else3")
                dispatch(receivePosts(configMsgDatas,configMsgBtn));
            }
            // dispatch(receivePosts(configMsgDatas,configMsgBtn));
        }).then((datas)=> {                  
            changeValue5(datas);
            dispatch(receivePosts(configMsgDatas,configMsgBtn));
            // dispatch(receivePosts(configMsgDatas,configMsgBtn));
        }).catch((msg)=>{
            handleCatch(msg,dispatch);
        })
    }
}


function handleCatch(msg,dispatch){
    // console.log("msg:",msg);
    if(msg.type=="checkJarAndClass"){
        changeValue1(msg.edatas);        
    }else if(msg.type=="checkWebXml"){
        changeValue2(msg.edatas);
        if(msg.edatas==1){//确认进入第三步的按钮需求：阻止接下去的promise链执行且configMsgBtn = true
            configMsgBtn = true;
        }
    }else if(msg.type=="doXmlConfig"){
        changeValue3(msg.edatas);
    }else if(msg.type=="doSqlConfig"){
        changeValue4(msg.edatas);
    }else if(msg.type=="doAppKeyCheck"){
        changeValue5(msg.edatas);
    }
    // console.log("configMsgBtn",configMsgBtn)
    dispatch(receivePosts(configMsgDatas,configMsgBtn));
}



