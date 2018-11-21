const faker = require('faker');

const data = (props = {}) => {
  const defaultProps = {
    client_id: faker.internet.userName(),
    client_name: faker.company.companyName(),
    grant_types: ['authorization_code', 'refresh_token', 'client_credentials'],
    response_types: ['token','code','id_token'],
    scope: 'openid offline testscope',
    redirect_uris: ['http://domain-a/callback', 'https://domain-b/callback'],
  };

  return Object.assign({}, defaultProps, props);
};


module.exports = {
  data
};
