require('dotenv').config();

module.exports = {
  development: {
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    dialect: 'postgres',
    logging:  false
  },
  test: {
    username: process.env.PG_TEST_USERNAME,
    password: process.env.PG_TEST_PASSWORD,
    database: process.env.PG_TEST_DATABASE,
    host: process.env.PG_TEST_HOST,
    dialect: 'postgres',
    logging:  false
  },
  production: {
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    dialect: 'postgres',
  }
}
