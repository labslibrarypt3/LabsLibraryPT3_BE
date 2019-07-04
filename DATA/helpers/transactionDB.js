const db = require("../dbConfig.js");

module.exports = {
  get,
  getByBorroworId,
  getByLenderId,
  insert,
  update
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
function update(id, entree) {
  // console.log(messages, "in trans update helper");
  db("User_Book")
    .where("book_id", id)
    .insert("messages", entree.messages);
  return;
}
