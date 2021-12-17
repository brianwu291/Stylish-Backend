require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host     : process.env.dbHost,
  user     : process.env.dbUser,
  password : process.env.dbPassword,
});

/**
 * @param {void}
 * @returns {Promise<mysql.Connection | mysql.QueryError>}
*/
function getDBConnection() {
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
function useDBWithName({ connection, dbName }) {
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

const exportModules = {
  getDBConnection,
  useDBWithName,
}

/**
 * A module that return
 * get connection function
 * and
 * useDBWithName function
 * @module exportModules
 */
module.exports = exportModules;
