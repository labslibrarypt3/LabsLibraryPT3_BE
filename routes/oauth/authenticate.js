const express = require("express");
const router = express.Router();
const db = require("../../DATA/helpers/usersDb");
require('dotenv').config();




router.post("/auth", async (req, res) => {

  let user = req.body;
  
  

  const xuser = await db.getByEmail(user.email);
  if (xuser.email !== user.email){
    
    const huser = {
        name: user.name,
        email: user.email,
        password: user.token
       
        }
    try {
            const userO  = await db.insert(huser);
            res.status(200)
            .json(huser)
            return;
            }catch (error){
                res.status(500).json({
                   message: 'Error registering the User try alternative registering method'
                })
                return;

  }}else{
    try {
        console.log(xuser)
        const udata = {
          userId:xuser.userId,
          password:user.password
        }
        res.status(200).json(udata);
        return;
        }catch (error){
            res.status(500).json({
               message: 'Error logging in the User try alternative login method'
            })
 
  }
  }
})

module.exports = router;
