const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const { Users, Orders } = sequelize.models;

  const OrderRecipients = sequelize.define(
    "OrderRecipients",
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
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: "phone",
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        field: "email",
      },
      address: {
        type: DataTypes.STRING(500),
        allowNull: false,
        field: "address",
      },
      receivedStartTime: {
        type: DataTypes.TIME(6),
        allowNull: false,
        field: "received_start_time",
      },
      receivedEndTime: {
        type: DataTypes.TIME(6),
        allowNull: false,
        field: "received_end_time",
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
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "user_id",
        references: {
          model: Users,
          key: "id",
        },
      },
    },
    {
      tableName: "order_recipients",
    }
  );

  Users.hasMany(OrderRecipients, {
    foreignKey: "userId",
    sourceKey: "id",
  });
  OrderRecipients.belongsTo(Users, {
    foreignKey: "userId",
    sourceKey: "id",
  });

  Orders.hasOne(OrderRecipients, {
    foreignKey: "orderId",
    sourceKey: "id",
  });
  OrderRecipients.belongsTo(Orders, {
    foreignKey: "orderId",
    sourceKey: "id",
  });

  return OrderRecipients;
};
