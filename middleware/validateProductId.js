import isString from 'lodash/isString.js';

import isPositiveInteger from '../utils/isPositiveInteger.js';

/**
 * @constant
 * @type {number}
*/
const maxStringLength = 17;

/**
 * @param {String | any} string
 * @returns {Bool}
*/
function isStringLengthValid(string = '') {
  return isString(string) && string.length <= maxStringLength;
}

/**
 * @typedef {Object {string, any}} Response
 * @typedef {Object {string, any}} Request
 * @typedef {Function {any => void}} NextFunction
 * @typedef {Object {string, any} | String} Send
 *
 * @param {Request} request
 * @param {Response} response
 * @param {NextFunction} next
 * @returns {Send | NextFunction.return}
*/
export function validateProductId(request, response, next) {
  const productId = request.params.id;

  const isValidId = (
    isStringLengthValid(productId) && isPositiveInteger(productId)
  )

  if (isValidId) return next();
  
  return response.status(400).send({
    errorMessage: 'product id type issue.',
    errorKey: 'setting-error-product-id',
  });
}
