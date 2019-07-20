var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('./helpers/jwt');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/v1/users/users.controller');
var productRouter  = require('./routes/v1/products/product.controller');
var signUpRouter = require('./routes/signup')

var app = express();
/* 
var mongoClient = require('mongodb').MongoClient;
mongoClient.connect('mongodb://nghia:Nghia123456@ds064649.mlab.com:64649/testt', { useNewUrlParser: true }, function (err, db) {
    //neu ket noi khong thanh cong thi in ra loi
    if (err) throw err;
    //neu thanh cong thi log ra thong bao
    console.log('Ket noi thanh cong');
});
 */


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//
// use JWT auth to secure the api
app.use(jwt());

// api routes V1
app.use('/v1/user', usersRouter);
app.use('/v1/product', productRouter);


//
app.use('/', indexRouter);
app.use('/signup', signUpRouter);
app.use('/dsusers', require('./routes/users'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
