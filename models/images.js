const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.models.Users;
  const Products = sequelize.models.Products;
  const Campaigns = sequelize.models.Campaigns;

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
        references: {
          model: Users,
          key: "id",
        },
      },
      productId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: "product_id",
        references: {
          model: Products,
          key: "id",
        },
      },
      campaignId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: "campaign_id",
        references: {
          model: Campaigns,
          key: "id",
        },
      },
    },
    {
      tableName: "images",
    }
  );

  return Images;
};
