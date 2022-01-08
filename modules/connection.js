import { Sequelize } from 'sequelize';
import { getEnv } from '../config/env.js';

const { database } = getEnv();

/**
 * @const {Sequelize}
*/
export const sequelize = new Sequelize(
  database.name,
  database.user,
  database.password,
  {
    host: database.host,
    dialect: 'mysql',
  },
);

/**
 * @param {void}
 * @returns {Promise<void | Error>}
*/
export async function connectDatabase() {
  try {
    return await sequelize.authenticate();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}
