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
      mainImageId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: "main_image_id",
      },
    },
    {
      tableName: "campaigns",
    }
  );

  return Campaigns;
};
