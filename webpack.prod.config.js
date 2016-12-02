const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.base.config')

module.exports = Object.assign({}, baseConfig, {
  entry: {
    app : [ './src/app/app.js' ],
    vendor: [ 'react', 'react-dom', 'angular', 'jquery', 'babel-polyfill' ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: '!!pug!src/views/index.pug',
      cache: true,
      inject: true
    })
  ]
});
