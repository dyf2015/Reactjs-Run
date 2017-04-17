import keyMirror from 'keymirror';

const Constants = keyMirror({
    INIT: null,
    AUTH: null,
    ROLE_DEL:null,
    ROLE_INIT:null,
    ROLE_DATEGET:null,
    ROLE_MEMBERADD:null,
    ROLE_MEMBERDEL:null,
    SAVEBASICFORM:null,
    ROLE_GET:null,
    GETPARTAPP:null,
    GETCOUNT:null,
    GETAPPINFO:null,
    GETVERSION:null,
    GETTOKENBINDING:null,
    ROLE_PUTHAVENOSAVE:null,
    ROLE_SELECTDATAS:null,
    ROLE_CLEAN:null,
    SHOWFORM:null,
    CHANGEVALUE:null,
    CHANGETHEME:null,
    CLEANOBJ:null,
    RLOADING:null,
    RLOADED:null,
    GCLEAN:null,
    SET_MODEL_VISIBLE:null, //用户联系方式弹框
    SET_CANSUBMIT:null, 	//用户联系方式提交权限
    SAVE_APPFIELDS:null, 	//表单绑定redux实时监测
    SET_SUCCESS:null,		//提交成功标志
    SET_PCISOPEN:null,		//设置pc地址开启状态
    SET_MOBILEISOPEN:null,	//设置mobile地址开启状态
    SET_LOADING:null,		//设置提交loading
    SET_APP_MENU_KEY:null,	//app菜单
    SET_ISJOIN:null			//设置是否已经加入过
});
export default Constants
