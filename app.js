var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
// var stylus = require('stylus');
// var autoprefixer = require('autoprefixer-stylus');

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');

const isDeveloping = process.env.NODE_ENV !== 'production';

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(stylus.middleware({
// 	src: path.join(__dirname, 'views/stylesheets'),
// 	dest: path.join(__dirname, 'public'),
// 	compile: function(str, path) {
// 		return stylus(str)
// 			.set('filename', path)
// 			.set('compress', true)
// 			.use(autoprefixer({browsers: 'last 2 versions', cascade: false}));
// 	}
// }));

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.use('/public/images', express.static(path.join(__dirname, '/src/assets/images')));
  
} else {
  const config = require('./webpack.prod.config.js');

  app.use(express.static(__dirname + '/public'));
  app.get('/', function response(req, res) {
    res.sendFile(path.join(__dirname, 'build/index.html'));
  });
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
