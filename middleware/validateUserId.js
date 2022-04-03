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

const errorMsg = "user id type issue.";
const errorKey = "setting-error-user-id";
const validateError = { errorMsg, errorKey };

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
  const userId = `${request.params.id}`;

  const isValidId =
    isString(userId) &&
    isStringLengthValid(userId) &&
    isPositiveInteger( parseInt(userId));

  if (isValidId) return next();

  return response.status(400).send(validateError);
}


module.exports = {
  validateUserId,
  validateError,
}
