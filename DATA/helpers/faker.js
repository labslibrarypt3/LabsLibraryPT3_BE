const faker = require("faker");

const createFakeUser = () => ({
  name:faker.name.findName(),
  // lastName: faker.name.lastName(),
  email: faker.internet.email(),
  // phoneNumber: faker.phone.phoneNumber(0)
  password: faker.internet.password()
});
module.exports={
  createFakeUser
}






