const express = require('express');
const hydra = require('../helpers/hydra');

const router = express.Router();

router.use('/login', require('./login'));
router.use('/signup', require('./signup'));
router.use('/logout', require('./logout'));
router.use('/consent', require('./consent'));
router.use('/dashboard', require('./dashboard'));

const sessionChecker = (req, res, next) => {
  if (
    req.session.user
  && req.cookies.user_sid
  && req.session.user.tokens.access_token
  ) {
    res.redirect('/dashboard');
  } else {
    next();
  }
};

router.get('/', sessionChecker, (req, res) => {
  res.json({
    loc: 'this is the dashboard home page',
    authorize_dasboard: hydra.getAuthorizationURI(),
    session: req.session
  });
});

router.get('/callback', (req, res) => {
  hydra.exchangeCodeForToken(req.query.code, (error, response) => {
    if (error) { res.json({ error }); }

    req.session.user.tokens = response.token;

    res.redirect('/dashboard');
  });
});

module.exports = router;
