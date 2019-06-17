const express = require("express");
const router = express.Router();
const db = require("../DATA/helpers/booksDb");

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

  router.post('/', async (req,res) => {
    console.log(req.body, 'backend')
    const enter = req.body
      try {
        const user = await db.insert(enter);
        res.status(201).json(enter);
      } catch (error) {
        // log error to database
        res.status(500).json({
          message: 'Error adding the book',
        });
      }
    });



  router.delete('/del', async (req,res) => {
    console.log ('req.body passes', req.body)
    const target = await db.getById(req.body)
    try{
      res.status(201).json({message:'The book has been discarded'})
    }catch (error) {
      res.status(500).json({
        message: 'Error removing the book',
    })
    }})

module.exports = router;
