const faker = require("faker");

const createFakeUser = () => ({
  name:faker.name.findName(),
  // lastName: faker.name.lastName(),
  email: faker.internet.email(),

  img: faker.image.image(),
  // phoneNumber: faker.phone.phoneNumber(0)
  password: faker.internet.password(),

  address: faker.address.latitude() + faker.address.longitude()
});
module.exports={
  createFakeUser
}






