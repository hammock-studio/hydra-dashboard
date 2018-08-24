require('dotenv').config();

const config = require('../config');
const User = require('../src/models/user')(config.db);

truncate = () => {
  const models = { User };
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
