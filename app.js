const express = require('express');
const path = require('path');
const logger = require('morgan');
const webpack = require('webpack');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

const isDeveloping = process.env.NODE_ENV !== 'production';

if (isDeveloping) {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const config = require('./webpack.dev.config.js');

  // app.set('view options', { debug: true });

  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    // contentBase: 'src',
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
