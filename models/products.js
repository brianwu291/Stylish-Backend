module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
        field: "name",
      },
      price: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "price",
      },
      categoryId: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: null,
        allowNull: true,
        field: "category_id",
      },
    },
    {
      tableName: "products",
      timestamps: false, // so that won't select created_at ... field
    }
  );

  return Product;
};

