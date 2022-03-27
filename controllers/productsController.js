const { DataTypes } = require("sequelize");
const isNull = require("lodash/isNull");

const {
  sequelize,
  Inventories,
  Products,
} = require("../models");
// const Inventories = require("../models/inventories")(sequelize, DataTypes);
// const Products = require("../models/products")(sequelize, DataTypes);

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

  return Products.findByPk(productId)
    .then((product) => {
      if (isNull(product)) {
        return response.status(404).send(`Not found with id ${productId}.`);
      }
      return response.status(200).send(product.toJSON());
    })
    .catch((err) => {
      console.log("err", err);
      // save error log here
      return response.status(500).send("something went wrong");
    });
}

async function getAllProducts(request, response) {
  try {
    const allProducts = await Products.findAll({
      attributes: {
        exclude: [
          'createdAt', 'updatedAt', 'productId'
        ]
      },
      include: [
        {
          model: Inventories,
          required: true,
          attributes: [
            'safety_stock', 'color_code', 'size'
          ]
        },
      ]
    });
    // .then(products => products);

    // const allInventories = await Inventories
    //   .findAll()
    //   .then(inventories => inventories);
    response.status(200).send({ data: allProducts });
    // console.log('allProducts', allProducts)
  } catch (error) {
    console.log('error', error)
    response.status(500).send("something went wrong");
    throw error;
  }
  // return Products.findAll()
  //   .then((products) => (
  //     response.status(200).send({ data: products })
  //   ))
  //   .catch((err) => {
  //     console.log("err", err);
  //     // save error log here
  //     return response.status(500).send("something went wrong")
  //   });
}

module.exports = {
  getOneProduct,
  getAllProducts,
};
