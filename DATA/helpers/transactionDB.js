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

function getByBorroworId(userId) {
  return db('User_Book')
    .where(userId) 
}
function getByLenderId(lender_id) {
    return db('User_Book')
      .where(lender_id)
  }
function insert(transaction) {
  return db('User_Book')
    .insert(transaction)
    // .then(ids => {
    //   return getById(ids[0]);
    // });
}
