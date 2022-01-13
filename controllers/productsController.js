const { DataTypes } = require('sequelize');
const isNull = require('lodash/isNull');

const { sequelize } = require('../models');
const getProductModel = require('../models/products');

const Product = getProductModel(sequelize, DataTypes);

/**
 * @typedef {Object {string, any}} Response
 * @typedef {Object {Product.toJSON | string | Error}} Send
 *
 * @param {object} request
 * @param {object} request.params
 * @param {string | number} request.params.id
 * @param {Response} response
 * @returns {Promise <Send>}
 */
function getOneProduct(request, response) {
  const productId = parseInt(request.params.id, 10);

  return Product.findByPk(productId)
    .then((product) => {
      if (isNull(product)) {
        return response.status(404).send(
          `Not found with id ${productId}.`
        );
      }
      return response.status(200).send(product.toJSON());
    })
    .catch((err) => {
      console.log("err", err);
      // save error log here
      return response.status(500).send("something went wrong")
    });
}

/**
 * @typedef {Object {string, any}} Response
 * @typedef {Object {Product.toJSON | Error}} Send
 *
 * @param {object} request
 * @param {object} request.body - product information
 * @param {string} request.body.name - product name
 * @param {string} request.body.price - product price
 * @param {string | null} request.body.categoryId - product categoryId
 * @param {Response} response
 * @returns {Promise <Send>}
 */
function createOneProduct(request, response) {
  const productInfo = request.body;

  return Product.create(productInfo)
    .then((product) => (
      response.status(200).send(product.toJSON())
    ))
    .catch((err) => (
      response.status(400).send(err)
      // save error log here
    ));
}

module.exports = {
  getOneProduct,
  createOneProduct,
};
