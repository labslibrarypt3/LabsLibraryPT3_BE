const express = require("express");
const db = require("../DATA/dbConfig");
const router = express.Router();
const restricted = require("../middleware/restricted");

const request = require("request-promise");
const { parseString } = require("xml2js");

router.get("/search", restricted, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, userData) => {
    if (err) {
      res.sendStatus(403).json({ error: "forbidden" });
    } else {
      request
        .get(
          `https://www.goodreads.com/search/index.xml?key=${
            process.env.GOODREADS_KEY
          }&q=${req.query.q}`
        )
        .then(result =>
          parseString(result, (err, goodreadsResult) =>
            res.json({
              books: goodreadsResult.GoodreadsResponse.search[0].results[0].work.map(
                work => ({
                  goodreadsId: work.best_book[0].id[0]._,
                  title: work.best_book[0].title[0],
                  authors: work.best_book[0].author[0].name[0],
                  covers: [work.best_book[0].image_url[0]]
                  // isbn: work.best_book[0].i
                })
              )
            })
          )
        );
    }
  });
});

// route to add a book to personal library so that one can lend it out will be in user-endpoints.js

module.exports = router;
