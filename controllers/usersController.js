const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const isNull = require('lodash/isNull');

const { getEnv } = require('../env');
const { sequelize } = require('../models');

const generateJwtAuthToken = require('../utils/generateJwtAuthToken');

const { Users } = sequelize.models;

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
function getUserById(request, response) {
  const userId = parseInt(request.params.id, 10);

  return Users.findByPk(userId)
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

function createUserWithStylishSignup(request, response) {
  const {
    name,
    email,
    password,
    birthday,
    profileImage,
  } = request.body;

  // https://www.npmjs.com/package/bcryptjs
  const bcryptSalt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, bcryptSalt)

  // https://github.com/dcodeIO/bcrypt.js#readme
  const authToken = generateJwtAuthToken({ name, email }, '30d');
  
  return Users.create({
    name,
    email,
    password: hashPassword,
    birthday,
    profileImage,
    authToken
  })
    .then(({ dataValues }) => {
      const {
        id, name, email, birthday = null, profileImage = null,
        authToken, googleToken = null, facebookToken = null,
      } = dataValues;
      return response.status(200).send({
        id,name, email, birthday, profileImage,
        authToken, googleToken, facebookToken,
      });
    })
    .catch(({ errors }) => {
      const hasDuplicateError = Array.isArray(errors) && errors.some(({ validatorKey }) => validatorKey === 'not_unique');

      if (hasDuplicateError) {
        return response.status(400).send({
          errorMessage: "user already exist",
          errorKey: "setting-error-user-signup"
        })
      }

      return response.status(500).send({
        errorMessage: "signup fail with server issue",
        errorKey: "setting-error-user-signup"
      })
    });
  
}

function loginUserWithEmailPassword(request, response) {
  const { email, password } = request.body;

  return Users.findOne({
    attributes: {
      exclude: ["createdAt", "updatedAt", "userId"],
    },
    where: { email },
  })
    .then((user) => {
      if (isNull(user)) {
        return response.status(404).send(
          `Not found user with email ${email}.`
        );
      }

      const { name, password: hashedPassword } = user.dataValues;
      const isPasswordCorrect = bcrypt.compareSync(password, hashedPassword);

      if (isPasswordCorrect) {
        const newAuthToken = generateJwtAuthToken({ name, email }, '30d');

        user.set({ authToken: newAuthToken });
        return user.save()
          .then(() => {
            return response.status(200).send({
              email,
              authToken: newAuthToken
            })
          });
      }

      return response.status(400).send({
        errorMessage: "password not correct",
        errorKey: "setting-error-user-login"
      });
    })
    .catch((error) => {
      console.log('error', error);
      return response.status(500).send({
        errorMessage: "login fail with server issue",
        errorKey: "setting-error-user-login"
      })
    });
}



module.exports = {
  getUserById,
  createUserWithStylishSignup,
  loginUserWithEmailPassword,
};
