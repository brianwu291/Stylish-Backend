const isUndefined = require('lodash/isUndefined');

function getColorsWithCodeAndName(variants = []) {
  return variants.reduce((
    acc,
    { Color }
  ) => {
    const { finalResult, dupMap } = acc;
    const { name, code } = Color;
    if (isUndefined(dupMap[code])) {
      dupMap[code] = code;
      finalResult.push({ name, code });
      return acc;
    }
    return acc;
  }, {
    finalResult: [],
    dupMap: {}, 
  }).finalResult;
}

module.exports = getColorsWithCodeAndName;
