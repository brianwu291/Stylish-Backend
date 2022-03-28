const isNull = require("lodash/isNull");

const { sequelize } = require("../models");

const mapProductValuesWithKeys = require("../utils/mapProductValuesWithKeys")

const { queryProductOption } = require("../constants/queryOptions");

const { Products } = sequelize.models;

/**
 * @typedef {Object {string, any}} Response
 * @typedef {Object {Products.toJSON | string | Error}} Send
 *
 * @param {object} request
 * @param {object} request.params
 * @param {string | number} request.params.id
 * @param {Response} response
 * @returns {Promise <Send>}
 */
function getOneProduct(request, response) {
  const productId = parseInt(request.params.id, 10);

  return Products.findByPk(productId, queryProductOption)
    .then((product) => {
      if (isNull(product)) {
        return response.status(404).send(`Not found with id ${productId}.`);
      }
      return response.status(200).send(
        mapProductValuesWithKeys(product.toJSON())
      )
    })
    .catch((err) => {
      console.log("err", err);
      // save error log here
      return response.status(500).send("something went wrong");
    });
}

function getAllProducts(request, response) {
  return Products.findAll(queryProductOption)
    .then((allProducts) =>
      allProducts.map(({ dataValues }) => (
        mapProductValuesWithKeys(dataValues)
      ))
    )
    .then((allMappedProducts) => response.status(200).send({ data: allMappedProducts }))
    .catch((error) => {
      console.log("error", error);
      return response.status(500).send("something went wrong");
    });
}

module.exports = {
  getOneProduct,
  getAllProducts,
};
