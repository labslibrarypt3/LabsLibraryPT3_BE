const faker = require('faker')
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Users').del()
    .then(function () {
      // Inserts seed entries
      return knex('Users').insert([
        {id: 1, firstName: 'Bob', lastName: 'Smith', email: 'bobsmith@gmail.com', phoneNumber: '8669990101' },
        {id: 2, firstName: 'Mike', lastName: 'Jones', email: 'mikeyjones@gmail.com', phoneNumber: '8668675309'},
        {id: 3, firstName: 'Susan', lastName: 'Sanders', email: 'Susan@gmail.com', phoneNumber: '8668011234'},
      
        // faker.fake("{{name.firstName}} {{name.lastName}} {{internet.email}} {{phone.phoneNumber}}")
      ]);
    });
};
