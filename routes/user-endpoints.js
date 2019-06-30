const express = require("express");
const router = express.Router();
const db = require("../DATA/helpers/usersDb");
const restricted = require("../middleware/restricted");

router.get("/user", restricted, async (req, res) => {
  enter = req.userId;

<<<<<<< HEAD
=======
router.get("/", async (req,res) =>{
  try{
    const users = await db.get()
    res.status(200).json(users)
  }catch(err){
  res.status(500).json('server error')
  }
})

router.get("/user",restricted, async (req, res) => {
 
  enter = req.userId
 
>>>>>>> d9728d47c1cd906dc7cb901081e1b69ab36c4139
  try {
    const user = await db.getById(enter);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the Users"
    });
  }
});

<<<<<<< HEAD
router.put("/update", restricted, async (req, res) => {
  id = req.userid;
  changes = req.body;
  try {
    await db.update(id, changes);
    res.status(200).json(changes);
  } catch (error) {
=======
router.put("/update", restricted, async (req, res) =>{
  console.log (req.userId)
  id = req.userId
  changes = req.body
  console.log (id,changes)
  try{
    await db.update(id,changes)
    res.status(200).json(changes)

  }catch (error) {
>>>>>>> d9728d47c1cd906dc7cb901081e1b69ab36c4139
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the Users"
    });
  }
});

// Add a user with post
router.post("/add", async (req, res) => {
  const enter = req.body;
  try {
    const user = await db.insert(enter);
    res.status(201).json(user);
  } catch (error) {
    // log error to database
    res.status(500).json({
      message: "Error adding the User"
    });
  }
});
router.delete("/", async (req, res) =>{
const id =req.body
const del= await db.remove(id);
res.status(200).json(id)
}
)
module.exports = router;
