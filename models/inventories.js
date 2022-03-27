const { Sequelize } = require("sequelize");

const { SIZES } = require("../constants");

module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.models.Products;

  const Inventories = sequelize.define(
    "Inventories",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE(6),
        defaultValue: Sequelize.fn("now"),
        allowNull: false,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE(6),
        defaultValue: Sequelize.fn("now"),
        allowNull: false,
        field: "updated_at",
      },
      safetyStock: {
        type: DataTypes.DECIMAL(18, 2),
        defaultValue: 0,
        allowNull: false,
        field: "safety_stock",
      },
      colorCode: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "color_code",
      },
      size: {
        type: DataTypes.ENUM(Object.values(SIZES)),
        allowNull: false,
        field: "size",
      },
      productId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "product_id",
      },
    },
    {
      tableName: "inventories",
    }
  );

  Products.hasMany(Inventories, {
    foreignKey: "productId",
    sourceKey: "id",
  });
  Products.belongsTo(Inventories, {
    foreignKey: "productId",
    targetKey: "id"
  });

  return Inventories;
};
