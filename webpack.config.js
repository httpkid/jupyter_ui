var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'eval-source-map', //debugging, generating source maps
	entry: {
		main: [
			'webpack-dev-server/client?http://localhost:8080',
			'webpack/hot/dev-server',
			'./src/js/app.js'		//here is app entry poiny
		]
	},
	output:{
		filename: '[name].js',
		path: path.join(__dirname, 'dev'),
		publicPath: '/dev/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin() ,
		new webpack.NoErrorsPlugin()
	],
	module: {
		loaders:[
			{
				test: /\.jsx?$/,		// jsx or js
				exclude: /node_modules/,
				loader: 'react-hot!babel',		//execute right -> left
			}
		]
	}
}
