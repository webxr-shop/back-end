const { Model } = require('sequelize');
const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Client = require('../models/Client');
const Template = require('../models/Template');
const Category = require('../models/Category');

const connection = new Sequelize(dbConfig);

Client.init(connection);
Template.init(connection);
Category.init(connection);

Client.associate(connection.models);
Template.associate(connection.models);
Category.associate(connection.models);

module.exports = connection;
