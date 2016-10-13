var webpack = require('webpack');

module.exports = {
	entry: {
		'./run':'./main.js' // 编译后文件：编译前源码
	},
	output: {
		filename: '[name].js', // 输出文件名
	},
	module: {
		loaders: [ //js、css、less解析，这里要注意babel必须配置.babelrc文件，其中"presets": ["es2015"]用于支持es6语法，"plugins": ["transform-react-jsx"]用于解析jsx
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
			{ test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, 
      { test: /\.css$/, loader: 'style-loader!css-loader' }
		]
	}
}