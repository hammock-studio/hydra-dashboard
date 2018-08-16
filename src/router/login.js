const express = require('express');
const hydra = require('../helpers/hydra');

const router = express.Router();

const sessionChecker = (req, res, next) => {
  next();
};

router.route('/').get(sessionChecker, (req, res, next) => {
  const challenge = req.query.login_challenge;

  hydra.getLoginRequest(challenge).then((response) => {
    if (response.skip) {
      hydra.acceptLoginRequest(challenge, { subject: response.subject })
        .then((acceptResponse) => {
          res.redirect(acceptResponse.redirect_to);
        });
    }

    res.render('login', { challenge });
  }).catch((err) => {
    next(err);
  });
});

router.route('/').post(sessionChecker, (req, res, next) => {
  const { challenge } = req.body;

  // if (!true) {
  // res.render('login', { challenge, error: 'try again or signup' });
  // }

  const body = {
    subject: 'tal@pas.com',
    remember: Boolean(req.body.remember),
    remember_for: 40
  };

  hydra.acceptLoginRequest(challenge, body).then((response) => {
    res.redirect(response.redirect_to);
  }).catch((err) => {
    next(err);
  });
});

module.exports = router;
