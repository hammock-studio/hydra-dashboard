require('dotenv').config();

const models = require('../src/models');

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
