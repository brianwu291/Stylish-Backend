const isString = require("lodash/isString");

const isPositiveInteger = require("../utils/isPositiveInteger");

/**
 * @constant
 * @type {number}
 */
const maxStringLength = 17;

/**
 * @param {String} string
 * @returns {Bool}
 */
function isStringLengthValid(string) {
  return string.length > 0 && string.length <= maxStringLength;
}

/**
 * @typedef {Object {string, any}} Response
 * @typedef {Object {string, any}} Request
 * @typedef {Function {any => void}} NextFunction
 * @typedef {Object {string, any}} Send
 *
 * @param {Request} request
 * @param {Response} response
 * @param {NextFunction} next
 * @returns {Send | NextFunction.return}
 */
function validateUserId(request, response, next) {
  const userId = request.params.id;

  const isValidId =
    isString(userId) &&
    isStringLengthValid(userId) &&
    isPositiveInteger(userId);

  if (isValidId) return next();

  return response.status(400).send({
    errorMessage: "user id type issue.",
    errorKey: "setting-error-user-id",
  });
}

module.exports = validateUserId;
