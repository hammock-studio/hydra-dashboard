const express = require('express');

// const adminMiddleware = require('./middlewares/admin.js');

const router = express.Router();

// router.use(adminMiddleware);

router.use('/users', require('./users'));
router.use('/clients', require('./clients'));

router.route('/').get((req, res) => {
  res.json({ greet: 'hi admin' });
});

module.exports = router;
