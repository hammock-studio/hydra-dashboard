const express = require('express');

// const adminMiddleware = require('./middlewares/admin.js');

const router = express.Router();

// router.use(adminMiddleware);

router.use('/users', require('./users'));

router.route('/').get((req, res) => {
  res.json({ greet: 'hi admin, help yourself' });
});

module.exports = router;
