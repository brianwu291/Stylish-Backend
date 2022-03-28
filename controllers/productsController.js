const isNull = require("lodash/isNull");

const { sequelize } = require("../models");

const getSizesInVariants = require("../utils/getSizesInVariants")

const { Products, Inventories, Images } = sequelize.models;

const queryProductOption = {
  attributes: {
    exclude: ["createdAt", "updatedAt", "productId"],
  },
  include: [
    {
      model: Inventories,
      attributes: ["safetyStock", "colorCode", "size"],
    },
    {
      model: Images,
      attributes: ["url"],
    },
  ],
};

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
      return product.toJSON();
    })
    .then((product) => {
      const mappedProduct = {
        ...product,
        sizes: getSizesInVariants(product.Inventories),
        images: product.Images,
        variants: product.Inventories,
      };
      delete mappedProduct.Images;
      delete mappedProduct.Inventories;
      return response.status(200).send(mappedProduct);
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
      allProducts.map(({ dataValues }) => {
        const mappedProduct = {
          ...dataValues,
          sizes: getSizesInVariants(dataValues.Inventories),
          images: dataValues.Images,
          variants: dataValues.Inventories,
        };
        delete mappedProduct.Images;
        delete mappedProduct.Inventories;
        return mappedProduct;
      })
    )
    .then((allProducts) => response.status(200).send({ data: allProducts }))
    .catch((error) => {
      console.log("error", error);
      return response.status(500).send("something went wrong");
    });
}

module.exports = {
  getOneProduct,
  getAllProducts,
};
