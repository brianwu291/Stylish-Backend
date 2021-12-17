const { getDBConnection } = require('./connection');

/**
 * @param {string} id - product id (primary key)
 * @returns {Promise<mysql.RowDataPacket[] | mysql.QueryError>}
*/
function getProductById(id) {
  return new Promise((resolve, reject) => {
    getDBConnection()
      .then(connection => {
        connection.query(
          `SELECT * FROM product WHERE id = "${id}"`,
          (error, result, fields) => {
            if (error) reject(error);
            resolve({ result, fields });
          },
        );
      });
  });
}


module.exports = {
  getProductById
};
