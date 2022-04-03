const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
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
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "name",
      },
      email: {
        type: DataTypes.STRING(191),
        allowNull: false,
        unique: true,
        field: "email",
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: true,
        field: "password",
      },
      birthday: {
        type: DataTypes.DATE,
        defaultValue: null,
        allowNull: true,
      },
      profileImage: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: "profile_image",
      },
      authToken: {
        type: DataTypes.STRING(600),
        allowNull: true,
        field: "auth_token",
      },
      googleToken: {
        type: DataTypes.STRING(600),
        allowNull: true,
        field: "google_token",
      },
      facebookToken: {
        type: DataTypes.STRING(600),
        allowNull: true,
        field: "facebook_token",
      },
    },
    {
      tableName: "users",
    }
  );

  return Users;
};
