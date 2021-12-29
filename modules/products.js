import { getDBConnection } from './connection.js';

/**
 * @param {string} id - product id (primary key)
 * @returns {Promise<mysql.RowDataPacket[] | mysql.QueryError>}
*/
export function getProductById(id) {
  return new Promise((resolve, reject) => {
    getDBConnection()
      .then(connection => {
        connection.query(
          `SELECT id, name, price, category_id FROM products WHERE id = "${id}"`,
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
export function createOneNewProduct({ name, price, categoryId }) {
  return new Promise((resolve, reject) => {
    getDBConnection()
      .then(connection => {
        connection.query(
          `INSERT INTO products (name, price, category_id)
          VALUES ("${name}", ${price}, ${categoryId});`,
          (error, result, fields) => {
            if (error) reject(error);
            resolve({ result, fields });
          }
        );
      });
  });
}
