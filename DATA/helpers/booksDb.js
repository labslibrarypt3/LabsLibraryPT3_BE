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
  console.log(id, "inside helper");
  return db("Books").where("user_id", id);
}

function getByIdArray(IDs) {
  return db("Books").whereIn("bookId", IDs);
}

function insert(book) {
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
