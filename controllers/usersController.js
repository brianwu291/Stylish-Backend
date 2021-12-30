import {
  getUserById,
  getUserFavoriteProductsById,
} from '../modules/users.js';


/**
 * @typedef {Object {string, any}} Response
 * @typedef {Object {string, any}} Request
 * @typedef {Object {string, any} | String} Send
 * 
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise <Send>}
*/
export function getOneUser(request, response) {
  const userId = parseInt(request.params.id, 10);

  return getUserById(userId)
    .then(({ result }) => {
      if (result.length === 0) {
        return response.status(404).send({
          message: `Not found with id ${userId}.`
        });
      }

      return response.status(200).send(result[0]);
    })
    .catch(() => response.status(500).send('something went wrong'));
}

/**
 * @typedef {Object {string, any}} Response
 * @typedef {Object {string, any}} Request
 * @typedef {Object {string, any} | String} Send
 * 
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise <Send>}
*/
export function getUserFavoriteProducts(request, response) {
  const userId = parseInt(request.params.id, 10);

  return getUserFavoriteProductsById({ userId })
    .then(({ result }) => {
      if (result.length === 0) {
        return response.status(404).send({
          message: `Not found with id ${userId}.`
        });
      }

      return response.status(200).send(result);
    })
    .catch(() => response.status(500).send('something went wrong'));
}
