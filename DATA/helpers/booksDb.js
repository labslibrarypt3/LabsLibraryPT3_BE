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
    .where( 'booksid',id )
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

 