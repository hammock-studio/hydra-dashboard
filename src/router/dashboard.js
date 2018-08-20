const express = require('express');

const router = express.Router();

const sessionChecker = (req, res, next) => {
  if (
    req.session.user
    && req.cookies.user_sid
    && req.session.user.tokens.access_token
  ) {
    next();
  } else {
    res.redirect('/');
  }
};

router.get('/', sessionChecker, (req, res) => {
  res.json({ session: req.session });
});

module.exports = router;
