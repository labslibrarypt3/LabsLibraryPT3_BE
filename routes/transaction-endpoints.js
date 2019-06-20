const express = require('express');
const router = express.Router();
const db = require('../DATA/helpers/transactionDB');
const restricted = require('../middleware/restricted')
const bookdb = require('../DATA/helpers/booksDb')



router.get('/borrow', async (req, res) => {

  const enter = req.query
  restricted(req.query)
    try {
      const tran = await db.getByBorroworId(enter);
      const bookids = [];
      tran.map(object => {
        bookids.push(object.book_id);
      })
      const bookies = await bookdb.getByIdArray(bookids)
      
      res.status(200).json(bookies);
    } catch (error) { 
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the transactions',
      });
    }
  })

  router.get('/lend',async(req, res)=>{
    const enter = req.query
  restricted(req.query)
    try {
      const tran = await db.getByLenderId(enter);
      const bookids = [];
      tran.map(object => {
        bookids.push(object.book_id);
      })
      const bookies = await bookdb.getByIdArray(bookids)
      
     
      res.status(200).json(bookies);
    } catch (error) { 
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the transactions',
      });
    }
  })
  router.post('/', async (req, res) => {
    try {
      const tran = await db.insert(req.body);
      res.status(200).json(req.body);
    } catch (error) { 
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the Users',
      });
    }
  })

module.exports = router; 