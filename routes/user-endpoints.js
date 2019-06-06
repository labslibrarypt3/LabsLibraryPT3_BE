const express = require('express');
const router = express.Router();
const db = require('../DATA/helpers/usersDb');
const jwt = require ('jsonwebtoken');
const ejwt = require('express-jwt');

// view list of users
router.get('/', async (req, res) => {
  try {
    const user = await db.get(req.query);
    res.status(200).json(user);
  } catch (error) { 
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the Users',
    });
  }
})
router.get("/Library", (req, res) => {
  res.send("mybookshelf page here");
});

router.get("/borrowed", (req, res)=>{
  res.send("borrowed axios calls here for list of borrowed books")
})
router.get("/lent", (req, res)=>{
  res.send("lent axios calls here for list of books lent out")
})

// Add a user with post


  router.get("/account", (req, res) => {
    res.send("account page here");
  });
  

  
  router.get("/books", (req, res) => {
    res.send("books page here");
  });
  
  router.get("/users", (req, res) => {
    res.send("users page here");
  });

  
module.exports = router; 