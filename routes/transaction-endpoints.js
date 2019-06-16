const express = require("express");
const router = express.Router();
const db = require("../DATA/helpers/transactionDB");
const bodb = require("../DATA/helpers/booksDb");
const restricted = require("../middleware/restricted");

router.get("/borrow", async (req, res) => {
  const enter = req.query;

  restricted(req.query);

  try {
    console.log(enter);

    const tran = await db.getByBorroworId(enter);

    const bookIds = [];

    const book = tran.map(e => {
      bookIds.push(e["book_id"]);
    });

    console.log(bookIds);

    const books = await bodb.getByBorrowerId(bookIds);

    // const book = await bodb.getById(tran.book_id)

    // console.log (book,'borrow endpoint')

    res.status(200).json(books);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error retrieving the transactions"
    });
  }
});

router.get("/lend", async (req, res) => {
  try {
    const tran = await db.getByLenderId(req.body);

    res.status(200).json(tran);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error retrieving transactions"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const tran = await db.insert(req.body);
    res.status(200).json(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the Users"
    });
  }
});

module.exports = router;
