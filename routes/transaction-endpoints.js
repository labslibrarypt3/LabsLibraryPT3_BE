const express = require('express');
const router = express.Router();
const db = require('../DATA/helpers/transactionDB');
// list of transactions by lender
router.get('/', async (req, res) => {
    try {
      const tran = await db.getByBorroworId(req.body);
      res.status(200).json(tran);
    } catch (error) { 
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the transactions',
      });
    }
  })

  router.get('/',async(req, res)=>{
      try{
        const tran = await db.getByLenderId(req.body);
        res.status(200).json(tran);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:'Error retrieving transactions'
        })
      }
  })

  router.post('/', async (req, res) => {
    try {
      console.log(req.body)
      const user = await db.insert(req.body);
      console.log(user)

      res.status(200).json(user);
    } catch (error) { 
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the Users',
      });
    }
  })

module.exports = router; 