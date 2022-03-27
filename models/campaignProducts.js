const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Campaigns = sequelize.models.Campaigns;
  const Products = sequelize.models.Products;

  const CampaignProducts = sequelize.define(
    "CampaignProducts",
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
      campaignId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "campaign_id",
        references: {
          model: Campaigns,
          key: "id",
        },
      },
      productId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "product_id",
        references: {
          model: Products,
          key: "id",
        },
      },
    },
    {
      tableName: "campaign_products",
    }
  );

  Campaigns.hasMany(CampaignProducts, {
    foreignKey: "campaignId"
  });
  CampaignProducts.belongsTo(Campaigns, {
    foreignKey: "campaignId"
  });
  Products.hasMany(CampaignProducts, {
    foreignKey: "productId"
  });
  CampaignProducts.belongsTo(Products, {
    foreignKey: "productId"
  });

  return CampaignProducts;
};
