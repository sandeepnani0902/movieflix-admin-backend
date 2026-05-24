var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var languagesRouter = require('./routes/controller/languages');
var genreRouter = require("./routes/controller/genre");
var movieRouter = require("./routes/controller/movie");
var WebSeriesRouter = require("./routes/controller/webseries")
var SeasonsRouter = require("./routes/controller/AddSeasons")
var EpisodeRouter = require("./routes/controller/Episode")
// var addmovieRouter = require("./routes/controller/movie")
// const multer = require('multer');
// const dns = require("node:dns")
// // dns.setServers(["4.4.4.4", "8.8.8.8"])
// dns.setServers(['8.8.8.8', '8.8.4.4']);

var getdb = require("./common/getdb")
var app = express();


// view engine setup
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
getdb()
app.use('/uploads', express.static("uploads"))
// app.use('/uploads/profile', express.static('uploads/profile'));
app.use('/', indexRouter);
app.use('/movieflix', userRouter);
app.use('/movieflix', languagesRouter);
app.use('/movieflix', genreRouter);
app.use("/movieflix", movieRouter);
app.use("/movieflix", WebSeriesRouter)
app.use("/movieflix", SeasonsRouter)
app.use("/movieflix", EpisodeRouter)
// app.use("/movieflix", addmovieRouter)
// catch 404
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
