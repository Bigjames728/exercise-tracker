var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const mongoose = require('mongoose');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);



require('dotenv').config();

var exercisesRouter = require('./routes/exerciseRoutes');
var usersRouter = require('./routes/userRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// use sessions for tracking logins - keeping this for now even though starting over with /login endpoint
app.use(session({
  secret: 'exercise tracker',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection,
                          ttl: 2 * 24 * 60 * 60 })
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Add routes - anything ending in /exercises will then continue on to the exercise routes and same with /users for the user routes
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// Connect to MongoDB Atlas
const uri = process.env.ATLAS_URI;

mongoose.connect(uri);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully!");
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err); // This logs server side errors to the console rather than trying to render the error view with pug template
});

module.exports = app;
