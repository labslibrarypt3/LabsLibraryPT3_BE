const express = require("express");
const router = express.Router();
const db = require("../../DATA/helpers/usersDb");
require("dotenv").config();

router.post("/auth", async (req, res) => {
  let user = req.body;
console.log (user,'authenticate at user assign')
  // const xuser = await db.getByEmail(user.email);
  // console.log(xuser,'user exist?')
  if (!await db.getByEmail(user.email)) {
    const newUser = {
      name: user.name,
      email: user.email,
      password: user.token
    };
    try {

            const userO  = await db.insert(newUser);
            res.status(200)
            .json(newUser)
            return;
            }catch (error){
                res.status(500).json({
                   message: 'Error registering the User try alternative registering method'
                })
                return;

  }}else{
    try {
      const xuser = await db.getByEmail(user.email);
        const udata = {
          userId:xuser.userId,
          password:xuser.password
        }
        console.log (udata, 'auth res data')
        res.status(200).json(udata);
        return;
        }catch (error){
            res.status(500).json({
               message: 'Error logging in the User try alternative login method'
            })
 
  }

  }
});

module.exports = router;
