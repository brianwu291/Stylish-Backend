import { DataTypes, Sequelize } from 'sequelize';

import { sequelize } from './connection.js';
import { User } from './users.js';
import { Product } from './products.js';

export const Favorite = sequelize.define('Favorite', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    field: 'product_id',
    references: {
      model: Product,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    field: 'user_id',
    references: {
      model: User,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
}, {
  tableName: 'favorites',
  timestamps: false, // so that won't select created_at ... field
});

User.belongsToMany(Product, {
  through: {
    model: Favorite,
  },
  foreignKey: 'id',
});
Product.belongsToMany(User, {
  through: {
    model: Favorite,
  },
  foreignKey: 'id',
});
User.hasMany(Favorite, { foreignKey: 'userId' });
Favorite.belongsTo(User, { foreignKey: 'id' });
Product.hasMany(Favorite, { foreignKey: 'productId' });
Favorite.belongsTo(Product, { foreignKey: 'id' });

export function getUserFavoriteProductsById(id) {
  Favorite.findAll({
    include: [
      { model: Product },
      { model: User, required: true },
    ]
  })
  .then(res => {
    console.log(
      'res',
      JSON.stringify(res.map(item => item.toJSON()))
    );
  })
  .catch(err => {
    // save error log here
    console.log('err', err);
  });
}

setTimeout(() => {
  getUserFavoriteProductsById(1);
}, 2000);

