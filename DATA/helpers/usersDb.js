const db = require('../dbConfig.js');

module.exports = {
  get,
  getById,
  getByEmail,
  insert,
  update,
  remove,
};

function get() {
  return db('Users');
}

function getById(id) {
  return db('Users')
    .where({ id })
    .first();
}
function getByEmail(email){
  return db('Users')
    .where('email', email )
    
}

function insert(user) {
  console.log(user)
  return db('Users')
    .insert(user)
    // .then(ids => {
    //   return getById(ids[0]);
    // });
}

function update(id, changes) {
  return db('Users')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('Users')
    .where('id', id)
    .del();
}

 
    