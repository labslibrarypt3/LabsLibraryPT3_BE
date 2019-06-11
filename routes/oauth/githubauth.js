const express = require("express");
const router = express.Router();
const db = require("../../DATA/helpers/usersDb");
const crypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.post("/auth", async (req, res) => {
  let user = req.body;
  let password = user.token;

  const xuser = await db.getByEmail(user.email);


 const hash = crypt.hashSync(password, 10);
 if(!xuser){
 const huser = {
     name: user.name,
     email: user.email,
     password:hash
    }
    
    const jtoken = jwt.sign({
        sub:user.email,
        name:user.name
   
    },"mysupersecretkey",{expiresIn:"3 minutes"})
     console.log(jtoken)
 try {
 const userO  = await db.insert(huser);
 console.log(huser)
 res.status(200).json(jtoken,xuser).redirect('http:/localhost:3000/components/Account/Account');
 } catch (error){
     res.status(500).json({
        message: 'Error registering the User try alternative login method'
     })
 }}else{
    

    const jtoken = jwt.sign({
        sub:user.email,
        name:user.name
   
    },"mysupersecretkey",{expiresIn:"3 minutes"})
     console.log(jtoken)
    console.log (xuser)
    
    res.status(200).json((`${jtoken} already a member`))
 }
})

    

module.exports = router;
