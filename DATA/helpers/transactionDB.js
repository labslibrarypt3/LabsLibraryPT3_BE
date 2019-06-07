const db = require('../dbConfig.js');

module.exports = {
  get,
  getByBorroworId,
  getByLenderId,
  insert,
  
};

function get() {
  return db('User_Book');
}

function getByBorroworId(borrower_id) {
  return db('User_Book')
    .where({ borrower_id })
    .first();
}
function getByLenderId(lender_id) {
    return db('User_Book')
      .where({ lender_id })
      .first();
  }
function insert(transaction) {
  return db('User_Book')
    .insert(transaction)
    // .then(ids => {
    //   return getById(ids[0]);
    // });
}
