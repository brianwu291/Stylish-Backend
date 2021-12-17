const {
  getProductById,
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

const productController = {
  getOneProduct,
};

module.exports = productController;
