const express = require('express');
const hydra = require('../helpers/hydra');
const { User } = require('../models');

const router = express.Router();

const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect('/dashboard');
  } else {
    next();
  }
};

router.route('/').get(sessionChecker, (req, res) => {
  if (req.query.challenge) {
    res.render('signup', { challenge: req.query.challenge });
  } else {
    res.redirect('/');
  }
});

router.route('/').post((req, res, next) => {
  const userData = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  };

  User.create(userData).then(user => {
    req.session.user = user.dataValues;

    const body = {
      subject: req.session.user.username,
      remember: Boolean(req.body.remember),
      remember_for: 40
    };

    hydra.acceptLoginRequest(req.body.challenge, body).then((response) => {
      res.redirect(response.redirect_to);
    }).catch((err) => {
      next(err);
    });
  }).catch((err) => {
    res.render('signup', { challenge: req.body.challenge, error: err });
  });
});

module.exports = router;
