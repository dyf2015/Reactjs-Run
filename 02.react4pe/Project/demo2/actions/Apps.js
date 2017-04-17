import {message} from 'antd';
//import message from '../_antd1.11.2/message'
import assign from 'object-assign';
import * as API from '../api/Apps';

import { gloading, gloaded } from './Util';

function fliter4error(datas) {
    message.error("接口发生异常，错误代码["+datas.error+"]，错误信息["+datas.msg+"]！",3);
}
const datas4false = {status:"false",msg:"接口程序异常",error:"000"};

function receivePosts(applist,loding) {
  return {
    type: "AUTH",
    applist:applist,
    loding:loding
  }
}

export const getPartApp = (min,max,params) => {
    // console.log("intogetpartApp")
    // console.log("params",params)
    return (dispatch,getState) => {
        dispatch(gloading());
        
        
        API.getPartApp(min,max).then((datas)=>{
            dispatch({type:"GETPARTAPP",partapp:datas});
            return API.getCount();
        }).catch((msg)=>{
            message.error('获取应用类表执行失败');
        }).then((countData)=>{
//      	alert(countData);
            dispatch(gloaded());
            dispatch({type:"GETCOUNT",count:countData,params:params});
        }).catch((msg)=>{
            message.error('获取应用数量执行失败');
        })
    }
}

export const changeTheme = (theme,foottheme) => {
    return (dispatch,getState) => {
        dispatch({type:"CHANGETHEME",theme:theme,foottheme:foottheme});
    }
}



export const getAppInfo = (code,key,defaultkey) => {
    let appDetail = {
        data : {},
        url : "",
        defaultkey : "",
        length : 0,
    }
    return (dispatch,getState) => {
        dispatch(gloading());
        API.getAppInfo(code,key,defaultkey).then((datas)=>{
            
            appDetail.data=datas;
            if(undefined == key){
                appDetail.url = datas.pl[0].url;
                appDetail.defaultkey = datas.pl[0].key;
            }else{
                appDetail.url = datas.pl[parseInt(key)].url;
                appDetail.defaultkey = defaultkey;   
            }
            appDetail.length = datas.pl.length;
            dispatch({type:"GETAPPINFO",appinfo:appDetail});
        }).catch((msg)=>{
            message.error('获取单个应用失败');
        })
    }
}

export const setAppMenuKey = key =>{
	return {type:'SET_APP_MENU_KEY',data:key}
}
