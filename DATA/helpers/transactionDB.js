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
function update(data) {
  console.log(data, "in trans update helper");
  return db("User_Book")
    .update([data.messageArray])
    .where(data.bookID);
}
