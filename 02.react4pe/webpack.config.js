let config = require('./weaconfig/weaconfig');
let e9path = require('./weaconfig/weapath4e9');

//是否热部署
let mode = "release";
mode = "debug"

//编译模式，是按发布版编译还是按开发版编译
let node_env = "production";
//node_env = "development";

let custom = false; //是否是自定义路径模式

if(custom) { //自定义配置

    const apps = {
        "ecology9":{
            entry:"./project/WEAVER_E9/src4js/pc/main/index.js",
            output:"./project/WEAVER_E9/WebRoot/ecology/wui/theme/ecology9/js/index.js",
            styleUrl:"./project/WEAVER_E9/WebRoot/ecology/wui/theme/ecology9/css/index.css"
        }
    }

    let obj = apps['ecology9'];

    module.exports = config.create(obj,mode,node_env);
}
else { //已内置配置

    const pathConfig = {
        name:"workflow", //打包的功能名
        srcPath:"./project/WEAVER_E9", //本地源代码路径src4js的上一层，比如main的完整的路径为：./project/WEAVER_E9/src4js/pc/main/index.js
        //srcPath:"./project/WEAVER_CloudStore_ec",
        //runPath:"./project/WEAVER_E9/WebRoot/ecology", //本地编译后路径ecology一层，比如main的完整的路径为：./project/WEAVER_E9/WebRoot/ecology/wui/theme/ecology9/js/index.js
        runPath:"./DEMO/weaver_e9/ecology", //也可以直接输出到demo中
        mode:mode
    }

    let obj = e9path.getPath(pathConfig);

    module.exports = config.create(obj,mode,node_env);
}
/*
 E9模块对应配置说明
 main - 主入口
 bs_main - 后台主入口
 coms_global - 流程弹出页目前的老js整体打包压缩
 workflow - 流程
 workflow4dev - 流程（开发版）
 workflow4dev_single - 流程入口（支持流程弹窗打开）
 portal - 门户
 document - 文档
 blog - 微博
 fna - 财务
 meeting - 会议
 hrm - 人力
 inte - 集成

 */
