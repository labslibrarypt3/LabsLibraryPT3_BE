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
router.get("/mybooks", async (req, res) => {
  const enter = req.query
  
  try {
    const user = await db.getById(enter);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the Users"
    });
  }
});


  router.post('/', async (req,res) => {
    
    const enter = req.body
      try {
        const user = await db.insert(enter);
        res.status(201).json(enter);
      } catch (error) {
      
        res.status(500).json({
          message: 'Error adding the book',
        });
      }
    });
  router.delete('/', async (req,res)=>{
    const user = await db.remove(req.body)
  })

module.exports = router;
