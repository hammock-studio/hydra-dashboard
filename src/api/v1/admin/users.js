const express = require('express');
const { User } = require('../../../models');

const router = express.Router();

const sessionChecker = (req, res, next) => {
  next();
};

router.route('/').get(sessionChecker, (req, res) => {
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 10;

  User.findAll({ offset, limit }).then((users) => {
    res.json(users);
  });
});

router.route('/').post(sessionChecker, (req, res) => {
  const userData = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  };

  User.create(userData)
    .then((user) => {
      res.json(user);
    }).catch((error) => {
      res.status(400).json(error);
    });
});

router.route('/:id').get(sessionChecker, (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.json(user);
    }).catch((error) => {
      res.status(400).json(error);
    });
});

router.route('/:id').put(sessionChecker, (req, res) => {
  User.findById(req.params.id).then((user) => {
    user.update(req.body).then((updatedUser) => {
      res.json(updatedUser);
    }).catch((error) => {
      res.status(400).json(error);
    });
  }).catch((error) => {
    res.status(400).json(error);
  });
});

router.route('/:id').delete(sessionChecker, (req, res) => {
  User.findById(req.params.id).then((user) => {
    user.destroy({ force: true }).then((deletedUser) => {
      res.json(deletedUser);
    });
  }).catch((error) => {
    res.status(400).json(error);
  });
});

module.exports = router;
