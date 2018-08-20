const fetch = require('node-fetch');
const rs = require('randomstring');
const simpleOauth2 = require('simple-oauth2');
const config = require('../../config');

const oauth2 = simpleOauth2.create(config.hydra);

const hydraUrl = process.env.HYDRA_URL;

function get(flow, challenge) {
  const url = `${hydraUrl}/oauth2/auth/requests/${flow}/${challenge}`;

  return fetch(url)
    .then((response) => {
      if (response.status < 200 || response.status > 302) {
        response.json().then((body) => {
          Promise.reject(new Error(body.error.message));
        });
      }

      return response.json();
    });
}

function put(flow, action, challenge, body) {
  const url = `${hydraUrl}/oauth2/auth/requests/${flow}/${challenge}/${action}`;
  const opts = {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  };

  return fetch(url, opts)
    .then((response) => {
      if (response.status < 200 || response.status > 302) {
        response.json().then((responseBody) => {
          Promise.reject(new Error(responseBody.error.message));
        });
      }

      return response.json();
    });
}

const getAuthorizationURI = () => {
  const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: process.env.HYDRA_CALLBACK_URI,
    scope: 'openid offline hydra.clients',
    state: rs.generate({ length: 24, charset: 'alphabetic' }),
    nonce: rs.generate({ length: 24, charset: 'alphabetic' })
  });

  return authorizationUri;
};

const exchangeCodeForToken = (code, callback) => {
  const tokenConfig = {
    code,
    redirect_uri: process.env.HYDRA_CALLBACK_URI
  };

  oauth2.authorizationCode.getToken(tokenConfig)
    .then(result => callback(null, oauth2.accessToken.create(result)))
    .catch(error => callback(error.message));
};

const getLoginRequest = (challenge) => {
  return get('login', challenge);
};

const acceptLoginRequest = (challenge, body) => {
  return put('login', 'accept', challenge, body);
};

const rejectLoginRequest = (challenge, body) => {
  return put('login', 'reject', challenge, body);
};

const getConsentRequest = (challenge) => {
  return get('consent', challenge);
};

const acceptConsentRequest = (challenge, body) => {
  return put('consent', 'accept', challenge, body);
};

const rejectConsentRequest = (challenge, body) => {
  return put('consent', 'reject', challenge, body);
};


module.exports = {
  getAuthorizationURI,
  exchangeCodeForToken,
  getLoginRequest,
  acceptLoginRequest,
  rejectLoginRequest,
  getConsentRequest,
  acceptConsentRequest,
  rejectConsentRequest
};
