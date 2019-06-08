const db = require('../dbConfig.js');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};

function get() {
  return db('Books');
}

function getById(id) {
  return db('Books')
    .where({ id })
    .first();
}

function insert(book) {
  console.log(book)
  return db('Books')
    .insert(book)
    // .then(ids => {
    //   return getById(ids[0]);
    // });
}

function update(id, changes) {
  return db('Books')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('Books')
    .where('id', id)
    .del();
}

 