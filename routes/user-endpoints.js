const express = require("express");
const router = express.Router();
const db = require("../DATA/helpers/usersDb");
const jwt = require("jsonwebtoken");
const ejwt = require("express-jwt");

// view list of users
router.get("/", async (req, res) => {
  try {
    const user = await db.get(req.query);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the Users"
    });
  }
});

// Add a user with post
router.post("/add", async (req, res) => {
  console.log(req.body);
  const enter = req.body;
  try {
    const user = await db.insert(enter);
    res.status(201).json(user);
  } catch (error) {
    // log error to database
    res.status(500).json({
      message: "Error adding the User"
    });
  }
});

router.get("/account", (req, res) => {
  res.send("account page here");
});

router.get("/mybookshelf", (req, res) => {
  res.send("mybookshelf page here");
});

router.get("/books", (req, res) => {
  res.send("books page here");
});

router.get("/users", (req, res) => {
  res.send("users page here");
});

//add book to personal library
router.post("/users/:id/add-book", (res, res) => {
  //use "getByID" to find the right spot in the db
    // double check training kit to see if getByID is necessary here or if we already should have that data due to the URL
  //use "insert" to add a book object to the library
  res.send("User can now lend this book out to neighbs")
})

module.exports = router;
