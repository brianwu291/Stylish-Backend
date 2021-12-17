const isString = require('lodash/isString')

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
 * @param {String} number
 * @returns {Bool}
*/
function isPositiveInteger(number) {
  const convertedNumber = parseInt(number, 10);
  
  const isNaN = Number.isNaN(convertedNumber);
  const isSafeInteger = Number.isSafeInteger(convertedNumber);
  const isNegativeOrZero = convertedNumber <= 0;

  if (isNaN || isNegativeOrZero || !isSafeInteger) return false;

  return true;
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
 * @returns {Send}
*/
function validateProductId(request, response, next) {
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

module.exports = {
  maxStringLength,
  isStringLengthValid,
  isPositiveInteger,
  validateProductId,
};
