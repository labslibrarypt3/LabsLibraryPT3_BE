const express = require("express");
const router = express.Router();
const db = require("../DATA/helpers/transactionDB");
const restricted = require("../middleware/restricted");
const bookdb = require("../DATA/helpers/booksDb");

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

// retrieves transactions by borrower id

router.get("/tranborrow", restricted, async (req, res) => {
  const enter = req.userId;
  try {
    const tran = await db.getByBorroworId(enter);

    res.status(200).json(tran);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the transactions"
    });
  }
});

// retrieves transactions by lender id

router.get("/tranlent", restricted, async (req, res) => {
  const enter = req.userId;

  try {
    const tran = await db.getByLenderId(enter);

    res.status(200).json(tran);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the transactions"
    });
  }
});

// retrieves books by borrower id
router.get("/borrow", restricted, async (req, res) => {
  const enter = req.userId;

  try {
    const tran = await db.getByBorroworId(enter);
    const bookids = [];
    tran.map(object => {
      bookids.push(object.book_id);
    });
    const bookies = await bookdb.getByIdArray(bookids);

    res.status(200).json(bookies);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the transactions"
    });
  }
});

// retrieves books by lender id
router.get("/lend", restricted, async (req, res) => {
  const enter = req.userId;

  try {
    const tran = await db.getByLenderId(enter);
    const bookids = [];
    tran.map(object => {
      bookids.push(object.book_id);
    });
    const bookies = await bookdb.getByIdArray(bookids);

    res.status(200).json(bookies);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the transactions"
    });
  }
});

// creates a new transaction in the database
router.post("/", async (req, res) => {
  try {
    const tran = await db.insert(req.body);
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).send(console.log(error));
  }
});

// updates an existing transaction messageArray in the database
router.post("/update", async (req, res) => {
  try {
    const entree = { messages: req.body.messages };
    const id = req.body.book_id;
    console.log(entree, "endpoint");

    const updates = await db.update(id, entree);

    res.status(200).json(req.body);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error retrieving the Users"
      })
      .send(console.log(error));
  }
});

module.exports = router;
