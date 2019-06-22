const express = require("express");
const router = express.Router();
var bcrypt = require('bcryptjs');
const db = require("../../DATA/helpers/usersDb");
const jwt = require("jsonwebtoken")
require("dotenv").config();

router.post("/auth", async (req, res) => {
  let user = req.body;
  
  
  if (!(await db.getByEmail(user.email))) {
    
    const newUser = {
      name: user.name,
      email: user.email,
      img:user.img,
      password: user.token
    };
    try {

      const userO = await db.insert(newUser);
      const userinfo = db.getByEmail(newUser.email)

      const udata = {
        userId: userinfo.userId,
        password: userinfo.password
      };


     
      res.status(200).json(udata);
      return;

    } catch (error) {
      res.status(500).json({
        message: "Error registering the User try alternative registering method"
      });
      return;
    }

  } else {

    try {
      const xuser = await db.getByEmail(user.email);

      const udata = {
        userId: xuser.userId,
        password: xuser.password
      };

      res.status(200).json(udata);
      return;

    } catch (error) {
      res.status(500).json({
        message: "Error logging in the User try alternative login method"
      });
    }
  }
});

router.post("/manual", async (req, res) => {
  
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  
  const user = req.body
  // console.log(user)
  
  if (!(await db.getByEmail(user.email))) {

    // let password = hash.hash(user.password,10)
   
    const newUser = {
      name: user.name,
      email: user.email,
      password: hash
    };
    // console.log (newUser)


    try {

      const userO = await db.insert(newUser);
      res.status(200).json(newUser);
      return;

    } catch (error) {
      res.status(500).json({
        message: "Error registering the User try alternative registering method"
      });
      return;
    }

  } else {


      res.status(500).json({message:'user already exist'});
      return;

    
  }
});


router.post("/login", async (req, res) => {

  
  const email = req.body.email
  const password = req.body.password

  const xuser = await db.getByEmail(email);
  try {

  if(email && bcrypt.compareSync(password,xuser.password)){

  const token = jwt.sign({
    email:xuser.email,
    userId:xuser.userId
  },process.env.JWT_SECRET, { expiresIn: 60 * 60 });

  const udata = {
    userId: xuser.userId,
    password: token
  }
  console.log (udata)
  res.status(200).json(udata);
  return;
} else {
  res.status(401).json({message:'Authentication failed'})
}
  }
 catch (error) {
  res.status(500).json({
    message: "Server error or authetication failed"
  });
  return;
}

  }

);
module.exports = router;
