import {message} from 'antd';

import assign from 'object-assign';
import * as API from '../api/Sys';
import { gloading, gloaded } from './Util';

//获取基础组件库的版本号action
export const getVersion = (params) => {
    return (dispatch,getState) => {
        let myVersion;
        API.getVersion().then(function(version) {
        	  dispatch(gloading());
		      dispatch({type:"GETVERSION",version:version});
		      setTimeout(dispatch(gloaded()),500);
		}).catch(function(err) {
			  dispatch(gloading());
	    	  myVersion = '暂无无版本信息';
	    	  dispatch({type:"GETVERSION",version:myVersion});
	    	  setTimeout(dispatch(gloaded()),500);
		});
    }
}
//是否绑定服务器-获取状态
export const getTokenStatus = (params) => {
    return (dispatch,getState) => {
        API.getTokenStatus(params).then(function(data) {
        	  dispatch(gloading());
		      dispatch({type:"GETTOKENBINDING",tokenBol:data.status=="0"});
		      setTimeout(dispatch(gloaded()),500);
		}).catch(function(err) {
			  dispatch(gloading());
	    	  dispatch({type:"GETTOKENBINDING",tokenBol:"1"});
	    	  setTimeout(dispatch(gloaded()),500);
		});
    }
	
}
//是否绑定服务器-修改状态
export const GetCloudStoreStatus = (params) => {
    return (dispatch,getState) => {
        API.GetCloudStoreStatus(params).then(function(data) {
        	dispatch(gloading());
		    dispatch({type:"GETTOKENBINDING",tokenBol:!!data.status});
		    setTimeout(dispatch(gloaded()),500);
		}).catch(function(err) {
			dispatch(gloading());
	    	dispatch({type:"GETTOKENBINDING",tokenBol:!!data.status});
	    	setTimeout(dispatch(gloaded()),500);
		});
    }
}

//获取用户联系方式
export const getJoin = () => {
    return (dispatch,getState) => {
        API.getJoin().then(data => {
        	if(data.status == 'true'){
        		const orderFields = {mail:{name:"mail",value:data.mail},mobile:{name:"mobile",value:data.mobile}};
        		dispatch(saveOrderFields(orderFields));
        		dispatch({type:'SET_ISJOIN',data:orderFields});
        	}else{
        		console.log("获取用户联系方式失败");
        	}
		}).catch(err=> {
			console.log('获取用户联系方式失败');
		});
    }
}

//提交用户联系方式
export const sendToJoin = params => {
    return (dispatch,getState) => {
		dispatch({type:'SET_LOADING',data:true});
        API.sendToJoin(params).then(data => {
        	data.status == 'true' ? setTimeout(()=>{dispatch(dispatch({type:'SET_LOADING',data:false}));dispatch(setSuccess(true))},500) : console.log("获取用户联系方式失败,msg：" + data.msg);
		}).catch(err=> {
			console.log('提交用户联系方式失败' + err);
		});
    }
}

//获取菜单状态
export const getCsMenu = params => {
	return (dispatch,getState) => {
        API.getCsMenu(params).then(data => {
        	data.status == 'true' ? dispatch({type:params.type == 'pc' ? 'SET_PCISOPEN' : 'SET_MOBILEISOPEN',data:data.isOpen == 'true'}) : console.log("获取" + params.type + "开关数据失败");
		}).catch(err=> {
			console.log('接口失败：' +　err);
		});
	}
}

//设置菜单状态
export const setCsMenu = params => {
	return (dispatch,getState) => {
        API.setCsMenu(params).then(data => {
        	data.status == 'true' ? dispatch({type:params.type == 'pc' ? 'SET_PCISOPEN' : 'SET_MOBILEISOPEN',data:params.isOpen}) : console.log("设置" + params.type + "开关失败");
		}).catch(err=> {
			console.log('接口失败：' +　err);
		});
	}
}


export const setModelVisible = bool => {
    return {type:'SET_MODEL_VISIBLE',data:bool}
}

export const canSubmit = bool => {
    return {type:'SET_CANSUBMIT',data:bool}
}

export const saveOrderFields = field => {
    return {type: 'SAVE_APPFIELDS', data:field}
} 

export const setSuccess = bool => {
    return {type: 'SET_SUCCESS', data:bool}
} 