var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var usersRouter = require('./routes/api/users');
var patientsRouter = require('./routes/api/patientsRouter');
var hospitalRouter = require('./routes/api/hospitalRouter');
//var vaccineRouter = require('./routes/api/vaccineRouter');
var authRouter = require('./routes/api/auth');

const connectDB = require('./config/db');
var app = express();

// Connect  Database
connectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/users', usersRouter);
//app.use('/api/vaccines', vaccineRouter);
app.use('/api/hospital', hospitalRouter);
app.use('/api/patients', patientsRouter);
app.use('/api/auth', authRouter);

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
  app.use(express.static('client/build'));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'cient', 'build', 'index.html'));
  })
}
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
