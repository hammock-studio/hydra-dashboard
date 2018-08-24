if (process.env.NODE_ENV == 'production'){
  const dbConfig = require('../database')['production'];

  module.exports = {
    env: 'production',
    dbConfig,
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
  }
} else {
  module.exports = { env: 'production' }
};
