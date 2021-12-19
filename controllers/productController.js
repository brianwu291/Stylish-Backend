const {
  getProductById,
  createOneNewProduct,
} = require('../modules/product');

/**
 * @typedef {Object {string, any}} Response
 * @typedef {Object {string, any}} Request
 * @typedef {Object {string, any} | String} Send
 * 
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise <Send>}
*/
function getOneProduct(request, response) {
  const productId = parseInt(request.params.id, 10);

  return getProductById(productId)
    .then(({ result }) => {
      if (result.length === 0) {
        return response.status(404).send({
          message: `Not found with id ${productId}.`
        });
      }

      return response.status(200).send(result[0]);
    })
    .catch(() => response.status(500).send('something went wrong'));
}

/**
 * @typedef {Object {string, any}} Response
 * @typedef {Object {string, any}} Request
 * @typedef {Object {string, string} | String} Send
 * 
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise <Send>}
*/
function createOneProduct(request, response) {
  const productInfo = request.body;
  return createOneNewProduct(productInfo)
    .then(({ result }) => (
      response.status(200).send({ id: result.insertId })
    ))
    .catch(({ message }) => response.status(400).send(message));
}

const productController = {
  getOneProduct,
  createOneProduct,
};

module.exports = productController;
