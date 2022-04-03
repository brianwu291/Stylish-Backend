const isString = require("lodash/isString");

/**
 * @constant
 * @type {number}
 */
 const maxStringLength = 128; // from db schema

 /**
  * @param {String} string
  * @returns {Bool}
  */
 function isStringLengthValid(string) {
   return string.length > 0 && string.length <= maxStringLength;
 }

function validateSearchProductsKeyword(request, response, next) {
  const { keyword } = request.query;

  const isValidKeyword = (
    isString(keyword) &&
    isStringLengthValid(keyword)
  );

  if (isValidKeyword) return next();

  return response.status(400).send({
    errorMessage: "keyword issue.",
    errorKey: "setting-error-keyword",
  });
}

module.exports = validateSearchProductsKeyword;
