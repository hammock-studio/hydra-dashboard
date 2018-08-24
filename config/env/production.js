const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.PG_URL, {
  dialect:  'postgres',
  protocol: 'postgres',
  port: 5432,
  host: process.env.PG_HOST,
  logging:  false
});

module.exports = {
  env: "production",
  db: sequelize,
  hydra: {
    "client": {
      "id": process.env.HYDRA_DASHBOARD_CLIENT_ID,
      "secret": process.env.HYDRA_DASHBOARD_CLIENT_SECRET
    },
    "auth": {
      "tokenHost": process.env.HYDRA_PUBLIC_URL,
      "authorizePath": "/oauth2/auth",
      "tokenPath": "/oauth2/token"
    }
  }
};
