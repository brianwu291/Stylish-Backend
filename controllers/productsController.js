const isNull = require("lodash/isNull");

const { sequelize } = require("../models");

const mapProductValues = require("../utils/mapProductValues")

const { queryProductOption } = require("../constants/queryOptions");

const { Products } = sequelize.models;


function handleGetProductResponse({
  productId,
  product = {},
  response = {},
}) {
  if (isNull(product)) {
    return response.status(404).send(`Not found with id ${productId}.`);
  }

  return response.status(200).send({
    data: mapProductValues(product.toJSON())
  });
}

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
    .then((product) => (
      handleGetProductResponse({
        productId,
        product,
        response,
      })
    ))
    .catch((err) => {
      console.log("err", err);
      // save error log here
      return response.status(500).send("something went wrong");
    });
}

/**
 * @typedef {{ url: string }} image
 * @typedef {{ code: string, name: string }} color
 * @typedef {{
 *   safetyStock: string,
 *   colorCode: string,
 *   size: string
 * }} variant
 * @typedef {{
 *   sizes: string[],
 *   images: image[]
 *   colors: color[],
 *   variants: variant[]
 * }} product
 * @typedef {product[]} products
 * 
 * @param {products} allProducts
 */
function getAllMappedProducts(allProducts = []) {
  return allProducts.map(({ dataValues }) => (
    mapProductValues(dataValues)
  ));
}

/**
 * @typedef {{ url: string }} image
 * @typedef {{ code: string, name: string }} color
 * @typedef {{
 *   safetyStock: string,
 *   colorCode: string,
 *   size: string
 * }} variant
 * @typedef {{
 *   sizes: string[],
 *   images: image[]
 *   colors: color[],
 *   variants: variant[]
 * }} product
 * @typedef {product[]} products
 * @typedef {{ data: products }} SendProducts
 * @typedef {SendProducts | string | Error} Send
 *
 * @param {Response} response
 * @returns {Promise <Send>}
 */
function getAllProducts(request, response) {
  return Products.findAll(queryProductOption)
    .then((allProducts) =>
      response.status(200).send({
        data: getAllMappedProducts(allProducts)
      })
    )
    .catch((error) => {
      console.log("error", error);
      return response.status(500).send("something went wrong");
    });
}



function getAllProductsByCategory(request, response) {
  const { category } = request.params;

  return Products.findAll({
    ...queryProductOption,
    where: { category },
  })
  .then((allProducts) =>
    response.status(200).send({
      data: getAllMappedProducts(allProducts)
    })
  )
  .catch((error) => {
    console.log("error", error);
    return response.status(500).send("something went wrong");
  });
}

module.exports = {
  getOneProduct,
  getAllProducts,
  getAllProductsByCategory,
};
