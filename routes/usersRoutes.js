import {
  getOneUser,
  getUserFavoriteProducts,
  createOneUser,
} from '../controllers/usersController.js';

import { validateUserId } from '../middleware/validateUserId.js';

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
  App.get(`${API_PREFIX}/:id`, validateUserId, getOneUser);
  App.get(`${API_PREFIX}/:id/favorites`, validateUserId, getUserFavoriteProducts);
  App.post(`${API_PREFIX}/create`, createOneUser);
}

export default usersRoutes;