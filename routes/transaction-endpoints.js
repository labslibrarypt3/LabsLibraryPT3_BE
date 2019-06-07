const express = require('express');
const router = express.Router();
const db = require('../DATA/helpers/transactionDB');

router.get('/',(req, res) => {
    res.send(200).json('transpage');
    // try {
    //   const tran = await db.get(req.query);
    //   res.status(200).json(tran);
    // } catch (error) { 
    //   console.log(error);
    //   res.status(500).json({
    //     message: 'Error retrieving transaction',
    //   });
    // }
  })

module.exports = router; 