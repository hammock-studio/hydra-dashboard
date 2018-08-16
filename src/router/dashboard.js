const express = require('express');

const router = express.Router();

const sessionChecker = (req, res, next) => {
  next();
};

router.get('/', sessionChecker, (req, res) => {
  res.json({ q: req.session.user });
});

module.exports = router;
