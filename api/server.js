const express = require("express");
// brings in express to create the application or server
const server = express();
const userDB = require("../DATA/helpers/usersDb");
const users = require("../routes/user-endpoints");
const auths = require("../routes/oauth/authenticate")
const goodreadsRoutes = require("../routes/goodreads");
const trans = require("../routes/transaction-endpoints")
const books = require("../routes/books-endpoints")
const restricted = require("../middleware/restricted")
const stripeRouting = require("../routes/stripe/striperoutes");


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
server.use(restricted);
server.use("/api/users", users);
server.use("/auths", auths);
server.use("/api/goodreads", goodreadsRoutes);

server.use("/api/trans", trans);
server.use("/api/books", books)
server.use("/api/striperoutes", stripeRouting);

server.get("/", (req, res) => {
  res.send("Hello World, from Neighborhood Library Backend");
});



module.exports = server;
