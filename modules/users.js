import { DataTypes } from 'sequelize';
import isNull from 'lodash/isNull.js';

import { sequelize } from './connection.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING(128),
    defaultValue: '',
    allowNull: false,
    field: 'first_name',
  },
  lastName: {
    type: DataTypes.STRING(128),
    defaultValue: '',
    allowNull: false,
    field: 'last_name',
  },
  birthday: {
    type: DataTypes.DATE,
    defaultValue: null,
    allowNull: true,
  }
}, {
  tableName: 'users',
  timestamps: false, // so that won't select created_at ... field
});

/**
 * @param {number} id - user id (primary key)
 * @returns {Promise<User.toJSON | null | Error>}
*/
export function getUserById(id) {
  return new Promise((resolve, reject) => {
    User.findByPk(id)
      .then(user => {
        if (isNull(user)) {
          resolve(null);
        }
        resolve(user.toJSON());
      })
      .catch(err => {
        // save error log here
        reject(err)
      });
  });
}

/**
 * @param {Object} userInfo - user information
 * @param {string} userInfo.firstName - first name
 * @param {string} userInfo.lastName - last name
 * @param {string} userInfo.birthday - birthday data string
 * @returns {Promise<User.toJSON | Error>}
*/
export function createOneNewUser(userInfo) {
  return new Promise((resolve, reject) => {
    User.create(userInfo)
    .then(user => resolve(user.toJSON()))
    .catch(err => {
      // save error log here
      reject(err);
    })
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
