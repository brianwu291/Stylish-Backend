const getSizesInVariants = require('./getSizesInVariants');
const getColorsWithCodeAndName = require('./getColorsWithCodeAndName');

function mapProductValues(product = {}) {
  const mappedProduct = {
    ...product,
    sizes: getSizesInVariants(product.Inventories),
    images: product.Images,
    colors: getColorsWithCodeAndName(product.Inventories),
    variants: product.Inventories,
  };
  delete mappedProduct.Images;
  delete mappedProduct.Inventories;

  return mappedProduct;
}

module.exports = mapProductValues;
