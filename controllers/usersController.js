import isNull from 'lodash/isNull.js';

import {
  getUserById,
  createOneNewUser,
} from '../modules/users.js';

import { getUserFavoriteProductsById } from '../modules/favorites.js';


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
    .then((user) => {
      if (isNull(user)) {
        return response.status(404).send({
          message: `Not found with id ${userId}.`
        });
      }

      return response.status(200).send(user);
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
export function createOneUser(request, response) {
  const userInfo = request.body;

  return createOneNewUser(userInfo)
    .then((user) => response.status(200).send(user))
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

  return getUserFavoriteProductsById(userId)
    .then((result) => {
      if (result.length === 0) {
        return response.status(404).send({
          message: `Not found with id ${userId}.`
        });
      }

      return response.status(200).send(result);
    })
    .catch(() => response.status(500).send('something went wrong'));
}
