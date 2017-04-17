import { combineReducers } from 'redux'
//import { routerReducer } from 'react-router-redux'
import {routerReducer} from 'react-router-redux/lib/reducer'

import init from './Init'
import auth from './Auth'
import role from './Role'
import apps from './Apps'
import util from './Util'
import sys from './Sys'

/**
 * reducer深克隆
 */
function deepClone(obj) {
    var result,oClass=isClass(obj);
        //确定result的类型
    if(oClass==="Object"){
        result={};
    }else if(oClass==="Array"){
        result=[];
    }else{
        return obj;
    }
    for(var key in obj){
        var copy=obj[key];
        if(isClass(copy)=="Object"||"Array"){
            result[key]=deepClone(copy);//递归调用
        }else{
            result[key]=obj[key];
        }
    }
    return result;
}
function isClass(o){
    if(o===null) return "Null";
    if(o===undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8,-1);
}
window.deepClone = deepClone;


const rootReducer = combineReducers({
    apps,
	init,
    auth,
    role,
    util,
    sys,
	routing:routerReducer
})

export default rootReducer

