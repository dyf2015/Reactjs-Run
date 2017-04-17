var config = require('./weaconfig');

var appName = "no005";

var mode = "release";

var node_env = "production";

var isOutput2Custom = true; //是否输出到自定义路径，开启后原路径将不输出

var customPath = "./DEMO/Weaver_20170116"; //自定义路径地址

const apps = {
    "no005":{ //一个项目
        entry:"./project/APP0000005/src4js/index.js", //项目路径
        output:"./project/APP0000005/WebRoot/ecology/cloudstore/app/no0000005/js/index.js",
        output2Custom:customPath+"/ecology/cloudstore/app/no0000005/js/index.js",
        isOutput2Custom:isOutput2Custom
    }
}

module.exports = config.create(apps[appName],mode,node_env);