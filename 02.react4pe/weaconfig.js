var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var marked = require("marked");

var CSSSplitWebpackPlugin = require("css-split-webpack-plugin").default;

var es3ifyPlugin = require('es3ify-webpack-plugin');

exports.create = function (obj, mode, node_env) {

    node_env = node_env==""?null:node_env;

    var output = obj.output.split("/");

    marked.setOptions({
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
    });

    marked.setOptions({
        highlight: function (code) {
            //console.log("code:",code);
            return require('highlight.js').highlightAuto(code, ["javascript", "html", "java", "json"]).value;
        }
    });

    var renderer = new marked.Renderer();

    var plugins = [];


    if(node_env!="development") {
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: false
            },
            sourceMap: true,
            mangle: { screw_ie8: false },
            output: { screw_ie8: false }
        }));
    }

    var styleUrl = obj.isOutput2Custom?obj.style2Custom:obj.styleUrl;

    plugins.push(new ExtractTextPlugin(styleUrl, {
        disable: obj.styleUrl ? false : true,
        allChunks: true,
    }));

    if(!node_env) node_env = "production";

    plugins.push(new webpack.DefinePlugin({
        'process.env.NODE_ENV': "'"+node_env+"'" //production
    }));

    if(obj.isCssSplit) plugins.push(new CSSSplitWebpackPlugin(
        {
            size: 3500,
            filename:styleUrl.substring(0,styleUrl.length-4)+"-[part].[ext]"
        }
    ));

    if(!obj.ismobile) plugins.push(new es3ifyPlugin());

    var wp4ec = {
        entry: obj.entry,
        output: {
            filename: obj.isOutput2Custom?obj.output2Custom:obj.output
        },
        devtool:'source-map',
        plugins: plugins,
        externals: [
            { 'react': 'React' },
            { 'react-dom': 'ReactDOM' },
            { 'antd': 'antd' },
            { 'weaCom': 'weaCom' },
            { 'ecCom': 'ecCom' },
            { 'weaWorkflow': 'weaWorkflow' },
            { 'weaPortal': 'weaPortal' },
            { 'jquery': 'jQuery' },
            { '$': '$'}
        ],
        module: {
            loaders: [
                { test: /\.md$/, loader: "html!markdown" },
                { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
                { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader' },
                { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader"+(obj.ismobile?"!postcss-loader?sourceMap=inline":"")) },
                //{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader" + (obj.ismobile ? "!postcss-loader" : ""), "css-loader" + (obj.ismobile ? "!postcss-loader" : "")) },
                { test: /\.jpe?g$|\.gif$|\.eot$|\.png$|\.svg$|\.woff$|\.woff2$|\.ttf$/, loader: "file" },
                { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader"+(obj.ismobile?"!postcss-loader":"")+"!less-loader") }
                //{ test: /\.less$/, loader: ExtractTextPlugin.extract("css!less" + (obj.ismobile ? "" : "")) }
            ]
        },
        resolve: {
            extensions: ['', '.web.js', '.js', '.jsx', '.json'],
        },
        babel: {
            plugins: []
        },
        postcss: [],
        markdownLoader: {
            renderer: renderer
        }
    };

    const pxtorem = require('postcss-pxtorem');

    if (obj.outputlib) {
        wp4ec.output.library = obj.outputlib.library;
        wp4ec.output.libraryTarget = obj.outputlib.libraryTarget;
    }

    if (obj.ismobile) {
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
    else {
        wp4ec.babel.plugins.push(['antd', {
            style: 'style',  // if true, use less
            libraryName: 'newporject'
        }]);
    }
    return "release" === mode ? wp4ec : function (webpackConfig) {
        webpackConfig.entry = { index: obj.entry };
        webpackConfig.externals = [
            { 'react': 'React' },
            { 'react-dom': 'ReactDOM' },
            { 'antd': 'antd' },
            { 'weaCom': 'weaCom' }
        ];
        if (obj.ismobile) {
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
        	//移除common.js
			if (webpackConfig.plugins[0].chunkNames === 'common') {
		    	webpackConfig.plugins.shift();
			}
            webpackConfig.babel.plugins.push('antd');
        }
        webpackConfig.module.loaders[0].query.cacheDirectory = "/Users/daiyingfeng/Projects/tmp";
        webpackConfig.module.loaders[1].query.cacheDirectory = "/Users/daiyingfeng/Projects/tmp";
        console.log(webpackConfig);
        return webpackConfig;
    };
}
