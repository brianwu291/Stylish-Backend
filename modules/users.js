import { getDBConnection } from './connection.js';

/**
 * @param {number} id - user id (primary key)
 * @returns {Promise<mysql.RowDataPacket[] | mysql.QueryError>}
*/
export function getUserById(id) {
  return new Promise((resolve, reject) => {
    getDBConnection()
      .then(connection => {
        connection.query(
          `SELECT id, first_name AS firstName, last_name AS lastName, birthday FROM users WHERE id = "${id}"`,
          (error, result, fields) => {
            if (error) reject(error);
            resolve({ result, fields });
          },
        );
      });
  });
}

/**
 * @param {string} firstName - first name
 * @param {string} lastName - last name
 * @param {date} birthday - birthday data string
 * @returns {Promise<mysql.RowDataPacket[] | mysql.QueryError>}
*/
export function createOneNewUser({ firstName, lastName, birthday }) {
  return new Promise((resolve, reject) => {
    getDBConnection()
      .then(connection => {
        connection.query(
          `INSERT INTO users (first_name, last_name, birthday)
          VALUES ("${firstName}", ${lastName}, ${birthday});`,
          (error, result, fields) => {
            if (error) reject(error);
            resolve({ result, fields });
          }
        );
      });
  });
}

/**
 * @param {number} userId - user id name
 * @returns {Promise<mysql.RowDataPacket[] | mysql.QueryError>}
*/
export function getUserFavoriteProductsById({ userId }) {
  return new Promise((resolve, reject) => {
    getDBConnection()
      .then(connection => {
        connection.query(
          `SELECT
          products.id AS productId,
          products.name AS productName,
          products.price AS productPrice,
          products.category_id AS categoryId
          FROM favorites
          INNER JOIN products ON products.id = favorites.product_id INNER JOIN users ON users.id = favorites.user_id
          WHERE user_id=${userId};`,
          (error, result, fields) => {
            if (error) reject(error);
            resolve({ result, fields });
          }
        );
      });
  });
}
