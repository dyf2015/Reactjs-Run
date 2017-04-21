import { message } from 'antd'
//import message from '../_antd1.11.2/message'
//***********************************
//全局loding
var loadingtimeout;
var enduretimeout;
var loadingStatus = false;
export function gloading() {
    // console.log("gloading")
    loadingStatus = true;
    return function(dispatch) {
        if (loadingtimeout) {
            clearTimeout(loadingtimeout);
            loadingtimeout = 0;
        } else {
            dispatch(rloading()); 
        }
        enduretimeout = setTimeout(function() {
           dispatch(rloaded()); 
            // message.warn("加载超时，网速不给力。")
        }, 20000); //10秒超时上线
        loadingtimeout = setTimeout(function() {
            if (!loadingStatus) {
                dispatch(rloaded()); 
            }
            loadingtimeout = 0;
        }, 400);
    }
} 
export function gloaded() {
    // console.log("gloaded")
    loadingStatus = false;
    if (enduretimeout) {
        clearTimeout(enduretimeout);
        enduretimeout = 0;
    }
    return function(dispatch) {
        if (!loadingtimeout) {
            dispatch(rloaded());
        } 
    }
} 
function rloading() {
    return { type: "RLOADING" }
}
function rloaded() {
    return { type: "RLOADED" }
}


