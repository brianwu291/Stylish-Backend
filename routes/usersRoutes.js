const {
  getUserById,
  createUserWithStylishSignup,
  loginUserWithEmailPassword,
  getUserProfileWithUserInfoFromJwt,
} = require("../controllers/usersController");

const { validateUserId } = require("../middleware/validateUserId");
const validateUserSignup = require("../middleware/validateUserSignup");
const { validateUserLogin } = require("../middleware/validateUserLogin");
const validateJwtToken = require("../middleware/validateJwtToken");

/**
 * @constant
 * @type {string}
 */
const API_PREFIX = "/api/users";

/**
 * @typedef {Function} get
 * @typedef {Function} post
 * @typedef {{
 *  get: get
 *  post: post,
 * }} Application
 *
 * @param {Application} App
 * @returns {void}
 */
function usersRoutes(App) {
  App.post(`${API_PREFIX}/signup`, validateUserSignup, createUserWithStylishSignup);
  App.post(`${API_PREFIX}/login`, validateUserLogin, loginUserWithEmailPassword);
  App.get(`${API_PREFIX}/profile`, validateJwtToken, getUserProfileWithUserInfoFromJwt);
  App.get(`${API_PREFIX}/:id`, validateUserId, getUserById);
}

module.exports = usersRoutes;
