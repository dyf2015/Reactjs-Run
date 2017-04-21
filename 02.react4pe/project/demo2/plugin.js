var innerCom = {
    indexCb:function(value) {}
}

var params = document.getElementById("csplugin").getAttribute("params");
var paramArr = params?params.split(","):[];

function findApp(s) {
    var find = false;
    for(var i=0;i<paramArr.length&&!find;i++) {
        if(s==paramArr[i]) {
            find = true;
        }
    }
    return find;
}

function openPlugin() {
    if(findApp("no0000006")) {
        loadJs("/cloudstore/app/no0000006/js/wfTrigger.js",function() {
            innerCom.indexCb("0000006");
        });
    }
    if(findApp("no0000012")) {
        loadJs("/cloudstore/app/no0000012/js/wfDetail.js",function() {
            innerCom.indexCb("0000012");
        });
    }
    if(findApp("index")) {
        innerCom.indexCb("index");
    }
}

function loadResource() { //.min //.min
    loadJs("/cloudstore/resource/pc/react/react-with-addons.min.js",function() {
        loadJs("/cloudstore/resource/pc/react/react-dom.min.js",function() {
            loadJs("/cloudstore/resource/pc/antd/antd.min.js",function() {
                loadCss("/cloudstore/resource/pc/antd/antd.min.css",function() {
                     loadJs("/cloudstore/resource/pc/promise/promise.min.js",function() {
                         loadJs("/cloudstore/resource/pc/fetch/fetch.min.js",function() {
                             loadJs("/cloudstore/resource/pc/com/index.js",function() {
                                if(typeof JSON == 'undefined') {
                                    loadJs("/cloudstore/resource/pc/json2/json2.js",function() {
                                       openPlugin(); 
                                    });
                                }
                                else {
                                    openPlugin();
                                }
                            });
                        });
                    });
                });
            });
        });
    });
}

var mode = 0;
try {
    mode = parseInt(document.documentMode);
    //alert("["+mode+"]");
}catch(e){
    mode = 0;
}
//alert(mode<=9);
//console.log("paramArr:",paramArr);
//console.log("!findApp(0000006):",!findApp("0000006"));
//console.log("!findApp(0000012):",!findApp("0000012"));
//console.log("window.csPluginIsRun:",window.csPluginIsRun);
if(!window.csPluginIsRun) {
window.csPluginIsRun = true;
//console.log("isis");
if(mode>0) {
    loadJs("/cloudstore/resource/pc/shim/shim.min.js",function() {
        loadResource();
    });
}
else {
    loadResource();
}

}

function loadJs(url, callback) {
    //console.log(url);
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.charset = "utf-8";
    // IE
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { // others
        script.onload = function () {
            callback();
        };
    }
    //console.log("url1:",url);
    script.src = url;
    //if(!isIE8())
        //document.head.appendChild(script);
    //else
        document.getElementsByTagName('head')[0].appendChild(script);
}

function loadCss(url, callback) {
    //console.log(url);
    var css = document.createElement("link");
    css.setAttribute('rel', 'stylesheet');
    css.setAttribute('type', 'text/css');
    css.setAttribute('href', url);
    // IE
    if (css.readyState) {
        css.onreadystatechange = function () {
            if (css.readyState == "loaded" || css.readyState == "complete") {
                css.onreadystatechange = null;
                callback();
            }
        };
    } else { // others
        css.onload = function () {
            callback();
        };
    }
    css.src = url;
    document.getElementsByTagName('head')[0].appendChild(css);
}

function loadMeta(callback) {
    var obj = document.createElement("meta");
    obj.setAttribute('http-equiv','X-UA-Compatible');
    obj.setAttribute('content','IE=8');
    if (obj.readyState) {
        obj.onreadystatechange = function () {
            if (obj.readyState == "loaded" || obj.readyState == "complete") {
                obj.onreadystatechange = null;
                callback();
            }
        };
    } else { // others
        obj.onload = function () {
            callback();
        };
    }
    document.getElementsByTagName('head')[0].appendChild(obj);
}

module.exports = innerCom;