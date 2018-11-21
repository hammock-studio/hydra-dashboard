const express = require('express');

const { Client } = require('../../../models');

const {
  getClients, postClient, getClient, putClient, deleteClient
} = require('../../../helpers/hydraClients');

const router = express.Router();

const sessionChecker = (req, res, next) => {
  next();
};

router.route('/').get(sessionChecker, (req, res) => {
  getClients().then((clients) => {
    res.json(clients);
  });
});

router.route('/').post(sessionChecker, (req, res) => {
  postClient(req.body).then((client) => {
    const clientData = {
      clientName: client.client_name,
      clientId: client.client_id,
      clientSecret: client.client_secret
    };

    Client.create(clientData).then((c) => {
      res.json(c);
    }).catch((error) => {
      res.status(400).json(error);
    });
  });
});


router.route('/:id').get(sessionChecker, (req, res) => {
  getClient(req.params.id).then((client) => {
    res.json(client);
  });
});

router.route('/:id').put(sessionChecker, (req, res) => {
  putClient(req.params.id, req.body).then((updatedClient) => {
    Client.findOne({ where: { clientId: req.params.id } })
      .then((client) => {
        const clientData = {
          clientId: updatedClient.client_id,
          clientName: updatedClient.client_name
        };

        client.update(clientData).then((c) => {
          res.json(c);
        });
      }).catch(error => {
        res.json(error);
      });
  }).catch(error => {
    res.json(error);
  });
});

router.route('/:id').delete(sessionChecker, (req, res) => {
  deleteClient(req.params.id).then((responseStatus) => {
    res.status(responseStatus).json({});
  }).catch((error) => {
    res.json(error);
  });
});

module.exports = router;
