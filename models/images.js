const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const { Users, Products, Campaigns } = sequelize.models;

  const Images = sequelize.define(
    "Images",
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
      url: {
        type: DataTypes.STRING(128),
        allowNull: false,
        field: "url",
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: "user_id",
      },
      productId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: "product_id",
      },
      campaignId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: "campaign_id",
      },
    },
    {
      tableName: "images",
    }
  );

  Users.hasMany(Images, {
    foreignKey: "userId",
    sourceKey: "id",
  });
  Images.belongsTo(Users, {
    foreignKey: "userId",
    targetKey: "id"
  });

  Products.hasMany(Images, {
    foreignKey: "productId",
    sourceKey: "id",
  });
  Images.belongsTo(Products, {
    foreignKey: "productId",
    targetKey: "id"
  });

  Campaigns.hasMany(Images, {
    foreignKey: "campaignId",
    sourceKey: "id",
  });
  Images.belongsTo(Campaigns, {
    foreignKey: "campaignId",
    targetKey: "id"
  });

  return Images;
};
