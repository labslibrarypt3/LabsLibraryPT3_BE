const db = require("../dbConfig.js");

module.exports = {
  get,
  getByBorroworId,
  getByLenderId,
  insert,
  update,
  getByBookId
};

function get() {
  return db("User_Book");
}

function getByBorroworId(id) {
  return db("User_Book").where("borrower_id", id);
}
// borrower_id
function getByLenderId(lender_id) {
  return db("User_Book").where("lender_id", lender_id);
}
function insert(transaction) {
  return db("User_Book").insert(transaction);
}
function update(entree) {
  messages = entree.is_checked_out;
  id = entree.book_id;
  console.log(messages, id, "in trans update helper");
  return db("User_Book")
    .update("is_checked_out", messages)
    .where("book_id", id);
}
function getByBookId(book_id) {
  console.log(book_id, "im in the helper");
  return db("User_Book").where(book_id);
}
