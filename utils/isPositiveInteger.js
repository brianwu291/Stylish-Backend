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

module.exports = isPositiveInteger;
