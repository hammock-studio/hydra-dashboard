const express = require('express');
const hydra = require('../helpers/hydra');

const router = express.Router();

router.use('/login', require('./login'));
router.use('/consent', require('./consent'));
router.use('/dashboard', require('./dashboard'));

const sessionChecker = (req, res, next) => {
  next();
};

router.get('/', sessionChecker, (req, res) => {
  res.json({
    loc: 'this is the dashboard home page',
    authorize_dasboard: hydra.getAuthorizationURI()
  });
});

router.get('/callback', (req, res) => {
  hydra.exchangeCodeForToken(req.query.code, (error, response) => {
    if (error) { res.json({ error }); }

    req.session.user = { tokens: response.token };

    res.redirect('/dashboard');
  });
});


// req.session.user.access_token = token.token.access_token;
// req.session.user.refresh_token = token.token.refresh_token;

// if (!true) {
// res.redirect('/admin')
// } else {
// res.json({tokens: tokens})
// res.redirect('/dashboard');
// }

module.exports = router;
