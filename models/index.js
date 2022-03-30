'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const { getEnv } = require('../env');

const environments = getEnv();
const basename = path.basename(__filename);

const database = {};

const sequelize = new Sequelize(
  environments.database.name,
  environments.database.user,
  environments.database.password,
  {
    host: environments.database.host,
    dialect: "mysql",
  }
);


const executeOrder = [
  'users',
  'colors',
  'products',
  'inventories',
  'campaigns',
  'campaignProducts',
  'images',
]

executeOrder
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    database[model.name] = model;
  });

Object.keys(database).forEach(modelName => {
  if (database[modelName].associate) {
    database[modelName].associate(database);
  }
});

async function connectDatabase() {
  try {
    return await sequelize.authenticate();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
}

database.sequelize = sequelize;
database.Sequelize = Sequelize;
database.connectDatabase = connectDatabase;

module.exports = database;
