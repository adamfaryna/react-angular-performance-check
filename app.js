var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var stylus = require('stylus');
var autoprefixer = require('autoprefixer-stylus');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(stylus.middleware({
	src: path.join(__dirname, 'public/stylesheets'),
	compile: function(str, path) {
		return stylus(str)
			.use(autoprefixer({browsers: 'last 2 versions', cascade: false}))
			.set('filename', path);
	}
}));

app.use('/public', function(req, res, next) {
  if (env !== 'development') {
    var result = req.url.match(/.*\.(maps|pug|styl)$/);

    if (result) {
      return res.status(403).end('403 Forbidden');
    }
  }
  
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
	res.render('index');
});

app.get('/partials/:name', function(req, res, next) {
	res.render('partials/' + req.params.name);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
