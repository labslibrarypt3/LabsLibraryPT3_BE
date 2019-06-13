//api imports
const express = require("express");
const server = express();
//db imports
const userDB = require("../DATA/helpers/usersDb");
//route imports
const users = require("../routes/user-endpoints");
const auths = require("../routes/oauth/authenticate");
const goodreadsRoutes = require("../routes/goodreads");
const trans = require("../routes/transaction-endpoints");
const books = require("../routes/books-endpoints");
const stripeRouting = require("../routes/stripe/striperoutes");
//middleware imports
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
//end imports

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

module.exports = server;
