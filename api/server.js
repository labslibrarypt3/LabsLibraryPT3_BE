const express = require("express");
const server = express();
const session = require("express-session");
const userDB = require("../DATA/helpers/usersDb");
const users = require("../routes/user-endpoints");
const auths = require("../routes/oauth/authenticate");
const goodreadsRoutes = require("../routes/goodreads");
const trans = require("../routes/transaction-endpoints");
const books = require("../routes/books-endpoints");
const stripeRouting = require("../routes/stripe/striperoutes");

// TWILIo //
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var home = require('./routes/home');
var token = require('./routes/token');

// TWILIO //



const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.use(express.json());
server.use(helmet());

server.use(morgan("dev"));
server.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000/",
      "https://goofy-mayer-45bb20.netlify.com/"
    ],
    AccessControlAllowOrigin: [
      "http://localhost:4000/",
      "https://pt3-neighborhood-library-back.herokuapp.com/"
    ],
    AccessControlAllowHeaders: "Authorization"
  })
);

server.use("/api/users", users);
server.use("/auths", auths);
server.use("/api/goodreads", goodreadsRoutes);

server.use("/api/trans", trans);
server.use("/api/books", books);
server.use("/api/striperoutes", stripeRouting);

//GET
server.get("/", (req, res) => {
  res.send("Hello World, from Neighborhood Library Backend");
});

server.get("/account", (req, res) => {
  res.send("account page here");
});

server.get("/mybookshelf", (req, res) => {
  res.send("mybookshelf page here");
});

server.get("/books", (req, res) => {
  res.send("books page here");
});

server.get("/users", (req, res) => {
  res.send("users page here");
});

<<<<<<< HEAD
=======
//TWILIO//
// server.set('views', path.join(__dirname, 'views'));
// server.set('view engine', 'jade');
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
// server.use(cookieParser());
// server.use(express.static(path.join(__dirname, 'public')));

server.use('/', home);
server.use('/token', token);

// catch 404 and forward to error handler
server.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (server.get('env') === 'development') {
  server.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
server.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});



>>>>>>> 0f967776d9788f57dbd16aa3343623e9f1830a6c
module.exports = server;
