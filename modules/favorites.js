const { DataTypes, Sequelize } = require('sequelize');

const { sequelize } = require("./connection");
const { User } = require("./users");
const { Product } = require("./products");

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

User.belongsToMany(Product, {
  through: {
    model: Favorite,
  },
  foreignKey: "id",
});
Product.belongsToMany(User, {
  through: {
    model: Favorite,
  },
  foreignKey: "id",
});

User.hasMany(Favorite, { foreignKey: "userId" });
Favorite.belongsTo(User, { foreignKey: "userId" });
Product.hasMany(Favorite, { foreignKey: "productId" });
Favorite.belongsTo(Product, { foreignKey: "productId" });

/**
 * @param {number} id - user id (primary key)
 * @returns {Promise<Favorite.toJSON[] | [] | Error>}
 */
function getUserFavoriteProductsById(id) {
  return new Promise((resolve, reject) => {
    Favorite.findAll({
      where: {
        userId: id,
      },
      include: [
        { model: Product, required: true },
        { model: User, required: true },
      ],
    })
      .then((favorites) => {
        const favoriteProducts = favorites
          .map((favorite) => favorite.toJSON())
          .map(({ Product }) => Product);
        resolve(favoriteProducts);
      })
      .catch((err) => {
        // save error log here
        reject(err);
      });
  });
}

module.exports = {
  Favorite,
  getUserFavoriteProductsById,
};
