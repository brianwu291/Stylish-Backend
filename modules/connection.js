import mysql from 'mysql2';

import { getEnv } from '../config/env.js';

const connection = mysql.createConnection({
  host     : getEnv().database.host,
  user     : getEnv().database.user,
  password : getEnv().database.password,
  port     : getEnv().database.port,
});

/**
 * @param {void}
 * @returns {Promise<mysql.Connection | mysql.QueryError>}
*/
export function getDBConnection() {
  return new Promise((resolve, reject) => {
    connection.connect(function(err) {
      if (err) {
        console.error('error connecting', err);
        reject(err);
        return;
      }
      resolve(connection);
    });
  });
}


/**
 * @param {object} config - use database config
 * @param {mysql.Connection} config.connection - database connection
 * @param {string} config.dbName - database name
 * @returns {Promise<string | mysql.QueryError>}
*/
export function useDBWithName({ connection, dbName }) {
  return new Promise((resolve, reject) => {
    connection.query(`USE ${dbName}`, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(`use database: ${dbName} success!`);
    });
  });
}
