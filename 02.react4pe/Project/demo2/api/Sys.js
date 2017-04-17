const server = window.server||"";

const getFd = (values) => {
    let fd = "";
    for(let p in values) {
        fd += p+"="+encodeURIComponent(values[p])+"&";
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
    if(params) {
        obj.body = getFd(params);
    }
    return obj;
}

function ParseXML(val) {
    if(window.DOMParser)
    {
        parser=new DOMParser();
        xmlDoc=parser.parseFromString(val,"text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM"); xmlDoc.loadXML(val);
    }
    return xmlDoc;
}


//获取基础组件库的版本号
export const getVersion = () =>  {
	return new Promise((resolve,reject) => {
		fetch(server+'/cloudstore/system/version.xml',getFetchParams("get",""))
        .then(function(response){
            return response.text();
        })
		.then(function(xmlStr) {
            const value = ParseXML(xmlStr).getElementsByTagName('version')[0].childNodes[0].nodeValue;
	        resolve(value);
        }).catch(function(ex) {
           	reject(ex);
        });
	});
}


//是否绑定服务器-获取初始值
export const getTokenStatus = () =>  {
	return new Promise((resolve,reject) => {
		fetch(server+'/cloudstore/system/ControlServlet.jsp?action=Action_GetTokenStatus',getFetchParams("get",""))
		.then(function(response) {
			const datas = response.json();
	        resolve(datas);
        }).catch(function(ex) {
        	//console.log('ex',ex);
           	reject(ex);
        });
	});
}


//是否绑定服务器-手动修改
export const GetCloudStoreStatus = (params) =>  {
	return new Promise((resolve,reject) => {
		fetch(server+'/cloudstore/system/ControlServlet.jsp?action=Action_GetCloudStoreToken',getFetchParams("post",params))
		.then(function(response) {
			const datas = response.json();
	        resolve(datas);
        }).catch(function(ex) {
        	//console.log('ex',ex);
           	reject(ex);
        });
	});
}

//获取用户联系信息
export const getJoin = params =>{
	return new Promise((resolve,reject) => {
		fetch(server+'/cloudstore/system/ControlServlet.jsp?action=Action_GetJoin',getFetchParams("get",params))
		.then(res=> {
			const datas = res.json();
	        resolve(datas);
        }).catch(ex => {
           	reject(ex);
        });
	});
}

//提交用户联系信息
export const sendToJoin = params =>{
	return new Promise((resolve,reject) => {
		fetch(server+'/cloudstore/system/ControlServlet.jsp?action=Action_SendToJoin',getFetchParams("post",params))
		.then(res=> {
			const datas = res.json();
	        resolve(datas);
        }).catch(ex => {
           	reject(ex);
        });
	});
}

//获取菜单状态接口
export const getCsMenu = params =>{
	return new Promise((resolve,reject) => {
		fetch(server+'/cloudstore/system/ControlServlet.jsp?action=Action_GetCsMenu',getFetchParams("post",params))
		.then(res=> {
			const datas = res.json();
	        resolve(datas);
        }).catch(ex => {
           	reject(ex);
        });
	});
}

//设置菜单状态接口
export const setCsMenu = params =>{
	return new Promise((resolve,reject) => {
		fetch(server+'/cloudstore/system/ControlServlet.jsp?action=Action_SetCsMenu',getFetchParams("post",params))
		.then(res=> {
			const datas = res.json();
	        resolve(datas);
        }).catch(ex => {
           	reject(ex);
        });
	});
}
