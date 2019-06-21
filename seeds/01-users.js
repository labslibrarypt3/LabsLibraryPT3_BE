
const fake = require('../DATA/helpers/faker')
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  
  let fakeUsers = [];
  for (let i = 1; i <= 500; i++) {
    fakeUsers.push(fake.createFakeUser());
  }
  return knex('Users')
    .del()
    .then(function (){
      return knex('Users').insert(fakeUsers)
    })
  
    };
