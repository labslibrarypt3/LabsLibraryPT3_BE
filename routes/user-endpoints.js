const express = require("express");
const router = express.Router();
const db = require("../DATA/helpers/usersDb");
const restricted = require("../middleware/restricted");

router.get("/", async (req, res) => {
  const user = await db.get();
  res.status(200).json(user);
});

router.get("/user", restricted, async (req, res) => {
  id = req.userId;
  try {
    const user = await db.getById(id);
    res.status(200).json(user);
  } catch (error) {
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

module.exports = router;
