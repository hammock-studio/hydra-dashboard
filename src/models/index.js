const Sequelize = require('sequelize');
const User = require('./user');
const { dbConfig } = require('../../config');


const sequelize = new Sequelize(dbConfig);

const models = {
  User: User(sequelize, Sequelize)
};

module.exports = models;
