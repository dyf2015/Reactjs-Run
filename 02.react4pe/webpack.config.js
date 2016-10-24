var appName = "csclient";

var mode = "release";

//mode = "debug";

const apps = {
    "cspc":{
        entry:"./project/WEAVER_CloudStore/src4js/pc1.0/"+(mode=="debug"?"debug":"index")+".js",
        output:"./project/WEAVER_CloudStore/WebRoot/WEB-INF/views/js/index.js",
        styleUrl:mode=="debug"?"":"./project/WEAVER_CloudStore/WebRoot/WEB-INF/views/css/index.css"
    },
    "csmobile":{
        entry:"./project/WEAVER_CloudStore/src4js/mobile1.0/"+(mode=="debug"?"debug":"index")+".js",
        output:"./project/WEAVER_CloudStore/WebRoot/WEB-INF/views/m/js/index.js",
        styleUrl:mode=="debug"?"":"./project/WEAVER_CloudStore/WebRoot/WEB-INF/views/m/css/index.css",
        ismobile:true
    },
    "csclient":{
        entry:"./project/WEAVER_CloudStore_ec/src4js/cloudstore_ec/index.js",
        output:"./project/WEAVER_CloudStore_ec/WebRoot/ecology/cloudstore/system/js/index.js"
    },
    "csclient4ec8":{
        entry:"./project/WEAVER_CloudStore_ec/src4js/cloudstore_ec/index4ec8.js",
        output:"./project/WEAVER_CloudStore_ec/WebRoot/ecology/cloudstore/system/js/index4ec8.js"
    },
    "comv1":{
        entry:"./project/WEAVER_CloudStore_ec/src4js/componentsV1/index.js",
        output:"./project/WEAVER_CloudStore_ec/WebRoot/ecology/cloudstore/resource/pc/com/index.js",
        outputlib:{
            library:"weaCom",
            libraryTarget: "umd"
        },
        styleUrl:"./project/WEAVER_CloudStore_ec/WebRoot/ecology/cloudstore/resource/pc/antd/antd.min.css"
    },
    "comv1.1":{
        entry:"./project/WEAVER_CloudStore_ec/src4js/componentsV1.1/index.js",
        output:"./project/WEAVER_CloudStore_ec/WebRoot/ecology/cloudstore/resource/pc/com/index.js",
        outputlib:{
            library:"weaCom",
            libraryTarget: "umd"
        },
        styleUrl:"./project/WEAVER_CloudStore_ec/WebRoot/ecology/cloudstore/resource/pc/antd/antd.min.css"
    },
    "comv1.2":{
        entry:"./project/WEAVER_CloudStore_ec/src4js/componentsV1.2/index.js",
        output:"./project/WEAVER_CloudStore_ec/WebRoot/ecology/cloudstore/resource/pc/com/index.min.js",
        outputlib:{
            library:"weaCom",
            libraryTarget: "umd"
        },
        styleUrl:"./project/WEAVER_CloudStore_ec/WebRoot/ecology/cloudstore/resource/pc/com/index.min.css"
    },
    "plugin":{
        entry:"./project/WEAVER_CloudStore_ec/src4js/cloudstore_ec/plugin.js",
        output:"./project/WEAVER_CloudStore_ec/WebRoot/ecology/cloudstore/system/js/plugin.js",
        outputlib:{
            library:"weaPlugin",
            libraryTarget: "umd"
        }
    },
    "no002":{
        entry:"./project/APP0000002/src4js/pc/index.js",
        output:"./project/APP0000002/WebRoot/ecology/cloudstore/app/no0000002/app/js/index.js"
    },
    "no004":{
        entry:"./project/APP0000004/src4js/index.js",
        output:"./project/APP0000004/WebRoot/ecology/cloudstore/app/no0000004/js/index.js"
    },
    "no005":{ //工资条
        entry:"./project/APP0000005/src4js/index.js",
        output:"./project/APP0000005/WebRoot/ecology/cloudstore/app/no0000005/js/index.js"
    },
    "no006":{
        entry:"./project/APP0000006/src4js/wfTrigger.js",
        output:"./project/APP0000006/WebRoot/ecology/cloudstore/app/no0000006/js/wfTrigger.js"
    },
    "no006set":{
        entry:"./project/APP0000006/src4js/wfTriggerSet.js",
        output:"./project/APP0000006/WebRoot/ecology/cloudstore/app/no0000006/js/wfTriggerSet.js"
    },
    "no012":{
        entry:"./project/APP0000012/src4js/index.js",
        output:"./project/APP0000012/WebRoot/ecology/cloudstore/app/no0000012/js/wfDetail.js",
        outputlib:{
            library:"wfDetail",
            libraryTarget: "umd"
        }
    },
    "no012set":{
        entry:"./project/APP0000012/src4js/set/index.js",
        output:"./project/APP0000012/WebRoot/ecology/cloudstore/app/no0000012/js/set.js"
    },
    "no037":{
        entry:"./project/APP0000037/src4js/index.js",
        output:"./project/APP0000037/WebRoot/ecology/cloudstore/app/no0000037/js/index.js"
    },
    "no045":{
        entry:"./project/APP0000045/src4js/index.js",
        output:"./project/APP0000045/WebRoot/ecology/cloudstore/app/no0000045/js/index.js"
    },
    "no053":{
        entry:"./project/APP0000053/src4js/index.js",
        output:"./project/APP0000053/WebRoot/ecology/cloudstore/app/no0000053/js/index.js"
    },
    "no071":{
        entry:"./project/APP0000071/src4js/index.js",
        output:"./project/APP0000071/WebRoot/ecology/cloudstore/app/no0000071/js/index.js"
    },
    "no086":{
        entry:"./project/APP0000086/src4js/index.js",
        output:"./project/APP0000086/WebRoot/ecology/cloudstore/app/no0000086/js/index.js"
    },
    "no087":{ //流程导入
        entry:"./project/APP0000087/src4js/index.js",
        output:"./project/APP0000087/WebRoot/ecology/cloudstore/app/no0000087/js/index.js"
    },
    "no089":{
        entry:"./project/APP0000089/src4js/index.js",
        output:"./project/APP0000089/WebRoot/ecology/cloudstore/app/no0000089/js/index.js"
    },
    "no090":{
        entry:"./project/APP0000090/src4js/index.js",
        output:"./project/APP0000090/WebRoot/ecology/cloudstore/app/no0000090/js/index.js"
    },
    "esearch":{
        entry:"./project/EC_FULLSEARCH/src4js/index.js",
        output:"./project/EC_FULLSEARCH/WebRoot/ecology/mobile/plugin/fullsearch/js/index.js",
        styleUrl:"./project/EC_FULLSEARCH/WebRoot/ecology/mobile/plugin/fullsearch/css/index.css",
        ismobile:true
    }
}

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

var output = apps[appName].output.split("/");

var wp4ec = {
   entry:apps[appName].entry,
   output:{
      filename:apps[appName].output
   },
   plugins: [
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings:false
          }
      }),
      new ExtractTextPlugin(apps[appName].styleUrl, {
          disable: apps[appName].styleUrl?false:true, 
          allChunks: true, 
      }),
      new webpack.DefinePlugin({
          'process.env.NODE_ENV':"'production'" //production
      })
    ],
    externals: [
        {'react': 'React'},
        {'react-dom': 'ReactDOM'},
        {'antd': 'antd'},
        {'weaCom':'weaCom'}
    ],
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader"+(apps[appName].ismobile?"!postcss-loader":""),"css-loader"+(apps[appName].ismobile?"!postcss-loader":""))},
            { test: /\.jpe?g$|\.gif$|\.eot$|\.png$|\.svg$|\.woff$|\.woff2$|\.ttf$/,loader: "file" },
            { test: /\.less$/,loader: ExtractTextPlugin.extract("css!less"+(apps[appName].ismobile?"!postcss-loader":"")) }
        ]
    },
    resolve: {
        extensions: ['', '.web.js', '.js','.jsx', '.json'],
    },
    babel: {
        plugins:[]
    },
    postcss: []
};

const pxtorem = require('postcss-pxtorem');

if(apps[appName].outputlib) {
    wp4ec.output.library = apps[appName].outputlib.library;
    wp4ec.output.libraryTarget = apps[appName].outputlib.libraryTarget;
}

if(apps[appName].ismobile) {
    wp4ec.babel.plugins.push('transform-runtime');
    wp4ec.babel.plugins.push(['antd', {
      style: 'css',  // if true, use less
      libraryName: 'antd-mobile'
    }]);
    wp4ec.postcss.push(pxtorem({
      rootValue: 100,
      propWhiteList: [],
    }));
    //console.log("wp4ec:",wp4ec);
}

module.exports = "release"===mode?wp4ec:function(webpackConfig) {
  webpackConfig.entry = {index:apps[appName].entry};
  webpackConfig.externals = [
        {'react': 'React'},
        {'react-dom': 'ReactDOM'},
        {'antd': 'antd'},
        {'weaCom':'weaCom'}
  ];
  if(apps[appName].ismobile) {
      webpackConfig.babel.plugins.push('transform-runtime');
      webpackConfig.babel.plugins.push(['antd', {
        style: 'css',  // if true, use less
        libraryName: 'antd-mobile'
      }]);
      webpackConfig.postcss.push(pxtorem({
        rootValue: 100,
        propWhiteList: [],
      }));
  }
  else {
      webpackConfig.babel.plugins.push('antd');
  }
  console.log(webpackConfig.module.loaders);
  return webpackConfig;
};