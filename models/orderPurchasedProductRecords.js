const { Sequelize } = require('sequelize');

const { SIZES } = require("../constants");

module.exports = (sequelize, DataTypes) => {
  const { Orders, Colors } = sequelize.models;

  const OrderPurchasedProductRecords = sequelize.define(
    "OrderPurchasedProductRecords",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
        field: "name",
      },
      price: {
        type: DataTypes.DECIMAL(18, 2),
        defaultValue: 0,
        allowNull: false,
        field: "price",
      },
      size: {
        type: DataTypes.ENUM(Object.values(SIZES)),
        allowNull: false,
        field: "size",
      },
      quantity: {
        type: DataTypes.DECIMAL(18, 2),
        defaultValue: 0,
        allowNull: false,
        field: "quantity",
      },
      colorId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "color_id",
        references: {
          model: Colors,
          key: "id",
        },
      },
      orderId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "order_id",
        references: {
          model: Orders,
          key: "id",
        },
      },
    },
    {
      tableName: "order_purchased_product_records",
    }
  );

  Orders.hasMany(OrderPurchasedProductRecords, {
    foreignKey: 'orderId',
    sourceKey: "id",
  });
  OrderPurchasedProductRecords.belongsTo(Orders, {
    foreignKey: 'orderId',
    sourceKey: "id",
  });

  Colors.hasMany(OrderPurchasedProductRecords, {
    foreignKey: 'colorId',
    sourceKey: "id",
  });
  OrderPurchasedProductRecords.belongsTo(Colors, {
    foreignKey: 'colorId',
    sourceKey: "id",
  });

  return OrderPurchasedProductRecords;
};
