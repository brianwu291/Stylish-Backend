const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define(
    "Orders",
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
      shippingWay: {
        type: DataTypes.STRING(128),
        allowNull: false,
        field: "shipping_way",
      },
      paymentType: {
        type: DataTypes.STRING(128),
        allowNull: false,
        field: "payment_type",
      },
      subtotal: {
        type: DataTypes.DECIMAL(18, 2),
        defaultValue: 0,
        allowNull: false,
        field: "subtotal",
      },
      freight: {
        type: DataTypes.DECIMAL(18, 2),
        defaultValue: 0,
        allowNull: false,
        field: "freight",
      },
      total: {
        type: DataTypes.DECIMAL(18, 2),
        defaultValue: 0,
        allowNull: false,
        field: "total",
      },
    },
    {
      tableName: "orders",
    }
  );

  return Orders;
};
