require('dotenv').config();
const models = require('../src/models');
const nock = require('nock');

nock.disableNetConnect();
nock.enableNetConnect('127.0.0.1')

truncate = () => {
  const truncateTable = (model) =>
  model.destroy({
    where: {},
    force: true,
  });

  return Promise.all(
    Object.keys(models).map((key) => {
      return truncateTable(models[key]);
    })
  );
}

module.exports = { truncate };
