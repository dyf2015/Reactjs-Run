var config = require('./weaconfig');

var appName = "esearch";

var mode = "release";

//mode = "debug";

const apps = {
    "esearch":{
        entry:"./project/EC_FULLSEARCH/src4js/index.js",
        output:"./project/EC_FULLSEARCH/WebRoot/ecology/mobile/plugin/fullsearch/js/index.js",
        styleUrl:"./project/EC_FULLSEARCH/WebRoot/ecology/mobile/plugin/fullsearch/css/index.css",
        ismobile:true
    }
}

module.exports = config.create(apps[appName],mode);