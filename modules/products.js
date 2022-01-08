import { DataTypes } from 'sequelize';
import isNull from 'lodash/isNull.js';

import { sequelize } from './connection.js';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false,
    field: 'name',
  },
  price: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    field: 'price',
  },
  categoryId: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: null,
    allowNull: true,
    field: 'category_id',
  }
}, {
  tableName: 'products',
  timestamps: false, // so that won't select created_at ... field
});


/**
 * @param {string} id - product id (primary key)
 * @returns {Promise<Product.toJSON | null | Error>}
*/
export function getProductById(id) {
  return new Promise((resolve, reject) => {
    Product.findByPk(id)
      .then(product => {
        if (isNull(product)) {
          resolve(null);
        }
        resolve(product.toJSON());
      })
      .catch(err => {
        console.log('err', err);
        // save error log here
        reject(err)
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
