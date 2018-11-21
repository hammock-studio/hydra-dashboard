const fetch = require('node-fetch');

const hydraAdminUrl = process.env.HYDRA_ADMIN_URL;

getClients = () => {
  return fetch(`${hydraAdminUrl}/clients`).then((response) => {
    return response.json();
  });
};

postClient = (clientData) => {
  const opts = {
    method: 'POST',
    body: JSON.stringify(clientData),
    headers: { 'Content-Type': 'application/json' }
  };

  return fetch(`${hydraAdminUrl}/clients`, opts)
    .then((response) => {
      if (response.status < 200 || response.status > 302) {
        return response.json().then((responseBody) => {
          return Promise.reject(new Error(responseBody.error.message));
        });
      }

      return response.json();
    });
};

getClient = (clientId) => {
  return fetch(`${hydraAdminUrl}/clients/${clientId}`).then((response) => {
    return response.json();
  });
};

putClient = (clientId, clientData) => {
  const opts = {
    method: 'PUT',
    body: JSON.stringify(clientData),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'PUT'
    }
  };

  return fetch(`${hydraAdminUrl}/clients/${clientId}`, opts)
    .then((response) => {
      if (response.status < 200 || response.status > 302) {
        return response.json().then((responseBody) => {
          return Promise.reject(new Error(responseBody.error.message));
        });
      }

      return response.json();
    });
};

deleteClient = (clientId) => {
  const opts = {
    method: 'DELETE',
    headers: { 'Access-Control-Allow-Methods': 'DELETE' }
  };

  return fetch(`${hydraAdminUrl}/clients/${clientId}`, opts)
    .then((response) => {
      return response.status;
    }).catch(error => {
      return Promise.reject(new Error(error));
    });
};


module.exports = {
  getClients,
  postClient,
  getClient,
  putClient,
  deleteClient
};
