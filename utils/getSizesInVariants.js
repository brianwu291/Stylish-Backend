function getSizesInVariants(variants = []) {
  return variants.reduce((acc, { size }) => {
    if (acc.indexOf(size) > -1) {
      return acc;
    }
    acc.push(size);
    return acc;
  }, []);
}

module.exports = getSizesInVariants;
