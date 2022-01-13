const { DataTypes } = require('sequelize');
const isNull = require('lodash/isNull');

const { sequelize } = require('../models');
const getUserModel = require('../models/users');
const getProductModel = require('../models/products');
const getFavoritesModel = require('../models/favorites');

const User = getUserModel(sequelize, DataTypes);
const Product = getProductModel(sequelize, DataTypes);
const Favorite = getFavoritesModel(sequelize, DataTypes);

/**
 * @typedef {Object {string, any}} Response
 * @typedef {Object {User.toJSON | string | Error}} Send
 *
 * @param {object} request
 * @param {object} request.params
 * @param {string | number} request.params.id
 * @param {Response} response
 * @returns {Promise <Send>}
 */
function getOneUser(request, response) {
  const userId = parseInt(request.params.id, 10);

  return  User.findByPk(userId)
    .then(user => {
      if (isNull(user)) {
        return response.status(404).send(
          `Not found with id ${userId}.`
        );
      }

      return response.status(200).send(user.toJSON());
    })
    .catch(err => (
      response.status(500).send(err)
      // save error log here
    ));
}

/**
 * @typedef {Object {string, any}} Response
 * @typedef {Object {User.toJSON | Error}} Send
 *
 * @param {object} request
 * @param {object} request.body - user information
 * @param {string} request.body.firstName - first name
 * @param {string} request.body.lastName - last name
 * @param {string | null} request.body.birthday - birthday data string
 * @param {Response} response
 * @returns {Promise <Send>}
 */
function createOneUser(request, response) {
  const userInfo = request.body;

  return User.create(userInfo)
    .then(user => response.status(200).send(user))
    .catch(err => (
      // save error log here
      response.status(500).send(err)
    ));
}

/**
 * @typedef {Object {string, any}} Response
 * @typedef {Object {Favorites.toJSON[] | Error}} Send
 *
 * @param {object} request
 * @param {object} request.params
 * @param {string | number} request.params.id
 * @param {Response} response
 * @returns {Promise <Send>}
 */
function getUserFavoriteProducts(request, response) {
  const userId = parseInt(request.params.id, 10);

  return Favorite.findAll({
    where: {
      userId,
    },
    include: [
      { model: Product, required: true },
      { model: User, required: true },
    ],
  })
    .then(favorites => {
      if (favorites.length === 0) {
        return response.status(404).send(
          `Not found with id ${userId}.`
        );
      }

      const favoriteProducts = favorites
        .map((favorite) => favorite.toJSON())
        .map(({ Product }) => Product);

      return response.status(200).send(favoriteProducts);
    })
    .catch(err => (
      // save error log here
      response.status(500).send(err)
    ));
}

module.exports = {
  getUserFavoriteProducts,
  getOneUser,
  createOneUser,
};
