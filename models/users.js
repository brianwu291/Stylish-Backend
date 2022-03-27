const { Sequelize } = require('sequelize');

const { PROVIDERS } = require("../constants");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE(6),
        defaultValue: Sequelize.fn("now"),
        allowNull: false,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE(6),
        defaultValue: Sequelize.fn("now"),
        allowNull: false,
        field: "updated_at",
      },
      provider: {
        type: DataTypes.ENUM(Object.values(PROVIDERS)),
        allowNull: false,
        field: "provider",
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "name",
      },
      email: {
        type: DataTypes.STRING(191),
        allowNull: false,
        field: "email",
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: false,
        field: "password",
      },
      birthday: {
        type: DataTypes.DATE,
        defaultValue: null,
        allowNull: true,
      },
      profileImageId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: "profile_image_id",
      },
    },
    {
      tableName: "users",
    }
  );

  return User;
};
