//api imports
const express = require("express");
// brings in express to create the application or server
const server = express();

//db imports
const userDB = require("../DATA/helpers/usersDb");
//route imports
const users = require("../routes/user-endpoints");
const auths = require("../routes/oauth/authenticate");
const goodreadsRoutes = require("../routes/goodreads");
const trans = require("../routes/transaction-endpoints");
const books = require("../routes/books-endpoints");
const chat = require("../routes/twilio/twilioChat");

const stripeRouting = require("../routes/stripe/striperoutes");
//middleware import
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const restricted = require("../middleware/restricted");
//end imports

const bodyParser = require("body-parser");

// server.use(express.static(path.join(__dirname, "public")));

server.use(bodyParser.urlencoded({ extended: false }));
// server.use(bodyParser.json());

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
server.use("/api/stripe", stripeRouting);
server.use("/api/twilio", chat);

server.get("/checkToken", restricted, function(req, res) {
  res.sendStatus(200);
});

server.get("/", (req, res) => {
  res.send("Hello World, from Neighborhood Library Backend");
});

// server.use(restricted);

module.exports = server;
