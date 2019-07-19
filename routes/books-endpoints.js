const express = require("express");
const router = express.Router();
const db = require("../DATA/helpers/booksDb");
const restricted = require("../middleware/restricted");

router.get("/", async (req, res) => {
  try {
    const user = await db.get(req.query);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the Users"
    });
  }
});
router.get("/books", async (req, res) => {
  console.log(
    req.user_id,

    "this is in  the mybooks components for a comparison"
  );
});
router.get("/mybooks", restricted, async (req, res) => {
  const enter = req.userId;

  try {
    const user = await db.getById(enter);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the Users"
    });
  }
});

router.post("/", restricted, async (req, res) => {
  console.log(` I am the user id on the backend ${req.userId}`);

  console.log(`I am the req.body properties on the backend: ${req.body.title}`);
  console.log("req.body stringified", JSON.stringify(req.body));

  const newObj = {
    title: req.body.title,
    authors: req.body.authors,
    // ISBN: req.body.ISBN,
    cover: req.body.cover,
    user_id: req.userId //comes from restricted middleware, don't change to req.body.userId. not being passed from FE in the same way as the rest of the data
  };

  console.log("line 45", newObj);

  console.log(
    `I am a book called ${newObj.title} by ${
      newObj.authors
    } being passed into a the book POST endpoint in books-endpoints. Extra data: ${
      newObj.cover
    }, ${newObj.user_id}`
  );

  try {
    const user = await db.insert(newObj);
    res.status(201).json(newObj);
  } catch (error) {
    res.status(500).json({
      message: "Error adding the book"
    });
  }
});

router.delete("/", restricted, async (req, res) => {
  const user = await db.remove(req.headers.params);
});

module.exports = router;
