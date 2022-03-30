const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  const Colors = sequelize.define(
    "Colors",
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
      code: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        field: "code",
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        field: "name",
      },
    },
    {
      tableName: "colors",
    }
  );

  return Colors;
};
