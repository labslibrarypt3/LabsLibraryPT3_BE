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
  console.log("user-endpoints GET end");
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
router.put("/update", restricted, async (req, res) => {
  console.log(req.userId);
  id = req.userId;
  changes = req.body;
  console.log(id, changes);
  try {
    await db.update(id, changes);
    res.status(200).json(changes);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the Users"
    });
  }
});

//get user libraries
//get a list of lats and lngs and
router.get("/get-libraries", async (req, res) => {
  const user = await db.get();
  const libraries = user.map(user => {
    return {
      latitude: user.latitude,
      longitude: user.longitude,
      userId: user.userId
    };
  });

  res.status(200).json(libraries);
});

//get a list of lats and lngs and
router.get("/get-libraries", async (req, res) => {
  const user = await db.get();
  const libraries = user.map(user => {
    return {
      latitude: user.latitude,
      longitude: user.longitude,
      userId: user.userId
    };
  });

  res.status(200).json(libraries);
});

module.exports = router;
