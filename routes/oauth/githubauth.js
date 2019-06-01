
const express = require('express');
const router = express.Router();
const db = require('../../DATA/helpers/usersDb');
const crypt = require ('bcryptjs')


router.post('/callback',async (req, res, next) => {
 let user = req.body
 let password = user.token
 console.log(password)
 const hash = crypt.hashSync(password, 10);
 const huser = {
     name: user.name,
     email: user.email,
     password:hash
 }
 try {
 const userO  = await db.insert(huser);
 res.status(200).json(userO);
 } catch (error){
     console.log(error);
     res.status(500).json({
        message: 'Error registering the User'
     })
 }
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