import {message} from 'antd';
//import message from '../_antd1.11.2/message'
import assign from 'object-assign';
import * as API from '../api/Auth'
import { gloading, gloaded } from './Util'
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
//修改方法，reject不同的值，再进行处理
export const doAppListGet = (params) => {
    return (dispatch,getState) => {
        dispatch(gloading())
        dispatch(receivePosts([],true));
        API.doAppListGet().then((datas)=>{
        dispatch(gloaded());
            if(datas.status!="false") {
                dispatch(receivePosts(datas,false));
            }
            else {
                fliter4error(datas);
            }
        }).catch((msg)=>{
            fliter4error(datas4false);
        })
    }
}

export const doKeySave = (params1,params2) => {
    return (dispatch,getState) => {
        API.doKeySave(params1,params2).then((datas)=>{
            //console.log("datas",datas)
            if(datas.status!="false") {
                if(datas=="0") {
                    message.success('授权成功');
                    return API.doAppListGet();
                }
                else {
                    message.error("授权码格式有误，请重新提交！");
                }
            }
            else {
                fliter4error(datas);
            }
        }).catch((msg)=>{
            fliter4error(datas4false);
        }).then((datas)=>{   
            //console.log("能进来吗")
            if(datas.status!="false") {
                dispatch(receivePosts(datas,false));
            }
            else {
                fliter4error(datas);
            }
        }).catch((msg)=>{
            // fliter4error(datas4false);
        })
    }
}

export const changeValue = (params) => {
    return (dispatch,getState) => {
        dispatch({type:"CHANGEVALUE",value:params});
    }
}

