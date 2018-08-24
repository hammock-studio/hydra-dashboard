if (process.env.NODE_ENV == 'test'){
  const dbConfig = require('../database')['test'];

  module.exports = {
    env: 'test',
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
  module.exports = { env: 'test'}
}
