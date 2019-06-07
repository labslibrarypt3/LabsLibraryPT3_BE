const express = require('express');
const router = express.Router();
const db = require('../DATA/helpers/booksDb');


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

  router.post('/', async (req,res) => {
    console.log(req.body)
    const enter = req.body
      try {
        const user = await db.insert(enter);
        res.status(201).json(user);
      } catch (error) {
        // log error to database
        res.status(500).json({
          message: 'Error adding the book',
        });
      }
    });
  



module.exports = router; 