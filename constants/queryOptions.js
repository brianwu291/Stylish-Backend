const { sequelize } = require("../models");

const { Inventories, Images, Colors } = sequelize.models;

const queryProductOption = {
  attributes: {
    exclude: ["createdAt", "updatedAt", "productId"],
  },
  include: [
    {
      model: Inventories,
      attributes: ["safetyStock", "colorCode", "size"],
      include: [
        {
          model: Colors,
          attributes: ["name", "code"]
        }
      ],
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
