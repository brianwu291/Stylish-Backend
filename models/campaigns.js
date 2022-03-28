const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Campaigns = sequelize.define(
    "Campaigns",
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
      title: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        field: "title",
      },
      mainImage: {
        type: DataTypes.STRING(500),
        allowNull: false,
        field: "main_image",
      },
    },
    {
      tableName: "campaigns",
    }
  );

  return Campaigns;
};
