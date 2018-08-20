const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USERNAME,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: 'postgres'
  }
);

module.exports = {
  env: "production",
  db: sequelize,
  hydra: {
    "client": {
      "id": process.env.HYDRA_DASHBOARD_CLIENT_ID,
      "secret": process.env.HYDRA_DASHBOARD_CLIENT_SECRET
    },
    "auth": {
      "tokenHost": process.env.HYDRA_URL,
      "authorizePath": "/oauth2/auth",
      "tokenPath": "/oauth2/token"
    }
  }
};
