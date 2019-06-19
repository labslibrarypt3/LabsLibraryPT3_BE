const db = require('../dbConfig.js');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
  getByBorrowerId
};

function get() {
  return db('Books');
}

function getById(id) {
  return db('Books')
    .where( 'bookId',id )
}

// function getById(id) {
//   return db('Books')
//     .where(db('User_Book').where ('book_id',id)  )
// }

function getByBorrowerId(IDs){
  // .whereIn('id', [1, 2, 3])
  return db("Books").whereIn('bookId', IDs);
}

function insert(book) {
  console.log(book,'book in helper function')
  return db('Books',console.log )
    .insert(book)
}

function update(id, changes) {
  return db('Books')
    .where({ id })
    .update(changes);
}

function remove(id) {
  console.log(id , 'in helper')
  return db('Books')
    .where(id )
    .del();
}

 