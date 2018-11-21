const Sequelize = require('sequelize');
const User = require('./user');
const Client = require('./client');
const { dbConfig } = require('../../config');


const sequelize = new Sequelize(dbConfig);

const models = {
  User: User(sequelize, Sequelize),
  Client: Client(sequelize, Sequelize)
};

module.exports = models;
