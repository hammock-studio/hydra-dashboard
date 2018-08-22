const express = require('express');

const router = express.Router();

const sessionChecker = (req, res, next) => {
  if (
    req.session.user
    && req.cookies.user_sid
  ) {
    next();
  } else {
    res.redirect('/');
  }
};

router.get('/', sessionChecker, (req, res) => {
  res.render('dashboard', { username: req.session.user.username });
});

router.get('/analytics', sessionChecker, (req, res) => {
  res.render('analytics', { user: req.session.user });
});

module.exports = router;
