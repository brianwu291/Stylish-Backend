const { Sequelize } = require('sequelize');

const getUserModal = require("./users");
const getProductModal = require("./products");

module.exports = (sequelize, DataTypes) => {
  const User = getUserModal(sequelize, DataTypes);
  const Product = getProductModal(sequelize, DataTypes);

  const Favorite = sequelize.define(
    "Favorite",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "product_id",
        references: {
          model: Product,
          key: "id",
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "user_id",
        references: {
          model: User,
          key: "id",
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
        },
      },
    },
    {
      tableName: "favorites",
      timestamps: false, // so that won't select created_at ... field
    }
  );
  
  User.hasMany(Favorite, { foreignKey: "userId" });
  Favorite.belongsTo(User, { foreignKey: "userId" });
  Product.hasMany(Favorite, { foreignKey: "productId" });
  Favorite.belongsTo(Product, { foreignKey: "productId" });

  return Favorite;
};
