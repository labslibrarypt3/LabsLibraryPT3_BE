const express = require("express");
const router = express.Router();
const db = require("../../DATA/helpers/usersDb");
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
     
      res.status(200).json(userinfo);
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
  let password = req.body.password
  
  
  
  if (!(await db.getByEmail(user.email))) {
    
    const newUser = {
      name: user.name,
      email: user.email,
      password: user.token
    };


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
module.exports = router;
