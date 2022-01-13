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
      firstName: {
        type: DataTypes.STRING(128),
        defaultValue: "",
        allowNull: false,
        field: "first_name",
      },
      lastName: {
        type: DataTypes.STRING(128),
        defaultValue: "",
        allowNull: false,
        field: "last_name",
      },
      birthday: {
        type: DataTypes.DATE,
        defaultValue: null,
        allowNull: true,
      },
    },
    {
      tableName: "users",
      timestamps: false, // so that won't select created_at ... field
    }
  );

  return User;
};
