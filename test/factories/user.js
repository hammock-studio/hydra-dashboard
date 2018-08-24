const faker = require('faker');
const { User } = require('../../src/models');

const data = (props = {}) => {
  const defaultProps = {
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password()
  };

  return Object.assign({}, defaultProps, props);
};


module.exports = {
  data,
  create: (props = {}) => User.create(data(props))
};
