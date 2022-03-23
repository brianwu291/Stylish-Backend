const { DataTypes } = require('sequelize');
const isNull = require('lodash/isNull');

const { sequelize } = require('../models');
const getUserModel = require('../models/users');

const User = getUserModel(sequelize, DataTypes);

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


module.exports = {
  getOneUser,
};
