const {
  getOneUser,
} = require("../controllers/usersController");

const validateUserId = require("../middleware/validateUserId");

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
  App.get(`${API_PREFIX}/:id`, validateUserId, getOneUser);
  // App.get(
  //   `${API_PREFIX}/:id/favorites`,
  //   validateUserId,
  //   getUserFavoriteProducts
  // );
  // App.post(`${API_PREFIX}/create`, createOneUser);
}

module.exports = usersRoutes;
