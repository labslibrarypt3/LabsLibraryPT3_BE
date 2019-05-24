const express = require("express");
const server = express();
const userDB = require("../DATA/helpers/usersDb");
const users = require("../routes/user-endpoints");
const goodreadsRoutes = require("./goodreads");

const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

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

// get a list of users
server.get("/list", async (req, res) => {
  try {
    const user = await userDB.get(req.query);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the Users"
    });
  }
});

module.exports = server;
