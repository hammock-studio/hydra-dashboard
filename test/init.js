require('dotenv').config();

const config = require('../config');
require('../src/models')(config.db);

config.db.sync()
  .then(() => {
    console.log('tables created successfully');
    process.exit(0);
  }).catch(error => {
    return console.log('This error occured', error)
    process.exit(1);
  });
