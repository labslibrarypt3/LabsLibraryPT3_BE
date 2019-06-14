const express = require('express');
const router = express.Router();
const db = require('../DATA/helpers/transactionDB');
const restricted = require('../middleware/restricted')
// list of transactions by lender
// router.get('/', async (req, res) => {
//   try {
//     const tran = await db.get();
//     res.status(200).json(tran);
//   } catch (error) { 
//     console.log(error);
//     res.status(500).json({
//       message: 'Error retrieving the transactions',
//     });
//   }
// })

router.get('/borrow', async (req, res) => {

  const enter = req.query
  restricted(req.query)
    try {
      const tran = await db.getByBorroworId(enter);
      console.log(req,'trans borrow req.params')
      const obj = {
        "borrower_id":tran
      }
      res.status(200).json(tran);
    } catch (error) { 
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the transactions',
      });
    }
  })

  router.get('/lend',async(req, res)=>{
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