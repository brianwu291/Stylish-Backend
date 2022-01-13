const { Sequelize } = require("sequelize");
const { getEnv } = require("../env");

const { database } = getEnv();

/**
 * @const {Sequelize}
 */
const sequelize = new Sequelize(
  database.name,
  database.user,
  database.password,
  {
    host: database.host,
    dialect: "mysql",
  }
);

/**
 * @param {void}
 * @returns {Promise<void | Error>}
 */
async function connectDatabase() {
  try {
    return await sequelize.authenticate();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
}

module.exports = {
  sequelize,
  connectDatabase,
};
