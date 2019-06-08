const express = require("express");
const router = express.Router();
const db = require("../../DATA/helpers/usersDb");
const crypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/oauth", async (req, res, next) => {
  let user = req.body;
  let password = user.token;
  console.log(password);
  const hash = crypt.hashSync(password, 10);
});
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

    const jtoken = jwt.sign(
      {
        sub: user.email,
        name: user.name
      },
      "mysupersecretkey",
      { expiresIn: "3 minutes" }
    );
    console.log(jtoken);
    try {
      const userO = await db.insert(huser);
      console.log(huser);
      res.status(200).json(jtoken);
    } catch (error) {
      res.status(500).json({
        message: "Error registering the User try alternative login method"
      });
    }
  } else {
    const jtoken = jwt.sign(
      {
        sub: user.email,
        name: user.name
      },
      "mysupersecretkey",
      { expiresIn: "3 minutes" }
    );
    console.log(jtoken);
    res.status(200).json(`${jtoken} already a member`);
  }
});

// router.post('/add', async (req,res) => {
//    console.log(req.body)
//    const enter = req.body
//      try {
//        const user = enterawait db.insert();
//        res.status(201).json(user);
//      } catch (error) {
//        // log error to database
//        res.status(500).json({
//          message: 'Error adding the User',
//        });
//      }
//    });

// router.get('/login', async (req, res) => {

//    const hi = req.body
//    try{
//    const user = db.get(req.body.email)
//    console.log(user)
//    res.status(200).JSON(hi);
//    }
//    catch (error){
//       res.status(500).json({
//          message: 'Error registering the User try alternative login method'
//       })
//   }
//    })

module.exports = router;
