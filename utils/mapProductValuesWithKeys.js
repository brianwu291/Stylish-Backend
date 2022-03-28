const getSizesInVariants = require('./getSizesInVariants');

function mapProductValuesWithKeys(product = {}) {
  const mappedProduct = {
    ...product,
    sizes: getSizesInVariants(product.Inventories),
    images: product.Images,
    variants: product.Inventories,
  };
  delete mappedProduct.Images;
  delete mappedProduct.Inventories;

  return mappedProduct;
}

module.exports = mapProductValuesWithKeys;
