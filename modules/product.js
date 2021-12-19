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

/**
 * @param {string} name - product name
 * @param {number} price - product price
 * @param {string} categoryId - product categoryId
 * @returns {Promise<mysql.RowDataPacket[] | mysql.QueryError>}
*/
function createOneNewProduct({ name, price, categoryId }) {
  return new Promise((resolve, reject) => {
    getDBConnection()
      .then(connection => {
        connection.query(
          `INSERT INTO product (name, price, category_id)
          VALUES ("${name}", ${price}, ${categoryId});`,
          (error, result, fields) => {
            if (error) reject(error);
            resolve({ result, fields });
          }
        );
      });
  });
}


module.exports = {
  getProductById,
  createOneNewProduct,
};
