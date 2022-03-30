const { sequelize } = require("../models");

const { Inventories, Images } = sequelize.models;

const queryProductOption = {
  attributes: {
    exclude: ["createdAt", "updatedAt", "productId"],
  },
  include: [
    {
      model: Inventories,
      attributes: ["safetyStock", "colorCode", "size"],
    },
    {
      model: Images,
      attributes: ["url"],
    },
  ],
};

module.exports = {
  queryProductOption,
};
