const express = require("express");
const db = require("../DATA/dbConfig");
const router = express.Router();
// add goodreadsBooksModel

const request = require("request-promise");
const { parseString } = require("xml2js");

router.get("/search", (req, res) => {
  request
    .get(
      `https://www.goodreads.com/search/index.xml?key=${
        process.env.GOODREADS_KEY
      }&q=${req.body}`
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
            })
          )
        })
      )
    );
});

module.exports = router;
