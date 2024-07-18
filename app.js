const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require("mysql");

const indexRouter = require('./routes/index');

const manageNumberRouter = require('./routes/manage-number');

//const myInfoRouter = require('./routes/my-info.js');

const app = express();

// 使用するデータベースの情報を記述
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "u6e67u958b",
  database: 'base'
});

// データ・ベース接続時のログ
connection.connect((err) => {
  if (err) {
    console.log(`error connecting: ${err.stack}`);
    return;
  }
  console.log('success!');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);

//app.use('/update', manageNumberRouter);

app.use('/products/add', manageNumberRouter);

//app.use('/get-my-info', myInfoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
module.exports = connection;