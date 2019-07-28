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
  messages = entree.messages;
<<<<<<< HEAD
  id = entree.checkoutId;
=======
  id = entree.bookId;
  console.log(messages, id, "in trans update helper");
>>>>>>> d45f5f5349a200da92e4faa621c83c408ea89674
  return db("User_Book")
    .update("is_checked_out", messages)
    .where("bookId", id);
}
function getByBookId(book_id) {
  return db("User_Book").where("book_id");
}
