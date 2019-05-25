const express = require("express");
const userDB = require("../DATA/helpers/usersDb");
const users = require("../routes/user-endpoints");
const goodreadsRoutes = require("../routes/goodreads");

const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use(cors());

server.use("/api/users", users);
server.use("/api/goodreads", goodreadsRoutes);

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
