//import Constants from '../constants/ActionTypes'
//
//export function addTask(text) {
//	return { type: Constants.ADD_TASK, text }
//}
//
//export function doInit() {
//  configMsgDatas = [];
//  let configMsgData = {
//      title:"",
//      value:"",
//      type:""
//  };
//  configMsgData.title = "步骤一：web.xml自动检测";
//  changeLoading(true);
//  $.ajax({
//      type:"POST",
//      url:"/cloudstore/system/ControlServlet.jsp?action=Action_CheckWebXml",
//      success(edatas) {
//          if(edatas.status!="false") {
//              const datas = edatas;
//              let configMsgBtn = false;
//              if(datas=="0") {
//                  configMsgData.value = "经过检测web.xml已初始化，将自动进入下一步！";
//                  configMsgData.type = "success";
//              }
//              else if(datas=="1") {
//                  configMsgData.value = "经过检测web.xml未进行初始化，点击确认后系统将自动为您初始化，初始化之后系统将会自动重启，请您先做好保存工作再点击确认！";
//                  configMsgData.type = "warning";
//                  console.log("系统",configMsgBtn)
//                  configMsgBtn = true;
//              }
//              else {
//                  configMsgData.value = "web.xml检测程序出现问题，请联系管理员！";
//                  configMsgData.type = "error";
//              }
//              configMsgDatas[0] = configMsgData;
//              changeLoading(false);
//              //configMsgBtn = false;
//              if(datas=="0") {
//                  doXmlConfig();
//              }
//          }
//          else {
//              fliter4error(edatas);
//              configMsgData.value = "web.xml检测接口出现问题，请联系管理员！";
//              configMsgData.type = "error";
//              configMsgDatas[0] = configMsgData;
//              changeLoading(false);
//          }
//      },
//      error(edatas) {
//          fliter4error(datas4false);
//          configMsgData.value = "web.xml检测接口出现问题，请联系管理员！";
//          configMsgData.type = "error";
//          configMsgDatas[0] = configMsgData;
//          changeLoading(false);
//      },
//      dataType: "json"
//  });
//  
// 
////     fetch(server+'/cloudstore/system/ControlServlet.jsp?action=Action_CheckWebXml',{
////          method: 'get',
////          mode: "no-cors",
////          headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'},
////          credentials: 'include'
////     }).then(function(response) {
////           const edatas = response.json();
////          if(edatas.status!="false") {
////              const datas = edatas;
////              if(datas=="0") {
////                  configMsgData.value = "经过检测web.xml已初始化，将自动进入下一步！";
////                  configMsgData.type = "success";
////              }
////              else if(datas=="1") {
////                  configMsgData.value = "经过检测web.xml未进行初始化，点击确认后系统将自动为您初始化，初始化之后系统将会自动重启，请您先做好保存工作再点击确认！";
////                  configMsgData.type = "warning";
////                  configMsgBtn = true;
////              }
////              else {
////                  configMsgData.value = "web.xml检测程序出现问题，请联系管理员！";
////                  configMsgData.type = "error";
////              }
////              configMsgDatas[0] = configMsgData;
////              changeLoading(false);
////              configMsgBtn = false;
////              if(datas=="0") {
////                  doXmlConfig();
////              }
////          }
////          else {
////              fliter4error(edatas);
////              configMsgData.value = "web.xml检测接口出现问题，请联系管理员！";
////              configMsgData.type = "error";
////              configMsgDatas[0] = configMsgData;
////              changeLoading(false);
////          }
////            
////     }).catch(function(edatas) {
////			fliter4error(datas4false);
////          configMsgData.value = "web.xml检测接口出现问题，请联系管理员！";
////          configMsgData.type = "error";
////          configMsgDatas[0] = configMsgData;
////          changeLoading(false);      
////      });
//  
//}
///*
//
//
//	return ( dispatch, getStore ) => {
//		console.log("getStore:",getStore);
//		dispatch({ type: types.ADD_TASK, text });
//	}
//
//export function addTodo(text) {
//return { type: types.ADD_TODO, text }
//}
//
//export function deleteTodo(id) {
//return { type: types.DELETE_TODO, id }
//}
//
//export function editTodo(id, text) {
//return { type: types.EDIT_TODO, id, text }
//}
//
//export function completeTodo(id) {
//return { type: types.COMPLETE_TODO, id }
//}
// 
//export function completeAll() {
//return { type: types.COMPLETE_ALL }
//}
//
//export function clearCompleted() {
//return { type: types.CLEAR_COMPLETED }
//}
//
//export const GET_LATEST_DATA = () => {
//	return ( dispatch, getStore ) => {
//		if(getStore().mainList.length > 0) {
//			return;
//		}
//		getLatestStory().then(data => {
//			dispatch(GET_LATEST(data))
//			//首次加载时除了最新的还加载昨天的，因为高度不够无法触发到底部刷新加载历史内容
//			dispatch(GET_HISTORY_DATA(getStore().UIState.LoadingDate))
//			dispatch(STOP_LOADING())
//		})
//	}
//}
//
//*/