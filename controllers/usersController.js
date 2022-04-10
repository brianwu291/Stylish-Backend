const bcrypt = require('bcrypt');
const isNull = require('lodash/isNull');
const pick = require('lodash/pick');

const { sequelize } = require('../models');

const generateJwtAuthToken = require('../utils/generateJwtAuthToken');

const { Users } = sequelize.models;

const commonUserInfoFields = [
  "name", "email", "birthday", "profileImage", "authToken",
];


async function createUserWithStylishSignup(request, response) {
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

  // https://github.com/auth0/node-jsonwebtoken#readme
  const authToken = generateJwtAuthToken({ name, email }, "8h");

  const transaction = await sequelize.transaction();
  return Users.create(
    {
      name,
      email,
      password: hashPassword,
      birthday,
      profileImage,
      authToken
    },
    { transaction }
  )
    .then(async ({ dataValues }) => {
      await transaction.commit();
      return response.status(200).send(pick(dataValues, commonUserInfoFields))
    })
    .catch(async ({ errors }) => {
      const hasDuplicateError = Array.isArray(errors) && errors.some(({ validatorKey }) => validatorKey === "not_unique");

      if (hasDuplicateError) {
        await transaction.rollback();
        return response.status(400).send({
          errorMessage: "user already exist",
          errorKey: "setting-error-user-signup"
        })
      }

      await transaction.rollback();
      return response.status(500).send({
        errorMessage: "signup fail with server issue",
        errorKey: "setting-error-user-signup"
      });
    });
  
}

async function loginUserWithEmailPassword(request, response) {
  const { email, password } = request.body;

  const transaction = await sequelize.transaction();

  return Users.findOne({
    attributes: {
      exclude: ["createdAt", "updatedAt", "userId"],
    },
    where: { email },
    transaction,
  })
    .then(async (user) => {
      if (isNull(user)) {
        await transaction.commit();
        return response.status(400).send({
          errorMessage: "password not correct or user not exist",
          errorKey: "setting-error-user-login"
        });
      }

      const { name, password: hashedPassword } = user.dataValues;
      const isPasswordCorrect = bcrypt.compareSync(password, hashedPassword);

      if (isPasswordCorrect) {
        const newAuthToken = generateJwtAuthToken({ name, email }, '8h');

        user.set({ authToken: newAuthToken });
        user.save()
        await transaction.commit(); 
        return response.status(200).send({
          email,
          authToken: newAuthToken
        });
      }

      await transaction.commit();
      return response.status(400).send({
        errorMessage: "password not correct or user not exist",
        errorKey: "setting-error-user-login"
      });
    })
    .catch(async (error) => {
      console.log('error', error);
      await transaction.rollback();
      return response.status(500).send({
        errorMessage: "login fail with server issue",
        errorKey: "setting-error-user-login"
      })
    });
}

function getUserProfileWithUserInfoFromJwt(request, response) {
  const { email, name } = request.userInfoFromJwt;

  return Users.findOne({
    attributes: {
      exclude: ["createdAt", "updatedAt", "userId"],
    },
    where: { name, email },
  })
    .then((user) => {
      if (isNull(user)) return response.status(404).send("user not found");

      const { dataValues } = user;
      response.status(200).send(pick(dataValues, commonUserInfoFields))
    })
    .catch((error) => {
      console.log('error', error);
      return response.status(500).send({
        errorMessage: "fail with server issue",
        errorKey: "setting-error-user"
      })
    });
}


module.exports = {
  createUserWithStylishSignup,
  loginUserWithEmailPassword,
  getUserProfileWithUserInfoFromJwt,
};
