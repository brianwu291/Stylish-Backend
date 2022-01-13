const { DataTypes } = require("sequelize");
const isNull = require("lodash/isNull");

const { sequelize } = require("./connection");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      field: "name",
    },
    price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: "price",
    },
    categoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: null,
      allowNull: true,
      field: "category_id",
    },
  },
  {
    tableName: "products",
    timestamps: false, // so that won't select created_at ... field
  }
);

/**
 * @param {string} id - product id (primary key)
 * @returns {Promise<Product.toJSON | null | Error>}
 */
function getProductById(id) {
  return new Promise((resolve, reject) => {
    Product.findByPk(id)
      .then((product) => {
        if (isNull(product)) {
          resolve(null);
        }
        resolve(product.toJSON());
      })
      .catch((err) => {
        console.log("err", err);
        // save error log here
        reject(err);
      });
  });
}

/**
 * @param {Object} productInfo - product information
 * @param {string} productInfo.name - product name
 * @param {string} productInfo.price - product price
 * @param {string | null} productInfo.categoryId - product categoryId
 * @returns {Promise<Product.toJSON | Error>}
 */
function createOneNewProduct(productInfo) {
  return new Promise((resolve, reject) => {
    Product.create(productInfo)
      .then((product) => resolve(product.toJSON()))
      .catch((err) => {
        // save error log here
        reject(err);
      });
  });
}

module.exports = {
  Product,
  createOneNewProduct,
  getProductById,
};
