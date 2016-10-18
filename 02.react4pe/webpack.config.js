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
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader"+(apps[appName].ismobile?"!postcss-loader":""),"css-loader"+(apps[appName].ismobile?"!postcss-loader":""))},
            { test: /\.jpe?g$|\.gif$|\.eot$|\.png$|\.svg$|\.woff$|\.woff2$|\.ttf$/,loader: "file" },
            { test: /\.less$/,loader: ExtractTextPlugin.extract("css!less"+(apps[appName].ismobile?"!postcss-loader":"")) }
        ]
    },
    resolve: {
        extensions: ['', '.web.js', '.js', '.json'],
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
  //console.log(webpackConfig);
  return webpackConfig;
};
