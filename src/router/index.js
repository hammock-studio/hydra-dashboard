const express = require('express');

const router = express.Router();

const sessionChecker = (req, res, next) => {
  next();
};

router.get('/', sessionChecker, (req, res) => {
  res.json({ loc: 'Anna Bunanaaaaa :)' });
});

module.exports = router;
