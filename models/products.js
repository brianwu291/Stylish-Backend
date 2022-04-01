const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    "Products",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE(6),
        defaultValue: Sequelize.fn('now'),
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE(6),
        defaultValue: Sequelize.fn('now'),
        field: "updated_at",
      },
      category: {
        type: DataTypes.STRING(128),
        defaultValue: null,
        allowNull: true,
        field: "category",
      },
      title: {
        type: DataTypes.STRING(128),
        allowNull: false,
        field: "title",
      },
      description: {
        type: DataTypes.STRING(128),
        allowNull: false,
        field: "description",
      },
      price: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "price",
      },
      texture: {
        type: DataTypes.STRING(128),
        allowNull: false,
        field: "texture",
      },
      wash: {
        type: DataTypes.STRING(128),
        allowNull: false,
        field: "wash",
      },
      place: {
        type: DataTypes.STRING(128),
        allowNull: false,
        field: "place",
      },
      note: {
        type: DataTypes.STRING(128),
        allowNull: false,
        field: "note",
      },
      story: {
        type: DataTypes.STRING(500),
        allowNull: false,
        field: "story",
      },
      mainImage: {
        type: DataTypes.STRING(500),
        allowNull: false,
        field: "main_image",
      },
    },
    {
      tableName: "products",
    }
  );

  return Products;
};
