const express = require('express');
const hydra = require('../helpers/hydra');
const config = require('../../config');
const User = require('../models/user')(config.db);

const router = express.Router();

const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect('/dashboard');
  } else {
    next();
  }
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

  User.findOne({ where: { username: req.body.username } }).then((user) => {
    if (!user) {
      res.render('login', { challenge, error: 'error, try again or signup' });
    } else if (!user.validPassword(req.body.password)) {
      res.render('login', { challenge, error: 'error, try again or signup' });
    } else {
      req.session.user = user.dataValues;

      const body = {
        subject: req.session.user.username,
        remember: false || Boolean(req.body.remember),
        remember_for: 40
      };

      hydra.acceptLoginRequest(challenge, body).then((response) => {
        res.redirect(response.redirect_to);
      }).catch((err) => {
        next(err);
      });
    }
  });
});

module.exports = router;
