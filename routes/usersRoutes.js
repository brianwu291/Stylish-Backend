import {
  getOneUser,
  getUserFavoriteProducts,
} from '../controllers/usersController.js';

/**
 * @constant
 * @type {string}
*/
const API_PREFIX = '/api/users';

/**
 * @typedef {Function <(path: string, validateProductId: function, getOneProduct: function) => (returns: any)>} get
 * @typedef {Object <string, get>} Application
 * 
 * @param {Application} App
 * @returns {void}
*/
function usersRoutes(App) {
  // TODO: add validation on this route
  App.get(`${API_PREFIX}/:id`, getOneUser);
  App.get(`${API_PREFIX}/:id/favorites`, getUserFavoriteProducts);
}

export default usersRoutes;