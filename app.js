const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const lessMiddleware = require('less-middleware');
const helmet = require('helmet');
const expressValidator = require('express-validator');
const commandLineArgs = require('command-line-args');
const getUsage = require('command-line-usage');
 
const optionDefinitions = [
  { name: 'verbose', alias: 'v' },
  { name: 'help', alias: 'h' },
  { name: 'db', alias: 'd' }, 
  { name: 'server', alias: 's' }
];

const options = commandLineArgs(optionDefinitions);

const index = require('./routes/index');
const apiV1 = require('./routes/apiV1');
const apiV2 = require('./routes/apiV2');

const app = express();

const port = process.env.PORT || 8080;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

app.use('/', index);

app.use('/api/v1', apiV1);
app.use('/api/v2', apiV2)
app.use('/api', apiV2);

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

if (options.server) {
  app.listen(port);
}

module.exports = app;
