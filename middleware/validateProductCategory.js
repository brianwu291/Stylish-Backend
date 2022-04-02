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

function validateProductCategory(request, response, next) {
  const category = request.params.category;

  const isValidCategoryString = (
    isString(category) &&
    isStringLengthValid(category)
  );

  if (isValidCategoryString) return next();

  return response.status(400).send({
    errorMessage: "category type issue.",
    errorKey: "setting-error-category",
  });
}

module.exports = validateProductCategory;
