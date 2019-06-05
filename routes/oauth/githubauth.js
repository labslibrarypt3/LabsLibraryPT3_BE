
const express = require('express');
const router = express.Router();
const db = require('../../DATA/helpers/usersDb');
var bcryptjs = require('bcryptjs');
const saltRounds = 10;

router.post('/callback',async (req, res) => {
    console.log(req.body)
    res.status(200).json(req.body);
})
    
module.exports = router;

// router.post('/add', async (req,res) => {
//     console.log(req.body)
//     const enter = req.body
//       try {
//         const user = await db.insert(enter);
//         res.status(201).json(user);
//       } catch (error) {
//         // log error to database
//         res.status(500).json({
//           message: 'Error adding the User',
//         });
//       }
//     });