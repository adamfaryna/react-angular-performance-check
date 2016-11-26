const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DebugWebpackPlugin = require('debug-webpack-plugin');

const baseConfig = require('./webpack.base.config')

module.exports = Object.assign({}, baseConfig, {
	devtool: '#inline-source-map',
	entry: {
    app : [ './src/app/app.js', 'webpack-hot-middleware/client?reload=true' ],
    vendor: [ 'react', 'react-dom', 'angular', 'jquery', 'babel-polyfill', 'webpack-hot-middleware/client?reload=true' ]
	},
	debug: true,
	plugins: [
		new DebugWebpackPlugin({
			scope: [
				'webpack:compiler:*'
			]
		}),
    new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: '!!pug!src/views/index.pug',
      cache: false,
      inject: true
    })
	]
});
