var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
const mongoose = require("mongoose");

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var languagesRouter = require('./routes/controller/languages');
var genreRouter = require("./routes/controller/genre");
var movieRouter = require("./routes/controller/movie");
var WebSeriesRouter = require("./routes/controller/webseries");
var SeasonsRouter = require("./routes/controller/AddSeasons");
var EpisodeRouter = require("./routes/controller/Episode");

// Client API routes
var clientAuthRoutes = require("./routes/client/authRoutes");
var clientFavoriteRoutes = require("./routes/client/favoriteRoutes");
var clientSubscriptionRoutes = require("./routes/client/subscriptionRoutes");
var errorHandler = require("./middleware/errorHandler");

var getdb = require("./common/getdb");
require("dotenv").config();

var app = express();

// Initialize Mongoose connection to MongoDB Atlas
mongoose.connect(process.env.MONGOURI || process.env.MONGO_URI, { dbName: "movieflix" })
  .then(() => console.log("Mongoose connected to MongoDB Atlas (movieflix)"))
  .catch((err) => console.error("Mongoose connection error:", err));

// view engine setup
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Initialize MongoClient connection
getdb();

app.use('/uploads', express.static("uploads"));

// Admin routes
app.use('/', indexRouter);
app.use('/movieflix', userRouter);
app.use('/movieflix', languagesRouter);
app.use('/movieflix', genreRouter);
app.use("/movieflix", movieRouter);
app.use("/movieflix", WebSeriesRouter);
app.use("/movieflix", SeasonsRouter);
app.use("/movieflix", EpisodeRouter);

// Centralized Client APIs
app.use("/api", clientAuthRoutes);
app.use("/api", clientFavoriteRoutes);
app.use("/api", clientSubscriptionRoutes);

// Client JSON error handler (only handles /api route errors before default HTML renderer)
app.use("/api", errorHandler);

// catch 404
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler (Default HTML Renderer)
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
