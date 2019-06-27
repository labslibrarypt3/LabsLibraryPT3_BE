const faker = require("faker");

const createFakeUser = () => ({
  name:faker.name.findName(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  img: faker.image.image(),
  password: faker.internet.password(),
  address: faker.address.streetAddress(),
  city:faker.address.city(),
  state:faker.address.state(),
  zipcode:faker.address.zipCode(),
  latitude:faker.address.latitude(),
  longitude:faker.address.longitude()
});
module.exports={
  createFakeUser
}






