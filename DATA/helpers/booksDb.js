const db = require("../dbConfig.js");

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
  getByIdArray
};

function get() {
  return db("Books");
}

function getById(id) {
  return db("Books").where("user_id", id);
}

function getByIdArray(IDs) {
  return db("Books").whereIn("bookId", IDs);
}

function insert(book) {
  console.log("line 25 book db", book);
  console.log(`I am inserting ${book} into the db in the helper function`);
  return db("Books").insert(book);
}

function update(id, changes) {
  return db("Books")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("Books")
    .where("bookId", id)
    .del();
}
//get user libraries
