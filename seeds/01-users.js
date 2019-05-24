
const fake = require('../DATA/helpers/faker')
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Users').del()
  .then(function () {
      let fakeUsers = [];
  for (let i = 1; i <= 200; i++) {
    fakeUsers.push(fake.createFakeUser());
  }
  
      console.log(fakeUsers)
      return knex('Users').insert(fakeUsers
        
      );
    });
};
