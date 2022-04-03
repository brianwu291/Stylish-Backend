const {
  getUserById,
  createUserWithStylishSignup,
  loginUserWithEmailPassword,
} = require("../controllers/usersController");

const { validateUserId } = require("../middleware/validateUserId");
const validateUserSignup = require("../middleware/validateUserSignup");
const { validateUserLogin } = require("../middleware/validateUserLogin");

/**
 * @constant
 * @type {string}
 */
const API_PREFIX = "/api/users";

/**
 * @typedef {Function <(path: string, validateProductId: function, getOneProduct: function) => (returns: any)>} get
 * @typedef {Object <string, get>} Application
 *
 * @param {Application} App
 * @returns {void}
 */
function usersRoutes(App) {
  App.post(`${API_PREFIX}/signup`, validateUserSignup, createUserWithStylishSignup);
  App.post(`${API_PREFIX}/login`, validateUserLogin, loginUserWithEmailPassword);
  App.get(`${API_PREFIX}/:id`, validateUserId, getUserById);
}

module.exports = usersRoutes;
