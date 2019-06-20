const db = require('../dbConfig.js');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
  getByIdArray
};

function get() {
  return db('Books');
}

function getById(id) {
  return db('Books')
    .where( id )
}

function getByIdArray(IDs){
  return db("Books").whereIn('bookId', IDs);
}

function insert(book) {
  return db('Books')
    .insert(book)
}

function update(id, changes) {
  return db('Books')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('Books')
    .where(id )
    .del();
}

 