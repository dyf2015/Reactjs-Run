var webpack = require('webpack');

var commonsPlugin =
    new webpack.optimize.CommonsChunkPlugin('common.js');
var minifyPlugin = 
	new webpack.optimize.MinChunkSizePlugin({
    compress: {
        warnings: false
    }
});

module.exports = {
	entry: {
		//'../MyWorkspaces/WEAVER_CloudStore_APP0000001/WebRoot/ecology/cloudStore/app/NO0000001/resource/Build' : './NO0000001/build.js',
		//'../MyWorkspaces/WEAVER_CloudStore_APP0000002/WebRoot/ecology/cloudStore/app/NO0000002/resource/Build' : './NO0000002/build.js',
		//'../MyWorkspaces/WEAVER_CloudStore_APP0000003/WebRoot/ecology/cloudStore/app/NO0000003/resource/Build' : './NO0000003/build.js',
		//'../MyWorkspaces/WEAVER_CloudStore_APP0000004/WebRoot/ecology/cloudStore/app/NO0000004/resource/Build' : './NO0000004/build.js',
		//'../MyWorkspaces/WEAVER_sbh_pj/WebRoot/ecology/dyf/pj/resource/Build' : './DYF0000001/build.js',
		//'../MyWorkspaces/WEAVER_sbh_pj/WebRoot/ecology/dyf/pj/resource/Build1' : './DYF0000002/allEvaluate.js',
		//'../MyWorkspaces/WEAVER_sbh_app01Budget/WebRoot/ecology/dyf/budget/js/BudgetRepor4Wf' : './DYF0000002/build.js',
		'./run':'./main.js'
	},
	output: {
		//path: 'resource/',
		filename: '[name].js',
	},
	plugins: [
		//commonsPlugin,
		//minifyPlugin
	],
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
			{ test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
      		{ test: /\.css$/, loader: 'style-loader!css-loader' }
		]
	},
	/*
	externals: [
	    {
	      'react': {
	        root: 'React',
	        commonjs2: 'react',
	        commonjs: 'react',
	        amd: 'react'
	      }
	    },
	    {
	      'react-dom': {
	        root: 'ReactDOM',
	        commonjs2: 'react-dom',
	        commonjs: 'react-dom',
	        amd: 'react-dom'
	      }
	    }
	]*/
}