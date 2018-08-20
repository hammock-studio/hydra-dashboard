const express = require('express');

const router = express.Router();
const hydra = require('../helpers/hydra');

const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    next();
  } else {
    res.redirect(`/login?challenge=${req.query.challenge}`);
  }
};

router.route('/').get(sessionChecker, (req, res, next) => {
  const challenge = req.query.consent_challenge;

  hydra.getConsentRequest(challenge).then((response) => {
    if (response.skip) {
      const body = {
        grant_scope: response.requested_scope,
        session: {}
      };

      hydra.acceptConsentRequest(challenge, body).then((acceptResponse) => {
        res.redirect(acceptResponse.redirect_to);
      });
    }

    res.render('consent', {
      challenge,
      requested_scope: response.requested_scope,
      user: response.subject,
      client: response.client
    });
  }).catch((error) => {
    next(error);
  });
});

router.route('/').post(sessionChecker, (req, res, next) => {
  let grantScope;
  const { challenge } = req.body;

  if (req.body.submit === 'Deny access') {
    const body = {
      error: 'access_denied',
      error_description: 'The resource owner denied the request'
    };

    hydra.rejectConsentRequest(req.body.challenge, body).then((response) => {
      res.redirect(response.redirect_to);
    }).catch((error) => {
      next(error);
    });
  }

  grantScope = req.body.grant_scope;

  if (!Array.isArray(grantScope)) {
    grantScope = [grantScope];
  }

  const body = {
    grant_scope: grantScope,
    session: {},
    remember: Boolean(req.body.remember),
    remember_for: 3600
  };

  hydra.acceptConsentRequest(challenge, body).then((response) => {
    res.redirect(response.redirect_to);
  }).catch((error) => {
    next(error);
  });
});

module.exports = router;
