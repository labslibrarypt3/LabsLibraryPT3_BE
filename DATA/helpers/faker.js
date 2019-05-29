const faker = require("faker");

const createFakeUser = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  phoneNumber: faker.phone.phoneNumber(0)
});
module.exports={
  createFakeUser
}






