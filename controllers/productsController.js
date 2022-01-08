import isNull from 'lodash/isNull.js';

import {
  getProductById,
  createOneNewProduct,
} from '../modules/products.js';


/**
 * @typedef {Object {string, any}} Response
 * @typedef {Object {string, any}} Request
 * @typedef {Object {string, any} | String} Send
 * 
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise <Send>}
*/
export function getOneProduct(request, response) {
  const productId = parseInt(request.params.id, 10);

  return getProductById(productId)
    .then((product) => {
      if (isNull(product)) {
        return response.status(404).send({
          message: `Not found with id ${productId}.`
        });
      }

      return response.status(200).send(product);
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
export function createOneProduct(request, response) {
  const productInfo = request.body;
  return createOneNewProduct(productInfo)
    .then(({ result }) => (
      response.status(200).send({ id: result.insertId })
    ))
    .catch(({ message }) => response
      .status(400)
      .send(message)
    );
}
